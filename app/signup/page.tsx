"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import {
  register,
  loginWithGoogle,
  saveToken,
  ApiError,
  OnboardingAnswers,
} from "@/lib/api";

const TOTAL_STEPS = 5;

const PROFILE_OPTIONS = [
  "Créateur de contenu",
  "Entrepreneur",
  "Agence marketing",
  "Community manager",
  "Entreprise / Marque",
  "Autre",
];

const AGE_OPTIONS = ["Moins de 18", "18–24", "25–34", "35–44", "45 et plus"];

const GOAL_OPTIONS = [
  "Gagner du temps",
  "Centraliser mes réseaux",
  "Programmer à l'avance",
  "Développer mon audience",
];

const PLATFORM_OPTIONS = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [profileType, setProfileType] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function togglePlatform(name: string) {
    setPlatforms((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  }

  function goNext() {
    setError(null);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function goBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  }

  function buildOnboarding(): OnboardingAnswers {
    return {
      profile_type: profileType || "",
      age_range: ageRange || "",
      goal: goal || "",
      current_platforms: platforms,
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const auth = await register(email, password, buildOnboarding());
      saveToken(auth.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Impossible de contacter le serveur. Réessaie dans un instant."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleCredential(idToken: string) {
    setError(null);
    setLoading(true);
    try {
      const auth = await loginWithGoogle(idToken);
      saveToken(auth.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "La connexion Google a échoué. Réessaie."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="onboard-page">
      <div className="onboard-panel">
        <div className="onboard-header">
          <Link href="/" className="onboard-logo">
            <Image
              src="/logo-on-dark.png"
              alt="VAYONIS"
              width={110}
              height={44}
              style={{ height: 22, width: "auto" }}
              priority
            />
          </Link>
          {step > 1 && (
            <button type="button" className="back-btn" onClick={goBack} aria-label="Étape précédente">
              ←
            </button>
          )}
        </div>

        <div className="progress-track" aria-hidden="true">
          <div
            className="progress-fill"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <QuizStep
            title="Ça te ressemble le plus ?"
            subtitle="On adapte VAYONIS à ton profil."
          >
            <div className="option-grid">
              {PROFILE_OPTIONS.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={profileType === option}
                  onClick={() => {
                    setProfileType(option);
                    goNext();
                  }}
                />
              ))}
            </div>
          </QuizStep>
        )}

        {step === 2 && (
          <QuizStep title="Ta tranche d'âge ?" subtitle="Juste pour mieux te connaître.">
            <div className="option-grid">
              {AGE_OPTIONS.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={ageRange === option}
                  onClick={() => {
                    setAgeRange(option);
                    goNext();
                  }}
                />
              ))}
            </div>
          </QuizStep>
        )}

        {step === 3 && (
          <QuizStep
            title="Ton objectif principal ?"
            subtitle="Ce qui compte le plus pour toi en ce moment."
          >
            <div className="option-grid">
              {GOAL_OPTIONS.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={goal === option}
                  onClick={() => {
                    setGoal(option);
                    goNext();
                  }}
                />
              ))}
            </div>
          </QuizStep>
        )}

        {step === 4 && (
          <QuizStep
            title="Tes réseaux actuels ?"
            subtitle="Sélectionne tout ce qui s'applique."
          >
            <div className="option-grid">
              {PLATFORM_OPTIONS.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={platforms.includes(option)}
                  onClick={() => togglePlatform(option)}
                />
              ))}
            </div>
            <button type="button" className="btn-primary continue-btn" onClick={goNext}>
              Continuer
            </button>
          </QuizStep>
        )}

        {step === 5 && (
          <div className="auth-step">
            <h1 className="quiz-title">Dernière étape</h1>
            <p className="quiz-subtitle">Crée ton compte pour sauvegarder tes réponses.</p>

            <GoogleButton onCredential={handleGoogleCredential} disabled={loading} />

            <div className="divider"><span>ou avec ton email</span></div>

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <label className="field">
                <span>Adresse email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                />
              </label>
              <label className="field">
                <span>Mot de passe</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </label>
              <label className="field">
                <span>Confirmer le mot de passe</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </label>

              {error && <p className="auth-error" role="alert">{error}</p>}

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Un instant…" : "Créer mon compte"}
              </button>
            </form>

            <p className="auth-switch">
              Déjà un compte ? <a href="/login">Connectez-vous</a>
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .onboard-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .onboard-panel {
          width: 100%;
          max-width: 440px;
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 28px 32px 36px;
        }
        .onboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .onboard-logo { display: flex; }
        .back-btn {
          background: var(--bg);
          border: 1px solid var(--line);
          color: var(--text);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .progress-track {
          height: 4px;
          background: var(--bg);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 30px;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          transition: width 0.3s ease;
        }

        .quiz-title {
          font-size: 1.3rem;
          margin-bottom: 6px;
        }
        .quiz-subtitle {
          color: var(--text-muted);
          font-size: 0.86rem;
          margin: 0 0 24px;
        }

        .option-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .continue-btn { margin-top: 20px; width: 100%; }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          font-size: 0.78rem;
          margin: 20px 0;
        }
        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--line);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .field input {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 11px 14px;
          color: var(--text);
          font-size: 0.94rem;
          font-family: inherit;
        }
        .field input:focus { border-color: var(--accent); }

        .auth-error {
          background: #f8717118;
          border: 1px solid #f8717140;
          color: var(--danger);
          font-size: 0.84rem;
          padding: 10px 14px;
          border-radius: 8px;
          margin: 0;
        }

        .btn-primary {
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          color: #0b0e1a;
          font-weight: 700;
          border: none;
          padding: 13px 0;
          border-radius: 10px;
          font-size: 0.95rem;
          cursor: pointer;
          margin-top: 4px;
        }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-switch {
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 22px 0 0;
        }
        .auth-switch a { color: var(--accent); text-decoration: none; }
      `}</style>
    </main>
  );
}

function QuizStep({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="quiz-title">{title}</h1>
      <p className="quiz-subtitle">{subtitle}</p>
      {children}
      <style jsx>{`
        .quiz-title {
          font-size: 1.3rem;
          margin-bottom: 6px;
        }
        .quiz-subtitle {
          color: var(--text-muted);
          font-size: 0.86rem;
          margin: 0 0 24px;
        }
      `}</style>
    </div>
  );
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={selected ? "option-card selected" : "option-card"}
      onClick={onClick}
    >
      {label}
      <style jsx>{`
        .option-card {
          text-align: left;
          background: var(--bg);
          border: 1px solid var(--line);
          color: var(--text);
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 0.94rem;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .option-card:hover {
          border-color: var(--accent-a);
        }
        .option-card.selected {
          border-color: var(--accent);
          background: var(--accent-glow);
        }
      `}</style>
    </button>
  );
}

/**
 * Bouton "Continuer avec Google" utilisant Google Identity Services.
 * Nécessite NEXT_PUBLIC_GOOGLE_CLIENT_ID dans .env.local — voir
 * .env.local.example. Charge le script Google à la volée au montage.
 */
function GoogleButton({
  onCredential,
  disabled,
}: {
  onCredential: (idToken: string) => void;
  disabled: boolean;
}) {
  const [ready, setReady] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  function handleClick() {
    if (!clientId) {
      alert(
        "NEXT_PUBLIC_GOOGLE_CLIENT_ID n'est pas configuré dans .env.local"
      );
      return;
    }
    // @ts-expect-error - google script attaches to window at runtime
    if (window.google?.accounts?.oauth2) {
      // @ts-expect-error - see above
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        callback: (response: { access_token?: string }) => {
          if (response.access_token) onCredential(response.access_token);
        },
      });
      client.requestAccessToken();
    }
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <button
        type="button"
        className="google-btn"
        onClick={handleClick}
        disabled={disabled || !ready}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9C16.66 14.2 17.64 11.9 17.64 9.2z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"/>
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
        </svg>
        Continuer avec Google
      </button>
      <style jsx>{`
        .google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #fff;
          color: #1a1a1a;
          border: none;
          padding: 12px 0;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
        }
        .google-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </>
  );
}
