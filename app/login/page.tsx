"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { login, loginWithGoogle, saveToken, ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const auth = await login(email, password);
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

  async function handleGoogleCredential(accessToken: string) {
    setError(null);
    setLoading(true);
    try {
      const auth = await loginWithGoogle(accessToken);
      saveToken(auth.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "La connexion Google a échoué. Réessaie."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-panel">
        <Link href="/" className="auth-logo">
          <Image
            src="/logo-on-dark.png"
            alt="VAYONIS"
            width={140}
            height={36}
            style={{ height: 26, width: "auto" }}
            priority
          />
        </Link>

        <h1 className="auth-title">Content de vous revoir</h1>
        <p className="auth-subtitle">Connectez-vous pour gérer vos publications.</p>

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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Un instant…" : "Se connecter"}
          </button>
        </form>

        <p className="auth-switch">
          Pas encore de compte ? <a href="/signup">Inscrivez-vous</a>
        </p>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .auth-panel {
          width: 100%;
          max-width: 400px;
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 40px 36px;
        }

        .auth-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }

        .auth-title {
          font-size: 1.4rem;
          margin-bottom: 6px;
          text-align: center;
        }
        .auth-subtitle {
          color: var(--text-muted);
          font-size: 0.88rem;
          margin: 0 0 26px;
          text-align: center;
        }

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
          gap: 16px;
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
        .field input:focus {
          border-color: var(--accent);
        }

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
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-switch {
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 24px 0 0;
        }
        .auth-switch a {
          color: var(--accent);
          text-decoration: none;
        }
      `}</style>
    </main>
  );
}

function GoogleButton({
  onCredential,
  disabled,
}: {
  onCredential: (accessToken: string) => void;
  disabled: boolean;
}) {
  const [ready, setReady] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  function handleClick() {
    if (!clientId) {
      alert("NEXT_PUBLIC_GOOGLE_CLIENT_ID n'est pas configuré dans .env.local");
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
