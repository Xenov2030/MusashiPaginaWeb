import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Visual } from "./Visual";
import { SeasonalMenu } from "./SeasonalMenu";
import { useHashNavigation, useSectionMotion } from "./motion";
import { site, conceptualVisuals, copy, historicalContext } from "./content";
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
import { OwnerHistory } from "./OwnerHistory";
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
  ["Reservas", "/#reservas"],
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
      {compact && site.visuals.logo && (
        <strong className="brand-name" aria-hidden="true">
          MUSASHI
        </strong>
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
              className={
                label === "Reservas" ? "header-reservations" : undefined
              }
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
  const scene = site.visuals.heroScene ?? conceptualVisuals.hero;
  return (
    <section
      id="inicio"
      className={`hero table-hero ${scene.kind === "confirmed" ? "hero-real" : "hero-conceptual"}`}
    >
      <figure className="hero-visual hero-brand">
        <Visual resource={scene} priority />
        <figcaption>
          {scene.kind === "confirmed"
            ? "MUSASHI / JAPÓN DETRÁS DE UNA PUERTA"
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
          <a className="text-link" href="#reservas">
            Reservas <Arrow />
          </a>
        </div>
        {copy.hero.stage && <p className="stage-note">{copy.hero.stage}</p>}
      </div>
      <Ambient />
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
            <SeasonalMenu full />
            <Reservations events={agenda.events} />
            <ExperienceContact />
          </>
        ) : (
          <>
            <Hero />
            <Essence />
            <CoffeeIntro />
            <SeasonalMenu />
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
