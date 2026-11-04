import { beveragePolicy } from "./content";
export function BeveragePolicy() {
  return (
    <aside className="beverage-policy" aria-label="Política de bebidas">
      <p className="eyebrow">BEBIDAS / RECETA DE AUTOR</p>
      <h3>{beveragePolicy.title}</h3>
      <p>{beveragePolicy.text}.</p>
    </aside>
  );
}
