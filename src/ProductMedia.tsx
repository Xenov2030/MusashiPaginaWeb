import { useRef, type ReactNode } from "react";
import type { VisualResource } from "./content";
export function ProductMedia({
  resource,
  name,
  children,
  notice,
  description,
  ingredients,
  includesLiqueur,
}: {
  resource: VisualResource;
  name: string;
  children: ReactNode;
  notice?: string;
  description?: string;
  ingredients?: string;
  includesLiqueur?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className={`product-image-button ${resource.format === "graphic" ? "poster-image-button" : ""}`}
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Ampliar ${resource.format === "graphic" ? "gráfica" : "imagen"} de ${name}`}
      >
        {children}
        <span className="zoom-hint" aria-hidden="true">
          ＋
        </span>
      </button>
      <dialog
        className="media-dialog"
        ref={dialog}
        aria-label={`Imagen de ${name}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          type="button"
          onClick={() => dialog.current?.close()}
          autoFocus
          aria-label="Cerrar imagen"
        >
          ×
        </button>
        {notice && <p className="media-notice">{notice}</p>}
        <img
          src={resource.src}
          alt={resource.alt}
          width={resource.width}
          height={resource.height}
          loading="lazy"
        />
        <p>
          {name} ·{" "}
          {resource.kind === "conceptual"
            ? "Imagen conceptual"
            : resource.format === "graphic"
              ? "Afiche de Musashi"
              : "Imagen aportada por Musashi"}
        </p>
        {ingredients && (
          <p className="product-ingredients">
            <strong>Ingredientes:</strong> {ingredients}
          </p>
        )}
        {includesLiqueur && <p className="alcohol-note">Incluye licor</p>}
        {description && <p className="media-description">{description}</p>}
      </dialog>
    </>
  );
}
