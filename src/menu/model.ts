import data from "./seasons.json" with { type: "json" };
import { productCatalog, type MenuProduct } from "./catalog";
export interface SeasonProduct {
  productId: string;
  category: string;
  role: "demonstration" | "brand-reference" | "official";
  priceARS: number | null;
  availability: "unconfirmed" | "available" | "unavailable";
  description?: string;
  name?: string;
  image?: MenuProduct["image"];
}
export interface Season {
  id: string;
  name: string;
  year: number | null;
  status: "draft" | "demo" | "published" | "archived";
  heading: string;
  intro: string;
  categories: string[];
  products: SeasonProduct[];
}
export const demoNotice =
  "Carta de prueba · Productos y combinaciones ilustrativos. La selección final será confirmada por Musashi";
export const brandNotice =
  "Creación de la marca · Inclusión en temporada por confirmar";
export interface ResolvedMenuProduct extends MenuProduct {
  category: string;
  role: SeasonProduct["role"];
  priceARS: number | null;
  availability: SeasonProduct["availability"];
  canConsult: boolean;
  notice: string;
}
export function resolveSeason(
  id: string,
  seasons: Season[] = data.seasons as Season[],
  catalog: Record<string, MenuProduct> = productCatalog,
) {
  const season = seasons.find((s) => s.id === id);
  if (!season || !["demo", "published"].includes(season.status)) return null;
  const ids = new Set<string>();
  const products = season.products.map((entry) => {
    const base = catalog[entry.productId];
    if (
      !base ||
      !["demonstration", "brand-reference", "official"].includes(entry.role) ||
      !["unconfirmed", "available", "unavailable"].includes(
        entry.availability,
      ) ||
      (season.status === "published" &&
        (entry.role !== "official" || entry.productId.startsWith("demo-"))) ||
      ids.has(entry.productId) ||
      !season.categories.includes(entry.category) ||
      (entry.priceARS !== null &&
        (!Number.isFinite(entry.priceARS) || entry.priceARS < 0))
    )
      throw new Error(
        "Revisar productos, categorías y precios de la temporada",
      );
    ids.add(entry.productId);
    return {
      ...base,
      ...entry,
      id: entry.productId,
      name: entry.name ?? base.name,
      description: entry.description ?? base.description,
      image: entry.image ?? base.image,
      priceARS: season.status === "demo" ? null : entry.priceARS,
      availability:
        season.status === "demo" ? "unconfirmed" : entry.availability,
      canConsult:
        season.status === "published" &&
        entry.role === "official" &&
        entry.availability === "available",
      notice:
        entry.role === "brand-reference"
          ? brandNotice
          : season.status === "demo" || entry.role === "demonstration"
            ? demoNotice
            : "",
    } as ResolvedMenuProduct;
  });
  return { season, products };
}
export const selectedMenu = resolveSeason(data.selectedSeasonId);
