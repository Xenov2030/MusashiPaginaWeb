import { site } from "./content";
import { whatsappContactUrl } from "./reservations";
export type ReservationRoute = "mesa" | "tatami" | "bienestar";
export interface ReservationContacts {
  gastronomiaWhatsApp: string | null;
  tatamiWhatsApp: string | null;
  bienestarWhatsApp: string | null;
}
// No se copian contactos entre equipos. Completar solo números oficiales confirmados, sin +.
export const reservationContacts: ReservationContacts = {
  gastronomiaWhatsApp: null,
  tatamiWhatsApp: null,
  bienestarWhatsApp: null,
};
export const reservationRoutes: Record<
  ReservationRoute,
  {
    title: string;
    description: string;
    contactKey: keyof ReservationContacts;
    message: string;
  }
> = {
  mesa: {
    title: "Mesa en cafetería",
    description:
      "Consultá por una mesa para disfrutar del café y la pastelería de Musashi.",
    contactKey: "gastronomiaWhatsApp",
    message: "Hola Musashi, quisiera consultar por una mesa en cafetería.",
  },
  tatami: {
    title: "Tatami privado",
    description:
      "Un espacio íntimo para una experiencia gastronómica. El propietario está preparando el combo; sus inclusiones y condiciones se confirmarán al consultar.",
    contactKey: "tatamiWhatsApp",
    message:
      "Hola Musashi, quisiera consultar por el tatami privado y la experiencia que están preparando.",
  },
  bienestar: {
    title: "Bienestar",
    description:
      "Una consulta independiente para el espacio holístico y su equipo. Tui Na, acupuntura y Reiki son propuestas mencionadas por el propietario; consultá su disponibilidad.",
    contactKey: "bienestarWhatsApp",
    message: "Hola, quisiera consultar con el equipo de bienestar de Musashi.",
  },
};
export function reservationContact(
  route: ReservationRoute,
  contacts: ReservationContacts = reservationContacts,
) {
  const item = reservationRoutes[route];
  const wa = whatsappContactUrl(contacts[item.contactKey]);
  return {
    href: wa
      ? `${wa}?text=${encodeURIComponent(item.message + " Entiendo que consultar no confirma una reserva.")}`
      : site.instagram,
    channel: wa ? ("whatsapp" as const) : ("instagram" as const),
  };
}
export function topicRoute(topic: string): ReservationRoute {
  return /bienestar|holístic/i.test(topic)
    ? "bienestar"
    : /tatami/i.test(topic)
      ? "tatami"
      : "mesa";
}
