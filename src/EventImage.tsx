import { useState } from "react";
import { conceptualVisuals } from "./content";
export function EventImage({
  imageUrl,
  title,
  fallback = conceptualVisuals.ramen.src,
}: {
  imageUrl?: string | null;
  title: string;
  fallback?: string;
}) {
  const [failed, setFailed] = useState(false);
  const actual = Boolean(imageUrl) && !failed;
  return (
    <figure className="event-image">
      <img
        src={actual ? imageUrl! : fallback}
        alt={
          actual
            ? `Imagen publicada para ${title}`
            : "Ilustración conceptual de la propuesta de Musashi; no es una fotografía de un evento"
        }
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        width="1200"
        height="900"
        onError={() => setFailed(true)}
      />
      <figcaption>
        {actual
          ? "IMAGEN PUBLICADA POR MUSASHI"
          : "IMAGEN CONCEPTUAL · NO ES UN REGISTRO DE UN EVENTO"}
      </figcaption>
    </figure>
  );
}

export function eventFallback(event: { id: string; demo?: boolean }): string {
  if (event.demo && event.id === "demo-anterior-onigiris")
    return conceptualVisuals.hero.src;
  if (event.demo && event.id === "demo-anterior-cafe")
    return conceptualVisuals.cafe.src;
  return conceptualVisuals.ramen.src;
}
