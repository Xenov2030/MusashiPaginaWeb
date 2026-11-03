import { useEffect, useRef, useState, type CSSProperties } from "react";

export function Ambient() {
  const decoration = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(() => {
    try {
      return sessionStorage.getItem("musashi.ambient.paused") === "true";
    } catch {
      return false;
    }
  });
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(
    document.visibilityState === "visible",
  );
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => setReduced(media.matches);
    const visibility = () => setVisible(document.visibilityState === "visible");
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => setInView(entries[0]?.isIntersecting ?? false),
            { threshold: 0.05 },
          )
        : null;
    const hero = decoration.current?.closest("section");
    if (hero) observer?.observe(hero);
    if (!observer) setInView(true);
    media.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer?.disconnect();
      media.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const running = !paused && !reduced && visible && inView;
  const toggle = () =>
    setPaused((value) => {
      const next = !value;
      try {
        sessionStorage.setItem("musashi.ambient.paused", String(next));
      } catch {
        /* session persistence is optional */
      }
      return next;
    });
  return (
    <>
      <div
        ref={decoration}
        className={`ambient ${reduced ? "ambient-static" : ""}`}
        aria-hidden="true"
        data-ambient-state={
          running ? "running" : reduced ? "reduced" : "paused"
        }
        style={
          { "--ambient-play": running ? "running" : "paused" } as CSSProperties
        }
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`petal petal-${i + 1}`} />
        ))}
      </div>
      {!reduced && (
        <button
          className="ambient-control"
          type="button"
          aria-pressed={paused}
          onClick={toggle}
        >
          {paused ? "Reanudar pétalos" : "Pausar pétalos"}
          <span aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="currentColor">
              {paused ? (
                <path d="m3 1 8 5-8 5Z" />
              ) : (
                <>
                  <path d="M2 1h3v10H2z" />
                  <path d="M7 1h3v10H7z" />
                </>
              )}
            </svg>
          </span>
        </button>
      )}
    </>
  );
}
