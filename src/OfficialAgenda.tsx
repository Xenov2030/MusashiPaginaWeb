import { useEffect, useState } from "react";
import { parseOfficialEvents, isEventPast, type OfficialEvent } from "./events";
import { EventImage } from "./EventImage";
import { EventCarousel } from "./EventCarousel";
export function useOfficialEvents() {
  const [events, setEvents] = useState<OfficialEvent[]>([]);
  const [state, setState] = useState("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/events", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((value) => {
        setEvents(parseOfficialEvents(value));
        setState("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setState("error");
      });
    return () => controller.abort();
  }, []);
  return { events, state };
}
function EventDetails({ event }: { event: OfficialEvent }) {
  return (
    <div className="event-details">
      <p className="eyebrow">
        {event.demo
          ? "PRÓXIMO EVENTO · DEMOSTRACIÓN"
          : event.status === "full"
            ? "COMPLETO"
            : "PRÓXIMO ENCUENTRO"}
      </p>
      <h3>{event.title}</h3>
      <p className="event-date">
        <time dateTime={`${event.date}T${event.time}:00-03:00`}>
          {new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(
            new Date(`${event.date}T12:00:00-03:00`),
          )}{" "}
          · {event.time} h
        </time>
      </p>
      <p className="event-public-text">{event.description}</p>
      {event.priceARS !== null && (
        <p>
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
          }).format(event.priceARS)}
        </p>
      )}
      {event.conditions.map((condition, i) => (
        <p key={i}>{condition}</p>
      ))}
      {event.status === "upcoming" && (
        <a
          className="button"
          href={`/?evento=${encodeURIComponent(event.id)}#reservas`}
        >
          {event.demo ? "Probar reserva →" : "Solicitar lugar →"}
        </a>
      )}
    </div>
  );
}
export function OfficialAgenda({
  events,
  state,
}: {
  events: OfficialEvent[];
  state: string;
}) {
  const upcoming = events
    .filter((e) => !isEventPast(e) && e.status !== "finished")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const previous = events
    .filter((e) => isEventPast(e) || e.status === "finished")
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  const next = upcoming[0];
  return (
    <section className="official-agenda section" id="agenda">
      <p className="eyebrow">
        {events.some((event) => event.demo)
          ? "ENCUENTROS / AGENDA DE MUESTRA"
          : "ENCUENTROS / AGENDA OFICIAL"}
      </p>
      <h2>Tu próxima cita con Musashi.</h2>
      {events.some((event) => event.demo) && (
        <p className="demo-agenda-note">
          Agenda de muestra · Eventos y fechas ficticios para visualizar la
          propuesta.
        </p>
      )}
      {state === "loading" ? (
        <p role="status">Consultando la agenda…</p>
      ) : state === "error" ? (
        <p>
          No pudimos consultar la agenda.{" "}
          <a href="#reservas">Consultá los próximos encuentros por WhatsApp</a>.
        </p>
      ) : (
        <p>
          {next
            ? "Una experiencia para compartir. Elegí tu encuentro y consultá por tu lugar."
            : "Todavía no hay encuentros publicados. La próxima fecha se anunciará acá."}
        </p>
      )}
      {next ? (
        <article className="agenda-card featured-event">
          <EventImage
            key={next.id + next.imageUrl}
            imageUrl={next.imageUrl}
            title={next.title}
          />
          <EventDetails event={next} />
        </article>
      ) : (
        <div className="featured-event event-awaiting">
          <EventImage title="Próximos encuentros de Musashi" />
          <div className="event-details">
            <p className="eyebrow">UNA NUEVA OCASIÓN PARA ENCONTRARNOS</p>
            <h3>La próxima mesa, por descubrir.</h3>
            <p>
              Estamos preparando nuevos encuentros. Acá vas a encontrar la
              imagen, la fecha y la propuesta de cada evento cuando se publique.
            </p>
            <a className="button" href="#reservas">
              Consultar próximos encuentros →
            </a>
          </div>
        </div>
      )}
      {upcoming.length > 1 && (
        <div className="agenda-grid">
          {upcoming.slice(1).map((event) => (
            <article className="agenda-card" key={event.id}>
              <EventImage
                key={event.id + event.imageUrl}
                imageUrl={event.imageUrl}
                title={event.title}
              />
              <EventDetails event={event} />
            </article>
          ))}
        </div>
      )}
      <EventCarousel events={previous} />
    </section>
  );
}
