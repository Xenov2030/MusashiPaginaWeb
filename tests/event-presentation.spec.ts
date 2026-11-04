import { test, expect } from "@playwright/test";
import { parseOfficialEvents } from "../src/events";
const base = {
  description: "Encuentro publicado por el propietario",
  time: "20:30",
  status: "upcoming",
  priceARS: null,
  conditions: [],
  imageUrl: "https://images.example.com/event.webp",
};
test("burbuja de WhatsApp visible en ambas páginas y sin enviar mensajes", async ({
  page,
}) => {
  for (const path of ["/", "/carta"]) {
    await page.goto(path);
    const bubble = page.getByRole("link", {
      name: "Abrir WhatsApp de prueba — contacto de Nicolas",
    });
    await expect(bubble).toBeVisible();
    await expect(bubble).toHaveCSS("position", "fixed");
    await expect(bubble).toHaveAttribute(
      "href",
      /^https:\/\/wa.me\/5492615349682\?text=/,
    );
    await expect(bubble).toContainText("DE PRUEBA");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(bubble).toBeInViewport();
  }
});
test("el próximo evento usa su imagen y los anteriores forman un carrusel", async ({
  page,
}) => {
  await page.route("https://images.example.com/**", (route) =>
    route.fulfill({ status: 404 }),
  );
  await page.route("**/api/events", (route) =>
    route.fulfill({
      json: [
        {
          ...base,
          id: "futuro",
          title: "El próximo encuentro",
          date: "2099-01-01",
        },
        {
          ...base,
          id: "viejo-1",
          title: "Primer encuentro anterior",
          date: "2026-01-01",
        },
        {
          ...base,
          id: "viejo-2",
          title: "Segundo encuentro anterior",
          date: "2026-02-01",
        },
      ],
    }),
  );
  await page.goto("/");
  await expect(page.locator(".featured-event")).toContainText(
    "El próximo encuentro",
  );
  await expect(page.locator(".featured-event")).toContainText(
    "1 de enero de 2099",
  );
  await page.locator(".featured-event").scrollIntoViewIfNeeded();
  await expect(page.locator(".featured-event img")).toHaveAttribute(
    "src",
    "/images/ramen.webp",
  );
  await expect(page.locator(".featured-event figcaption")).toContainText(
    "CONCEPTUAL",
  );
  const carousel = page.getByRole("region", {
    name: "Imágenes de encuentros anteriores",
  });
  await carousel.scrollIntoViewIfNeeded();
  await expect(
    carousel.getByRole("heading", { name: "Segundo encuentro anterior" }),
  ).toBeVisible();
  await carousel.getByRole("button", { name: "Imagen siguiente" }).click();
  await expect(
    carousel.getByRole("heading", { name: "Primer encuentro anterior" }),
  ).toBeVisible();
  await expect(carousel.getByRole("link")).toHaveCount(0);
  await expect(carousel.getByRole("button")).toHaveCount(2);
});
test("una imagen válida del propietario se muestra en la promoción", async ({
  page,
}) => {
  await page.route("https://images.example.com/**", (route) =>
    route.fulfill({
      path: "public/images/ramen.webp",
      contentType: "image/webp",
    }),
  );
  await page.route("**/api/events", (route) =>
    route.fulfill({
      json: [
        {
          ...base,
          id: "promocion",
          title: "Encuentro con imagen",
          date: "2099-01-01",
        },
      ],
    }),
  );
  await page.goto("/");
  await expect(page.locator(".featured-event")).toContainText(
    "Encuentro con imagen",
  );
  await page.locator(".featured-event").scrollIntoViewIfNeeded();
  await expect(page.locator(".featured-event img")).toHaveAttribute(
    "src",
    base.imageUrl,
  );
  await expect(page.locator(".featured-event figcaption")).toHaveText(
    "IMAGEN PUBLICADA POR MUSASHI",
  );
  await expect
    .poll(
      async () =>
        await page
          .locator(".featured-event img")
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
    )
    .toBe(true);
});
test("el carrusel avanza automáticamente y respeta movimiento reducido", async ({
  page,
}) => {
  await page.route("**/api/events", (route) =>
    route.fulfill({
      json: [1, 2, 3].map((i) => ({
        ...base,
        id: `archivo-${i}`,
        title: `Encuentro ${i}`,
        date: `2026-0${i}-01`,
        status: "finished",
        imageUrl: null,
      })),
    }),
  );
  await page.clock.install();
  await page.goto("/");
  const carousel = page.locator(".event-archive");
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(carousel.locator(".archive-slide:visible")).toHaveAttribute(
    "aria-label",
    "1 de 3",
  );
  await expect(carousel).toHaveAttribute("data-carousel-state", "running");
  await page.clock.runFor(6500);
  await expect(carousel.locator(".archive-slide:visible")).toHaveAttribute(
    "aria-label",
    "2 de 3",
  );
  await carousel.getByRole("button", { name: "Imagen siguiente" }).click();
  await expect(carousel.locator(".archive-slide:visible")).toHaveAttribute(
    "aria-label",
    "3 de 3",
  );
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
  });
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute("data-carousel-state", "running");
  await page.clock.runFor(6500);
  await expect(carousel.locator(".archive-slide:visible")).toHaveAttribute(
    "aria-label",
    "1 de 3",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(carousel).toHaveAttribute("data-carousel-state", "reduced");
  await page.clock.runFor(13000);
  await expect(carousel.locator(".archive-slide:visible")).toHaveAttribute(
    "aria-label",
    "1 de 3",
  );
  await expect(
    carousel.getByRole("button", { name: "Pausar carrusel" }),
  ).toHaveCount(0);
});
test("las imágenes de agenda solo aceptan URL HTTPS públicas", () => {
  const event = { ...base, id: "test", title: "Encuentro", date: "2099-01-01" };
  expect(parseOfficialEvents([event])[0].imageUrl).toBe(base.imageUrl);
  for (const imageUrl of [
    "javascript:alert(1)",
    "data:image/png;base64,abc",
    "https://usuario:clave@example.com/foto.jpg",
  ])
    expect(
      parseOfficialEvents([{ ...event, imageUrl }])[0].imageUrl,
    ).toBeNull();
});
