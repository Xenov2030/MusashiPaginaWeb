import { BeveragePolicy } from "./BeveragePolicy";
import { useState } from "react";
import { craft, conceptualVisuals, suppliedProducts } from "./content";
import { media, pastryGallery, pastryTitles } from "./media";
import { ConsultLink } from "./ConsultLink";
export function Essence() {
  return (
    <section className="essence section" id="experiencia">
      <div data-reveal="rise">
        <p className="eyebrow">LA EXPERIENCIA / DESCUBRIR MUSASHI</p>
        <h2>
          Una pausa.
          <br />
          <em>Un lugar para quedarte.</em>
        </h2>
      </div>
      <div className="essence-copy" data-reveal="left">
        <p className="lead">Musashi propone una pausa del ritmo cotidiano.</p>
        <p>
          Un espacio donde la ambientación, la atención personalizada y cada
          creación forman parte del mismo encuentro.
        </p>
        <a className="text-link" href="#cafeteria">
          Empezá por una taza<span aria-hidden="true"> ↓</span>
        </a>
      </div>
      <div className="essence-notes">
        <span>01 / La calma</span>
        <span>02 / El cuidado</span>
        <span>03 / Tu momento</span>
      </div>
    </section>
  );
}
export function CoffeeIntro() {
  return (
    <section className="coffee-intro section" id="cafeteria">
      <div className="coffee-heading" data-reveal="rise">
        <p className="eyebrow">CAFETERÍA / EL OFICIO DETRÁS DE CADA PAUSA</p>
        <h2>
          Creaciones de Musashi.
          <br />
          <em>El oficio, en cada detalle.</em>
        </h2>
        <p>
          Café de especialidad, una carta con personalidad y pastelería
          japonesa. Una propuesta que se disfruta tanto en los sabores como en
          el tiempo que te tomás para descubrirlos.
        </p>
        <BeveragePolicy />
        <a className="text-link" href="/carta">
          Explorar la carta<span aria-hidden="true"> →</span>
        </a>
      </div>
      <div className="craft-list">
        {media.propietario && (
          <figure className="owner-portrait">
            <img
              src={media.propietario.src}
              alt={media.propietario.alt}
              width={media.propietario.width}
              height={media.propietario.height}
              loading="lazy"
            />
          </figure>
        )}
        {craft.map((item, i) => (
          <article
            key={item.title}
            data-reveal="rise"
            data-motion-delay={i * 65}
          >
            <span className="eyebrow">0{i + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
        <p className="craft-footnote">
          Las especialidades del propietario acompañan su oficio. Consultá la
          carta actual por bebidas y disponibilidad.
        </p>
      </div>
      <nav className="creation-index" aria-label="Creaciones de Musashi">
        {suppliedProducts
          .filter((p) => p.category === "Café y creaciones de autor")
          .map((product, i) => (
            <a key={product.id} href={`/carta#${product.id}`}>
              <span className="eyebrow">0{i + 1}</span>
              <span>{product.name}</span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
      </nav>
    </section>
  );
}
export function PastryGallery() {
  return (
    <section
      className="pastry-story section"
      aria-label="Pastelería de Musashi"
    >
      <div className="pastry-heading">
        <p className="eyebrow">EL LADO DULCE DE LA PAUSA</p>
        <h2>
          Pequeños detalles.
          <br />
          <em>Muchas ganas de probar.</em>
        </h2>
        <p>
          Una mirada a la pastelería de Musashi, en imágenes compartidas por el
          equipo.
        </p>
      </div>
      <div className="pastry-gallery">
        {pastryGallery.map((image, i) => (
          <figure key={image.src} data-reveal="rise" data-motion-delay={i * 70}>
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(max-width:700px) 80vw, 30vw"
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{pastryTitles[image.src]}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
function BrandFilm() {
  const [open, setOpen] = useState(false);
  if (!media.video.enabled) return null;
  return (
    <details
      className="brand-film"
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>
        Una pieza visual de Musashi
        <span>
          Ver video <span aria-hidden="true">→</span>
        </span>
      </summary>
      {open && (
        <figure>
          <video
            controls
            playsInline
            muted
            preload="none"
            poster={media.video.poster}
            width="566"
            height="850"
            aria-label="Video promocional de Musashi: personaje de época junto a una taza y pastelería"
            aria-describedby="film-description"
          >
            <source src={media.video.src} type="video/mp4" />
          </video>
          <figcaption id="film-description">
            Pieza promocional de Musashi · material aportado por el cliente.
          </figcaption>
        </figure>
      )}
    </details>
  );
}
export function Dinner() {
  const resource = media.cenas ?? conceptualVisuals.ramen;
  return (
    <section className="dinner-story section" id="cenas">
      <figure className="dinner-image" data-reveal="left">
        <img
          src={resource.src}
          alt={resource.alt}
          width={resource.width}
          height={resource.height}
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          {media.cenas
            ? "Imagen de Musashi"
            : "Composición conceptual · sin fotografía de un encuentro"}
        </figcaption>
      </figure>
      <div className="dinner-copy" data-reveal="rise">
        <p className="eyebrow">CENAS Y ENCUENTROS / ALREDEDOR DE LA MESA</p>
        <h2>
          Japón también
          <br />
          se comparte.
        </h2>
        <p className="lead">
          Cenas inspiradas en la gastronomía y la cultura de Japón, con el
          cuidado de una experiencia cercana.
        </p>
        <p>
          Las noches de onigiris, el ramen y los encuentros en tatamis forman
          parte de los antecedentes de Musashi. Cada propuesta es una ocasión
          para descubrir sabores y compartir el momento.
        </p>
        <ConsultLink topic="cafetería y cenas">
          Consultar por las cenas
        </ConsultLink>
        <a className="subtle-internal" href="#agenda">
          Ver encuentros publicados ↓
        </a>
        <BrandFilm />
      </div>
    </section>
  );
}
export function Tatami() {
  return (
    <section className="tatami-story section" id="tatami">
      <div className="tatami-copy" data-reveal="rise">
        <p className="eyebrow">TATAMI PRIVADO / UN MOMENTO ESPECIAL</p>
        <h2>
          Un espacio para
          <br />
          <em>disfrutar más cerca.</em>
        </h2>
        <p className="lead">
          La intimidad de una experiencia pensada para compartir a tu manera.
        </p>
        <p>
          Un espacio privado de tatami para experiencias gastronómicas y
          momentos especiales en un ambiente íntimo.
        </p>
        <ConsultLink className="button" topic="el tatami privado">
          Consultar por el tatami
        </ConsultLink>
      </div>
      {media.tatami ? (
        <figure className="tatami-photo">
          <img
            src={media.tatami.src}
            alt={media.tatami.alt}
            width={media.tatami.width}
            height={media.tatami.height}
            loading="lazy"
          />
        </figure>
      ) : (
        <figure
          className="tatami-concept"
          role="img"
          aria-label="Composición conceptual de papel y trama inspirada en tatami; no es una fotografía del espacio"
        >
          <div className="tatami-weave" />
          <div className="tatami-paper">
            <span className="eyebrow">MUSASHI / UN ESPACIO RESERVADO</span>
            <span className="tatami-circle" />
            <span className="tatami-paper-title">
              Más cerca.
              <br />
              Sin apuro.
            </span>
            <span className="tatami-seal" aria-hidden="true" />
          </div>
          <figcaption>
            Composición conceptual · fotografía del tatami pendiente
          </figcaption>
        </figure>
      )}
    </section>
  );
}
export function Wellbeing() {
  return (
    <section className="wellbeing-story section" id="bienestar">
      {media.bienestar ? (
        <figure className="wellbeing-photo">
          <img
            src={media.bienestar.src}
            alt={media.bienestar.alt}
            width={media.bienestar.width}
            height={media.bienestar.height}
            loading="lazy"
          />
        </figure>
      ) : (
        <div className="wellbeing-mark" aria-hidden="true">
          <span />
          <span />
          <i />
        </div>
      )}
      <div className="wellbeing-copy" data-reveal="rise">
        <p className="eyebrow">BIENESTAR / OTRA FORMA DE HACER UNA PAUSA</p>
        <h2>
          Un espacio para
          <br />
          <em>hacer una pausa.</em>
        </h2>
        <p>
          Musashi también cuenta con un espacio holístico destinado a terapias
          orientales y alternativas, acompañado por sus colaboradoras. Una
          propuesta diferenciada para consultar y conocer con calma.
        </p>
        <ul className="therapy-list">
          <li>Masajes Tui Na</li>
          <li>Acupuntura</li>
          <li>Reiki</li>
        </ul>
        <ConsultLink topic="el espacio de bienestar">
          Consultar por bienestar
        </ConsultLink>
      </div>
    </section>
  );
}
export function ExperienceContact() {
  return (
    <section className="experience-contact section" id="contacto">
      <div>
        <p className="eyebrow">MUSASHI / MENDOZA</p>
        <h2>
          La próxima pausa
          <br />
          <em>empieza con una charla.</em>
        </h2>
        <p>Consultanos por la experiencia que tenés en mente.</p>
      </div>
      <div className="contact-topics">
        <ConsultLink topic="cafetería y cenas">Cafetería y cenas</ConsultLink>
        <ConsultLink topic="el tatami privado">Tatami privado</ConsultLink>
        <ConsultLink topic="el espacio de bienestar">Bienestar</ConsultLink>
        <p className="private-contact-note">
          Un poquito de misterio: la dirección se comparte por WhatsApp al
          confirmar una reserva.
        </p>
        <a className="text-link" href="#reservas">
          Preparar una consulta de reserva<span aria-hidden="true"> ↓</span>
        </a>
        <a
          href="https://www.instagram.com/musashi.animecafe/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-handle"
        >
          @musashi.animecafe →
        </a>
      </div>
    </section>
  );
}
