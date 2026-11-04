import { test, expect } from "@playwright/test";
async function readyImages(page: import("@playwright/test").Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll((images) =>
    Promise.all(
      images.map((img) => {
        img.loading = "eager";
        return img.decode().catch(() => {});
      }),
    ),
  );
}
test("escritorio: identidad real, experiencia, ampliación de imagen y firma", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Japón detrás de una puerta",
  );
  await expect(page.locator(".header .brand img")).toHaveAttribute(
    "src",
    "/media/musashi/logo.webp",
  );
  await expect(page.locator(".hero-visual .visual-image")).toHaveAttribute(
    "data-resource-kind",
    "confirmed",
  );
  await page.getByRole("link", { name: "Descubrí Musashi" }).click();
  await expect(page).toHaveURL(/#experiencia$/);
  await page
    .getByRole("link", { name: "Explorar la carta", exact: true })
    .click();
  await expect(page).toHaveURL(/\/carta$/);
  const opener = page.getByRole("button", {
    name: "Ampliar gráfica de Vagabond",
  });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Imagen de Vagabond" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveAttribute(
    "src",
    "/media/musashi/vagabond.webp",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(
    page.getByRole("link", { name: /DESARROLLADO POR NICOLAS AGUIRRES/ }),
  ).toHaveAttribute("href", "https://nicolasaguirrescode.com/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  await page.goto("/");
  await readyImages(page);
  await page.screenshot({
    path: "docs/capturas/escritorio.png",
    fullPage: true,
    animations: "disabled",
  });
  expect(errors).toEqual([]);
});
test("carta: recursos aportados, filtros, acceso directo y recarga", async ({
  page,
}) => {
  await page.goto("/carta#taiyaki");
  await expect(page.locator(".product")).toHaveCount(11);
  await expect(page.locator("#taiyaki")).toBeInViewport();
  await page.reload();
  await expect(page.locator("#taiyaki")).toBeInViewport();
  await page
    .getByRole("button", { name: "Café y creaciones de autor", exact: true })
    .click();
  await expect(page.locator(".product")).toHaveCount(6);
  await page.getByRole("button", { name: "Pastelería", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(5);
  await page.getByRole("button", { name: "Todo", exact: true }).click();
  await expect(page.locator(".price")).toHaveCount(0);
  await readyImages(page);
  await page.screenshot({
    path: "docs/capturas/carta.png",
    fullPage: true,
    animations: "disabled",
  });
});
test("móvil: menú accesible y navegación al tatami", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menú +" });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Principal", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Principal", exact: true })
    .getByRole("link", { name: "Tatami", exact: true })
    .click();
  await expect(page.locator("#tatami")).toBeInViewport();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.goto("/");
  await readyImages(page);
  await page.screenshot({
    path: "docs/capturas/movil.png",
    fullPage: true,
    animations: "disabled",
  });
});
test("anchos adaptables, recursos locales y acceso por teclado", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1")) external.push(r.url());
  });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/carta"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Japón detrás",
  );
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  expect(external).toEqual([]);
});
test("consultas diferenciadas, sin agenda ficticia ni dirección pública", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of [
    "Consultar por el tatami",
    "Consultar por bienestar",
    "Consultar por las cenas",
  ])
    await expect(page.getByRole("link", { name, exact: true })).toHaveAttribute(
      "href",
      "https://www.instagram.com/musashi.animecafe/",
    );
  await expect(page.locator("#agenda")).toContainText(
    "Todavía no hay encuentros publicados",
  );
  await expect(page.locator(".featured-event,.event-archive")).toHaveCount(0);
  await expect(page.locator('iframe[src*="maps"]')).toHaveCount(0);
  await expect(page.locator("#reservas")).toContainText(
    "la dirección se comparte por WhatsApp al confirmar",
  );
  await expect(page.locator(".pet-friendly").first()).toContainText(
    "Pet friendly",
  );
});
test("el video no inspeccionado en audio permanece archivado y sin descarga", async ({
  page,
}) => {
  const videos: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes(".mp4")) videos.push(r.url());
  });
  await page.goto("/");
  await expect(page.locator(".brand-film,video")).toHaveCount(0);
  expect(videos).toEqual([]);
});
test("contraste de lectura, controles y espacios diferenciados", async ({
  page,
}) => {
  await page.goto("/");
  const ratios = await page.evaluate(() => {
    const lum = (value: string) => {
      const a = value
        .match(/\d+/g)!
        .slice(0, 3)
        .map(Number)
        .map((v) => {
          const n = v / 255;
          return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
        });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    };
    return [
      [".hero-intro", ".hero-paper"],
      [".essence-copy>p:not(.lead)", ".essence"],
      [".craft-list article p", ".coffee-intro"],
      [".tatami-copy>p:not(.eyebrow)", ".tatami-story"],
      [".wellbeing-copy>p:not(.eyebrow)", ".wellbeing-story"],
      [".private-address p", ".reservations"],
      [".whatsapp-bubble", ".whatsapp-bubble"],
    ].map(([selector, background]) => {
      const fg = lum(getComputedStyle(document.querySelector(selector)!).color);
      const bg = lum(
        getComputedStyle(document.querySelector(background)!).backgroundColor,
      );
      return {
        selector,
        ratio: (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05),
      };
    });
  });
  for (const pair of ratios)
    expect(pair.ratio, pair.selector).toBeGreaterThanOrEqual(4.5);
});
