export interface Product {
  id: string;
  name: string;
  category: "Café" | "Pastelería";
  description: string;
  priceARS: number | null;
  image?: string;
  availability: "pending" | "available" | "unavailable";
  confirmedFeatures: string[];
}
export interface CafeEvent {
  title: string;
  description: string;
  image?: string;
  date: string | null;
  time: string | null;
  priceARS: number | null;
  conditions: string[];
  status: "upcoming" | "full" | "finished" | "illustrative";
}
export const site = {
  brand: "MUSASHI",
  draft: true,
  stage: "coming-soon" as "coming-soon" | "open",
  instagram: "https://www.instagram.com/musashi.animecafe/",
  author: { name: "NICOLAS AGUIRRES", url: "https://nicolasaguirrescode.com/" },
  visuals: {
    provisional: true,
    logo: null as string | null,
    spacePhoto: null as string | null,
  },
  business: {
    address: null as string | null,
    hours: null as string | null,
    whatsapp: null as string | null, // Solo número oficial confirmado, formato internacional sin +.
  },
};
export const demoProducts: Product[] = [
  {
    id: "cafe",
    name: "Café de especialidad",
    category: "Café",
    description: "El punto de partida para una pausa con identidad propia.",
    priceARS: null,
    availability: "pending",
    confirmedFeatures: [],
  },
  {
    id: "mochi",
    name: "Mochi",
    category: "Pastelería",
    description: "Un pequeño dulce japonés de textura suave y elástica.",
    priceARS: null,
    availability: "pending",
    confirmedFeatures: [],
  },
  {
    id: "dorayaki",
    name: "Dorayaki",
    category: "Pastelería",
    description: "Dos pequeños discos de masa que abrazan un relleno dulce.",
    priceARS: null,
    availability: "pending",
    confirmedFeatures: [],
  },
  {
    id: "cheesecake",
    name: "Cheesecake japonés",
    category: "Pastelería",
    description:
      "Una versión japonesa de la torta de queso, ligera y esponjosa.",
    priceARS: null,
    availability: "pending",
    confirmedFeatures: [],
  },
];
// Cargar solo productos aprobados por el propietario. No copiar automáticamente los de demostración.
export const confirmedProducts: Product[] = [];
export const demoEvent: CafeEvent = {
  title: "Noche de Ramen",
  description:
    "Una experiencia especial alrededor de un plato que invita a compartir.",
  date: null,
  time: null,
  priceARS: null,
  conditions: [],
  status: "illustrative",
};
export interface ReservationInquiry {
  date: string;
  time: string;
  people: number;
  event?: string;
}
export function reservationLink(inquiry: ReservationInquiry): string | null {
  if (!site.business.whatsapp) return null;
  const message = `Hola Musashi. Quisiera consultar por ${inquiry.people} personas el ${inquiry.date} a las ${inquiry.time}${inquiry.event ? ` para ${inquiry.event}` : ""}. Entiendo que esta consulta no confirma una reserva.`;
  return `https://wa.me/${site.business.whatsapp}?text=${encodeURIComponent(message)}`;
}
