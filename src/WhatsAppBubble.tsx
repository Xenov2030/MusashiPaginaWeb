import { site } from "./content";
import { whatsappContactUrl } from "./reservations";
export function WhatsAppBubble() {
  const contact = whatsappContactUrl(site.business.whatsapp);
  if (!contact) return null;
  const text = site.business.whatsappTest
    ? "PRUEBA — Hola, quiero consultar sobre Musashi."
    : "Hola Musashi, quisiera hacer una consulta.";
  return (
    <a
      className="whatsapp-bubble"
      href={`${contact}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        site.business.whatsappTest
          ? "Abrir WhatsApp de prueba — contacto de Nicolas"
          : "Contactar a Musashi por WhatsApp"
      }
    >
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M27 15.5a11 11 0 0 1-16.4 9.6L4 27l1.8-6.4A11 11 0 1 1 27 15.5Z" />
        <path d="m12 10 2 3-1.2 1.7c.8 2 2.2 3.4 4.3 4.2l1.6-1.3 3 1.9c-.4 2.3-2.3 3-4.5 2-4.6-1.8-8-5.5-8-9.1 0-1.4 1.2-2.8 2.8-2.4Z" />
      </svg>
      <span>
        WhatsApp{site.business.whatsappTest && <small>DE PRUEBA</small>}
      </span>
    </a>
  );
}
