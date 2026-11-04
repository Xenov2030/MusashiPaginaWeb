import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { preload } from "react-dom";
import { useHashNavigation, useSectionMotion } from "./motion";
import {
  suppliedProducts,
  site,
  conceptualVisuals,
  copy,
  type VisualResource,
  categories,
  disciplines,
  historicalContext,
} from "./content";
import "./style.css";
import { Reservations, PetFriendly } from "./Reservations";
import { OfficialAgenda, useOfficialEvents } from "./OfficialAgenda";
import { WhatsAppBubble } from "./WhatsAppBubble";
import {
  Essence,
  CoffeeIntro,
  PastryGallery,
  Dinner,
  Tatami,
  Wellbeing,
  ExperienceContact,
} from "./ExperienceSections";
import { ConsultLink } from "./ConsultLink";
import { BeveragePolicy } from "./BeveragePolicy";
import { OwnerHistory } from "./OwnerHistory";
import { ProductMedia } from "./ProductMedia";
import { Ambient } from "./Ambient";

const Arrow = () => (
  <svg
    className="arrow"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path d="M4 16 16 4M4 4h12v12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const nav = [
  ["La experiencia", "/#experiencia"],
  ["Carta", "/carta"],
  ["Tatami", "/#tatami"],
  ["Cenas", "/#cenas"],
  ["Bienestar", "/#bienestar"],
  ["Nuestra historia", "/#historia"],
  ["Contacto", "/#contacto"],
];
function Instagram({
  children = "Nuestro Instagram",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={site.instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow />
    </a>
  );
}
function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`brand ${compact ? "brand-compact" : ""}`}
      href="/"
      aria-label="Musashi, inicio"
    >
      {site.visuals.logo ? (
        <span className="brand-image">
          <img src={site.visuals.logo} alt="Musashi" width="80" height="80" />
        </span>
      ) : (
        <>
          <strong>MUSASHI</strong>
          <small>CAFÉ · TÉ · COCTELERÍA</small>
        </>
      )}
    </a>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const isMenu = window.location.pathname.replace(/\/$/, "") === "/carta";
  const [active, setActive] = useState(isMenu ? "Carta" : "La experiencia");
  useEffect(() => {
    if (isMenu || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const item = nav.find(
              ([, href]) =>
                href === `/#${entry.target.id}` ||
                (entry.target.id === "carta" && href === "/carta"),
            );
            if (item) setActive(item[0]);
          }
        }
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isMenu]);
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="header-inner">
        <Brand compact />
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Cerrar −" : "Menú +"}
        </button>
        <nav
          id="main-nav"
          aria-label="Principal"
          className={open ? "nav is-open" : "nav"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {nav.map(([label, href]) => (
            <a
              key={label}
              href={href}
              aria-current={
                active === label ? (isMenu ? "page" : "location") : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <Instagram className="header-social">Instagram</Instagram>
      </div>
    </header>
  );
}
function Visual({
  resource,
  priority = false,
  className = "",
}: {
  resource: VisualResource;
  priority?: boolean;
  className?: string;
}) {
  const image = useRef<HTMLImageElement>(null);
  const animation = useRef<Animation | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  if (priority)
    preload(resource.src, {
      as: "image",
      fetchPriority: "high",
      imageSrcSet: resource.srcSet,
      imageSizes: resource.sizes,
    });
  useEffect(() => {
    const img = image.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let played = false;
    const ready = () => {
      if (!active) return;
      setStatus("ready");
      if (priority && !played && !reduced.matches && img?.animate) {
        played = true;
        animation.current = img.animate(
          [{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0 0 0)" }],
          { duration: 520, easing: "cubic-bezier(.2,.7,.25,1)" },
        );
      }
    };
    const failed = () => {
      if (active) setStatus("error");
    };
    setStatus("loading");
    img?.addEventListener("load", ready);
    img?.addEventListener("error", failed);
    if (img?.complete) {
      if (img.naturalWidth) ready();
      else failed();
    }
    const stop = () => {
      if (reduced.matches) animation.current?.cancel();
    };
    reduced.addEventListener("change", stop);
    return () => {
      active = false;
      img?.removeEventListener("load", ready);
      img?.removeEventListener("error", failed);
      reduced.removeEventListener("change", stop);
      animation.current?.cancel();
    };
  }, [resource.src, priority]);
  return (
    <span
      className={`visual is-${status} ${resource.format === "graphic" ? "visual-graphic" : ""} ${className}`}
      style={
        {
          "--visual-ratio": `${resource.width} / ${resource.height}`,
        } as React.CSSProperties
      }
      data-visual-state={status}
    >
      <img
        ref={image}
        className="visual-image"
        src={resource.src}
        srcSet={resource.srcSet}
        sizes={resource.sizes}
        alt={resource.alt}
        width={resource.width}
        height={resource.height}
        style={{ objectPosition: resource.position || "center" }}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        data-resource-kind={resource.kind}
        aria-hidden={status === "error" ? true : undefined}
      />
      {resource.placeholder && (
        <img
          className="visual-preview"
          src={resource.placeholder}
          alt=""
          aria-hidden="true"
          width={resource.width}
          height={resource.height}
        />
      )}
      {status === "error" && (
        <span
          className="visual-error"
          role="img"
          aria-label={`${resource.alt}. Imagen no disponible.`}
        >
          <span className="error-mark" aria-hidden="true" />
          <strong>
            {priority ? "Café, Japón y Musashi." : "Un sabor por descubrir."}
          </strong>
          <span>La imagen no está disponible.</span>
        </span>
      )}
    </span>
  );
}
function Hero() {
  const scene = site.visuals.heroScene ?? conceptualVisuals.hero;
  return (
    <section
      id="inicio"
      className={`hero table-hero ${scene.kind === "confirmed" ? "hero-real" : "hero-conceptual"}`}
    >
      <figure className="hero-visual">
        <Visual resource={scene} priority />
        <figcaption>
          {scene.kind === "confirmed"
            ? "MUSASHI / PASTELERÍA JAPONESA"
            : "MUSASHI / COMPOSICIÓN CONCEPTUAL"}
        </figcaption>
      </figure>
      <div className="hero-copy hero-paper">
        <p className="eyebrow">MUSASHI · CAFETERÍA OCULTA · MENDOZA</p>
        <h1>
          <span className="hero-line">{copy.hero.headline[0]}</span>{" "}
          <span className="hero-line">
            <em className="brush-word">{copy.hero.headline[1]}</em>
          </span>
        </h1>
        <p className="hero-intro">{copy.hero.intro}</p>
        <PetFriendly compact />
        <div className="hero-actions">
          <a className="button" href="#experiencia">
            Descubrí Musashi
            <Arrow />
          </a>
          <a className="text-link" href="/carta">
            Explorá la carta
            <Arrow />
          </a>
        </div>
        <div className="hero-consult">
          <ConsultLink topic="la experiencia de Musashi">
            Consultanos
          </ConsultLink>
        </div>
        {copy.hero.stage && <p className="stage-note">{copy.hero.stage}</p>}
      </div>
      <Ambient />
    </section>
  );
}
function Menu({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState("Todo");
  const results = useRef<HTMLDivElement>(null);
  const previousHeight = useRef<number | null>(null);
  const heightAnimation = useRef<Animation | null>(null);
  const changeCategory = (next: string) => {
    if (next === category) return;
    previousHeight.current =
      results.current?.getBoundingClientRect().height ?? null;
    heightAnimation.current?.cancel();
    setCategory(next);
  };
  useLayoutEffect(() => {
    const el = results.current;
    const before = previousHeight.current;
    if (
      el &&
      before !== null &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      el.animate
    ) {
      const after = el.getBoundingClientRect().height;
      if (Math.abs(after - before) > 2)
        heightAnimation.current = el.animate(
          [{ height: `${before}px` }, { height: `${after}px` }],
          { duration: 280, easing: "cubic-bezier(.2,.7,.25,1)" },
        );
    }
    previousHeight.current = null;
    return () => heightAnimation.current?.cancel();
  }, [category]);
  const products = suppliedProducts;
  const selection = full
    ? products
    : products.filter((p) =>
        ["pasteleria", "vagabond", "taiyaki"].includes(p.id),
      );
  const shown = selection.filter(
    (p) => category === "Todo" || category === p.category,
  );
  const Title = full ? "h1" : "h2";
  return (
    <section
      id="carta"
      className={`section menu-section ${full ? "full-menu" : ""}`}
    >
      <div className="menu-heading" data-reveal="rise">
        <div>
          <p className="eyebrow">LA MESA DE MUSASHI</p>
          <Title>
            {copy.menu.title}
            <br />
            <em className="menu-subtitle">{copy.menu.subtitle}</em>
          </Title>
        </div>
        <span className="menu-edition">Tomate un ratito.</span>
      </div>
      <p className="draft-note">{copy.draftNote}</p>
      <div className="menu-leaf">
        <div className="menu-leaf-top">
          <span>MUSASHI</span>
          <span>
            {full ? "Carta de Musashi" : "Una selección para descubrir"}
          </span>
        </div>
        <BeveragePolicy />
        <div className="filters" role="group" aria-label="Filtrar carta">
          {["Todo", ...categories].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => changeCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="filter-result" role="status">
          {shown.length} {shown.length === 1 ? "propuesta" : "propuestas"} ·{" "}
          {category === "Todo" ? "Selección de la propuesta" : category}
        </p>
        <div className="menu-results" ref={results}>
          <div
            className={full ? "product-details" : "product-selection"}
            aria-live="polite"
            key={category}
          >
            {shown.map((p, i) => (
              <article
                className={`product ${!full && i === 0 ? "product-featured" : ""}`}
                key={p.id}
                id={full ? p.id : undefined}
              >
                <div className="product-visual">
                  {p.image ? (
                    <ProductMedia resource={p.image} name={p.name}>
                      <Visual resource={p.image} />
                    </ProductMedia>
                  ) : (
                    <span className="image-fallback">{p.category}</span>
                  )}
                </div>
                <div className="product-copy">
                  <span className="eyebrow">{p.category}</span>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  {p.alcohol === "indicated" && (
                    <span className="alcohol-note">
                      Contiene alcohol · indicado en el afiche
                    </span>
                  )}
                  {full && (
                    <>
                      <p className="product-extended">{p.detail}</p>
                      <ConsultLink topic={p.name}>
                        Consultar esta propuesta
                      </ConsultLink>
                    </>
                  )}
                  {p.priceARS !== null && (
                    <p className="price">
                      {new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }).format(p.priceARS)}
                    </p>
                  )}
                  {!site.draft && (
                    <small>
                      {p.availability === "available"
                        ? "Disponible"
                        : p.availability === "unavailable"
                          ? "No disponible"
                          : "Consultar disponibilidad"}
                    </small>
                  )}
                  {p.confirmedFeatures.length > 0 && (
                    <p>{p.confirmedFeatures.join(" · ")}</p>
                  )}
                  {!full && (
                    <a className="product-link" href={`/carta#${p.id}`}>
                      Conocé este sabor<span aria-hidden="true"> →</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && (
            <article className="discipline-sheet" aria-live="polite">
              <span className="eyebrow">{category}</span>
              <h3>
                {category === "Té y blends"
                  ? disciplines["Té y blends"].title
                  : category === "Coctelería"
                    ? disciplines["Coctelería"].title
                    : "La carta, a su tiempo."}
              </h3>
              <p>
                {category === "Té y blends"
                  ? disciplines["Té y blends"].description
                  : category === "Coctelería"
                    ? disciplines["Coctelería"].description
                    : "La selección se incorporará cuando esté confirmada."}
              </p>
              <small>
                {category === "Té y blends"
                  ? disciplines["Té y blends"].note
                  : category === "Coctelería"
                    ? disciplines["Coctelería"].note
                    : ""}
              </small>
            </article>
          )}
        </div>
        {!full && (
          <a className="menu-link" href="/carta">
            Ver la carta completa
            <Arrow />
          </a>
        )}
        {full && (
          <aside className="menu-guide">
            <h2>Elegí tu pausa.</h2>
            <div>
              <p>
                Estas son propuestas compartidas por Musashi. Consultá al equipo
                por las opciones actuales, ingredientes, alérgenos y precios
                antes de pedir.
              </p>
              <Instagram className="text-link">
                Consultar en Instagram
              </Instagram>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
function NameHistory() {
  if (
    !historicalContext.enabled ||
    !historicalContext.verified ||
    !historicalContext.paragraphs.length ||
    !historicalContext.sources.length
  )
    return null;
  return (
    <section className="name-history section">
      <p className="eyebrow">UNA PAUSA CULTURAL</p>
      <h2>{historicalContext.title}</h2>
      {historicalContext.paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
      <ul>
        {historicalContext.sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <p className="proposal-note">
        Propuesta de diseño · Material de Musashi y composiciones conceptuales
        para los espacios sin fotografía.
      </p>
      <div className="footer-top">
        <div className="footer-brand">
          <Brand />
          <p className="brand-signoff">
            {site.brand}
            <span>{copy.hero.title}</span>
          </p>
        </div>
        <nav aria-label="Pie de página">
          {nav.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          Musashi · Mendoza
          {site.draft ? " · Propuesta de diseño" : ""}
        </span>
        <a href={site.author.url} target="_blank" rel="noopener noreferrer">
          DESARROLLADO POR {site.author.name}
          <Arrow />
        </a>
      </div>
    </footer>
  );
}
function App() {
  const agenda = useOfficialEvents();
  useHashNavigation();
  useSectionMotion();
  const isMenu = window.location.pathname.replace(/\/$/, "") === "/carta";
  useEffect(() => {
    document.title = isMenu
      ? "Carta de propuesta · Musashi"
      : `Musashi · ${copy.hero.title}`;
  }, [isMenu]);
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        {isMenu ? (
          <>
            <Menu full />
            <Reservations events={agenda.events} />
            <ExperienceContact />
          </>
        ) : (
          <>
            <Hero />
            <Essence />
            <CoffeeIntro />
            <Menu />
            <PastryGallery />
            <Dinner />
            <OfficialAgenda {...agenda} />
            <Tatami />
            <Wellbeing />
            <OwnerHistory />
            <NameHistory />
            <Reservations events={agenda.events} />
            <ExperienceContact />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
