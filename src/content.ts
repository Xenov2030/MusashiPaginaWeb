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
    src: "/images/mesa.webp",
    placeholder: "/images/mesa-preview.webp",
    srcSet: "/images/mesa-small.webp 720w, /images/mesa.webp 1400w",
    sizes: "(max-width: 700px) calc(100vw - 44px), 84vw",
    alt: "Escena ilustrada de mesa, carta y bebidas; interpretación conceptual, no un registro del local",
    width: 1400,
    height: 933,
    kind: "conceptual",
    source:
      "Generación de imágenes de OpenAI para el boceto; ver docs/RECURSOS.md",
  },
  experience: {
    src: "/images/oficio.webp",
    alt: "Composición ilustrada sobre café, té y coctelería; no documenta herramientas ni productos de Musashi",
    width: 1122,
    height: 1402,
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
    headline: ["Hay un lugar", "para vos en"],
    intro:
      "Café de especialidad, té y coctelería con inspiración japonesa. Tomate un ratito.",
    stage: "Musashi prepara un nuevo espacio. Las novedades, en Instagram.",
  },
  menu: {
    title: "Elegí algo rico.",
    subtitle: "Café, té, coctelería y sabores de Japón.",
  },
  draftNote: "Boceto · Imágenes conceptuales y contenido sujeto a confirmación",
};
export interface Product {
  id: string;
  name: string;
  category: Category;
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
  owner: {
    name: null as string | null,
    portrait: null as VisualResource | null,
  },
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
    category: "Cocina y pastelería japonesa",
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
    category: "Cocina y pastelería japonesa",
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
    category: "Cocina y pastelería japonesa",
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

export type Category =
  "Café" | "Té y blends" | "Coctelería" | "Cocina y pastelería japonesa";
export const categories: Category[] = [
  "Café",
  "Té y blends",
  "Coctelería",
  "Cocina y pastelería japonesa",
];
export const disciplines = {
  "Té y blends": {
    title: "El té también tiene su oficio.",
    description:
      "Un tea blender trabaja en la creación y combinación de mezclas de té. Esta especialidad forma parte de la propuesta del propietario de Musashi.",
    note: "Los blends y la selección de carta quedan por confirmar.",
  },
  Coctelería: {
    title: "Otra mirada sobre las bebidas.",
    description:
      "La coctelería suma el oficio de bartender a Musashi: una manera de pensar el equilibrio y la presentación de una bebida.",
    note: "La selección de cócteles queda por confirmar.",
  },
};
export const craft = [
  {
    title: "Barista",
    description:
      "El café de especialidad, desde la mirada de un barista profesional. Atención a lo que sucede en cada taza.",
  },
  {
    title: "Tea blender",
    description:
      "Crear y combinar mezclas de té: un oficio que invita a descubrir aromas y matices.",
  },
  {
    title: "Bartender",
    description:
      "La coctelería como otra forma de pensar una bebida, su equilibrio y su presentación.",
  },
];
export const encounters = [
  {
    id: "onigiris",
    title: "Noches de onigiris",
    description:
      "La gastronomía japonesa como motivo de encuentro. Un antecedente de la propuesta de Musashi.",
    detail:
      "Las noches de onigiris forman parte de los antecedentes de encuentros de Musashi. Esta nota presenta esa experiencia como referencia.",
  },
  {
    id: "tatamis",
    title: "Encuentros en tatamis",
    description:
      "Otra manera de reunirse alrededor de la mesa. Una experiencia mencionada entre los antecedentes.",
    detail:
      "Los encuentros en tatamis forman parte de sus antecedentes. Esta referencia no describe el espacio ni la disposición del nuevo local.",
  },
  {
    id: "ramen",
    title: "Noche de Ramen",
    description:
      "Una invitación a descubrir sabores de Japón alrededor de un plato.",
    detail:
      "Noche de Ramen forma parte de los antecedentes conocidos de Musashi. Esta presentación no anuncia un encuentro próximo.",
  },
];
export const historicalContext = {
  enabled: false,
  verified: false,
  title: "El nombre y su historia",
  paragraphs: [] as string[],
  sources: [] as { title: string; url: string }[],
};
