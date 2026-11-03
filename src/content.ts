export interface Product {
  id: string;
  name: string;
  category: "Café" | "Pastelería";
  description: string;
  priceARS: number | null;
  detail: string;
  texture: string;
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
    detail:
      "El café de especialidad pone atención en la calidad y el recorrido del grano. Esta categoría representa uno de los ejes de la propuesta de Musashi; los granos, métodos y bebidas concretas se incorporarán cuando estén confirmados.",
    texture: "Un universo por descubrir, una taza a la vez.",
    image: "/images/cafe.webp",
    name: "Café de especialidad",
    category: "Café",
    description: "Café de especialidad, el comienzo de una buena merienda.",
    priceARS: null,
    availability: "pending",
    confirmedFeatures: [],
  },
  {
    id: "mochi",
    detail:
      "El mochi es una preparación japonesa de textura elástica. En su versión dulce puede acompañarse de diferentes rellenos. La ilustración explora esa forma, pero no confirma un sabor ni una receta de Musashi.",
    texture: "Su particularidad está en la textura suave y elástica.",
    image: "/images/mochi.webp",
    name: "Mochi",
    category: "Pastelería",
    description: "Un dulce japonés pequeño, suave y de textura elástica.",
    priceARS: null,
    availability: "pending",
    confirmedFeatures: [],
  },
  {
    id: "dorayaki",
    detail:
      "El dorayaki reúne dos discos de masa parecidos a pequeños panqueques con un relleno dulce. Es un clásico de la pastelería japonesa y aparece entre los antecedentes de Musashi. Los rellenos de una futura carta requieren confirmación.",
    texture: "Una masa esponjosa que se disfruta bocado a bocado.",
    image: "/images/dorayaki.webp",
    name: "Dorayaki",
    category: "Pastelería",
    description: "Dos discos de masa esponjosa con un corazón dulce.",
    priceARS: null,
    availability: "pending",
    confirmedFeatures: [],
  },
  {
    id: "cheesecake",
    detail:
      "El cheesecake japonés es una interpretación ligera y aireada de la torta de queso. Su textura lo distingue de otras versiones más densas. Se incluye como antecedente ilustrativo, sin afirmar una receta ni disponibilidad actual.",
    texture: "Ligero, delicado y de miga aireada.",
    image: "/images/cheesecake.webp",
    name: "Cheesecake japonés",
    category: "Pastelería",
    description: "La versión japonesa de la torta de queso: suave y aireada.",
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
