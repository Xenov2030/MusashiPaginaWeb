import { reservationContact } from "./reservation-config";
export function WhatsAppBubble() {
  const contact = reservationContact("mesa");
  return (
    <a
      className="whatsapp-bubble"
      href={contact.channel === "whatsapp" ? contact.href : "/#reservas"}
      aria-label={
        contact.channel === "whatsapp"
          ? "Consultar mesa por WhatsApp"
          : "Ver opciones de reservas"
      }
      {...(contact.channel === "whatsapp"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <svg
        width="27"
        height="27"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 2v6M17 2v6M3 11h18M7 15h3M14 15h3" />
      </svg>
      <span>Reservas</span>
    </a>
  );
}
