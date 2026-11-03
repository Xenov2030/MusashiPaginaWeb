export interface VisualResource {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "conceptual" | "confirmed";
  position?: string;
  placeholder?: string;
  srcSet?: string;
  sizes?: string;
  source: string;
}
export const conceptualVisuals: Record<
  | "hero"
  | "experience"
  | "ramen"
  | "cafe"
  | "mochi"
  | "dorayaki"
  | "cheesecake",
  VisualResource
> = {
  hero: {
    src: "/images/hero.webp",
    placeholder: "/images/hero-preview.webp",
    srcSet: "/images/hero-small.webp 720w, /images/hero.webp 1200w",
    sizes: "(max-width: 700px) calc(100vw - 44px), 55vw",
    alt: "Ilustración conceptual de café y mochis sobre cerámica; no representa productos reales de Musashi",
    width: 1200,
    height: 800,
    kind: "conceptual",
    source:
      "Generación de imágenes de OpenAI para el boceto; ver docs/RECURSOS.md",
  },
  experience: {
    src: "/images/experience.webp",
    alt: "Ilustración conceptual de una lectura junto a una merienda; no representa el local ni sus instalaciones",
    width: 1200,
    height: 800,
    kind: "conceptual",
    source:
      "Generación de imágenes de OpenAI para el boceto; ver docs/RECURSOS.md",
  },
  ramen: {
    src: "/images/ramen.webp",
    alt: "Ilustración de ramen para un ejemplo de encuentro, sin receta ni disponibilidad confirmadas",
    width: 1200,
    height: 1200,
    kind: "conceptual",
    source:
      "Generación de imágenes de OpenAI para el boceto; ver docs/RECURSOS.md",
  },
  cafe: {
    src: "/images/cafe.webp",
    alt: "Ilustración conceptual de café de especialidad",
    width: 1200,
    height: 1200,
    kind: "conceptual",
    position: "center",
    source:
      "Generación de imágenes de OpenAI para el boceto; ver docs/RECURSOS.md",
  },
  mochi: {
    src: "/images/mochi.webp",
    alt: "Ilustración conceptual de mochis",
    width: 1200,
    height: 1200,
    kind: "conceptual",
    position: "center 56%",
    source:
      "Generación de imágenes de OpenAI para el boceto; ver docs/RECURSOS.md",
  },
  dorayaki: {
    src: "/images/dorayaki.webp",
    alt: "Ilustración conceptual de dorayakis",
    width: 1200,
    height: 1200,
    kind: "conceptual",
    position: "center",
    source:
      "Generación de imágenes de OpenAI para el boceto; ver docs/RECURSOS.md",
  },
  cheesecake: {
    src: "/images/cheesecake.webp",
    alt: "Ilustración conceptual de cheesecake japonés",
    width: 1200,
    height: 1200,
    kind: "conceptual",
    position: "center",
    source:
      "Generación de imágenes de OpenAI para el boceto; ver docs/RECURSOS.md",
  },
};
export const copy = {
  hero: {
    greeting: "Bienvenidos",
    intro: "Café de especialidad, pastelería japonesa y ganas de encontrarnos.",
    stage: "Musashi prepara un nuevo espacio. Las novedades, en Instagram.",
  },
  experience: {
    title: "Algo rico.",
    subtitle: "Una buena charla.",
    body: "Un café puede ser la excusa para descubrir un sabor o empezar una conversación. Esa es la bienvenida que queremos acercarte desde Musashi.",
  },
  menu: {
    title: "¿Qué te gustaría probar?",
    subtitle: "Café y pastelería japonesa, para descubrir a tu ritmo.",
  },
  draftNote:
    "Boceto · Imágenes conceptuales, no productos ni espacios reales de Musashi. Carta y disponibilidad por confirmar.",
  event: {
    intro:
      "Una excusa para sentarnos alrededor de un plato y descubrir otros sabores de Japón.",
    context: "Inspirado en un antecedente de Musashi.",
  },
};
export interface Product {
  id: string;
  name: string;
  category: "Café" | "Pastelería";
  description: string;
  priceARS: number | null;
  detail: string;
  texture: string;
  image?: VisualResource;
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
    heroScene: null as VisualResource | null,
    heroDetail: null as VisualResource | null,
    experienceSpace: null as VisualResource | null,
    experienceDetail: null as VisualResource | null,
    experienceTable: null as VisualResource | null,
  },
  business: {
    address: null as string | null,
    hours: null as string | null,
    reservationConditions: null as string | null,
    whatsapp: null as string | null, // Solo número oficial confirmado, formato internacional sin +.
  },
};
export const demoProducts: Product[] = [
  {
    id: "cafe",
    detail:
      "El café de especialidad pone atención en la calidad y el recorrido del grano. Acercarse a él es descubrir diferencias de aroma, cuerpo y sabor en cada taza.",
    texture: "Aroma, cuerpo y sabor: tres maneras de empezar a conocerlo.",
    image: conceptualVisuals.cafe,
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
      "El mochi es una preparación japonesa que se reconoce por su textura elástica. En su versión dulce puede acompañarse de diferentes rellenos; su particularidad está en cómo se siente cada bocado.",
    texture: "Su particularidad está en la textura suave y elástica.",
    image: conceptualVisuals.mochi,
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
      "El dorayaki reúne dos discos de masa parecidos a pequeños panqueques con un relleno dulce. Es un clásico de la pastelería japonesa: una forma sencilla de acercarse a otros sabores.",
    texture: "Una masa esponjosa que se disfruta bocado a bocado.",
    image: conceptualVisuals.dorayaki,
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
      "El cheesecake japonés es una interpretación ligera y aireada de la torta de queso. Su miga suave lo distingue de otras versiones más densas y lo convierte en otra manera de explorar esta preparación.",
    texture: "Ligero, delicado y de miga aireada.",
    image: conceptualVisuals.cheesecake,
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
