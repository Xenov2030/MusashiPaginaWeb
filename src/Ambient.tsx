import { useEffect, useRef, useState, type CSSProperties } from "react";

export function Ambient() {
  const decoration = useRef<HTMLDivElement>(null);
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
  const [paused, setPaused] = useState(false);
  const running = !paused && !reduced && visible && inView;
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
        <svg
          className="cherry-sprig"
          viewBox="0 0 260 150"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M260 133C200 119 180 71 120 60S45 36 8 10M187 99C176 56 151 32 139 16M124 61C93 75 67 71 44 78"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          {[
            [75, 40],
            [137, 29],
            [167, 61],
            [58, 75],
            [208, 116],
          ].map(([cx, cy], i) => (
            <g
              key={i}
              transform={`translate(${cx} ${cy})`}
              fill="currentColor"
              opacity=".65"
            >
              <ellipse ry="6" rx="3" cy="-4" />
              <ellipse ry="3" rx="6" cx="4" />
              <ellipse ry="6" rx="3" cy="4" />
              <ellipse ry="3" rx="6" cx="-4" />
            </g>
          ))}
        </svg>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`petal petal-${i + 1}`} />
        ))}
      </div>
      {!reduced && (
        <button
          className="ambient-pause-icon"
          aria-label={paused ? "Reanudar ambiente" : "Pausar ambiente"}
          title={paused ? "Reanudar ambiente" : "Pausar ambiente"}
          aria-pressed={paused}
          type="button"
          onClick={() => setPaused((p) => !p)}
        >
          <svg
            viewBox="0 0 16 16"
            width="12"
            height="12"
            fill="currentColor"
            aria-hidden="true"
          >
            {paused ? (
              <path d="m4 2 9 6-9 6Z" />
            ) : (
              <path d="M3 2h3v12H3zM10 2h3v12h-3z" />
            )}
          </svg>
        </button>
      )}
    </>
  );
}
