import { useEffect, useRef, useState, type CSSProperties } from "react";

function Blossom({
  x,
  y,
  angle = 0,
  scale = 1,
}: {
  x: number;
  y: number;
  angle?: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          transform={`rotate(${a})`}
          d="M0 0C-13-7-16-23-6-29L0-25 6-29C16-23 13-7 0 0Z"
          fill="white"
          stroke="#d4d4d4"
          strokeWidth=".6"
        />
      ))}
      <circle r="3" fill="#c51624" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path
          key={a}
          transform={`rotate(${a})`}
          d="M0-2V-10"
          stroke="#c51624"
          strokeWidth=".6"
          opacity=".6"
        />
      ))}
    </g>
  );
}
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
        <svg className="cherry-tree" viewBox="0 0 600 800" fill="none">
          <path
            d="M553 809c-46-63-68-135-72-214-4-81-28-126-19-200 6-55 33-105 31-154-3 72-39 131-39 196-25-70-63-113-115-154 39 49 72 104 91 178 15 56 14 98 22 150 11 81 28 145 59 198Z"
            fill="#999"
            opacity=".6"
          />
          <path
            d="M460 438C405 348 353 306 285 263S154 205 95 137M452 389C403 291 381 218 313 163S202 97 145 49M472 345C493 259 489 174 524 103M481 305C437 235 425 173 438 111M381 317C322 315 257 321 187 293M304 273C246 219 218 177 213 121"
            stroke="#bcbcbc"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M98 138 51 118M146 184 126 139M204 224 170 218M254 245 268 203M314 165 313 111M268 133 245 79M214 104 191 60M383 242 343 222M438 159 408 124M508 158 544 139M370 318 336 345M240 307 218 278M187 293 153 306"
            stroke="#bcbcbc"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {[
            [52, 118, 0.6],
            [97, 139, 0.8],
            [127, 141, 0.55],
            [145, 50, 0.7],
            [191, 63, 0.55],
            [214, 107, 0.85],
            [245, 80, 0.6],
            [268, 133, 0.75],
            [313, 112, 0.6],
            [314, 165, 0.8],
            [268, 204, 0.55],
            [204, 224, 0.65],
            [170, 219, 0.6],
            [343, 223, 0.65],
            [383, 244, 0.8],
            [408, 125, 0.6],
            [438, 111, 0.75],
            [508, 158, 0.65],
            [525, 102, 0.7],
            [544, 139, 0.5],
            [218, 279, 0.65],
            [188, 293, 0.8],
            [153, 306, 0.5],
            [336, 345, 0.6],
          ].map(([x, y, scale], i) => (
            <Blossom
              key={i}
              x={x}
              y={y}
              angle={i % 2 ? 18 : -12}
              scale={scale}
            />
          ))}
        </svg>
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
