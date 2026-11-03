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
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Bienvenidos",
  );
  await page.getByRole("link", { name: "Explorar la carta" }).click();
  await expect(page).toHaveURL(/#carta$/);
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
  await page.locator("img").evaluateAll((images) =>
    Promise.all(
      images.map((img) => {
        img.loading = "eager";
        return img.decode();
      }),
    ),
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: "docs/capturas/escritorio.png",
    fullPage: true,
    animations: "disabled",
  });
  for (const img of await page.locator(".product-selection img").all()) {
    const box = await img.boundingBox();
    expect(box!.height / box!.width).toBeLessThan(1.5);
  }
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
  await expect(page.locator(".product-extended")).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: /primera vez/ }),
  ).toBeVisible();
  await page.locator("img").evaluateAll((images) =>
    Promise.all(
      images.map((img) => {
        img.loading = "eager";
        return img.decode();
      }),
    ),
  );
  await page.screenshot({
    path: "docs/capturas/carta.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Conocé los sabores.",
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
  await page.locator("img").evaluateAll((images) =>
    Promise.all(
      images.map((img) => {
        img.loading = "eager";
        return img.decode();
      }),
    ),
  );
  await page.evaluate(() => scrollTo(0, 0));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "docs/capturas/movil.png",
    fullPage: true,
    animations: "disabled",
  });
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

test("paleta del rediseño: neutros y único acento rojo", async ({ page }) => {
  for (const route of ["/", "/carta"]) {
    await page.goto(route);
    const unexpected = await page.evaluate(() => {
      const invalid = new Set<string>();
      for (const element of document.querySelectorAll("body *")) {
        const style = getComputedStyle(element);
        for (const property of [
          "color",
          "backgroundColor",
          "borderTopColor",
          "borderBottomColor",
          "fill",
          "stroke",
        ]) {
          const value = style.getPropertyValue(
            property.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`),
          );
          const match = value.match(/^rgba?\((\d+), (\d+), (\d+)/);
          if (!match) continue;
          const [r, g, b] = match.slice(1).map(Number);
          if (!(r === g && g === b) && !(r === 197 && g === 22 && b === 36))
            invalid.add(value);
        }
      }
      return [...invalid];
    });
    expect(unexpected).toEqual([]);
  }
});

test("portada gastronómica, selección breve y navegación activa", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menú +" }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Principal", exact: true })
      .getByRole("link", { name: "Inicio" }),
  ).toHaveAttribute("aria-current", "location");
  await page.getByRole("button", { name: "Cerrar −" }).click();
  await expect(page.locator(".hero-visual .visual-image")).toBeVisible();
  expect(
    await page
      .locator(".hero-visual .visual-image")
      .evaluate((img) => img.getBoundingClientRect().top),
  ).toBeLessThan(600);
  await expect(page.locator(".product")).toHaveCount(3);
  await expect(page.locator(".product-featured h3")).toHaveText("Mochi");
  await page.getByRole("button", { name: "Pastelería", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(2);
  await expect(page.getByRole("status")).toContainText("2 propuestas");
  await page.getByRole("link", { name: "Conocé este sabor" }).first().click();
  await expect(page).toHaveURL(/\/carta#mochi$/);
  await expect(page.locator("#mochi")).toBeAttached();
  await expect(
    page.getByRole("heading", { name: "Mochi", exact: true }),
  ).toBeInViewport();
});

test("recursos honestos, foco del modal y movimiento reducido", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.locator(".hero-visual .visual-image").first(),
  ).toHaveAttribute("fetchpriority", "high");
  await expect(
    page.locator(".hero-visual .visual-image").first(),
  ).toHaveAttribute("loading", "eager");
  await expect(
    page.locator(".hero-visual .visual-image").first(),
  ).toHaveAttribute("data-resource-kind", "conceptual");
  await expect(page.locator(".experience-composition img")).toHaveCount(1);
  await expect(page.locator(".experience-composition img")).toHaveAttribute(
    "data-resource-kind",
    "conceptual",
  );
  await expect(page.locator(".experience-composition img")).toHaveAttribute(
    "loading",
    "lazy",
  );
  await page.locator(".experience-main img").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".experience-main img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await expect(page.locator(".draft-note")).toHaveCount(1);
  await expect(page.locator(".draft-note")).toContainText(
    "no productos ni espacios reales",
  );
  await page.getByRole("button", { name: "Pastelería", exact: true }).click();
  expect(
    await page
      .locator(".product-selection")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  const trigger = page.getByRole("button", { name: "Conocer la propuesta" });
  await trigger.click();
  const close = page.getByRole("button", { name: "Cerrar detalle del evento" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("dialog").getByRole("link")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("contraste de lectura y controles", async ({ page }) => {
  await page.goto("/");
  const ratios = await page.evaluate(() => {
    const rgb = (value: string) =>
      value
        .match(/\d+/g)!
        .slice(0, 3)
        .map(Number)
        .map((v) => {
          const n = v / 255;
          return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
        });
    const luminance = (value: string) => {
      const [r, g, b] = rgb(value);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (fg: string, bg: string) => {
      const a = luminance(fg),
        b = luminance(bg);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    const pairs = [
      [".hero-intro", ".hero"],
      [".hero-actions .button", ".hero-actions .button"],
      [".draft-note", ".menu-section"],
      [".poster-copy>p:not(.eyebrow)", ".event-poster"],
      [".contact-action>p", ".contact"],
    ];
    return pairs.map(([text, background]) => {
      const fg = getComputedStyle(document.querySelector(text)!).color;
      let el: Element | null = document.querySelector(background);
      let bg = "rgba(0, 0, 0, 0)";
      while (el && bg === "rgba(0, 0, 0, 0)") {
        bg = getComputedStyle(el).backgroundColor;
        el = el.parentElement;
      }
      return { text, ratio: contrast(fg, bg) };
    });
  });
  for (const item of ratios)
    expect(item.ratio, item.text).toBeGreaterThanOrEqual(4.5);
});
