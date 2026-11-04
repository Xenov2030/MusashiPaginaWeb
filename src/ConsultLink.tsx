import type { ReactNode } from "react";
import { site } from "./content";
import { whatsappContactUrl } from "./reservations";
export function consultationUrl(topic: string) {
  const official =
    !site.business.whatsappTest && whatsappContactUrl(site.business.whatsapp);
  return official
    ? `${official}?text=${encodeURIComponent(`Hola Musashi, quisiera consultar por ${topic}.`)}`
    : site.instagram;
}
export function ConsultLink({
  topic,
  children,
  className = "text-link",
}: {
  topic: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={consultationUrl(topic)}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        aria-hidden="true"
      >
        <path d="M4 16 16 4M4 4h12v12" />
      </svg>
    </a>
  );
}
