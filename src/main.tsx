import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { preload } from "react-dom";
import { useHashNavigation, useSectionMotion } from "./motion";
import {
  confirmedProducts,
  demoEvent,
  demoProducts,
  site,
  conceptualVisuals,
  copy,
  type VisualResource,
  categories,
  disciplines,
  craft,
  encounters,
  historicalContext,
} from "./content";
import "./style.css";
import { Reservations, PetFriendly, HolisticSpace } from "./Reservations";
import { OfficialAgenda, useOfficialEvents } from "./OfficialAgenda";
import { WhatsAppBubble } from "./WhatsAppBubble";
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
  ["Inicio", "/#inicio"],
  ["Carta", "/carta"],
  ["El oficio", "/#experiencia"],
  ["Eventos", "/#agenda"],
  ["Reservas", "/#reservas"],
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
        <img src={site.visuals.logo} alt="Musashi" width="160" height="64" />
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
  const [active, setActive] = useState(isMenu ? "Carta" : "Inicio");
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
          [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
          { duration: 680, easing: "cubic-bezier(.2,.7,.25,1)" },
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
      className={`visual is-${status} ${className}`}
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
          LA MESA DE MUSASHI / UNA INTERPRETACIÓN CONCEPTUAL
        </figcaption>
      </figure>
      <div className="hero-copy hero-paper">
        <p className="eyebrow">MENDOZA · CULTURA JAPONESA</p>
        <h1>
          <span className="hero-line">{copy.hero.headline[0]}</span>
          <span className="hero-line">{copy.hero.headline[1]}</span>
          <span className="hero-line">
            <em className="brush-word">Musashi.</em>
          </span>
        </h1>
        <p className="hero-intro">{copy.hero.intro}</p>
        <PetFriendly compact />
        <div className="hero-actions">
          <a className="button" href="#carta">
            Explorar la carta
            <Arrow />
          </a>
          <a className="text-link" href="#reservas">
            Reservar una mesa<span aria-hidden="true"> →</span>
          </a>
        </div>
        <p className="stage-note">
          {site.stage === "open"
            ? "Conocé nuestra propuesta."
            : copy.hero.stage}
        </p>
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
      <div className="menu-heading" data-reveal="rise">
        <div>
          <p className="eyebrow">LA MESA DE MUSASHI</p>
          <Title>
            {full ? "Una carta para descubrir." : copy.menu.title}
            <br />
            <em className="menu-subtitle">{copy.menu.subtitle}</em>
          </Title>
        </div>
        <span className="menu-edition">Tomate un ratito.</span>
      </div>
      {site.draft && <p className="draft-note">{copy.draftNote}</p>}
      <div className="menu-leaf">
        <div className="menu-leaf-top">
          <span>MUSASHI</span>
          <span>
            {full ? "Carta de propuesta" : "Una selección ilustrativa"}
          </span>
        </div>
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
                Podés empezar por las texturas: el mochi es elástico, el
                dorayaki es esponjoso y el cheesecake japonés, aireado. Son
                preparaciones distintas, no una lista de sabores confirmados.
              </p>
              <p>
                Cuando esté disponible la carta oficial, podrás consultar
                opciones, ingredientes y precios. Para información alimentaria,
                esperá la confirmación del equipo.
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
function Experience() {
  const resource =
    site.owner.portrait ??
    site.visuals.experienceSpace ??
    conceptualVisuals.experience;
  const details = [
    site.visuals.experienceDetail,
    site.visuals.experienceTable,
  ].filter((x): x is VisualResource => x !== null);
  return (
    <section id="experiencia" className="experience craft-section section">
      <div className="craft-heading" data-reveal="rise">
        <p className="eyebrow">EL OFICIO DETRÁS DE MUSASHI</p>
        <h2>
          La curiosidad invita.
          <br />
          <em>El oficio cuida.</em>
        </h2>
        <p>
          {site.owner.name
            ? `${site.owner.name} es barista profesional, tea blender y bartender.`
            : "Detrás de Musashi hay un barista profesional, tea blender y bartender."}{" "}
          Tres miradas para descubrir una bebida, con atención a los detalles.
        </p>
      </div>
      <div className="craft-story">
        <figure className="experience-composition" data-reveal="image">
          <div className="experience-main">
            <Visual resource={resource} />
          </div>
          <figcaption>
            {resource.kind === "conceptual"
              ? "UNA INTERPRETACIÓN ILUSTRADA DEL OFICIO"
              : "UNA MIRADA A MUSASHI"}
          </figcaption>
        </figure>
        <div className="craft-notes">
          {craft.map((item, i) => (
            <article
              key={item.title}
              className={`craft-note craft-note-${i + 1}`}
              data-reveal="rise"
            >
              <span className="craft-rule" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
          <a className="text-link" href="#contacto">
            Seguimos en contacto<span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
      {details.length > 0 && (
        <div className="experience-details">
          {details.map((resource) => (
            <figure key={resource.src}>
              <Visual resource={resource} />
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
function Events() {
  const [selected, setSelected] = useState(2);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const modalAnimation = useRef<Animation | null>(null);
  const closeModal = () => {
    const el = dialog.current;
    if (!el || closing.current || !el.open) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !el.animate) {
      el.close();
      return;
    }
    closing.current = true;
    el.classList.add("is-closing");
    modalAnimation.current?.cancel();
    const motion = el.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(8px) scale(.99)" },
      ],
      { duration: 160, easing: "ease-in", fill: "forwards" },
    );
    modalAnimation.current = motion;
    motion.finished
      .then(() => {
        el.close();
        motion.cancel();
        closing.current = false;
      })
      .catch(() => {
        closing.current = false;
      });
  };
  useEffect(() => () => modalAnimation.current?.cancel(), []);
  const openModal = () => {
    closing.current = false;
    modalAnimation.current?.cancel();
    dialog.current?.classList.remove("is-closing");
    dialog.current?.showModal();
    if (
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      dialog.current?.animate
    )
      modalAnimation.current =
        dialog.current?.animate(
          [
            { opacity: 0.4, transform: "translateY(10px) scale(.99)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          { duration: 220, easing: "ease-out" },
        ) ?? null;
  };
  if (!site.draft && demoEvent.status === "illustrative")
    return (
      <section id="eventos" className="section">
        <p className="eyebrow">ENCUENTROS MUSASHI</p>
        <h2>
          Las novedades,
          <br />
          en nuestro Instagram.
        </h2>
        <Instagram className="text-link">Ver novedades</Instagram>
      </section>
    );
  const choose = (index: number) => {
    opener.current = document.activeElement as HTMLButtonElement;
    setSelected(index);
    openModal();
  };
  return (
    <section id="eventos" className="events encounters-section section">
      <div className="encounter-heading" data-reveal="rise">
        <p className="eyebrow">ENCUENTROS MUSASHI</p>
        <h2>
          Alrededor
          <br />
          <em>de la mesa.</em>
        </h2>
        <p>
          Onigiris, tatamis y ramen forman parte de los antecedentes de Musashi.
          Estas notas recuerdan la propuesta; no anuncian próximos eventos.
        </p>
      </div>
      <div className="encounter-table">
        <article className="encounter-note onigiri-note" data-reveal="poster">
          <span className="example-tag">Antecedente de encuentro</span>
          <h3>
            Noches de
            <br />
            onigiris.
          </h3>
          <p>{encounters[0].description}</p>
          <button className="text-link" onClick={() => choose(0)}>
            Conocer onigiris<span aria-hidden="true"> →</span>
          </button>
        </article>
        <article
          className="encounter-note tatami-note"
          data-reveal="rise"
          data-motion-delay="100"
        >
          <span className="eyebrow">OTRA FORMA DE REUNIRSE</span>
          <h3>
            Encuentros
            <br />
            en tatamis.
          </h3>
          <p>{encounters[1].description}</p>
          <button className="text-link" onClick={() => choose(1)}>
            Conocer tatamis<span aria-hidden="true"> →</span>
          </button>
        </article>
        <article
          className="event-poster ramen-note"
          data-reveal="image"
          data-motion-delay="140"
        >
          <figure className="poster-visual">
            <Visual resource={conceptualVisuals.ramen} />
            <figcaption>
              IMAGEN CONCEPTUAL / NO ES UN REGISTRO DEL ENCUENTRO
            </figcaption>
          </figure>
          <div className="poster-copy">
            <span
              className="poster-accent"
              data-reveal="stroke"
              aria-hidden="true"
            />
            <span className="example-tag">Ejemplo de presentación</span>
            <h3>
              Noche
              <br />
              de Ramen.
            </h3>
            <p>{encounters[2].description}</p>
            <button
              ref={opener}
              className="text-link"
              onClick={() => choose(2)}
            >
              Conocer la propuesta
              <Arrow />
            </button>
          </div>
        </article>
      </div>
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
        onCancel={(e) => {
          e.preventDefault();
          closeModal();
        }}
        onClose={() => {
          closing.current = false;
          dialog.current?.classList.remove("is-closing");
          modalAnimation.current?.cancel();
          opener.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) closeModal();
        }}
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            aria-label="Cerrar detalle del evento"
            onClick={closeModal}
          >
            ×
          </button>
          <p className="eyebrow">EJEMPLO DE PRESENTACIÓN</p>
          <h2 id="event-title">{encounters[selected].title}</h2>
          <p>{encounters[selected].detail}</p>
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
        <p>La dirección se comparte por WhatsApp al confirmar la reserva.</p>
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
            {site.business.whatsappTest
              ? "WhatsApp de prueba"
              : "Consultar por WhatsApp"}
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
      : "Musashi · La mesa de Musashi";
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
            <HolisticSpace />
            <Contact />
          </>
        ) : (
          <>
            <Hero />

            <Menu />
            <Experience />
            <OfficialAgenda {...agenda} />
            <Events />
            <NameHistory />
            <Reservations events={agenda.events} />
            <HolisticSpace />
            <Contact />
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
