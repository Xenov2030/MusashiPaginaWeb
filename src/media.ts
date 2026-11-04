import type { VisualResource } from "./content";
const source =
  "Material proporcionado por el cliente en WhatsApp Image 2026-11-03 at 11.42.25 PM.zip; ver docs/RECURSOS.md";
function resource(
  name: string,
  alt: string,
  width: number,
  height: number,
  format: "photo" | "graphic" = "photo",
): VisualResource {
  return {
    src: `/media/musashi/${name}.webp`,
    srcSet: `/media/musashi/${name}-small.webp 540w, /media/musashi/${name}.webp ${width}w`,
    sizes: "(max-width: 700px) calc(100vw - 44px), 45vw",
    alt,
    width,
    height,
    kind: "confirmed",
    format,
    source,
  };
}
export const suppliedVisuals = {
  redDragon: resource(
    "red-dragon",
    "Gráfica original de Musashi para Red Dragon",
    853,
    1280,
    "graphic",
  ),
  vagabond: resource(
    "vagabond",
    "Gráfica original de Musashi para Vagabond",
    852,
    1280,
    "graphic",
  ),
  samurai: resource(
    "samurai-coffee",
    "Gráfica original de Musashi para Samurai Coffee",
    854,
    1281,
    "graphic",
  ),
  taiyaki: resource(
    "taiyaki-red-velvet",
    "Gráfica original de Musashi para Taiyaki Red Velvet",
    854,
    1281,
    "graphic",
  ),
  bubble: resource(
    "bubble-yakuza",
    "Gráfica original de Musashi para Bubble Yakuza",
    852,
    1280,
    "graphic",
  ),
  praline: resource(
    "praline-negro",
    "Gráfica original de Musashi para Praliné Negro",
    960,
    1280,
    "graphic",
  ),
  midori: resource(
    "midori-kensei",
    "Gráfica original de Musashi para Midori Kensei",
    852,
    1280,
    "graphic",
  ),
  pastry: {
    ...resource(
      "pasteleria-japonesa",
      "Porción de pastelería japonesa sobre un plato, en una fotografía aportada por Musashi",
      965,
      1400,
    ),
    placeholder: "/media/musashi/pasteleria-preview.webp",
  },
  characters: resource(
    "pasteleria-personajes",
    "Dos piezas de pastelería decoradas con personajes, en material aportado por Musashi",
    1280,
    853,
  ),
  cat: resource(
    "pasteleria-gato",
    "Pieza de pastelería decorada como un gato, en una fotografía aportada por Musashi",
    1280,
    960,
  ),
  panda: resource(
    "pasteleria-panda",
    "Pieza de pastelería decorada como un panda, en una fotografía aportada por Musashi",
    864,
    1279,
  ),
};
// Sustituir referencias: nunca usar otra sede, una persona o una escena de ficción como el local o propietario.
export const media = {
  portada: suppliedVisuals.pastry,
  cafeteria: suppliedVisuals.vagabond,
  pasteleria: suppliedVisuals.pastry,
  cenas: null as VisualResource | null,
  tatami: null as VisualResource | null,
  bienestar: null as VisualResource | null,
  propietario: null as VisualResource | null,
  logo: "/media/musashi/logo.webp",
  video: {
    src: "/media/musashi/pieza-promocional.mp4",
    poster: "/media/musashi/film-poster.webp",
    enabled: true,
  },
};
export const pastryGallery = [
  suppliedVisuals.characters,
  suppliedVisuals.cat,
  suppliedVisuals.panda,
];

export const pastryTitles: Record<string, string> = {
  [suppliedVisuals.characters.src]: "Piezas inspiradas en Totoro",
  [suppliedVisuals.cat.src]: "Pieza con forma de gato",
  [suppliedVisuals.panda.src]: "Pieza con forma de panda",
};
