import { useEffect, useState } from "react";
import { site } from "./content";
import { type OfficialEvent, isEventPast } from "./events";
import {
  reservationContact,
  reservationRoutes,
  type ReservationRoute,
} from "./reservation-config";
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
  const [route, setRoute] = useState<ReservationRoute>(() => {
    const value = new URLSearchParams(location.search).get("reserva");
    return value === "tatami" || value === "bienestar" ? value : "mesa";
  });
  const [event, setEvent] = useState<OfficialEvent | null>(null);
  useEffect(() => {
    const id = new URLSearchParams(location.search).get("evento");
    if (id)
      setEvent(
        events.find(
          (e) =>
            e.id === id &&
            e.status === "upcoming" &&
            !e.demo &&
            !isEventPast(e),
        ) ?? null,
      );
  }, [events]);
  const item = reservationRoutes[route];
  const contact = reservationContact(route);
  return (
    <section id="reservas" className="reservations section">
      <div className="reservation-intro" data-reveal="rise">
        <p className="eyebrow">RESERVAS / ELEGÍ TU EXPERIENCIA</p>
        <h2>¿Cómo querés disfrutar Musashi?</h2>
        <p>
          Tres recorridos para consultar con el equipo correspondiente. Enviar
          una consulta no equivale a reservar.
        </p>
        <div className="private-address">
          <span className="eyebrow">LA DIRECCIÓN, ENTRE NOSOTROS</span>
          <p>
            La dirección se comparte al confirmar la reserva por el canal
            acordado con el equipo.
          </p>
        </div>
        <PetFriendly />
      </div>
      <div className="reservation-selector">
        <div
          className="reservation-options"
          role="group"
          aria-label="Tipo de reserva"
        >
          {Object.entries(reservationRoutes).map(([key, value]) => (
            <button
              key={key}
              type="button"
              aria-pressed={route === key}
              onClick={() => setRoute(key as ReservationRoute)}
            >
              {value.title}
            </button>
          ))}
        </div>
        <div className="reservation-route" aria-live="polite">
          <p className="eyebrow">
            CONSULTA /{" "}
            {route === "bienestar"
              ? "EQUIPO DE BIENESTAR"
              : route === "tatami"
                ? "TATAMI PRIVADO"
                : "CAFETERÍA"}
          </p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {event && route === "mesa" && (
            <p className="reservation-event">
              Encuentro: {event.title} · {event.date} · {event.time} h
            </p>
          )}
          {contact.channel === "instagram" && (
            <p className="contact-pending">
              El WhatsApp de este recorrido está pendiente de confirmación. La
              consulta provisional se hace por Instagram oficial.
            </p>
          )}
          <a
            className="button"
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.channel === "instagram"
              ? "Consultar por Instagram"
              : "Consultar por WhatsApp"}
            <svg
              width="17"
              height="17"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M4 16 16 4M4 4h12v12" />
            </svg>
          </a>
          <p className="reservation-clarification">
            La disponibilidad y las condiciones se confirman en la conversación.
            Esta consulta no confirma una reserva.
          </p>
        </div>
      </div>
    </section>
  );
}
