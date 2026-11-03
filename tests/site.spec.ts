import { test, expect } from "@playwright/test";

test("escritorio: portada, navegación, modal y firma", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("nuevo");
  await page.getByRole("link", { name: "Explorar la propuesta" }).click();
  await expect(page).toHaveURL(/#propuesta$/);
  await page.getByRole("button", { name: "Conocer la propuesta" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("dialog")).toContainText(
    "No hay fecha, precio, cupos ni reservas",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Conocer la propuesta" }),
  ).toBeFocused();
  await expect(
    page.getByRole("link", { name: /DESARROLLADO POR NICOLAS AGUIRRES/ }),
  ).toHaveAttribute("href", "https://nicolasaguirrescode.com/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "docs/capturas/escritorio.png",
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("carta: acceso directo, filtros, recarga y regreso", async ({ page }) => {
  await page.goto("/carta");
  await expect(page.locator(".product")).toHaveCount(4);
  await page.getByRole("button", { name: "Pastelería", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Café de especialidad", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Café", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(1);
  await page.getByRole("button", { name: "Todo", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(4);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "muchos sabores",
  );
  await page
    .getByRole("navigation", { name: "Principal", exact: true })
    .getByRole("link", { name: "Experiencia" })
    .click();
  await expect(page.locator("#experiencia")).toBeVisible();
});

test("móvil: menú, cierre con Escape, filtros y captura sin desbordamiento", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menú +" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Principal", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Principal", exact: true })
    .getByRole("link", { name: "Carta", exact: true })
    .focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Principal", exact: true })
    .getByRole("link", { name: "Carta", exact: true })
    .click();
  await expect(page).toHaveURL(/\/carta$/);
  await page.getByRole("button", { name: "Pastelería", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(3);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "docs/capturas/movil.png", fullPage: true });
});

test("anchos adaptables, teclado y recursos locales", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1"))
      external.push(request.url());
  });
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.goto("/carta");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  expect(external).toEqual([]);
});
