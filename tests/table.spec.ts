import { test, expect } from "@playwright/test";
test("la carta separa propuestas aportadas y especialidades del propietario", async ({
  page,
}) => {
  await page.goto("/carta");
  for (const name of [
    "Café y creaciones de autor",
    "Pastelería",
    "Té y blends",
    "Coctelería",
  ])
    await expect(page.getByRole("button", { name, exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Té y blends", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(0);
  await expect(page.locator(".discipline-sheet")).toContainText("tea blender");
  await page.getByRole("button", { name: "Coctelería", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(0);
  await expect(page.locator(".discipline-sheet")).toContainText("bartender");
  await expect(page.locator(".filters")).not.toContainText("Reiki");
});
test("pétalos automáticos sin botón ni interrupción al salir de la portada", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".petal")).toHaveCount(6);
  await expect(page.locator(".ambient")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".ambient")).toHaveCSS("pointer-events", "none");
  await expect(page.locator(".cherry-tree")).toHaveCount(0);
  await expect(page.locator(".ambient-pause-icon")).toHaveCount(0);
  await expect(page.locator(".petal").first()).toHaveCSS(
    "animation-iteration-count",
    "infinite",
  );
  await page.locator("#cafeteria").scrollIntoViewIfNeeded();
  await expect(page.locator(".ambient")).toHaveAttribute(
    "data-ambient-state",
    "running",
  );
  await page.locator("#inicio").scrollIntoViewIfNeeded();
  await expect(page.locator(".ambient")).toHaveAttribute(
    "data-ambient-state",
    "running",
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".ambient")).toHaveAttribute(
    "data-ambient-state",
    "running",
  );
});
test("movimiento reducido y móvil: decoración estática y sin control innecesario", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".ambient")).toHaveAttribute(
    "data-ambient-state",
    "reduced",
  );
  await expect(
    page.getByRole("button", { name: "Pausar ambiente" }),
  ).toHaveCount(0);
  await expect(page.locator(".petal").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".petal").nth(3)).toHaveCSS("display", "none");
  await expect(
    page.getByRole("heading", { name: "El nombre y su historia" }),
  ).toHaveCount(0);
});
test("tatami privado y bienestar respetan el modelo sin inventar condiciones", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#tatami")).toContainText("espacio privado");
  await expect(page.locator("#tatami")).toContainText("ambiente íntimo");
  await expect(page.locator("#tatami")).toContainText("Composición conceptual");
  await expect(page.locator("#tatami")).not.toContainText(
    /capacidad|tarifa|personas|por hora/i,
  );
  for (const name of ["Masajes Tui Na", "Acupuntura", "Reiki"])
    await expect(page.locator("#bienestar")).toContainText(name);
  await expect(page.locator("#bienestar")).not.toContainText(
    /curación|cura|garantiz|certificad/i,
  );
  for (const name of ["Barista", "Tea blender", "Bartender"])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
});
