import { ownerStory } from "./content";
export function OwnerHistory() {
  return (
    <section
      className="owner-history section"
      id="historia"
      aria-labelledby="owner-history-title"
    >
      <div className="history-heading" data-reveal="rise">
        <p className="eyebrow">NUESTRA HISTORIA / EL RELATO DE MUSASHI</p>
        <h2 id="owner-history-title">{ownerStory.title}</h2>
      </div>
      <ol className="history-moments">
        {ownerStory.moments.map((moment, i) => (
          <li key={moment.title} data-reveal="rise" data-motion-delay={i * 70}>
            <span className="history-step" aria-hidden="true">
              0{i + 1}
            </span>
            <h3>{moment.title}</h3>
            <p>{moment.text}</p>
          </li>
        ))}
      </ol>
      <blockquote className="history-closing" data-reveal="rise">
        {ownerStory.closing}
      </blockquote>
    </section>
  );
}
