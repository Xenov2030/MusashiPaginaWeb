import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  selectedMenu,
  demoNotice,
  brandNotice,
  type ResolvedMenuProduct,
} from "./menu/model";
import { suppliedProducts } from "./content";
import { Visual } from "./Visual";
import { ProductMedia } from "./ProductMedia";
import { BeveragePolicy } from "./BeveragePolicy";
import { ConsultLink } from "./ConsultLink";
function SeasonalProduct({
  product,
  seasonIsDemo,
}: {
  product: ResolvedMenuProduct;
  seasonIsDemo: boolean;
}) {
  const notice = product.notice || (seasonIsDemo ? demoNotice : "");
  return (
    <article
      className="season-product product"
      id={product.id}
      data-demo={seasonIsDemo || product.role === "demonstration"}
    >
      <div className="product-visual">
        <ProductMedia
          resource={product.image}
          name={product.name}
          notice={notice}
          description={product.description}
        >
          <Visual resource={product.image} />
        </ProductMedia>
      </div>
      <div className="product-copy">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {product.alcohol === "indicated" && (
          <span className="alcohol-note">
            Contiene alcohol · indicado en el afiche
          </span>
        )}
        <p className="season-role">
          {product.role === "brand-reference"
            ? brandNotice
            : seasonIsDemo || product.role === "demonstration"
              ? "Ejemplo ilustrativo"
              : "Selección confirmada"}
        </p>
        <p className="season-price">
          {product.priceARS === null
            ? "Precio por confirmar"
            : new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(product.priceARS)}
        </p>
        {product.canConsult ? (
          <ConsultLink topic={product.name}>Consultar propuesta</ConsultLink>
        ) : (
          !seasonIsDemo && (
            <p className="availability-note">
              {product.availability === "unavailable"
                ? "No disponible"
                : "Disponibilidad por confirmar"}
            </p>
          )
        )}
        <small className="season-image-kind">
          {product.image.kind === "conceptual"
            ? "Imagen conceptual"
            : product.image.format === "graphic"
              ? "Afiche original de Musashi"
              : "Imagen aportada por Musashi"}
        </small>
      </div>
    </article>
  );
}
export function SeasonalMenu({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState("Todo");
  const menu = selectedMenu;
  const season = menu?.season;
  const products = menu?.products ?? [];
  const hash = () => {
    try {
      return decodeURIComponent(location.hash.slice(1));
    } catch {
      return "";
    }
  };
  const isArchiveHash = () =>
    Boolean(
      full &&
      suppliedProducts.some((p) => p.id === hash()) &&
      !products.some((p) => p.id === hash()),
    );
  const [archiveOpen, setArchiveOpen] = useState(isArchiveHash);
  const results = useRef<HTMLDivElement>(null);
  const previousHeight = useRef<number | null>(null);
  const animation = useRef<Animation | null>(null);
  const changeCategory = (next: string) => {
    if (next === category) return;
    previousHeight.current =
      results.current?.getBoundingClientRect().height ?? null;
    setCategory(next);
  };
  useLayoutEffect(() => {
    const el = results.current,
      before = previousHeight.current;
    animation.current?.cancel();
    if (
      el &&
      before !== null &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const after = el.getBoundingClientRect().height;
      if (Math.abs(after - before) > 2)
        animation.current = el.animate(
          [{ height: `${before}px` }, { height: `${after}px` }],
          { duration: 240, easing: "cubic-bezier(.2,.7,.25,1)" },
        );
    }
    previousHeight.current = null;
    return () => animation.current?.cancel();
  }, [category]);
  useEffect(() => {
    const show = () => {
      if (isArchiveHash()) {
        setArchiveOpen(true);
        requestAnimationFrame(() =>
          document.getElementById(hash())?.scrollIntoView({ block: "start" }),
        );
      }
    };
    window.addEventListener("hashchange", show);
    return () => window.removeEventListener("hashchange", show);
  }, []);
  const Title = full ? "h1" : "h2";
  if (!season)
    return (
      <section className="section menu-section" id="carta">
        <Title>Carta pendiente de confirmación</Title>
        <p>La temporada seleccionada no está publicada para revisión.</p>
      </section>
    );
  const selection = full ? products : products.slice(0, 3);
  const shown = selection.filter(
    (p) => category === "Todo" || p.category === category,
  );
  return (
    <section
      id="carta"
      className={`section menu-section seasonal-menu ${full ? "full-menu" : ""}`}
    >
      <div className="menu-heading">
        <div>
          <p className="eyebrow">MUSASHI / CARTA ESTACIONAL</p>
          <Title>{season.heading}</Title>
          <p className="season-intro">{season.intro}</p>
        </div>
        <span className="season-stamp">
          {season.name}
          {season.year ? ` · ${season.year}` : ""}
          <small>
            {season.status === "demo" ? "DE PRUEBA" : "TEMPORADA CONFIRMADA"}
          </small>
        </span>
      </div>
      {season.status === "demo" && (
        <p className="season-demo-notice">{demoNotice}</p>
      )}
      <div className="menu-leaf">
        <div className="menu-leaf-top">
          <span>MUSASHI</span>
          <span>
            {season.name} ·{" "}
            {season.status === "demo"
              ? "Muestra para revisión"
              : "Carta estacional"}
          </span>
        </div>
        <BeveragePolicy />
        <div className="filters" role="group" aria-label="Filtrar carta">
          {["Todo", ...season.categories].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => changeCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <p className="filter-result" role="status">
          {shown.length} {shown.length === 1 ? "propuesta" : "propuestas"} ·{" "}
          {category}
        </p>
        <div className="menu-results" ref={results}>
          <div className="season-grid" key={category}>
            {shown.map((product) => (
              <SeasonalProduct
                key={product.id}
                product={product}
                seasonIsDemo={season.status === "demo"}
              />
            ))}
          </div>
          {!shown.length && (
            <p className="season-empty">
              {full
                ? "No hay productos cargados en esta categoría."
                : "Esta categoría está en la muestra completa."}
              {!full && (
                <a href="/carta" className="text-link">
                  Ver la carta de prueba →
                </a>
              )}
            </p>
          )}
        </div>
        {!full && (
          <a className="menu-link" href="/carta">
            Recorrer la carta de prueba →
          </a>
        )}
      </div>
      {full && (
        <details
          className="brand-archive"
          open={archiveOpen}
          onToggle={(e) => setArchiveOpen(e.currentTarget.open)}
        >
          <summary>
            Creaciones de la marca<span>Ver material de Musashi ↓</span>
          </summary>
          <p>
            {brandNotice}. Estas piezas documentan creaciones de Musashi; no
            confirman su disponibilidad ni que sean bebidas frías.
          </p>
          {archiveOpen && (
            <div className="brand-archive-grid">
              {suppliedProducts.map((product) => (
                <article
                  className="brand-catalog-item"
                  id={
                    products.some((p) => p.id === product.id)
                      ? `marca-${product.id}`
                      : product.id
                  }
                  key={product.id}
                >
                  {product.image && (
                    <ProductMedia
                      resource={product.image}
                      name={product.name}
                      notice={brandNotice}
                      description={product.description}
                    >
                      <Visual resource={product.image} />
                    </ProductMedia>
                  )}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {product.alcohol === "indicated" && (
                    <span className="alcohol-note">
                      Contiene alcohol · indicado en el afiche
                    </span>
                  )}
                  <small>{brandNotice}</small>
                </article>
              ))}
            </div>
          )}
        </details>
      )}
    </section>
  );
}
