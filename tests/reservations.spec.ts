import { test, expect } from "@playwright/test";
import {
  reservationContact,
  type ReservationContacts,
} from "../src/reservation-config";
import { buildReservationUrl, todayInMendoza } from "../src/reservations";
import { parseOfficialEvents } from "../src/events";
test("tres recorridos diferenciados con Instagram provisional explícito", async ({
  page,
}) => {
  await page.goto("/#reservas");
  await expect(page.locator(".header-reservations")).toContainText("Reservas");
  for (const [name, text] of [
    ["Mesa en cafetería", "una mesa"],
    ["Tatami privado", "preparando el combo"],
    ["Bienestar", "consulta independiente"],
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator(".reservation-route")).toContainText(
      new RegExp(text, "i"),
    );
    const cta = page
      .locator(".reservation-route")
      .getByRole("link", { name: "Consultar por Instagram" });
    await expect(cta).toHaveAttribute(
      "href",
      "https://www.instagram.com/musashi.animecafe/",
    );
    await expect(page.locator(".contact-pending")).toContainText(
      "Instagram oficial",
    );
    await expect(page.locator(".reservation-clarification")).toContainText(
      "no confirma una reserva",
    );
  }
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  await expect(page.locator('iframe[src*="maps"]')).toHaveCount(0);
});
test("contactos separados y ausencia de herencia entre equipos", () => {
  const contacts: ReservationContacts = {
    gastronomiaWhatsApp: "5491111111111",
    tatamiWhatsApp: null,
    bienestarWhatsApp: "5492222222222",
  };
  expect(new URL(reservationContact("mesa", contacts).href).pathname).toBe(
    "/5491111111111",
  );
  expect(reservationContact("tatami", contacts).channel).toBe("instagram");
  expect(new URL(reservationContact("bienestar", contacts).href).pathname).toBe(
    "/5492222222222",
  );
  expect(
    reservationContact("mesa", {
      ...contacts,
      gastronomiaWhatsApp: "número pendiente",
    }).channel,
  ).toBe("instagram");
  expect(
    reservationContact("bienestar", { ...contacts, bienestarWhatsApp: null })
      .channel,
  ).toBe("instagram");
  expect(
    decodeURIComponent(reservationContact("bienestar", contacts).href),
  ).toContain("equipo de bienestar");
});
test("un encuentro confirmado conserva su contexto en el recorrido de cafetería", async ({
  page,
}) => {
  await page.route("**/api/events", (route) =>
    route.fulfill({
      json: [
        {
          id: "encuentro-1",
          title: "Encuentro confirmado",
          description: "Descripción publicada",
          date: "2099-11-20",
          time: "23:00",
          status: "upcoming",
          priceARS: null,
          conditions: [],
        },
      ],
    }),
  );
  await page.goto("/");
  await page.getByRole("link", { name: "Solicitar lugar" }).click();
  await expect(page.locator(".reservation-event")).toContainText(
    "Encuentro confirmado",
  );
  await expect(page.locator(".reservation-route")).toContainText("2099-11-20");
  await expect(
    page.getByRole("button", { name: "Mesa en cafetería", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("validación de agenda y enlaces de WhatsApp conserva privacidad y fechas", () => {
  const parsed = parseOfficialEvents([
    {
      id: "evento",
      title: "Encuentro",
      description: "",
      date: "2099-11-20",
      time: "23:00",
      status: "upcoming",
      priceARS: null,
      conditions: [],
      address: "NO PUBLICAR",
    },
  ]);
  expect(parsed[0]).not.toHaveProperty("address");
  expect(
    buildReservationUrl(null, { date: "2099-11-20", time: "23:00", people: 2 }),
  ).toBeNull();
  expect(todayInMendoza(new Date("2026-11-04T01:00:00Z"))).toBe("2026-11-03");
});
