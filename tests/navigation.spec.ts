import { test, expect, type Page } from "@playwright/test";
async function atSection(page: Page, id: string) {
  await expect
    .poll(
      () =>
        page
          .locator(`#${id}`)
          .evaluate((el) =>
            Math.abs(
              scrollY -
                Math.min(
                  Math.max(0, el.getBoundingClientRect().top + scrollY - 25),
                  document.documentElement.scrollHeight - innerHeight,
                ),
            ),
          ),
      { timeout: 5000 },
    )
    .toBeLessThan(60);
}
test("hash: Inicio, enlace de Experiencia, atrás, adelante y acceso directo", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Principal", exact: true })
    .getByRole("link", { name: "Experiencia" })
    .click();
  await atSection(page, "experiencia");
  await page.getByRole("link", { name: "Seguimos en contacto" }).click();
  await atSection(page, "contacto");
  await page.goBack();
  await atSection(page, "experiencia");
  await page.goForward();
  await atSection(page, "contacto");
  await page.goto("/#experiencia");
  await atSection(page, "experiencia");
});
test("hash: desde /carta y movimiento reducido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/carta");
  await page
    .getByRole("navigation", { name: "Principal", exact: true })
    .getByRole("link", { name: "Experiencia" })
    .click();
  await atSection(page, "experiencia");
  await page.goto("/carta#mochi");
  await atSection(page, "mochi");
});
