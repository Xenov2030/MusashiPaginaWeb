import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
const inventory = JSON.parse(
  readFileSync("resources/inventory.json", "utf8"),
) as {
  kind: string;
  original: string;
  sha256: string;
  section: string;
  status: string;
  web: string;
}[];
test("los trece originales están conservados y vinculados por contenido", () => {
  expect(inventory).toHaveLength(13);
  expect(inventory.filter((i) => i.kind === "video promocional")).toHaveLength(
    1,
  );
  for (const item of inventory) {
    expect(
      createHash("sha256").update(readFileSync(item.original)).digest("hex"),
      item.original,
    ).toBe(item.sha256);
    expect(item.section).toBeTruthy();
    expect(item.status).toContain("aportado");
    expect(readFileSync("public" + item.web).length).toBeGreaterThan(0);
  }
});
test("las creaciones tienen texto HTML y solo se marca alcohol indicado por los afiches", async ({
  page,
}) => {
  await page.goto("/carta");
  await page.locator(".brand-archive summary").click();
  for (const [id, ingredient] of [
    ["samurai", "licor de chocolate con menta"],
    ["marca-vagabond", "licor de dulce de leche"],
    ["red-dragon", "licor de chocolate blanco"],
    ["midori-kensei", "licor de pistacho"],
  ]) {
    const product = page.locator("#" + id);
    await expect(product).toContainText(ingredient);
    await expect(product.locator(".alcohol-note")).toHaveText(
      "Contiene alcohol · indicado en el afiche",
    );
  }
  for (const id of ["praline-negro", "bubble-yakuza"])
    await expect(page.locator("#" + id + " .alcohol-note")).toHaveCount(0);
  await expect(page.locator("#praline-negro")).toContainText("praliné de maní");
  await expect(page.locator("#bubble-yakuza")).toContainText(
    "tapioca caramelizadas",
  );
  const image = page.locator("#samurai .visual-image");
  await page.locator("#samurai").hover();
  await expect(image).toHaveCSS("object-fit", "contain");
  await expect(image).toHaveCSS("transform", "none");
});
test("navegación del brief y pastelería con nombres descriptivos", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page
      .getByRole("navigation", { name: "Principal", exact: true })
      .getByRole("link"),
  ).toHaveText([
    "La experiencia",
    "Carta",
    "Reservas",
    "Tatami",
    "Cenas",
    "Bienestar",
    "Nuestra historia",
    "Contacto",
  ]);
  await expect(
    page
      .getByRole("navigation", { name: "Creaciones de Musashi" })
      .getByRole("link"),
  ).toHaveCount(6);
  await page
    .getByRole("navigation", { name: "Principal", exact: true })
    .getByRole("link", { name: "Nuestra historia" })
    .click();
  await expect(page.locator("#historia")).toBeInViewport();
  await page.goto("/carta");
  await page.locator(".brand-archive summary").click();

  for (const name of [
    "Porción rectangular de pastelería",
    "Taiyaki Red Velvet",
    "Pieza con forma de panda",
    "Piezas inspiradas en Totoro",
    "Pieza con forma de gato",
  ])
    await expect(
      page
        .locator(".brand-catalog-item")
        .getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await expect(page.locator("#carta")).not.toContainText(
    /relleno de|precio:|\$\d/,
  );
});
