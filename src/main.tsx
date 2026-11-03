import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { confirmedProducts, demoEvent, demoProducts, site } from "./content";
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
function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="red-dot" /> ANIME CAFÉ / MENDOZA
        </p>
        <h1>
          Café, Japón
          <br />y algo para
          <br />
          <em>compartir.</em>
        </h1>
        <p className="hero-intro">
          Café de especialidad y pastelería japonesa.
          <br />
          Un universo que también se descubre a bocados.
        </p>
        <div className="hero-actions">
          <a className="button" href="#carta">
            Explorar la carta
            <Arrow />
          </a>
          <Instagram className="text-link">Instagram</Instagram>
        </div>
        <p className="stage-note">
          {site.stage === "open"
            ? "Conocé Musashi Anime Café."
            : "Musashi prepara un nuevo espacio. Seguí las novedades."}
        </p>
      </div>
      <figure className="hero-visual">
        <img
          src="/images/hero.webp"
          alt="Ilustración de café y mochis sobre cerámica, una interpretación gastronómica para el boceto"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <figcaption>CAFÉ DE ESPECIALIDAD + PASTELERÍA JAPONESA</figcaption>
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
                Primero, la curiosidad.
                <br />
                <em>Después, el primer bocado.</em>
              </>
            )}
          </Title>
        </div>
        <div className="menu-intro">
          <p>
            {site.draft
              ? "Selección ilustrativa para el boceto"
              : "Nuestra carta"}
          </p>
          {site.draft && (
            <small>
              Inspirada en antecedentes de Musashi.
              <br />
              Carta y disponibilidad por confirmar.
            </small>
          )}
        </div>
      </div>
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
                <img
                  src={p.image}
                  alt={`Ilustración de ${p.name.toLowerCase()}`}
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
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
  return (
    <section id="experiencia" className="experience section">
      <div className="experience-heading">
        <p className="eyebrow">LA EXPERIENCIA MUSASHI</p>
        <h2>
          Una merienda.
          <br />
          <em>Todo un universo.</em>
        </h2>
        <p>
          Café y pastelería para disfrutar entre historias, conversaciones y
          cultura japonesa. Con o sin anime favorito.
        </p>
      </div>
      <div className="experience-composition">
        <figure className="experience-main">
          <img
            src={site.visuals.spacePhoto || "/images/experience.webp"}
            alt={
              site.visuals.spacePhoto
                ? "Espacio Musashi"
                : "Ilustración conceptual de un manga abierto junto a un café y un dorayaki; no representa el local"
            }
            width="1536"
            height="1024"
            loading="lazy"
          />
        </figure>
        <div className="experience-detail detail-coffee" aria-hidden="true" />
        <div className="experience-detail detail-reading" aria-hidden="true" />
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
          <p>
            Un plato, otra forma de disfrutar Japón.
            <br />
            Un antecedente de los encuentros de Musashi.
          </p>
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
          <img
            src="/images/ramen.webp"
            alt="Ilustración de un cuenco de ramen con fideos y toppings, como referencia de una experiencia especial"
            width="1024"
            height="1024"
            loading="lazy"
          />
        </figure>
      </article>
      <dialog
        ref={dialog}
        aria-labelledby="event-title"
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
          ¿Nos vemos
          <br />
          <em>en Instagram?</em>
        </h2>
      </div>
      <div className="contact-action">
        <p>
          Encontrá las novedades del nuevo espacio
          <br />y el contacto con Musashi.
        </p>
        {site.business.address && <p>{site.business.address}</p>}
        {site.business.hours && <p>{site.business.hours}</p>}
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
          {site.draft
            ? "Boceto · Ilustraciones conceptuales, no productos reales de Musashi. Contenido sujeto a confirmación."
            : "Musashi Anime Café · Mendoza"}
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
