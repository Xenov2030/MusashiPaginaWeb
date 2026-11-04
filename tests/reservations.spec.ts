import { test, expect } from "@playwright/test";
import { buildReservationUrl, todayInMendoza } from "../src/reservations";
import { parseOfficialEvents } from "../src/events";
const event = {
  id: "encuentro-1",
  title: "Encuentro de prueba",
  description: "Texto público",
  date: "2099-11-20",
  time: "23:00",
  status: "upcoming",
  priceARS: null,
  conditions: [],
};
test("solicitud abre únicamente el compositor de prueba con los datos elegidos", async ({
  page,
}) => {
  await page.goto("/#reservas");
  await expect(page.locator(".test-notice")).toContainText("no al local");
  await page.evaluate(() => {
    (window as any).__opened = "";
    window.open = ((url: any) => {
      (window as any).__opened = String(url);
      return null;
    }) as any;
  });
  await page.getByLabel("Fecha deseada").fill("2099-11-20");
  await page.getByLabel("Horario deseado").fill("20:30");
  await page.getByLabel("Cantidad de personas").fill("3");
  await page.getByLabel("Voy con mi mascota").check();
  await page.getByRole("button", { name: "Solicitar por WhatsApp" }).click();
  const url = new URL(await page.evaluate(() => (window as any).__opened));
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/5492615349682");
  expect(url.searchParams.get("text")).toContain("PRUEBA DE RESERVA");
  expect(url.searchParams.get("text")).toContain("Personas: 3");
  expect(url.searchParams.get("text")).toContain("Voy con mi mascota");
  expect(url.searchParams.get("text")).toContain("por este chat al confirmar");
  await expect(page.locator(".reservation-feedback")).toContainText(
    "aún no está confirmada",
  );
  await expect(page.locator('iframe[src*="maps"]')).toHaveCount(0);
});
test("agenda solo permite solicitar encuentros futuros disponibles y preselecciona fecha", async ({
  page,
}) => {
  await page.route("**/api/events", (route) =>
    route.fulfill({
      json: [
        event,
        { ...event, id: "completo", title: "Sin lugares", status: "full" },
        { ...event, id: "pasado", title: "Anterior", date: "2020-01-01" },
      ],
    }),
  );
  await page.goto("/");
  await expect(page.locator(".agenda-card")).toHaveCount(3);
  await expect(
    page
      .locator(".agenda-card")
      .filter({ hasText: "Sin lugares" })
      .getByRole("link"),
  ).toHaveCount(0);
  await expect(
    page
      .locator(".agenda-card")
      .filter({ hasText: "Anterior" })
      .getByRole("link"),
  ).toHaveCount(0);
  await page.getByRole("link", { name: "Solicitar lugar" }).click();
  await expect(page.getByLabel("Fecha deseada")).toHaveValue(event.date);
  await expect(page.getByLabel("Horario deseado")).toHaveValue("23:00");
  await expect(page.getByLabel("Fecha deseada")).toHaveAttribute(
    "readonly",
    "",
  );
});
test("validación de agenda conserva encuentros nocturnos y elimina datos privados", () => {
  const parsed = parseOfficialEvents([
    { ...event, address: "NO PUBLICAR", guests: ["privado"] },
  ]);
  expect(parsed[0].time).toBe("23:00");
  expect(parsed[0]).not.toHaveProperty("address");
  expect(parsed[0]).not.toHaveProperty("guests");
  expect(() =>
    parseOfficialEvents([{ ...event, date: "2099-02-30" }]),
  ).toThrow();
  expect(
    buildReservationUrl(null, {
      date: event.date,
      time: event.time,
      people: 2,
    }),
  ).toBeNull();
  expect(todayInMendoza(new Date("2026-11-04T01:00:00Z"))).toBe("2026-11-03");
});
test("error de agenda permite continuar con consultas generales", async ({
  page,
}) => {
  await page.route("**/api/events", (route) =>
    route.fulfill({ status: 503, json: { error: "unavailable" } }),
  );
  await page.goto("/");
  await expect(page.locator("#agenda")).toContainText("No pudimos consultar");
  await expect(
    page.getByRole("button", { name: "Solicitar por WhatsApp" }),
  ).toBeEnabled();
});
