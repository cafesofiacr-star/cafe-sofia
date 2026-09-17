import { CHALLENGES, CHALLENGES_URL } from "../data.js";
import { ArrowRightIcon } from "../icons.jsx";

export default function DesafiosView() {
  return (
    <section data-view="desafios">
      <div className="hero" style={{ marginBottom: 22 }}>
        <div className="hero-text" style={{ maxWidth: "68ch" }}>
          <h1 style={{ fontSize: "1.6rem" }}>El café que enseña IA</h1>
          <p>
            Café SofIA no solo te atiende: mientras lo hace, te enseña cómo funciona una inteligencia artificial
            agéntica de verdad. Completa los cinco desafíos, en orden, para desbloquear cada contraseña.
          </p>
        </div>
      </div>
      <div className="challenge-grid">
        {CHALLENGES.map((c) => (
          <div className="challenge-card" key={c.num}>
            <div className="challenge-top">
              <span className={"challenge-num" + (c.password === null ? " last" : "")}>{c.num}</span>
              <div>
                <div className="challenge-eyebrow">{c.eyebrow}</div>
                <h3>{c.title}</h3>
              </div>
            </div>
            {c.password ? (
              <span className="password-chip">
                La contraseña es <strong>{c.password}</strong>
              </span>
            ) : (
              <span className="password-chip final">Se abre con los otros cuatro</span>
            )}
            <p className="desc">{c.desc}</p>
            <a className="challenge-cta" href={CHALLENGES_URL} target="_blank" rel="noopener noreferrer">
              Hacer este desafío <ArrowRightIcon />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
