import { useEffect, useState, type FormEvent } from "react";
import { hospitality, site } from "./content";
import {
  buildReservationUrl,
  todayInMendoza,
  whatsappContactUrl,
} from "./reservations";
import { isEventPast, type OfficialEvent } from "./events";

export function PetFriendly({ compact = false }: { compact?: boolean }) {
  if (!site.business.petFriendly) return null;
  return (
    <span className={`pet-friendly ${compact ? "pet-compact" : ""}`}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <ellipse cx="7" cy="8" rx="2" ry="3" transform="rotate(-15 7 8)" />
        <ellipse cx="17" cy="8" rx="2" ry="3" transform="rotate(15 17 8)" />
        <ellipse
          cx="3"
          cy="13"
          rx="1.7"
          ry="2.4"
          transform="rotate(-25 3 13)"
        />
        <ellipse
          cx="21"
          cy="13"
          rx="1.7"
          ry="2.4"
          transform="rotate(25 21 13)"
        />
        <path d="M6 19c0-3 3-7 6-7s6 4 6 7c0 3-4 1-6 1s-6 2-6-1Z" />
      </svg>
      <span>Pet friendly{!compact && " · Tu mascota es bienvenida"}</span>
    </span>
  );
}
export function Reservations({ events }: { events: OfficialEvent[] }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("2");
  const [pet, setPet] = useState(false);
  const [notes, setNotes] = useState("");
  const [eventId, setEventId] = useState("");
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);
  const availableEvents = events.filter(
    (event) => event.status === "upcoming" && !isEventPast(event),
  );
  const contact = whatsappContactUrl(site.business.whatsapp);
  const chooseEvent = (id: string) => {
    setEventId(id);
    setOpened(false);
    const event = availableEvents.find((event) => event.id === id);
    setDate(event?.date ?? "");
    setTime(event?.time ?? "");
  };
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("evento");
    if (id && events.length) {
      const event = events.find((e) => e.id === id);
      if (event && event.status === "upcoming" && !isEventPast(event))
        chooseEvent(id);
      else
        setError(
          "Este encuentro no admite nuevas solicitudes. Podés hacer una consulta general.",
        );
    }
  }, [events]);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setOpened(false);
    const event = availableEvents.find((event) => event.id === eventId);
    if (eventId && !event) {
      setError(
        "Ese encuentro no admite nuevas solicitudes. Elegí otra opción.",
      );
      return;
    }
    if (date < todayInMendoza()) {
      setError("Elegí una fecha actual o futura.");
      return;
    }
    const url = buildReservationUrl(site.business.whatsapp, {
      date,
      time,
      people: Number(people),
      pet,
      notes,
      test: site.business.whatsappTest,
      event: event ? `${event.demo ? "[DEMO] " : ""}${event.title}` : undefined,
    });
    if (!url) {
      setError("Revisá la fecha, el horario y la cantidad de personas.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setOpened(true);
  };
  return (
    <section id="reservas" className="reservations section">
      <div className="reservation-intro" data-reveal="rise">
        <p className="eyebrow">RESERVAS / LA MESA DE MUSASHI</p>
        <h2>{hospitality.reservations.title}</h2>
        <p>{hospitality.reservations.intro}</p>
        <div className="private-address">
          <span className="eyebrow">LA DIRECCIÓN, ENTRE NOSOTROS</span>
          <p>{hospitality.reservations.privateAddress}</p>
        </div>
        <PetFriendly />
      </div>
      <form
        className="reservation-form"
        onSubmit={submit}
        aria-label="Solicitar reserva por WhatsApp"
      >
        {site.business.whatsappTest && (
          <p className="test-notice">
            WhatsApp de prueba: las solicitudes llegan a Nicolas, no al local.
            No confirma reservas reales.
          </p>
        )}
        <div className="reservation-fields">
          {availableEvents.length > 0 && (
            <label className="field-wide">
              ¿Venís a un encuentro?
              <select
                value={eventId}
                onChange={(e) => chooseEvent(e.target.value)}
              >
                <option value="">Consulta general</option>
                {availableEvents.map((event) => (
                  <option value={event.id} key={event.id}>
                    {event.demo ? "Demo · " : ""}
                    {event.title} · {event.date}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            Fecha deseada
            <input
              type="date"
              required
              min={todayInMendoza()}
              value={date}
              readOnly={Boolean(eventId)}
              onChange={(e) => {
                setDate(e.target.value);
                setOpened(false);
              }}
            />
          </label>
          <label>
            Horario deseado
            <input
              type="time"
              required
              value={time}
              readOnly={Boolean(eventId)}
              onChange={(e) => {
                setTime(e.target.value);
                setOpened(false);
              }}
            />
          </label>
          <label className="field-wide">
            Cantidad de personas
            <input
              type="number"
              min="1"
              step="1"
              required
              value={people}
              onChange={(e) => {
                setPeople(e.target.value);
                setOpened(false);
              }}
            />
          </label>
          <label className="field-wide">
            ¿Querés contarnos algo? <span className="optional">Opcional</span>
            <textarea
              value={notes}
              maxLength={300}
              rows={3}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          {site.business.petFriendly && (
            <label className="pet-checkbox field-wide">
              <input
                type="checkbox"
                checked={pet}
                onChange={(e) => setPet(e.target.checked)}
              />
              Voy con mi mascota
            </label>
          )}
        </div>
        <p className="reservation-clarification">
          {hospitality.reservations.confirmation}
        </p>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button" type="submit" disabled={!contact}>
          Solicitar por WhatsApp<span aria-hidden="true"> →</span>
        </button>
        {!contact && (
          <p className="contact-pending">
            Mientras habilitamos este canal,{" "}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              consultá por Instagram
            </a>
            .
          </p>
        )}
        {opened && (
          <p className="reservation-feedback" role="status">
            Continuá la conversación en WhatsApp. La solicitud aún no está
            confirmada.
          </p>
        )}
      </form>
    </section>
  );
}
export function HolisticSpace() {
  const contact = whatsappContactUrl(site.business.whatsapp);
  return (
    <aside className="holistic-space">
      <div>
        <p className="eyebrow">TAMBIÉN EN MUSASHI</p>
        <h2>{hospitality.holistic.title}</h2>
      </div>
      <div>
        <p>{hospitality.holistic.description}</p>
        <a
          className="text-link"
          href={contact ?? site.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.business.whatsappTest
            ? "Consultar propuestas · WhatsApp de prueba"
            : "Consultar propuestas"}
          <span aria-hidden="true"> →</span>
        </a>
      </div>
    </aside>
  );
}
