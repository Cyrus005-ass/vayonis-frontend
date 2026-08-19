import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-content">
        <Link href="/" className="back-link">← Retour à l&apos;accueil</Link>

        <h1>Politique de confidentialité</h1>
        <p className="updated">Dernière mise à jour : 18 août 2026</p>

        <p>
          VAYONIS (&laquo; nous &raquo;, &laquo; notre &raquo;, &laquo; l&apos;application &raquo;) est une
          plateforme de gestion et de publication de contenu sur les réseaux sociaux.
          Cette politique explique quelles données nous collectons, comment nous les
          utilisons, et comment vous pouvez les contrôler.
        </p>

        <h2>1. Données que nous collectons</h2>
        <ul>
          <li><strong>Informations de compte :</strong> adresse e-mail, nom, utilisés pour créer et sécuriser votre compte VAYONIS.</li>
          <li><strong>Jetons d&apos;accès aux réseaux sociaux :</strong> lorsque vous connectez un compte Facebook, Instagram ou LinkedIn, nous stockons un jeton d&apos;accès chiffré permettant à VAYONIS de publier du contenu en votre nom, uniquement sur les comptes que vous avez explicitement autorisés.</li>
          <li><strong>Contenu que vous créez :</strong> textes, images et vidéos que vous téléversez pour publication via VAYONIS.</li>
          <li><strong>Réponses au questionnaire d&apos;inscription :</strong> profil, tranche d&apos;âge, objectifs, réseaux utilisés — pour personnaliser votre expérience.</li>
          <li><strong>Métadonnées techniques :</strong> statut de publication, horodatages, identifiants renvoyés par les plateformes tierces.</li>
        </ul>

        <h2>2. Comment nous utilisons ces données</h2>
        <ul>
          <li>Publier du contenu sur les comptes de réseaux sociaux que vous connectez, à votre demande ou à l&apos;heure programmée que vous choisissez.</li>
          <li>Maintenir votre session et sécuriser l&apos;accès à votre compte VAYONIS.</li>
          <li>Renouveler automatiquement les jetons d&apos;accès expirés afin d&apos;éviter une déconnexion involontaire.</li>
          <li>Diagnostiquer et corriger les erreurs de publication.</li>
        </ul>

        <h2>3. Partage des données</h2>
        <p>Nous ne vendons ni ne louons vos données à des tiers. Vos données sont transmises uniquement :</p>
        <ul>
          <li>Aux plateformes de réseaux sociaux (Meta/Facebook, Instagram, LinkedIn, Google) au moment de la publication ou de la connexion, conformément aux autorisations que vous avez accordées.</li>
          <li>À nos prestataires d&apos;infrastructure technique (hébergement, stockage de fichiers), strictement pour le fonctionnement du service.</li>
        </ul>

        <h2>4. Stockage et sécurité</h2>
        <p>Les jetons d&apos;accès aux réseaux sociaux sont chiffrés avant d&apos;être stockés. Les fichiers médias sont stockés sur une infrastructure de stockage sécurisée avec accès restreint.</p>

        <h2>5. Vos droits</h2>
        <p>Vous pouvez à tout moment :</p>
        <ul>
          <li>Déconnecter un compte de réseau social lié à VAYONIS.</li>
          <li>Demander la suppression de votre compte et de toutes les données associées — voir notre <Link href="/data-deletion">page de suppression des données</Link>.</li>
          <li>Nous contacter pour toute question relative à vos données.</li>
        </ul>

        <h2>6. Contact</h2>
        <p>Pour toute question concernant cette politique de confidentialité, contactez-nous à : <a href="mailto:cyr-ass@gmail.com">cyr-ass@gmail.com</a></p>
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
      `}</style>
    </main>
  );
}