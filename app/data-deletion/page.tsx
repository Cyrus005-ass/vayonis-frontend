import Link from "next/link";

export default function DataDeletionPage() {
  return (
    <main className="legal-page">
      <div className="legal-content">
        <Link href="/" className="back-link">← Retour à l&apos;accueil</Link>

        <h1>Suppression des données</h1>
        <p className="updated">Dernière mise à jour : 18 août 2026</p>

        <p>
          Vous pouvez demander la suppression complète de votre compte VAYONIS ainsi
          que de toutes les données associées à tout moment.
        </p>

        <h2>Comment demander la suppression de vos données</h2>
        <div className="steps-box">
          <p>
            Envoyez un e-mail à <a href="mailto:cyr-ass@gmail.com">cyr-ass@gmail.com</a> avec
            pour objet <strong>&laquo; Suppression de compte VAYONIS &raquo;</strong>, en
            précisant l&apos;adresse e-mail associée à votre compte.
          </p>
        </div>

        <h2>Ce qui sera supprimé</h2>
        <ul>
          <li>Votre compte VAYONIS et vos informations de connexion.</li>
          <li>Les jetons d&apos;accès chiffrés à vos comptes de réseaux sociaux connectés (Facebook, Instagram, LinkedIn, Google).</li>
          <li>Les publications, textes et médias que vous avez créés ou téléversés sur VAYONIS.</li>
          <li>L&apos;historique de vos publications et statuts associés.</li>
        </ul>

        <h2>Délai de traitement</h2>
        <p>Votre demande sera traitée sous un délai maximum de 30 jours. Une confirmation vous sera envoyée par e-mail une fois la suppression effectuée.</p>

        <h2>Important</h2>
        <p>
          La suppression de votre compte VAYONIS ne supprime pas votre contenu déjà
          publié sur Facebook, Instagram ou LinkedIn — ce contenu reste géré directement
          par ces plateformes respectives, conformément à leurs propres politiques. Vous
          pouvez également révoquer l&apos;accès de VAYONIS directement depuis les
          paramètres de votre compte Facebook, Instagram ou LinkedIn.
        </p>

        <p><Link href="/privacy-policy">← Retour à la politique de confidentialité</Link></p>
      </div>

      <style>{`
        .legal-page {
          min-height: 100vh;
          padding: 60px 24px 80px;
        }
        .legal-content {
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .back-link {
          display: inline-block;
          color: var(--accent);
          text-decoration: none;
          font-size: 0.88rem;
          margin-bottom: 32px;
        }
        h1 { font-size: 1.9rem; margin-bottom: 4px; }
        h2 { font-size: 1.15rem; margin-top: 34px; margin-bottom: 10px; }
        .updated { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 30px; }
        p, li { color: var(--text); font-size: 0.94rem; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        a { color: var(--accent); }
        .steps-box {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 18px 22px;
          margin: 16px 0;
        }
      `}</style>
    </main>
  );
}