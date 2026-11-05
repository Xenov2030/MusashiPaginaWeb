import { test, expect } from "@playwright/test";
import recipes from "../src/menu/owner-recipes.json" with { type: "json" };
import { suppliedProducts } from "../src/content";
import { productCatalog } from "../src/menu/catalog";

test("siete recetas únicas, fuente confirmada y condiciones comerciales pendientes", () => {
  expect(recipes.map((p) => p.name)).toEqual([
    "RED DRAGON",
    "VAGABOND",
    "MIDORI KENSEI",
    "BUBBLE YAKUZA",
    "PRALINÉ NEGRO",
    "XENA SAMA",
    "SAMURÁI COFFEE",
  ]);
  expect(new Set(suppliedProducts.map((p) => p.id)).size).toBe(
    suppliedProducts.length,
  );
  for (const recipe of recipes) {
    const product = suppliedProducts.find((p) => p.id === recipe.id)!;
    expect(product.name).toBe(recipe.name);
    expect(product.description).toBe(recipe.description);
    expect(product.ingredients).toBe(recipe.ingredients);
    expect(productCatalog[recipe.id].ingredients).toBe(recipe.ingredients);
    expect(product.contentSource).toEqual({
      providedBy: "propietario",
      providedOn: "2026-11-04",
      status: "confirmed",
    });
    expect(product.priceARS).toBeNull();
    expect(product.availability).toBe("pending");
    for (const key of [
      "summerInclusion",
      "servingTemperature",
      "sizes",
      "adaptations",
      "allergens",
    ] as const)
      expect(product[key]).toBeNull();
  }
  expect(productCatalog["xena-sama"].image).toBeUndefined();
  expect(
    recipes.filter((p) => p.alcohol === "indicated").map((p) => p.id),
  ).toEqual(["red-dragon", "vagabond", "midori-kensei", "samurai"]);
});

test("recetas legibles, imágenes correspondientes y composición de Xena en escritorio y móvil", async ({
  page,
}) => {
  for (const width of [1366, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/carta");
    await page.locator(".brand-archive summary").click();
    for (const recipe of recipes) {
      const card = page
        .locator(".brand-catalog-item")
        .filter({
          has: page.getByRole("heading", { name: recipe.name, exact: true }),
        });
      await expect(card).toHaveCount(1);
      await expect(card.locator(":scope > .product-ingredients")).toHaveText(
        `Ingredientes: ${recipe.ingredients}`,
      );
      await expect(card).toContainText(recipe.description);
      await expect(card).toContainText("Disponibilidad por confirmar");
      await expect(card.locator(":scope > .alcohol-note")).toHaveCount(
        recipe.alcohol === "indicated" ? 1 : 0,
      );
      if (recipe.id === "xena-sama") {
        await expect(card.locator("img")).toHaveCount(0);
        await expect(card.locator(".recipe-typography")).toContainText(
          "Imagen del producto pendiente",
        );
      } else {
        const img = card.locator("img.visual-image");
        await img.evaluate((el: HTMLImageElement) => {
          el.loading = "eager";
          return el.decode();
        });
        await expect(img).toHaveAttribute(
          "src",
          productCatalog[recipe.id].image!.src,
        );
        await expect(img).toHaveCSS("object-fit", "contain");
      }
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator("#xena-sama").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `docs/capturas/recetas-${width === 390 ? "movil" : "escritorio"}.png`,
    });
  }
});
