import { test, expect } from "@playwright/test";
const title = "Cada creación, tal como fue concebida";
const policy =
  "Nuestras bebidas se sirven según su receta de autor. No ofrecemos azúcar ni edulcorantes adicionales para agregarles.";
test("el concepto confirmado aparece en portada, metadatos y cierre de marca", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Japón detrás de una puerta",
  );
  await expect(page.locator(".hero-intro")).toHaveText(
    "Una cafetería oculta en Mendoza. Café de especialidad, pastelería japonesa y experiencias para disfrutar sin apuro.",
  );
  await expect(page).toHaveTitle("Musashi · Japón detrás de una puerta");
  await expect(page.locator(".brand-signoff")).toContainText("MUSASHI");
  await expect(page.locator(".brand-signoff")).toContainText(
    "Japón detrás de una puerta",
  );
  await page
    .getByRole("link", { name: "Explorá la carta", exact: true })
    .click();
  await expect(page).toHaveURL(/\/carta$/);
});
test("la historia recorre los tres momentos sin fechas ni primacías no verificadas", async ({
  page,
}) => {
  await page.goto("/#historia");
  const story = page.locator("#historia");
  await expect(story.getByRole("heading", { level: 2 })).toHaveText(
    "Una historia diferente. Una esencia que evoluciona",
  );
  await expect(story.locator("li")).toHaveCount(3);
  await expect(story.locator("li").nth(0)).toContainText("Anime Café");
  await expect(story.locator("li").nth(1)).toContainText(
    "exploración de nuevas propuestas y experiencias",
  );
  await expect(story.locator("li").nth(2)).toContainText(
    "cafetería japonesa oculta",
  );
  await expect(story).not.toContainText(
    /\b(19|20)\d\d\b|\b(primero|primera|pionero|pionera)\b/i,
  );
  await expect(
    page.getByText("El camino cambia, la esencia permanece", { exact: true }),
  ).toHaveCount(1);
});
test("la receta de autor se explica antes de las consultas sin implicar ausencia de azúcar", async ({
  page,
}) => {
  await page.goto("/");
  for (const selector of ["#cafeteria", "#carta"]) {
    const note = page
      .locator(selector)
      .getByRole("complementary", { name: "Política de bebidas" });
    await expect(note.getByRole("heading", { name: title })).toBeVisible();
    await expect(note).toContainText(policy);
    await expect(note).not.toContainText(
      /sin azúcar|apta.*diabet|saludable|más saludable/i,
    );
  }
  await page.goto("/carta");
  const note = page.getByRole("complementary", { name: "Política de bebidas" });
  await expect(note).toContainText(policy);
  expect(
    await page.evaluate(() =>
      Boolean(
        document
          .querySelector(".beverage-policy")!
          .compareDocumentPosition(document.querySelector(".filters")!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Café y creaciones de autor", exact: true })
    .click();
  await expect(note).toBeVisible();
});
