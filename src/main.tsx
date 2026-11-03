import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { confirmedProducts, demoEvent, demoProducts, site } from "./content";
import "./style.css";

const Arrow = () => (
  <svg
    className="arrow"
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path d="M3 13 13 3M3 3h10v10" stroke="currentColor" strokeWidth="1.3" />
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
      {children} <Arrow />
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
          <strong>
            MUSASHI<span aria-hidden="true">.</span>
          </strong>
          <small>ANIME CAFÉ · MENDOZA</small>
        </>
      )}
    </a>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
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
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <Instagram className="header-social">Seguinos</Instagram>
      </div>
    </header>
  );
}
function CupArt({ bowl = false }: { bowl?: boolean }) {
  return (
    <svg
      className={bowl ? "food-art bowl-art" : "food-art"}
      viewBox="0 0 540 440"
      fill="none"
      role="img"
      aria-label={
        bowl
          ? "Ilustración de un cuenco de ramen"
          : "Ilustración de una taza de café"
      }
    >
      <ellipse
        cx="270"
        cy="365"
        rx="193"
        ry="25"
        fill="#10150f"
        opacity=".18"
      />
      {bowl ? (
        <>
          <path d="M90 210 Q110 365 270 370 Q430 365 450 210Z" fill="#b65b42" />
          <ellipse cx="270" cy="210" rx="180" ry="61" fill="#e8c69b" />
          <ellipse cx="270" cy="210" rx="157" ry="47" fill="#715137" />
          <path
            d="M160 205q60-50 120 0t100 0M160 222q60-50 120 0t100 0M180 237q55-45 110-5"
            stroke="#eed4a6"
            strokeWidth="8"
          />
          <ellipse cx="322" cy="194" rx="31" ry="23" fill="#f3ead8" />
          <circle cx="322" cy="194" r="13" fill="#dca04f" />
          <path
            d="m350 125 100-78m-84 91 100-78"
            stroke="#e6c794"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <ellipse cx="258" cy="334" rx="170" ry="38" fill="#e1cfad" />
          <ellipse cx="258" cy="328" rx="141" ry="25" fill="#f0e2ca" />
          <path
            d="M373 205h29c77 0 70 103-21 99"
            stroke="#e7d6b9"
            strokeWidth="25"
          />
          <path d="M130 189h253l-19 99c-9 45-176 60-208 0Z" fill="#e8d9bd" />
          <ellipse cx="256" cy="188" rx="127" ry="39" fill="#f4e7d2" />
          <ellipse cx="256" cy="188" rx="109" ry="28" fill="#624331" />
          <path
            d="M220 184c-21-22 6-34 35-11 28-23 58-11 35 11l-35 23Z"
            fill="#dfc49b"
          />
          <path
            d="M221 124c-31-27 28-32 3-61M270 123c-31-32 29-43 3-78M314 124c-25-28 25-32 6-58"
            stroke="#e3d5bb"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".6"
          />
        </>
      )}
    </svg>
  );
}
function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="red-line" /> CAFÉ DE ESPECIALIDAD · PASTELERÍA
          JAPONESA
        </p>
        <h1>
          Tu próxima pausa
          <br />
          tiene un{" "}
          <em>
            nuevo
            <br />
            capítulo.
          </em>
        </h1>
        <p className="intro">
          Café, cultura japonesa y algo rico para compartir.
          <br className="desktop-break" /> Una nueva etapa de Musashi está por
          escribirse.
        </p>
        <div className="hero-actions">
          <a className="button" href="#propuesta">
            Explorar la propuesta{" "}
            <span className="arrow-down">
              <Arrow />
            </span>
          </a>
          <Instagram className="text-link">Seguí la nueva etapa</Instagram>
        </div>
        <div className="hero-foot">
          <span className="status-dot" />{" "}
          {site.stage === "open"
            ? "Conocé esta nueva etapa"
            : "Un nuevo espacio. La misma esencia."}
        </div>
      </div>
      <div className="hero-art">
        <span className="art-orbit" />
        <span className="art-caption">UNA PAUSA CON IDENTIDAD</span>
        <span className="art-number">01 /</span>
        <CupArt />
        <div className="art-bottom">
          <span>CAFÉ & CULTURA</span>
          <span>MENDOZA, AR</span>
        </div>
      </div>
    </section>
  );
}
function Proposal() {
  const pillars = [
    [
      "01",
      "Café",
      "El ritual de hacer una pausa. Un encuentro con el café de especialidad.",
    ],
    [
      "02",
      "Pastelería japonesa",
      "Texturas y sabores para descubrir un lado distinto de la merienda.",
    ],
    [
      "03",
      "Cultura y encuentros",
      "El universo del anime y la cultura japonesa como punto de encuentro.",
    ],
  ];
  return (
    <section id="propuesta" className="section proposal">
      <div className="section-heading">
        <p className="eyebrow">EL UNIVERSO MUSASHI</p>
        <h2>
          Tres formas de
          <br />
          <em>disfrutar la pausa.</em>
        </h2>
        <p>
          Una propuesta que conecta lo cotidiano
          <br />
          con el placer de descubrir algo nuevo.
        </p>
      </div>
      <div className="pillars">
        {pillars.map(([n, title, text]) => (
          <article key={n}>
            <span className="index">{n} /</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function Menu({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState("Todo");
  const products = site.draft ? demoProducts : confirmedProducts;
  const shown = products.filter(
    (p) => category === "Todo" || category === p.category,
  );
  return (
    <section
      id="carta"
      className={`section menu-section ${full ? "full-menu" : ""}`}
    >
      <div className="menu-heading">
        <div>
          <p className="eyebrow">PEQUEÑOS DESCUBRIMIENTOS</p>
          {full ? (
            <h1>
              Una pausa,
              <br />
              <em>muchos sabores.</em>
            </h1>
          ) : (
            <h2>
              Algo rico.
              <br />
              <em>Algo diferente.</em>
            </h2>
          )}
        </div>
        <div>
          <p>
            {site.draft
              ? "Selección ilustrativa para el boceto"
              : "Nuestra carta"}
          </p>
          {site.draft && (
            <p className="muted">
              Inspirada en antecedentes de Musashi.
              <br />
              Carta y disponibilidad por confirmar.
            </p>
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
      <div className="product-grid" aria-live="polite">
        {shown.map((p) => (
          <article className="product" key={p.id}>
            <div className={`product-visual ${p.id}`} aria-hidden="true">
              {p.image ? (
                <img
                  src={p.image}
                  alt=""
                  width="360"
                  height="250"
                  loading="lazy"
                />
              ) : p.id === "cafe" ? (
                <CupArt />
              ) : (
                <>
                  <span className="sweet sweet-one" />
                  <span className="sweet sweet-two" />
                  <span className="sweet sweet-three" />
                </>
              )}
              <span className="visual-label">{p.category}</span>
            </div>
            <div className="product-description">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {p.priceARS !== null && (
                <p>
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
            </div>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <p>La carta se compartirá cuando esté confirmada.</p>
      )}
      {!full && (
        <a className="text-link menu-link" href="/carta">
          Explorar la carta ilustrativa <Arrow />
        </a>
      )}
    </section>
  );
}
function Experience() {
  return (
    <section id="experiencia" className="experience">
      <div className="experience-art">
        {site.visuals.spacePhoto ? (
          <img
            src={site.visuals.spacePhoto}
            alt="Espacio Musashi"
            width="800"
            height="800"
            loading="lazy"
          />
        ) : (
          <>
            <span className="enso" aria-hidden="true" />
            <div className="experience-type">
              Una pausa.
              <br />
              Un encuentro.
              <br />
              <em>Tu universo.</em>
            </div>
            <span className="art-note">
              CULTURA JAPONESA · CAFÉ · ENCUENTROS
            </span>
          </>
        )}
      </div>
      <div className="experience-copy">
        <p className="eyebrow">LA EXPERIENCIA MUSASHI</p>
        <h2>
          Un lugar para
          <br />
          <em>conectar.</em>
        </h2>
        <p>
          Hay conversaciones que empiezan con un café. Y encuentros que nacen de
          compartir el mismo universo.
        </p>
        <p>
          Musashi reúne café, pastelería y cultura japonesa en una propuesta
          para disfrutar a tu manera. Con o sin un anime favorito.
        </p>
        <a className="text-link" href="#contacto">
          Descubrí la nueva etapa <Arrow />
        </a>
      </div>
    </section>
  );
}
function Events() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const illustrative = demoEvent.status === "illustrative";
  if (!site.draft && illustrative)
    return (
      <section id="eventos" className="section">
        <p className="eyebrow">ENCUENTROS ESPECIALES</p>
        <h2>
          Próximas historias
          <br />
          <em>por compartir.</em>
        </h2>
        <p>Las novedades se compartirán en nuestro Instagram.</p>
        <Instagram className="text-link" />
      </section>
    );
  return (
    <section id="eventos" className="section events">
      <div className="event-heading">
        <div>
          <p className="eyebrow">MÁS ALLÁ DE LA MERIENDA</p>
          <h2>
            Hay encuentros
            <br />
            <em>que son un capítulo aparte.</em>
          </h2>
        </div>
        <p>
          Experiencias especiales para disfrutar
          <br />
          la cultura japonesa alrededor de la mesa.
        </p>
      </div>
      <article className="event-card">
        <div className="event-art">
          <CupArt bowl />
        </div>
        <div className="event-copy">
          <span className="tag">EJEMPLO DE PRESENTACIÓN</span>
          <h3>{demoEvent.title}</h3>
          <p>{demoEvent.description}</p>
          <p className="muted">
            Un antecedente de los encuentros de Musashi, presentado como
            referencia para futuras experiencias.
          </p>
          <button
            ref={opener}
            className="text-link"
            onClick={() => dialog.current?.showModal()}
          >
            Conocer la propuesta <Arrow />
          </button>
        </div>
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
            Esta tarjeta muestra cómo podría presentarse una experiencia
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
    <section id="contacto" className="contact">
      <p className="eyebrow">LA HISTORIA CONTINÚA</p>
      <h2>
        {site.stage === "coming-soon" ? (
          <>
            Un nuevo espacio.
            <br />
            <em>Muchas historias por venir.</em>
          </>
        ) : (
          <>
            Un nuevo capítulo.
            <br />
            <em>Nos encontramos en Musashi.</em>
          </>
        )}
      </h2>
      <p>
        Seguí las novedades y descubrí lo que viene
        <br />
        en el Instagram oficial de Musashi.
      </p>
      {site.business.address && <p>{site.business.address}</p>}
      {site.business.hours && <p>{site.business.hours}</p>}
      <Instagram className="button">@musashi.animecafe</Instagram>
      {site.business.whatsapp && (
        <a
          className="text-link"
          href={`https://wa.me/${site.business.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar por WhatsApp <Arrow />
        </a>
      )}
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
          <Instagram>Instagram</Instagram>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          {site.draft
            ? "Propuesta de diseño · Imágenes y contenido sujetos a confirmación"
            : "Musashi Anime Café · Mendoza"}
        </span>
        <a href={site.author.url} target="_blank" rel="noopener noreferrer">
          DESARROLLADO POR {site.author.name} <Arrow />
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
            <div className="chapter-strip" aria-hidden="true">
              <span>UN POCO DE JAPÓN</span>
              <i>✦</i>
              <span>UN MUCHO DE MUSASHI</span>
              <i>✦</i>
              <span>CAFÉ, CULTURA Y ENCUENTROS</span>
              <i>✦</i>
            </div>
            <Proposal />
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
