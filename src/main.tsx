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
        <Instagram className="header-social">Instagram</Instagram>
      </div>
    </header>
  );
}
function CoffeePrint() {
  return (
    <svg
      className="coffee-print"
      viewBox="0 0 600 620"
      fill="none"
      role="img"
      aria-label="Composición gráfica de una taza de café en blanco y negro"
    >
      <defs>
        <pattern
          id="print-hatch"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(32)"
        >
          <path d="M0 0V10" stroke="currentColor" strokeWidth="2" />
        </pattern>
        <clipPath id="print-circle">
          <circle cx="300" cy="295" r="230" />
        </clipPath>
      </defs>
      <g clipPath="url(#print-circle)">
        <path d="M0 0h600v620H0z" fill="url(#print-hatch)" />
      </g>
      <circle cx="300" cy="295" r="231" stroke="currentColor" />
      <g transform="rotate(-13 300 300)">
        <ellipse
          cx="280"
          cy="431"
          rx="177"
          ry="25"
          fill="#080808"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M392 255h35c91 0 77 133-49 122"
          fill="#080808"
          stroke="currentColor"
          strokeWidth="27"
        />
        <path
          d="M139 246h267l-30 124c-20 58-182 58-202 0Z"
          fill="currentColor"
          stroke="#080808"
          strokeWidth="7"
        />
        <ellipse
          cx="273"
          cy="245"
          rx="134"
          ry="41"
          fill="currentColor"
          stroke="#080808"
          strokeWidth="7"
        />
        <ellipse cx="273" cy="245" rx="106" ry="26" fill="#080808" />
        <path d="M202 360q68 46 136 4" stroke="#080808" strokeWidth="3" />
        <path
          d="M238 169c-34-39 33-50 0-93M290 165c-29-34 31-49 8-82"
          stroke="currentColor"
          strokeWidth="6"
        />
      </g>
      <path
        d="M49 499h100M49 499v-100M551 98H451M551 98v100"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-topline">
        <span>CAFÉ DE ESPECIALIDAD / PASTELERÍA JAPONESA</span>
        <span>MENDOZA, ARGENTINA</span>
      </div>
      <div className="hero-title">
        <h1>MUSASHI</h1>
        <span className="red-stamp">
          NUEVA
          <br />
          ETAPA
        </span>
      </div>
      <div className="hero-body">
        <div className="hero-copy">
          <span className="section-index">01 / EL PRÓXIMO CAPÍTULO</span>
          <h2>
            El café nos reúne.
            <br />
            La cultura
            <br />
            <span className="outline-text">nos conecta.</span>
          </h2>
          <p>
            Una nueva etapa. Un punto de encuentro
            <br className="desktop-break" /> entre café, pastelería y cultura
            japonesa.
          </p>
          <div className="hero-actions">
            <a className="button" href="#propuesta">
              Explorar la propuesta <Arrow />
            </a>
            <Instagram className="text-link">Seguí la nueva etapa</Instagram>
          </div>
        </div>
        <div className="hero-art">
          <CoffeePrint />
          <span className="print-caption">
            ESTUDIO GRÁFICO / CAFÉ & CULTURA
          </span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>
          {site.stage === "open"
            ? "UN NUEVO CAPÍTULO EN MUSASHI"
            : "UN NUEVO ESPACIO. LA MISMA ESENCIA."}
        </span>
        <a href="#propuesta" aria-label="Continuar a la propuesta">
          SEGUÍ LEYENDO <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
function Proposal() {
  return (
    <section id="propuesta" className="proposal section">
      <div className="editorial-label">
        <span className="section-index">02 / ENTRE DOS UNIVERSOS</span>
        <span className="tiny-square" aria-hidden="true" />
      </div>
      <h2>
        UN POCO DE JAPÓN.
        <br />
        UN BUEN CAFÉ.
        <br />
        <span className="marked-word">ALGO EN COMÚN.</span>
      </h2>
      <div className="proposal-bottom">
        <span className="caption">CAFÉ / PASTELERÍA / CULTURA</span>
        <p>
          El placer de descubrir otro sabor.
          <br />
          La emoción de compartir un universo.
          <br />
          No hace falta tener un anime favorito.
        </p>
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
  const Title = full ? "h1" : "h2";
  return (
    <section
      id="carta"
      className={`section menu-section ${full ? "full-menu" : ""}`}
    >
      <div className="menu-heading">
        <div>
          <span className="section-index">03 / LA CARTA</span>
          <Title>
            OTRA FORMA
            <br />
            DE <span className="slanted-word">MERENDAR.</span>
          </Title>
        </div>
        <div className="menu-intro">
          <span className="caption">
            {site.draft
              ? "SELECCIÓN ILUSTRATIVA PARA EL BOCETO"
              : "NUESTRA CARTA"}
          </span>
          {site.draft && (
            <p>
              Antecedentes de Musashi.
              <br />
              Carta y disponibilidad por confirmar.
            </p>
          )}
        </div>
      </div>
      <div className="menu-toolbar">
        <div className="filters" role="group" aria-label="Filtrar carta">
          {["Todo", "Café", "Pastelería"].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
              <Arrow />
            </button>
          ))}
        </div>
        <span className="caption menu-toolbar-note">EXPLORÁ LOS SABORES</span>
      </div>
      <div className="product-list" aria-live="polite">
        {shown.map((p) => (
          <article className="product" key={p.id}>
            <span className="product-index" aria-hidden="true">
              {String(products.indexOf(p) + 1).padStart(2, "0")}
            </span>
            <div className="product-name">
              <span className="caption">{p.category}</span>
              <h3>{p.name}</h3>
            </div>
            {p.image && (
              <img
                className="product-image"
                src={p.image}
                alt={p.name}
                width="240"
                height="180"
                loading="lazy"
              />
            )}
            <div className="product-description">
              <p>{p.description}</p>
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
            </div>
            <span className="product-end" aria-hidden="true">
              /
            </span>
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
          Ver la carta ilustrativa completa
          <Arrow />
        </a>
      )}
    </section>
  );
}
function Experience() {
  return (
    <section id="experiencia" className="experience section">
      <div className="experience-heading">
        <span className="section-index">04 / EL UNIVERSO MUSASHI</span>
        <h2>
          NO ES SOLO
          <br />
          <span>LA PAUSA.</span>
        </h2>
      </div>
      <div className="manga-panels">
        <div
          className={`panel panel-main ${site.visuals.spacePhoto ? "has-photo" : ""}`}
        >
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
              <span className="panel-label">EL PUNTO DE ENCUENTRO</span>
              <p>
                ES LO QUE
                <br />
                COMPARTÍS
                <br />
                <span>EN ELLA.</span>
              </p>
              <span className="panel-corner">
                <Arrow />
              </span>
            </>
          )}
        </div>
        <div className="panel panel-story">
          <span className="caption">CAFÉ + CULTURA JAPONESA</span>
          <h3>
            Tu universo.
            <br />
            Nuestra mesa.
          </h3>
          <p>
            Una conversación sobre ese capítulo. El descubrimiento de un sabor.
            Las ganas de volver a encontrarse.
          </p>
          <p>
            Musashi conecta café, pastelería y cultura japonesa. Cada quien trae
            su propia historia.
          </p>
          <a className="text-link" href="#contacto">
            Conocé la nueva etapa
            <Arrow />
          </a>
        </div>
        <div className="panel panel-note">
          <span className="panel-note-index" aria-hidden="true">
            04
          </span>
          <p>
            CON O SIN
            <br />
            ANIME FAVORITO.
          </p>
          <span className="caption">HAY ALGO PARA COMPARTIR.</span>
        </div>
      </div>
    </section>
  );
}
function RamenPrint() {
  return (
    <svg
      className="ramen-print"
      viewBox="0 0 520 400"
      fill="none"
      role="img"
      aria-label="Ilustración editorial en blanco y negro de un cuenco de ramen"
    >
      <path
        d="M60 164c15 137 102 181 200 181s185-44 200-181"
        fill="currentColor"
      />
      <ellipse
        cx="260"
        cy="165"
        rx="200"
        ry="57"
        fill="#080808"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path
        d="M106 169c26-35 72-35 104-9s73 24 101-1 57-24 95 8M123 190c28-30 64-25 91-3s61 23 89 0 50-22 82-3M146 143c22-19 40-12 60 2"
        stroke="currentColor"
        strokeWidth="5"
      />
      <ellipse cx="331" cy="145" rx="37" ry="25" fill="currentColor" />
      <ellipse cx="331" cy="145" rx="16" ry="12" fill="#080808" />
      <path
        d="m343 103 121-95m-99 104 120-94"
        stroke="currentColor"
        strokeWidth="7"
      />
      <path d="M119 263c41 46 105 60 158 55" stroke="#080808" strokeWidth="3" />
      <path
        d="M166 88c-16-22 21-25 8-48M218 78c-20-31 20-33 8-60"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function Events() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  if (!site.draft && demoEvent.status === "illustrative")
    return (
      <section id="eventos" className="section events-pending">
        <span className="section-index">05 / ENCUENTROS ESPECIALES</span>
        <h2>
          HISTORIAS
          <br />
          POR COMPARTIR.
        </h2>
        <Instagram className="text-link">Las novedades en Instagram</Instagram>
      </section>
    );
  return (
    <section id="eventos" className="events section">
      <div className="event-label">
        <span className="section-index">05 / FUERA DE CARTA</span>
        <span className="caption">EXPERIENCIAS ESPECIALES</span>
      </div>
      <article className="event-poster">
        <div className="poster-title">
          <span className="caption">UN ENCUENTRO ALREDEDOR DE LA MESA</span>
          <h2>
            NOCHE
            <br />
            DE <span>RAMEN</span>
          </h2>
          <span className="poster-stamp">
            EJEMPLO DE
            <br />
            PRESENTACIÓN
          </span>
        </div>
        <div className="poster-art">
          <RamenPrint />
        </div>
        <div className="poster-bottom">
          <p>
            Un antecedente de Musashi.
            <br />
            Una forma de imaginar los próximos encuentros.
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
          <span className="section-index">EJEMPLO DE PRESENTACIÓN</span>
          <h2 id="event-title">{demoEvent.title}</h2>
          <p>
            Esta composición muestra cómo podría presentarse una experiencia
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
      <div className="contact-top">
        <span className="section-index">06 / LA HISTORIA SIGUE</span>
        <span className="caption">MUSASHI / MENDOZA</span>
      </div>
      <div className="contact-main">
        <h2>
          {site.stage === "coming-soon" ? (
            <>
              EL PRÓXIMO
              <br />
              CAPÍTULO,
              <br />
              <span>JUNTOS.</span>
            </>
          ) : (
            <>
              NOS VEMOS
              <br />
              EN <span>MUSASHI.</span>
            </>
          )}
        </h2>
        <div className="contact-action">
          <p>
            {site.stage === "coming-soon"
              ? "Un nuevo espacio está por escribirse."
              : "Un nuevo capítulo para compartir."}
            <br />
            Seguí las novedades en nuestro Instagram.
          </p>
          {site.business.address && <p>{site.business.address}</p>}
          {site.business.hours && <p>{site.business.hours}</p>}
          <Instagram className="contact-instagram">
            @musashi.animecafe
          </Instagram>
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
            ? "Propuesta de diseño · Imágenes y contenido sujetos a confirmación"
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
