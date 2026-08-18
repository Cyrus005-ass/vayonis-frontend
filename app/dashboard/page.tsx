"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getToken,
  clearToken,
  getSocialAccounts,
  getConnectUrl,
  createPost,
  uploadPostMedia,
  addPostTarget,
  publishPost,
  SocialAccount,
  PostTargetResult,
  ApiError,
} from "@/lib/api";

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};

const CONNECTABLE_PLATFORMS = ["facebook", "instagram", "linkedin"];

export default function DashboardPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [results, setResults] = useState<PostTargetResult[] | null>(null);
  const [postError, setPostError] = useState<string | null>(null);

  async function loadAccounts() {
    setLoadingAccounts(true);
    try {
      const data = await getSocialAccounts();
      setAccounts(data);
    } catch {
      // silently ignore for now - could show a toast
    } finally {
      setLoadingAccounts(false);
    }
  }

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAccounts();
  }, [router]);

  async function handleConnect(platform: string) {
    setConnecting(platform);
    try {
      const url = await getConnectUrl(platform);
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = url;
    } catch {
      setConnecting(null);
    }
  }

  function toggleAccount(id: string) {
    setSelectedAccountIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function handleLogout() {
    clearToken();
    router.push("/login");
  }

  async function handlePublish(event: FormEvent) {
    event.preventDefault();
    setPostError(null);
    setResults(null);

    if (!caption.trim()) {
      setPostError("Écris un texte pour ton post.");
      return;
    }
    if (selectedAccountIds.length === 0) {
      setPostError("Choisis au moins une plateforme.");
      return;
    }

    setPublishing(true);
    try {
      const post = await createPost(
        caption,
        scheduledAt ? new Date(scheduledAt).toISOString() : undefined
      );

      if (file) {
        await uploadPostMedia(post.id, file);
      }

      for (const accountId of selectedAccountIds) {
        await addPostTarget(post.id, accountId);
      }

      const published = await publishPost(post.id);
      setResults(published);
      setCaption("");
      setFile(null);
      setSelectedAccountIds([]);
      setScheduledAt("");
    } catch (err) {
      setPostError(
        err instanceof ApiError ? err.message : "Une erreur est survenue pendant la publication."
      );
    } finally {
      setPublishing(false);
    }
  }

  return (
    <main className="dashboard">
      <nav className="dash-nav">
        <div className="dash-nav-inner">
          <Image
            src="/logo-on-dark.png"
            alt="VAYONIS"
            width={150}
            height={38}
            style={{ height: 28, width: "auto" }}
            priority
          />
          <button className="logout-btn" onClick={handleLogout}>Se déconnecter</button>
        </div>
      </nav>

      <div className="dash-content">
        <section className="panel">
          <h2>Vos comptes connectés</h2>
          <p className="panel-sub">Connectez vos réseaux pour pouvoir y publier.</p>

          {loadingAccounts ? (
            <p className="muted">Chargement…</p>
          ) : (
            <div className="account-grid">
              {CONNECTABLE_PLATFORMS.map((platform) => {
                const connectedAccounts = accounts.filter((a) => a.platform === platform);
                return (
                  <div key={platform} className="account-card">
                    <div className="account-card-header">
                      <span className="platform-name">{PLATFORM_LABELS[platform]}</span>
                      {connectedAccounts.length > 0 && (
                        <span className="badge-connected">Connecté</span>
                      )}
                    </div>
                    {connectedAccounts.length > 0 ? (
                      <ul className="account-list">
                        {connectedAccounts.map((a) => (
                          <li key={a.id}>{a.display_name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="muted small">Aucun compte connecté.</p>
                    )}
                    <button
                      type="button"
                      className="btn-connect"
                      onClick={() => handleConnect(platform)}
                      disabled={connecting === platform}
                    >
                      {connecting === platform
                        ? "Redirection…"
                        : connectedAccounts.length > 0
                        ? "Connecter un autre compte"
                        : `Connecter ${PLATFORM_LABELS[platform]}`}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="panel">
          <h2>Créer une publication</h2>
          <p className="panel-sub">Rédigez, choisissez vos plateformes, publiez.</p>

          <form onSubmit={handlePublish} className="post-form">
            <label className="field">
              <span>Texte du post</span>
              <textarea
                rows={5}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Qu'avez-vous envie de partager ?"
              />
            </label>

            <label className="field">
              <span>Image ou vidéo (optionnel)</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            <div className="field">
              <span>Publier sur</span>
              <div className="target-grid">
                {accounts.length === 0 && (
                  <p className="muted small">
                    Connectez d&apos;abord au moins un compte ci-dessus.
                  </p>
                )}
                {accounts.map((account) => (
                  <label key={account.id} className="target-chip">
                    <input
                      type="checkbox"
                      checked={selectedAccountIds.includes(account.id)}
                      onChange={() => toggleAccount(account.id)}
                    />
                    {PLATFORM_LABELS[account.platform] || account.platform} — {account.display_name}
                  </label>
                ))}
              </div>
            </div>

            <label className="field">
              <span>Programmer pour plus tard (optionnel)</span>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
            </label>

            {postError && <p className="form-error" role="alert">{postError}</p>}

            <button type="submit" className="btn-primary" disabled={publishing}>
              {publishing ? "Publication en cours…" : "Publier maintenant"}
            </button>
          </form>

          {results && (
            <div className="results">
              <h3>Résultat de la publication</h3>
              {results.map((r) => (
                <div key={r.id} className={`result-row ${r.status}`}>
                  <span className="result-platform">
                    {PLATFORM_LABELS[r.platform] || r.platform}
                  </span>
                  <span className={`result-status ${r.status}`}>
                    {r.status === "published" ? "✓ Publié" : "✗ Échec"}
                  </span>
                  {r.error_message && <p className="result-error">{r.error_message}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .dashboard { min-height: 100vh; }

        .dash-nav {
          padding: 18px 0;
          border-bottom: 1px solid var(--line);
        }
        .dash-nav-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logout-btn {
          background: transparent;
          border: 1px solid var(--line);
          color: var(--text-muted);
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.84rem;
          cursor: pointer;
        }

        .dash-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 36px 24px 60px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .panel {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px;
        }
        .panel h2 { font-size: 1.2rem; margin-bottom: 6px; }
        .panel-sub { color: var(--text-muted); font-size: 0.86rem; margin: 0 0 22px; }

        .muted { color: var(--text-muted); font-size: 0.88rem; }
        .muted.small { font-size: 0.82rem; }

        .account-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 720px) { .account-grid { grid-template-columns: 1fr; } }

        .account-card {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .account-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .platform-name { font-weight: 600; font-size: 0.94rem; }
        .badge-connected {
          background: #4ade8018;
          color: var(--live);
          font-size: 0.72rem;
          padding: 3px 8px;
          border-radius: 999px;
        }
        .account-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .btn-connect {
          background: transparent;
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 9px 0;
          border-radius: 8px;
          font-size: 0.84rem;
          cursor: pointer;
          margin-top: auto;
        }
        .btn-connect:disabled { opacity: 0.6; cursor: not-allowed; }

        .post-form { display: flex; flex-direction: column; gap: 18px; }
        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.84rem;
          color: var(--text-muted);
        }
        .field textarea,
        .field input[type="file"],
        .field input[type="datetime-local"] {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          color: var(--text);
          font-size: 0.94rem;
          font-family: inherit;
          resize: vertical;
        }

        .target-grid { display: flex; flex-direction: column; gap: 8px; }
        .target-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 0.86rem;
          color: var(--text);
          cursor: pointer;
        }

        .form-error {
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
        }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .results {
          margin-top: 26px;
          border-top: 1px solid var(--line);
          padding-top: 20px;
        }
        .results h3 { font-size: 1rem; margin-bottom: 12px; }
        .result-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          font-size: 0.88rem;
          flex-wrap: wrap;
        }
        .result-platform { font-weight: 600; min-width: 90px; }
        .result-status.published { color: var(--live); }
        .result-status.failed { color: var(--danger); }
        .result-error {
          width: 100%;
          color: var(--text-muted);
          font-size: 0.8rem;
          margin: 2px 0 0;
        }
      `}</style>
    </main>
  );
}