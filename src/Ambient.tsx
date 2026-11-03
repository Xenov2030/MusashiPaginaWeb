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
        <svg className="cherry-branch" viewBox="0 0 420 400" fill="none">
          <path
            d="M430 22C342 82 331 157 265 188S140 213 88 281M350 96C302 93 269 67 228 46M301 163C253 136 217 125 173 134M242 197C207 233 205 279 171 309M178 222C133 217 101 194 66 201"
            stroke="#c4c4c4"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M355 89 337 45M294 78 288 29M260 147 259 102M185 134 153 107M128 207 111 174M203 263 175 251"
            stroke="#999"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Blossom x={335} y={50} scale={0.7} />
          <Blossom x={288} y={33} angle={20} scale={0.55} />
          <Blossom x={258} y={106} angle={-12} scale={0.8} />
          <Blossom x={225} y={45} scale={0.65} />
          <Blossom x={170} y={135} angle={20} scale={0.6} />
          <Blossom x={151} y={106} scale={0.46} />
          <Blossom x={110} y={176} angle={12} scale={0.65} />
          <Blossom x={174} y={252} scale={0.65} />
          <Blossom x={86} y={279} angle={-10} scale={0.45} />
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
