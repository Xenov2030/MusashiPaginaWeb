import { useEffect, useState, type CSSProperties } from "react";

export function Ambient() {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => setReduced(media.matches);
    media.addEventListener("change", preference);
    return () => media.removeEventListener("change", preference);
  }, []);
  const running = !reduced;
  return (
    <>
      <div
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
    </>
  );
}
