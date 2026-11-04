import { media, suppliedVisuals } from "./media";
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
  format?: "photo" | "graphic";
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
    title: "Japón detrás de una puerta",
    headline: ["Japón detrás", "de una puerta"],
    intro:
      "Una cafetería oculta en Mendoza. Café de especialidad, pastelería japonesa y experiencias para disfrutar sin apuro.",
    stage: "",
  },
  menu: {
    title: "Creaciones de Musashi",
    subtitle: "Café de autor y pastelería japonesa.",
  },
  draftNote:
    "Creaciones documentadas por Musashi. Consultá disponibilidad actual, ingredientes y precios.",
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
  alcohol?: "indicated" | "not-stated";
  transcription?: "legible" | "not-provided";
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
  stage: "unconfirmed" as "coming-soon" | "open" | "unconfirmed",
  instagram: "https://www.instagram.com/musashi.animecafe/",
  author: { name: "NICOLAS AGUIRRES", url: "https://nicolasaguirrescode.com/" },
  owner: {
    name: null as string | null,
    portrait: null as VisualResource | null,
  },
  visuals: {
    provisional: true,
    logo: media.logo as string | null,
    heroScene: media.portada as VisualResource | null,
    heroDetail: null as VisualResource | null,
    experienceSpace: null as VisualResource | null,
    experienceDetail: null as VisualResource | null,
    experienceTable: null as VisualResource | null,
  },
  business: {
    addressPrivate: true,
    petFriendly: true,
    hours: null as string | null,
    reservationConditions: null as string | null,
    whatsapp: "5492615349682" as string | null, // Número personal autorizado para pruebas.
    whatsappTest: true,
  },
};
const suppliedProduct = (
  id: string,
  name: string,
  category: Category,
  image: VisualResource,
  description: string,
  alcohol: Product["alcohol"] = "not-stated",
  transcription: Product["transcription"] = "not-provided",
): Product => ({
  id,
  name,
  category,
  image,
  description,
  alcohol,
  transcription,
  detail:
    "Creación documentada en el material de Musashi. Consultá disponibilidad y precios.",
  texture: "Consultá ingredientes y alérgenos antes de pedir.",
  priceARS: null,
  availability: "pending",
  confirmedFeatures: [],
});
export const suppliedProducts: Product[] = [
  suppliedProduct(
    "pasteleria",
    "Porción rectangular de pastelería",
    "Pastelería",
    suppliedVisuals.pastry,
    "Nombre comercial y elaboración por confirmar con Musashi.",
  ),
  suppliedProduct(
    "vagabond",
    "Vagabond",
    "Café y creaciones de autor",
    suppliedVisuals.vagabond,
    "Doble espresso, leche, crema de leche, chocolate blanco y touch de licor de dulce de leche.",
    "indicated",
    "legible",
  ),
  suppliedProduct(
    "taiyaki",
    "Taiyaki Red Velvet",
    "Pastelería",
    suppliedVisuals.taiyaki,
    "Taiyaki Red Velvet, una creación de Musashi. Consultá su elaboración y disponibilidad.",
  ),
  suppliedProduct(
    "samurai",
    "Samurai Coffee",
    "Café y creaciones de autor",
    suppliedVisuals.samurai,
    "Doble espresso, leche, crema de leche y un touch de licor de chocolate con menta.",
    "indicated",
    "legible",
  ),
  suppliedProduct(
    "red-dragon",
    "Red Dragon",
    "Café y creaciones de autor",
    suppliedVisuals.redDragon,
    "Espresso, red velvet, frambuesa, licor de chocolate blanco y leche texturizada.",
    "indicated",
    "legible",
  ),
  suppliedProduct(
    "bubble-yakuza",
    "Bubble Yakuza",
    "Café y creaciones de autor",
    suppliedVisuals.bubble,
    "Latte de vainilla cremosa con perlas de tapioca caramelizadas.",
    "not-stated",
    "legible",
  ),
  suppliedProduct(
    "praline-negro",
    "Praliné Negro",
    "Café y creaciones de autor",
    suppliedVisuals.praline,
    "Leche texturizada, sésamo negro, praliné de maní, caramelo, miel y vainilla.",
    "not-stated",
    "legible",
  ),
  suppliedProduct(
    "midori-kensei",
    "Midori Kensei",
    "Café y creaciones de autor",
    suppliedVisuals.midori,
    "Latte con chocolate blanco & touch de licor de pistacho.",
    "indicated",
    "legible",
  ),
  suppliedProduct(
    "panda",
    "Pieza con forma de panda",
    "Pastelería",
    suppliedVisuals.panda,
    "Título descriptivo provisional. Consultá el nombre y la elaboración con el equipo.",
  ),
  suppliedProduct(
    "totoro",
    "Piezas inspiradas en Totoro",
    "Pastelería",
    suppliedVisuals.characters,
    "Una elaboración de la marca, presentada entera y cortada. Nombre comercial e ingredientes por confirmar.",
  ),
  suppliedProduct(
    "gato",
    "Pieza con forma de gato",
    "Pastelería",
    suppliedVisuals.cat,
    "Título descriptivo provisional. Consultá el nombre y la elaboración con el equipo.",
  ),
];
export const confirmedProducts = suppliedProducts;
export const demoProducts: Product[] = [];
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
export type Category =
  "Café y creaciones de autor" | "Té y blends" | "Coctelería" | "Pastelería";
export const categories: Category[] = [
  "Café y creaciones de autor",
  "Té y blends",
  "Coctelería",
  "Pastelería",
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

export const hospitality = {
  reservations: {
    title: "Guardá un lugar en la mesa.",
    intro:
      "Elegí una fecha y un horario deseados. La solicitud continúa por WhatsApp y Musashi confirma los detalles en la conversación.",
    privateAddress:
      "Un poquito de misterio: la dirección se comparte por WhatsApp al confirmar tu reserva.",
    confirmation:
      "Enviar una solicitud no confirma una reserva. Musashi te responderá por WhatsApp.",
  },
  holistic: {
    title: "Un pequeño espacio para el bienestar.",
    description:
      "Musashi también cuenta con un espacio holístico acompañado por sus colaboradoras. Consultá las propuestas y los encuentros por nuestro canal de contacto.",
  },
};

// Relato y política suministrados por el propietario. No implican afirmaciones dietéticas.
export const beveragePolicy = {
  title: "Cada creación, tal como fue concebida",
  text: "Nuestras bebidas se sirven según su receta de autor. No ofrecemos azúcar ni edulcorantes adicionales para agregarles",
};
export const ownerStory = {
  title: "Una historia diferente. Una esencia que evoluciona",
  moments: [
    {
      title: "El origen",
      text: "Musashi nació con una idea: crear algo diferente. Sus primeros pasos como Anime Café abrieron un espacio para compartir la pasión por la cultura japonesa.",
    },
    {
      title: "La exploración",
      text: "El camino continuó con la exploración de nuevas propuestas y experiencias.",
    },
    {
      title: "Una nueva etapa",
      text: "Hoy esa historia continúa como cafetería japonesa oculta, con una propuesta que reúne cafetería de autor, pastelería japonesa, cenas, un tatami privado y experiencias de bienestar.",
    },
  ],
  closing: "El camino cambia, la esencia permanece",
};
