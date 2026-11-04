import { useEffect, useRef, useState } from "react";
import { conceptualVisuals } from "./content";
import { type OfficialEvent } from "./events";
import { EventImage, eventFallback } from "./EventImage";
const illustrations = [
  {
    id: "ramen",
    title: "Alrededor de un ramen",
    description: "Una inspiración para los encuentros alrededor de la mesa.",
    fallback: conceptualVisuals.ramen.src,
  },
  {
    id: "mesa",
    title: "Una mesa para compartir",
    description: "Café, té y sabores de inspiración japonesa.",
    fallback: conceptualVisuals.hero.src,
  },
  {
    id: "oficio",
    title: "El oficio que nos reúne",
    description: "Una mirada al universo del café, el té y la coctelería.",
    fallback: conceptualVisuals.experience.src,
  },
];
export function EventCarousel({ events }: { events: OfficialEvent[] }) {
  const slides: {
    id: string;
    title: string;
    description: string;
    fallback: string;
    imageUrl?: string | null;
    date?: string;
    demo?: boolean;
  }[] = events.length
    ? events.map((e) => ({ ...e, fallback: eventFallback(e) }))
    : illustrations;
  const demoGallery = events.length > 0 && events.every((e) => e.demo);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(
    document.visibilityState === "visible",
  );
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const region = useRef<HTMLElement>(null);
  const current = Math.min(index, slides.length - 1);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    const visibility = () => setVisible(document.visibilityState === "visible");
    const observer = new IntersectionObserver((entries) =>
      setInView(entries[0]?.isIntersecting ?? false),
    );
    if (region.current) observer.observe(region.current);
    media.addEventListener("change", change);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (
      paused ||
      interacting ||
      reduced ||
      !visible ||
      !inView ||
      slides.length < 2
    )
      return;
    const interval = window.setInterval(() => {
      if (
        !matchMedia("(prefers-reduced-motion: reduce)").matches &&
        document.visibilityState === "visible"
      )
        setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused, interacting, reduced, visible, inView, slides.length]);
  const move = (offset: number) => {
    setPaused(true);
    setIndex((current + offset + slides.length) % slides.length);
  };
  return (
    <section
      ref={region}
      className="event-archive"
      data-carousel-state={
        reduced
          ? "reduced"
          : paused || interacting || !visible || !inView || slides.length < 2
            ? "paused"
            : "running"
      }
      aria-label="Imágenes de encuentros anteriores"
      aria-roledescription="carrusel"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false);
      }}
    >
      <div className="archive-heading">
        <div>
          <p className="eyebrow">
            {events.length
              ? demoGallery
                ? "ENCUENTROS DE MUESTRA"
                : "MOMENTOS QUE YA COMPARTIMOS"
              : "ENCUENTROS / GALERÍA EN PREPARACIÓN"}
          </p>
          <h2>Lo que nos reúne.</h2>
        </div>
        <p>
          {events.length
            ? demoGallery
              ? "Encuentros ficticios para mostrar cómo se verá la galería de eventos anteriores."
              : "Una mirada a los encuentros anteriores de Musashi."
            : "Acá vivirán las imágenes de nuestros encuentros. Mientras llegan las fotos reales, explorá estas imágenes conceptuales."}
        </p>
      </div>
      <div className="archive-stage" aria-live="off">
        {slides.map((slide, i) => (
          <article
            key={slide.id}
            hidden={i !== current}
            className={`archive-slide ${events.length ? "agenda-card" : ""}`}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${slides.length}`}
          >
            <EventImage
              key={`${slide.id}-${"imageUrl" in slide ? slide.imageUrl : ""}`}
              imageUrl={"imageUrl" in slide ? slide.imageUrl : null}
              title={slide.title}
              fallback={slide.fallback}
            />
            <div className="archive-copy">
              <p className="eyebrow">
                {slide.demo
                  ? "EJEMPLO DE ENCUENTRO ANTERIOR"
                  : events.length
                    ? "ENCUENTRO FINALIZADO"
                    : "INSPIRACIÓN VISUAL"}
              </p>
              <h3>{slide.title}</h3>
              {slide.date && (
                <p>
                  {new Intl.DateTimeFormat("es-AR", {
                    dateStyle: "long",
                  }).format(new Date(`${slide.date}T12:00:00-03:00`))}
                </p>
              )}
              <p>{slide.description}</p>
            </div>
          </article>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="carousel-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Imagen anterior"
          >
            ←
          </button>
          <span>
            {current + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Imagen siguiente"
          >
            →
          </button>
          {!reduced && (
            <button
              type="button"
              className="carousel-pause"
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? "Reanudar carrusel" : "Pausar carrusel"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
