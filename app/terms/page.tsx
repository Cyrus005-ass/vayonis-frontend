import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-content">
        <Link href="/" className="back-link">← Retour à l&apos;accueil</Link>

        <h1>Conditions d&apos;utilisation</h1>
        <p className="updated">Dernière mise à jour : 24 septembre 2026</p>

        <p>
          Les présentes conditions régissent l&apos;accès et l&apos;utilisation de VAYONIS.
          En créant un compte ou en utilisant le service, vous acceptez les conditions
          décrites ci-dessous.
        </p>

        <h2>1. Description du service</h2>
        <p>
          VAYONIS permet de créer, programmer et publier du contenu sur les réseaux
          sociaux connectés à votre compte. La disponibilité des fonctionnalités peut
          évoluer selon les plateformes prises en charge.
        </p>

        <h2>2. Création et utilisation du compte</h2>
        <p>
          Vous êtes responsable des informations fournies lors de votre inscription et
          de la confidentialité de vos identifiants. Vous devez maintenir les informations
          de votre compte à jour et nous signaler tout accès non autorisé.
        </p>

        <h2>3. Contenu publié</h2>
        <p>
          Vous conservez la responsabilité du contenu que vous créez, téléversez ou
          publiez. Vous vous engagez à respecter les lois applicables et les conditions
          d&apos;utilisation des réseaux sociaux sur lesquels VAYONIS intervient.
        </p>

        <h2>4. Connexion aux réseaux sociaux</h2>
        <p>
          L&apos;utilisation de VAYONIS nécessite l&apos;autorisation des comptes sociaux que
          vous choisissez de connecter. Vous pouvez révoquer ces autorisations à tout
          moment depuis votre compte VAYONIS ou depuis les paramètres de chaque plateforme.
        </p>

        <h2>5. Programmation et publication</h2>
        <p>
          VAYONIS effectue les demandes de publication selon les informations et l&apos;horaire
          que vous renseignez. Une publication peut échouer ou être limitée en raison
          d&apos;une modification de la plateforme tierce, d&apos;un refus d&apos;autorisation ou
          d&apos;une indisponibilité temporaire.
        </p>

        <h2>6. Disponibilité et évolutions</h2>
        <p>
          Le service est fourni tel que disponible. Nous pouvons modifier, suspendre ou
          interrompre temporairement certaines fonctionnalités pour maintenance, sécurité
          ou évolution du service.
        </p>

        <h2>7. Responsabilité</h2>
        <p>
          VAYONIS ne contrôle pas les réseaux sociaux tiers et n&apos;est pas responsable de
          leurs décisions, limitations, suppressions de contenu ou interruptions de service.
          Vous restez responsable de l&apos;usage fait de votre compte et de vos publications.
        </p>

        <h2>8. Propriété intellectuelle</h2>
        <p>
          Le contenu que vous fournissez vous appartient ou doit être utilisé avec les
          autorisations nécessaires. Les éléments propres à VAYONIS, notamment son nom,
          son interface et ses composants, restent la propriété de VAYONIS.
        </p>

        <h2>9. Modification des conditions</h2>
        <p>
          Nous pouvons mettre à jour les présentes conditions. La date de dernière mise
          à jour est indiquée en haut de cette page. La poursuite de l&apos;utilisation du
          service après une mise à jour vaut acceptation des nouvelles conditions.
        </p>

        <h2>10. Contact</h2>
        <p>
          Pour toute question relative aux conditions d&apos;utilisation, contactez-nous à :{" "}
          <a href="mailto:cyr-ass@gmail.com">cyr-ass@gmail.com</a>.
        </p>

        <div className="legal-links">
          <Link href="/privacy-policy">Politique de confidentialité</Link>
          <Link href="/data-deletion">Suppression des données</Link>
        </div>
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
        .legal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 36px;
          padding-top: 22px;
          border-top: 1px solid var(--line);
        }
      `}</style>
    </main>
  );
}
