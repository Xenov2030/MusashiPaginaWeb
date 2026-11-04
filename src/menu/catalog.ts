import { suppliedProducts, type VisualResource } from "../content";
export interface MenuProduct {
  id: string;
  name: string;
  description: string;
  image: VisualResource;
  alcohol?: "indicated" | "not-stated";
}
const illustrative = (
  id: string,
  name: string,
  description: string,
  file: string,
): MenuProduct => ({
  id,
  name,
  description,
  image: {
    src: `/media/verano/${file}.webp`,
    srcSet: `/media/verano/${file}-small.webp 540w, /media/verano/${file}.webp 1000w`,
    sizes: "(max-width:700px) calc(100vw - 88px), 32vw",
    alt: `Ilustración conceptual de ${name.toLowerCase()}; producto de ejemplo, no una fotografía de Musashi`,
    width: 1000,
    height: 1000,
    kind: "conceptual",
    source:
      "Generado con OpenAI imagegen para la carta de prueba; resources/generated/verano/inventory.json",
  },
});
export const productCatalog: Record<string, MenuProduct> = Object.fromEntries(
  [
    ...suppliedProducts
      .filter((p) => p.image)
      .map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.image!,
        alcohol: p.alcohol,
      })),
    illustrative(
      "demo-cafe-hielo",
      "Negro sobre hielo",
      "Ejemplo de café servido sobre hielo para explorar la presentación de una propuesta fría.",
      "cafe-hielo",
    ),
    illustrative(
      "demo-latte-frio",
      "Latte frío de vainilla",
      "Ejemplo ilustrativo de café frío con leche y vainilla, servido con hielo.",
      "latte-frio",
    ),
    illustrative(
      "demo-infusion-citrica",
      "Infusión cítrica fría",
      "Combinación ilustrativa de infusión fría, hielo y notas cítricas para esta prueba visual.",
      "infusion-citrica",
    ),
    illustrative(
      "demo-te-frutal",
      "Té frío de frutos rojos",
      "Ejemplo de té frío con una combinación ilustrativa de frutos rojos y hielo.",
      "te-frutal",
    ),
  ].map((product) => [product.id, product]),
);
