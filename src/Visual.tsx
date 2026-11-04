import React, { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import type { VisualResource } from "./content";
export function Visual({
  resource,
  priority = false,
  className = "",
}: {
  resource: VisualResource;
  priority?: boolean;
  className?: string;
}) {
  const image = useRef<HTMLImageElement>(null);
  const animation = useRef<Animation | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  if (priority)
    preload(resource.src, {
      as: "image",
      fetchPriority: "high",
      imageSrcSet: resource.srcSet,
      imageSizes: resource.sizes,
    });
  useEffect(() => {
    const img = image.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let played = false;
    const ready = () => {
      if (!active) return;
      setStatus("ready");
      if (priority && !played && !reduced.matches && img?.animate) {
        played = true;
        animation.current = img.animate(
          [{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0 0 0)" }],
          { duration: 520, easing: "cubic-bezier(.2,.7,.25,1)" },
        );
      }
    };
    const failed = () => {
      if (active) setStatus("error");
    };
    setStatus("loading");
    img?.addEventListener("load", ready);
    img?.addEventListener("error", failed);
    if (img?.complete) {
      if (img.naturalWidth) ready();
      else failed();
    }
    const stop = () => {
      if (reduced.matches) animation.current?.cancel();
    };
    reduced.addEventListener("change", stop);
    return () => {
      active = false;
      img?.removeEventListener("load", ready);
      img?.removeEventListener("error", failed);
      reduced.removeEventListener("change", stop);
      animation.current?.cancel();
    };
  }, [resource.src, priority]);
  return (
    <span
      className={`visual is-${status} ${resource.format === "graphic" ? "visual-graphic" : ""} ${className}`}
      style={
        {
          "--visual-ratio": `${resource.width} / ${resource.height}`,
        } as React.CSSProperties
      }
      data-visual-state={status}
    >
      <img
        ref={image}
        className="visual-image"
        src={resource.src}
        srcSet={resource.srcSet}
        sizes={resource.sizes}
        alt={resource.alt}
        width={resource.width}
        height={resource.height}
        style={{ objectPosition: resource.position || "center" }}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        data-resource-kind={resource.kind}
        aria-hidden={status === "error" ? true : undefined}
      />
      {resource.placeholder && (
        <img
          className="visual-preview"
          src={resource.placeholder}
          alt=""
          aria-hidden="true"
          width={resource.width}
          height={resource.height}
        />
      )}
      {status === "error" && (
        <span
          className="visual-error"
          role="img"
          aria-label={`${resource.alt}. Imagen no disponible.`}
        >
          <span className="error-mark" aria-hidden="true" />
          <strong>
            {priority ? "Café, Japón y Musashi." : "Un sabor por descubrir."}
          </strong>
          <span>La imagen no está disponible.</span>
        </span>
      )}
    </span>
  );
}
