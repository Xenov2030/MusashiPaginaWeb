import { test, expect } from "@playwright/test";

test("portada lenta: contenido y navegación disponibles, revelado al cargar", async ({
  page,
}) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/media/musashi/pasteleria*.webp", async (route) => {
    if (!route.request().url().includes("pasteleria-preview")) await gate;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".hero-visual .visual").first()).toHaveAttribute(
    "data-visual-state",
    "loading",
  );
  await expect
    .poll(() =>
      page
        .locator(".hero-visual .visual-preview")
        .evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0),
    )
    .toBe(true);
  await page.getByRole("link", { name: "Descubrí Musashi" }).click();
  await expect(page.locator("#experiencia")).toBeInViewport();
  release();
  const image = page.locator(".hero-visual .visual-image").first();
  await expect(page.locator(".hero-visual .visual").first()).toHaveAttribute(
    "data-visual-state",
    "ready",
  );
  await expect
    .poll(() => image.evaluate((el) => el.getAnimations().length))
    .toBeGreaterThan(0);
  await image.evaluate(async (el) => {
    await Promise.all(el.getAnimations().map((a) => a.finished));
  });
  await expect(image).toHaveCSS("opacity", "1");
  await expect(image).toHaveCSS("clip-path", "none");
});

test("fallo de imagen: alternativa visible y controles utilizables", async ({
  page,
}) => {
  await page.route("**/media/musashi/pasteleria*.webp", (route) =>
    route.request().url().includes("pasteleria-preview")
      ? route.continue()
      : route.abort(),
  );
  await page.goto("/");
  await expect(page.locator(".hero-visual .visual").first()).toHaveAttribute(
    "data-visual-state",
    "error",
  );
  await expect(page.locator(".hero-visual .visual-error")).toBeVisible();
  await expect(page.locator(".hero-visual .visual-error")).toContainText(
    "Café, Japón y Musashi.",
  );
  await page.getByRole("link", { name: "Descubrí Musashi" }).click();
  await expect(page.locator("#experiencia")).toBeInViewport();
});

test("revelado único, filtros con foco y recorrido grabado", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: "test-results/motion-video",
      size: { width: 1280, height: 800 },
    },
  });
  const page = await context.newPage();
  const video = page.video()!;
  try {
    await page.goto("http://127.0.0.1:4173/");
    await expect(page.locator(".hero-visual .visual").first()).toHaveAttribute(
      "data-visual-state",
      "ready",
    );
    // Pausas deliberadas para que la grabación muestre entradas y transiciones completas.
    await page.waitForTimeout(1100);
    await page
      .getByRole("button", { name: "Pausar ambiente", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Reanudar ambiente", exact: true })
      .click();
    await page.waitForTimeout(350);

    await page.waitForTimeout(450);
    await page.locator("#carta").scrollIntoViewIfNeeded();
    await page.waitForTimeout(750);
    const filter = page.getByRole("button", {
      name: "Pastelería",
      exact: true,
    });
    await filter.focus();
    await filter.press("Enter");
    await expect(filter).toBeFocused();
    await expect(page.getByRole("status")).toContainText("2 propuestas");
    await page.waitForTimeout(650);
    await page.getByRole("button", { name: "Todo", exact: true }).click();
    await page.waitForTimeout(500);
    await page.locator("#experiencia").scrollIntoViewIfNeeded();
    await expect(page.locator(".essence-copy")).toHaveAttribute(
      "data-motion-visited",
      "true",
    );
    await page.waitForTimeout(800);
    await page.locator("#tatami").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator("#bienestar").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.locator("#experiencia").scrollIntoViewIfNeeded();
    expect(
      await page
        .locator(".essence-copy")
        .evaluate((el) => el.getAnimations().length),
    ).toBe(0);
    await page.waitForTimeout(500);
  } finally {
    await context.close();
    await video.saveAs("docs/grabaciones/recorrido.webm");
  }
});

test("sin JavaScript: bienvenida y contacto de respaldo", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Japón detrás de una puerta",
  );
  await expect(
    page.getByRole("link", { name: "Ir al Instagram oficial" }),
  ).toHaveAttribute("href", "https://www.instagram.com/musashi.animecafe/");
  await context.close();
});
