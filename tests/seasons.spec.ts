import { test, expect } from "@playwright/test";
import { resolveSeason, type Season } from "../src/menu/model";
import { productCatalog } from "../src/menu/catalog";
test("catálogo compartido con diferencias por temporada y activación manual", () => {
  const base: Season = {
    id: "una",
    name: "Una temporada",
    year: null,
    status: "demo",
    heading: "Muestra",
    intro: "",
    categories: ["Café"],
    products: [
      {
        productId: "vagabond",
        category: "Café",
        role: "brand-reference",
        priceARS: null,
        availability: "unconfirmed",
      },
    ],
  };
  const next: Season = {
    ...base,
    id: "dos",
    status: "published",
    year: 2030,
    products: [
      {
        ...base.products[0],
        description: "Descripción confirmada para esta temporada",
        role: "official",
        priceARS: 100,
        availability: "available",
      },
    ],
  };
  const original = productCatalog.vagabond.description;
  const pricedDemo = {
    ...base,
    products: [
      {
        ...base.products[0],
        priceARS: 999,
        availability: "available" as const,
      },
    ],
  };
  expect(resolveSeason("una", [pricedDemo])!.products[0].priceARS).toBeNull();
  expect(resolveSeason("una", [pricedDemo])!.products[0].availability).toBe(
    "unconfirmed",
  );
  expect(() =>
    resolveSeason("una", [{ ...base, status: "published" }]),
  ).toThrow();

  expect(resolveSeason("una", [base, next])!.products[0].canConsult).toBe(
    false,
  );
  expect(resolveSeason("dos", [base, next])!.products[0].description).toBe(
    "Descripción confirmada para esta temporada",
  );
  expect(resolveSeason("dos", [base, next])!.products[0].canConsult).toBe(true);
  expect(productCatalog.vagabond.description).toBe(original);
  expect(resolveSeason("una", [{ ...base, status: "draft" }])).toBeNull();
  expect(resolveSeason("una", [{ ...base, status: "archived" }])).toBeNull();
  expect(() =>
    resolveSeason("una", [
      { ...base, products: [base.products[0], base.products[0]] },
    ]),
  ).toThrow();
});
test("seis ejemplos con imágenes, filtros, precios pendientes y detalle identificado", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(r.url());
  });
  await page.goto("/carta");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Una muestra del próximo verano",
  );
  await expect(page.locator(".season-demo-notice")).toContainText(
    "Carta de prueba",
  );
  await expect(page.locator(".season-grid>.product")).toHaveCount(6);
  await expect(page.locator(".season-price")).toHaveText(
    Array(6).fill("Precio por confirmar"),
  );
  await expect(page.locator(".season-grid a")).toHaveCount(0);
  await expect(page.locator(".season-stamp")).not.toContainText(/20\d\d/);
  await page
    .getByRole("button", { name: "Ampliar imagen de Negro sobre hielo" })
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Imagen de Negro sobre hielo",
  });
  await expect(dialog).toContainText("Carta de prueba");
  await expect(dialog.locator(".media-notice")).toBeInViewport();
  await expect(dialog).toContainText("Imagen conceptual");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.locator(".season-grid img.visual-image").evaluateAll((images) =>
    Promise.all(
      images.map((img) => {
        (img as HTMLImageElement).loading = "eager";
        return (img as HTMLImageElement).decode();
      }),
    ),
  );
  expect(errors).toEqual([]);
});
test("marca no se presenta como receta fría y no se pueden pedir productos demo", async ({
  page,
}) => {
  await page.goto("/carta");
  await expect(page.locator("#vagabond")).toContainText(
    "Creación de la marca · Inclusión en temporada por confirmar",
  );
  await expect(page.locator("#vagabond")).not.toContainText(
    /café frío|servido frío|sobre hielo/i,
  );
  await page
    .getByRole("button", { name: "Té e infusiones frías", exact: true })
    .click();
  await expect(page.locator(".season-grid>.product")).toHaveCount(2);
  await page.getByRole("button", { name: "Todo", exact: true }).click();
  await expect(page.locator(".season-grid a")).toHaveCount(0);
  await expect(page.locator(".season-grid .product-image-button")).toHaveCount(
    6,
  );
});
