import { useEffect, useState } from "react";
import { parseOfficialEvents, isEventPast, type OfficialEvent } from "./events";
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
export function OfficialAgenda({
  events,
  state,
}: {
  events: OfficialEvent[];
  state: string;
}) {
  return (
    <section className="official-agenda section" id="agenda">
      <p className="eyebrow">ENCUENTROS / AGENDA OFICIAL</p>
      <h2>Una próxima ocasión para encontrarnos.</h2>
      {state === "loading" ? (
        <p role="status">Consultando la agenda…</p>
      ) : state === "error" ? (
        <p>
          No pudimos consultar la agenda.{" "}
          <a href="#reservas">Consultá los próximos encuentros por WhatsApp</a>.
        </p>
      ) : !events.length ? (
        <p>
          Todavía no hay encuentros publicados. Consultá las próximas fechas por
          WhatsApp.
        </p>
      ) : (
        <div className="agenda-grid">
          {events.map((event) => {
            const past = isEventPast(event) || event.status === "finished";
            const available = !past && event.status === "upcoming";
            return (
              <article className="agenda-card" key={event.id}>
                <p className="eyebrow">
                  {past
                    ? "FINALIZADO"
                    : event.status === "full"
                      ? "COMPLETO"
                      : "PRÓXIMO ENCUENTRO"}
                </p>
                <h3>{event.title}</h3>
                <p>
                  <time dateTime={`${event.date}T${event.time}:00-03:00`}>
                    {new Intl.DateTimeFormat("es-AR", {
                      dateStyle: "long",
                    }).format(new Date(`${event.date}T12:00:00-03:00`))}{" "}
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
                {available && (
                  <a
                    className="text-link"
                    href={`/?evento=${encodeURIComponent(event.id)}#reservas`}
                  >
                    Solicitar lugar →
                  </a>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
