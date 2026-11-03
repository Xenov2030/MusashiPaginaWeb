import { test, expect } from "@playwright/test";
test("cuatro categorías claras sin productos ni precios inventados", async ({
  page,
}) => {
  await page.goto("/carta");
  for (const category of [
    "Café",
    "Té y blends",
    "Coctelería",
    "Cocina y pastelería japonesa",
  ])
    await expect(
      page.getByRole("button", { name: category, exact: true }),
    ).toBeVisible();
  await page.getByRole("button", { name: "Té y blends", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(0);
  await expect(page.locator(".discipline-sheet")).toContainText("tea blender");
  await expect(page.getByRole("status")).toContainText("0 propuestas");
  await page.getByRole("button", { name: "Coctelería", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(0);
  await expect(page.locator(".discipline-sheet")).toContainText("bartender");
  await expect(page.locator(".price")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Cocina y pastelería japonesa", exact: true })
    .click();
  await expect(page.locator(".product")).toHaveCount(3);
});
test("pétalos limitados, pausa persistente y pausa fuera de pantalla", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".petal")).toHaveCount(6);
  await expect(page.locator(".cherry-tree, .cherry-branch")).toHaveCount(0);
  await expect(page.locator(".ambient")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".ambient")).toHaveCSS("pointer-events", "none");
  await expect(page.locator(".ambient")).toHaveAttribute(
    "data-ambient-state",
    "running",
  );
  await page.getByRole("button", { name: "Pausar pétalos" }).click();
  await expect(page.locator(".petal").first()).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Reanudar pétalos" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Reanudar pétalos" }).click();
  await page.locator("#experiencia").scrollIntoViewIfNeeded();
  await expect(page.locator(".ambient")).toHaveAttribute(
    "data-ambient-state",
    "paused",
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
    "paused",
  );
});
test("móvil y movimiento reducido: composición estática, sin lluvia de pétalos", async ({
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
    page.getByRole("button", { name: "Pausar pétalos" }),
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
test("oficios y encuentros: cada antecedente abre su contexto y devuelve el foco", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Barista", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tea blender", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Bartender", exact: true }),
  ).toBeVisible();
  for (const label of [
    "Conocer onigiris",
    "Conocer tatamis",
    "Conocer la propuesta",
  ]) {
    const opener = page.getByRole("button", { name: label, exact: true });
    await opener.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog")).toContainText(
      "No hay fecha, precio, cupos ni reservas",
    );
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(opener).toBeFocused();
  }
});
