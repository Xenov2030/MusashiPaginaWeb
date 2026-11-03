import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  confirmedProducts,
  demoEvent,
  demoProducts,
  site,
  conceptualVisuals,
  copy,
  type VisualResource,
} from "./content";
import "./style.css";

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
  ["Inicio", "/#inicio"],
  ["Carta", "/carta"],
  ["Experiencia", "/#experiencia"],
  ["Eventos", "/#eventos"],
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
function Brand() {
  return (
    <a className="brand" href="/" aria-label="Musashi, inicio">
      {site.visuals.logo ? (
        <img
          src={site.visuals.logo}
          alt="Musashi Anime Café"
          width="160"
          height="64"
        />
      ) : (
        <>
          <strong>MUSASHI</strong>
          <small>ANIME CAFÉ / MENDOZA</small>
        </>
      )}
    </a>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const isMenu = window.location.pathname.replace(/\/$/, "") === "/carta";
  const [active, setActive] = useState(isMenu ? "Carta" : "Inicio");
  useEffect(() => {
    if (isMenu) return;
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
    <header className="header">
      <div className="header-inner">
        <Brand />
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
  return (
    <img
      className={className}
      src={resource.src}
      alt={resource.alt}
      width={resource.width}
      height={resource.height}
      style={{ objectPosition: resource.position || "center" }}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : "lazy"}
      data-resource-kind={resource.kind}
    />
  );
}
function Hero() {
  const scene = site.visuals.heroScene ?? conceptualVisuals.hero;
  const detail = site.visuals.heroDetail;
  return (
    <section
      id="inicio"
      className={`hero ${scene.kind === "confirmed" ? "hero-real" : "hero-conceptual"}`}
    >
      <div className="hero-copy">
        <p className="eyebrow">CAFÉ DE ESPECIALIDAD · PASTELERÍA JAPONESA</p>
        <h1>
          {copy.hero.greeting}
          <br />a <em className="brush-word">Musashi.</em>
        </h1>
        <p className="hero-intro">{copy.hero.intro}</p>
        <div className="hero-actions">
          <a className="button" href="#carta">
            Explorar la carta
            <Arrow />
          </a>
          <Instagram className="text-link">Instagram</Instagram>
        </div>
        <p className="stage-note">
          <span className="stage-indicator" aria-hidden="true" />
          {site.stage === "open"
            ? "Conocé nuestra propuesta."
            : copy.hero.stage}
        </p>
      </div>
      <figure className={`hero-visual ${detail ? "with-detail" : ""}`}>
        <Visual resource={scene} priority />
        {detail && <Visual resource={detail} className="hero-detail" />}
        <figcaption>
          <span>CAFÉ, JAPÓN Y UN MOMENTO PARA VOS.</span>
          <span>MENDOZA / ARGENTINA</span>
        </figcaption>
      </figure>
    </section>
  );
}
function Menu({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState("Todo");
  const products = site.draft ? demoProducts : confirmedProducts;
  const selection = full
    ? products
    : [
        ...products.filter((p) => p.id === "mochi"),
        ...products.filter((p) => p.id !== "mochi"),
      ].slice(0, 3);
  const shown = selection.filter(
    (p) => category === "Todo" || category === p.category,
  );
  const Title = full ? "h1" : "h2";
  return (
    <section
      id="carta"
      className={`section menu-section ${full ? "full-menu" : ""}`}
    >
      <div className="menu-heading">
        <div>
          <p className="eyebrow">CAFÉ & PASTELERÍA JAPONESA</p>
          <Title>
            {full ? (
              <>
                Conocé los sabores.
                <br />
                <em>Descubrí sus historias.</em>
              </>
            ) : (
              <>
                {copy.menu.title}
                <br />
                <em className="menu-subtitle">{copy.menu.subtitle}</em>
              </>
            )}
          </Title>
        </div>
        <div className="menu-intro">
          <span>
            {site.draft ? "Una selección para descubrir" : "Nuestra carta"}
          </span>
          <a className="text-link" href="/#experiencia">
            Conocé la propuesta<span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
      {site.draft && <p className="draft-note">{copy.draftNote}</p>}
      <div className="filters" role="group" aria-label="Filtrar carta">
        {["Todo", "Café", "Pastelería"].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="filter-result" role="status">
        {shown.length} {shown.length === 1 ? "propuesta" : "propuestas"} ·{" "}
        {category === "Todo" ? "Café y pastelería" : category}
      </p>
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
                <Visual resource={p.image} />
              ) : (
                <span className="image-fallback">{p.category}</span>
              )}
            </div>
            <div className="product-copy">
              <span className="eyebrow">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {full && (
                <>
                  <p className="product-extended">{p.detail}</p>
                  <p className="texture-note">{p.texture}</p>
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
        <p className="empty-menu">
          La carta se compartirá cuando esté confirmada.
        </p>
      )}
      {!full && (
        <a className="menu-link" href="/carta">
          Más sobre café y pastelería japonesa
          <Arrow />
        </a>
      )}
      {full && (
        <aside className="menu-guide">
          <h2>
            ¿Es tu primera vez con
            <br />
            la pastelería japonesa?
          </h2>
          <div>
            <p>
              Podés empezar por las texturas: el mochi es elástico, el dorayaki
              es esponjoso y el cheesecake japonés, aireado. Son preparaciones
              distintas, no una lista de sabores confirmados.
            </p>
            <p>
              Cuando esté disponible la carta oficial, podrás consultar
              opciones, ingredientes y precios. Para información alimentaria,
              esperá la confirmación del equipo.
            </p>
            <Instagram className="text-link">Consultar en Instagram</Instagram>
          </div>
        </aside>
      )}
    </section>
  );
}
function Experience() {
  const main = site.visuals.experienceSpace ?? conceptualVisuals.experience;
  const details = [
    site.visuals.experienceDetail,
    site.visuals.experienceTable,
  ].filter((resource): resource is VisualResource => resource !== null);
  return (
    <section
      id="experiencia"
      className={`experience section ${details.length ? "has-real-details" : ""}`}
    >
      <div className="experience-heading">
        <p className="eyebrow">LA BIENVENIDA MUSASHI</p>
        <h2>
          {copy.experience.title}
          <br />
          <em>{copy.experience.subtitle}</em>
        </h2>
        <p>{copy.experience.body}</p>
        <a className="text-link" href="#contacto">
          Seguimos en contacto<span aria-hidden="true"> →</span>
        </a>
      </div>
      <div className="experience-composition">
        <figure className="experience-main">
          <Visual resource={main} />
          <figcaption>
            {main.kind === "conceptual"
              ? "CAFÉ + LECTURA / UNA COMPOSICIÓN CONCEPTUAL"
              : "EL ESPACIO MUSASHI"}
          </figcaption>
        </figure>
        {details.length > 0 && (
          <div className="experience-details">
            {details.map((resource) => (
              <figure key={resource.src}>
                <Visual resource={resource} />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
function Events() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  if (!site.draft && demoEvent.status === "illustrative")
    return (
      <section id="eventos" className="section events-pending">
        <p className="eyebrow">ENCUENTROS ESPECIALES</p>
        <h2>
          Las próximas experiencias,
          <br />
          en nuestro Instagram.
        </h2>
        <Instagram className="text-link">Ver novedades</Instagram>
      </section>
    );
  return (
    <section id="eventos" className="events section">
      <article className="event-poster">
        <div className="poster-copy">
          <p className="eyebrow">EXPERIENCIAS MUSASHI</p>
          <span className="example-tag">Ejemplo de presentación</span>
          <h2>
            Noche
            <br />
            de <em>Ramen.</em>
          </h2>
          <p>{copy.event.intro}</p>
          <p className="event-context">{copy.event.context}</p>
          <button
            ref={opener}
            className="text-link"
            onClick={() => dialog.current?.showModal()}
          >
            Conocer la propuesta
            <Arrow />
          </button>
        </div>
        <figure className="poster-visual">
          <Visual resource={conceptualVisuals.ramen} />
          <figcaption>ENCUENTROS ALREDEDOR DE LA MESA</figcaption>
        </figure>
      </article>
      <dialog
        ref={dialog}
        aria-labelledby="event-title"
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const controls = Array.from(
            e.currentTarget.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex="0"]',
            ),
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }}
        onClose={() => opener.current?.focus()}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            aria-label="Cerrar detalle del evento"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
          <p className="eyebrow">EJEMPLO DE PRESENTACIÓN</p>
          <h2 id="event-title">{demoEvent.title}</h2>
          <p>
            Este afiche muestra cómo podría presentarse una experiencia
            especial. No anuncia un evento próximo ni forma parte de una carta
            diaria.
          </p>
          <p>
            No hay fecha, precio, cupos ni reservas habilitadas. Las novedades
            confirmadas se compartirán por el canal oficial.
          </p>
          <Instagram className="button">Ver Instagram oficial</Instagram>
        </div>
      </dialog>
    </section>
  );
}
function Contact() {
  return (
    <section id="contacto" className="contact section">
      <div>
        <p className="eyebrow">MUSASHI / MENDOZA</p>
        <h2>
          ¿Charlamos?
          <br />
          <em>Encontranos en Instagram.</em>
        </h2>
      </div>
      <div className="contact-action">
        <p>Las novedades de Musashi y un canal para hacer tus consultas.</p>
        {site.business.address && <p>{site.business.address}</p>}
        {site.business.hours && <p>{site.business.hours}</p>}
        {site.business.reservationConditions && (
          <p>{site.business.reservationConditions}</p>
        )}
        <Instagram className="contact-instagram">@musashi.animecafe</Instagram>
        {site.business.whatsapp && (
          <a
            className="text-link"
            href={`https://wa.me/${site.business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
            <Arrow />
          </a>
        )}
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Brand />
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
          Musashi Anime Café · Mendoza
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
  const isMenu = window.location.pathname.replace(/\/$/, "") === "/carta";
  useEffect(() => {
    document.title = isMenu
      ? "Carta ilustrativa · Musashi"
      : "Musashi · Un nuevo capítulo";
    const frame = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
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
            <Contact />
          </>
        ) : (
          <>
            <Hero />

            <Menu />
            <Experience />
            <Events />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
