"use client";

import Image from "next/image";
import Link from "next/link";
 
export default function Home() {
  return (
    <main className="page">
      <nav className="nav">
        <div className="nav-inner">
          <Image
            src="/logo-on-dark.png"
            alt="VAYONIS"
            width={170}
            height={44}
            style={{ height: 32, width: "auto" }}
            priority
          />
          <div className="nav-links">
            <a href="#comment-ca-marche">Comment ça marche</a>
            <a href="#avancement">Avancement</a>
            <Link href="/login" className="nav-login">Se connecter</Link>
          </div>
        </div>
      </nav>
 
      <header className="hero">
        <div className="hero-inner">
          <span className="eyebrow">En cours de construction · build in public</span>
          <h1>
            Publiez une fois.<br />
            <em>VAYONIS</em> fait rayonner partout.
          </h1>
          <p className="lead">
            Un seul post, envoyé simultanément sur Facebook, Instagram et LinkedIn —
            programmé à l&apos;heure que vous choisissez, avec un suivi clair de ce qui
            a marché sur chaque plateforme.
          </p>
          <div className="hero-actions">
            <Link href="/signup" className="btn-primary">Créer un compte gratuit</Link>
            <a href="#comment-ca-marche" className="btn-ghost">Voir comment ça marche</a>
          </div>
        </div>
 
        <svg className="beam-stage" viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Un post part d'un point central et rejoint trois plateformes">
          <path id="pathFB" className="beam-path" d="M300,62 L110,320" />
          <path id="pathIG" className="beam-path" d="M300,62 L300,340" />
          <path id="pathLI" className="beam-path" d="M300,62 L490,320" />
 
          <circle className="beam-origin-ring" cx="300" cy="62" r="14" />
          <circle className="beam-node-dot" cx="300" cy="62" r="15" />
          <text className="beam-node-label" x="300" y="38" textAnchor="middle">votre post</text>
 
          <circle className="beam-node-dot" cx="110" cy="320" r="20" />
          <text className="beam-node-label" x="110" y="358" textAnchor="middle">Facebook</text>
 
          <circle className="beam-node-dot" cx="300" cy="340" r="20" />
          <text className="beam-node-label" x="300" y="378" textAnchor="middle">Instagram</text>
 
          <circle className="beam-node-dot" cx="490" cy="320" r="20" />
          <text className="beam-node-label" x="490" y="358" textAnchor="middle">LinkedIn</text>
 
          <circle className="beam-pulse" r="4">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="0s">
              <mpath href="#pathFB" />
            </animateMotion>
          </circle>
          <circle className="beam-pulse" r="4">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.35s">
              <mpath href="#pathIG" />
            </animateMotion>
          </circle>
          <circle className="beam-pulse" r="4">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.7s">
              <mpath href="#pathLI" />
            </animateMotion>
          </circle>
        </svg>
      </header>
 
      <section className="section" id="comment-ca-marche">
        <span className="eyebrow">Le principe</span>
        <h2>Trois étapes, un seul geste</h2>
        <p className="section-sub">
          Pas de jonglage entre les apps. Vous connectez une fois, vous créez une fois,
          VAYONIS s&apos;occupe du reste.
        </p>
 
        <div className="steps">
          <div className="step">
            <span className="num">01</span>
            <h3>Connectez vos comptes</h3>
            <p>Facebook, Instagram et LinkedIn en quelques clics. VAYONIS garde l&apos;accès à jour tout seul.</p>
          </div>
          <div className="step">
            <span className="num">02</span>
            <h3>Créez votre post</h3>
            <p>Un texte, une image, une vidéo. Choisissez les plateformes où il doit apparaître.</p>
          </div>
          <div className="step">
            <span className="num">03</span>
            <h3>Publiez, à l&apos;heure choisie</h3>
            <p>Tout de suite, ou programmé pour plus tard. Chaque plateforme est traitée indépendamment.</p>
          </div>
        </div>
      </section>
 
      <section className="section" id="plateformes">
        <span className="eyebrow">Couverture actuelle</span>
        <h2>Vos réseaux, déjà pris en charge</h2>
        <div className="platform-row">
          <span className="chip live">Facebook</span>
          <span className="chip live">Instagram</span>
          <span className="chip live">LinkedIn</span>
          <span className="chip soon">TikTok — à venir</span>
          <span className="chip soon">YouTube — à venir</span>
        </div>
      </section>
 
      <section className="section" id="avancement">
        <span className="eyebrow">Transparence totale</span>
        <h2>Où en est VAYONIS aujourd&apos;hui</h2>
        <p className="section-sub">
          VAYONIS se construit en public. Voici, sans enjolivure, ce qui fonctionne
          déjà et ce qui est encore en chantier.
        </p>
 
        <div className="log-panel">
          <LogRow done title="Connexion des comptes sociaux" desc="Facebook, Instagram et LinkedIn — connexion sécurisée, renouvelée automatiquement." />
          <LogRow done title="Publication simultanée multi-plateformes" desc="Un post, envoyé sur plusieurs réseaux en une seule action, chacun suivi indépendamment." />
          <LogRow done title="Publication avec image" desc="Testée et validée sur Facebook, Instagram et LinkedIn." />
          <LogRow title="Programmation automatique" desc="Choisir une heure de publication à l'avance, sans action manuelle le jour J." />
          <LogRow title="Vidéo sur LinkedIn" desc="Le circuit technique existe déjà, encore en cours de validation." />
        </div>
      </section>
 
      <section className="section cta-section">
        <div className="cta-panel">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Prochaine étape</span>
          <h2>Prêt à essayer VAYONIS ?</h2>
          <p>Créez votre compte et connectez vos premiers réseaux en moins de deux minutes.</p>
          <Link href="/signup" className="btn-primary">Créer un compte gratuit</Link>
        </div>
      </section>
 
      <footer className="footer">
        <span>© 2026 VAYONIS — construit depuis le Bénin.</span>
        <span>#BuildInPublic</span>
      </footer>
 
      <style>{`
        .page { min-height: 100vh; }
 
        .eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .eyebrow::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }
 
        .nav {
          padding: 20px 0;
          border-bottom: 1px solid var(--line);
        }
        .nav-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .nav-links a { text-decoration: none; }
        .nav-links a:hover { color: var(--text); }
        .nav-login {
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          color: #0b0e1a !important;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 999px;
        }
 
        .hero {
          max-width: 1080px;
          margin: 0 auto;
          padding: 72px 24px 40px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 860px) { .hero { grid-template-columns: 1fr; } }
 
        .hero h1 {
          font-size: clamp(2.2rem, 4.4vw, 3.2rem);
          line-height: 1.08;
          margin: 18px 0 20px;
        }
        .hero h1 em { font-style: normal; color: var(--accent); }
        .lead {
          color: var(--text-muted);
          font-size: 1.05rem;
          max-width: 46ch;
          margin: 0 0 28px;
        }
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
 
        .btn-primary {
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          color: #0b0e1a;
          font-weight: 700;
          padding: 13px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 0.95rem;
          display: inline-block;
        }
        .btn-ghost {
          color: var(--text);
          padding: 13px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 0.95rem;
          border: 1px solid var(--line);
        }
 
        .beam-node-label {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          fill: var(--text-muted);
        }
        .beam-origin-ring {
          fill: none;
          stroke: var(--accent);
          stroke-width: 1.4;
          opacity: 0.55;
          transform-origin: 300px 62px;
          animation: pulse-ring 2.6s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.4); opacity: 0.6; }
          80%, 100% { transform: scale(2.1); opacity: 0; }
        }
        .beam-path { fill: none; stroke: var(--line); stroke-width: 1.5; }
        .beam-pulse { fill: var(--accent); filter: drop-shadow(0 0 4px var(--accent)); }
        .beam-node-dot { fill: var(--bg-panel-hi, var(--bg-panel)); stroke: var(--line); stroke-width: 1.5; }
 
        .section {
          max-width: 1080px;
          margin: 0 auto;
          padding: 64px 24px;
          border-top: 1px solid var(--line);
        }
        .section h2 { font-size: clamp(1.5rem, 3vw, 2rem); margin: 10px 0 12px; }
        .section-sub { color: var(--text-muted); max-width: 56ch; margin: 0 0 40px; }
 
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 780px) { .steps { grid-template-columns: 1fr; } }
        .step {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 24px 22px;
        }
        .step .num {
          font-family: var(--font-mono), monospace;
          color: var(--accent);
          font-size: 0.8rem;
          display: block;
          margin-bottom: 12px;
        }
        .step h3 { font-size: 1.04rem; margin-bottom: 8px; }
        .step p { color: var(--text-muted); font-size: 0.9rem; margin: 0; }
 
        .platform-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .chip {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          padding: 9px 16px;
          border-radius: 999px;
          font-size: 0.86rem;
        }
        .chip.live { color: var(--text); }
        .chip.soon { color: var(--text-muted); border-style: dashed; }
 
        .log-panel {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
        }
 
        .cta-section { text-align: center; }
        .cta-panel {
          background: linear-gradient(160deg, var(--bg-panel-hi, var(--bg-panel)), var(--bg-panel));
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 52px 32px;
        }
        .cta-panel h2 { margin: 12px 0; }
        .cta-panel p { color: var(--text-muted); margin: 0 0 26px; }
 
        .footer {
          max-width: 1080px;
          margin: 0 auto;
          padding: 30px 24px 50px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.84rem;
        }
      `}</style>
    </main>
  );
}
 
function LogRow({
  title,
  desc,
  done = false,
}: {
  title: string;
  desc: string;
  done?: boolean;
}) {
  return (
    <div className="log-row">
      <span className={done ? "log-icon done" : "log-icon wip"}>{done ? "✓" : "◐"}</span>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
      <span className={done ? "log-status done" : "log-status wip"}>
        {done ? "EN LIGNE" : "EN CHANTIER"}
      </span>
      <style jsx>{`
        .log-row {
          display: grid;
          grid-template-columns: 24px 1fr auto;
          gap: 14px;
          align-items: start;
          padding: 18px 22px;
          border-bottom: 1px solid var(--line);
        }
        .log-row:last-child { border-bottom: none; }
        .log-icon {
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; margin-top: 2px;
        }
        .log-icon.done { background: #4ade8022; color: var(--live); }
        .log-icon.wip { background: var(--accent-glow); color: var(--accent); }
        h4 { margin: 0 0 3px; font-size: 0.95rem; font-weight: 600; }
        p { margin: 0; color: var(--text-muted); font-size: 0.86rem; }
        .log-status {
          font-family: var(--font-mono), monospace;
          font-size: 0.72rem;
          padding: 4px 10px;
          border-radius: 999px;
          white-space: nowrap;
          height: fit-content;
        }
        .log-status.done { background: #4ade8018; color: var(--live); }
        .log-status.wip { background: var(--accent-glow); color: var(--accent); }
      `}</style>
    </div>
  );
}
 
