const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * FastAPI error bodies come in different shapes:
 * - {"detail": "some string"}                     -> simple string
 * - {"detail": [{"loc": [...], "msg": "...", ...}]} -> Pydantic 422 validation array
 * This always returns a plain, displayable string instead of leaking a raw
 * object/array into the UI (which would render as "[object Object]").
 */
function extractErrorMessage(data: unknown, fallback: string): string {
  if (data && typeof data === "object" && "detail" in data) {
    const detail = (data as { detail: unknown }).detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((item) =>
          item && typeof item === "object" && "msg" in item
            ? String((item as { msg: unknown }).msg)
            : String(item)
        )
        .join(" ");
    }
  }
  return fallback;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let detail = "Une erreur est survenue.";
    try {
      const data = await response.json();
      detail = extractErrorMessage(data, detail);
    } catch {
      // response wasn't JSON, keep the generic message
    }
    throw new ApiError(detail, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface OnboardingAnswers {
  profile_type: string;
  age_range: string;
  goal: string;
  current_platforms: string[];
}

/**
 * NOTE: /auth/login utilise OAuth2PasswordRequestForm côté backend, qui
 * attend des données form-urlencoded avec un champ "username" (même si
 * c'est en réalité l'email) - pas du JSON. D'où l'implémentation à part,
 * qui ne passe pas par request().
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  const body = new URLSearchParams();
  body.set("username", email);
  body.set("password", password);

  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    let detail = "Email ou mot de passe incorrect.";
    try {
      const data = await response.json();
      detail = extractErrorMessage(data, detail);
    } catch {
      // keep generic message
    }
    throw new ApiError(detail, response.status);
  }
  return response.json() as Promise<AuthResponse>;
}

export function register(
  email: string,
  password: string,
  onboarding: OnboardingAnswers
): Promise<AuthResponse> {
  return request<AuthResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, onboarding }),
  });
}

export function loginWithGoogle(accessToken: string): Promise<AuthResponse> {
  return request<AuthResponse>("/api/v1/auth/google", {
    method: "POST",
    body: JSON.stringify({ access_token: accessToken }),
  });
}

// ---------- Comptes sociaux ----------

export interface SocialAccount {
  id: string;
  platform: string;
  external_id: string;
  display_name: string;
  token_expires_at: string | null;
  metadata_json: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getSocialAccounts(): Promise<SocialAccount[]> {
  return request<SocialAccount[]>("/api/v1/social-accounts", {
    headers: authHeaders(),
  });
}

const CONNECT_PATHS: Record<string, string> = {
  facebook: "/api/v1/social-accounts/meta/connect",
  instagram: "/api/v1/social-accounts/instagram/connect",
  linkedin: "/api/v1/social-accounts/linkedin/connect",
};

export async function getConnectUrl(platform: string): Promise<string> {
  const path = CONNECT_PATHS[platform];
  if (!path) throw new Error(`Plateforme inconnue: ${platform}`);
  const data = await request<{ authorization_url: string }>(path, {
    headers: authHeaders(),
  });
  return data.authorization_url;
}

// ---------- Posts ----------

export interface Post {
  id: string;
  user_id: string;
  caption: string | null;
  content_type: string;
  scheduled_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PostTargetResult {
  id: string;
  post_id: string;
  social_account_id: string;
  platform: string;
  status: string;
  external_post_id: string | null;
  error_message: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export function createPost(
  caption: string,
  scheduledAt?: string
): Promise<Post> {
  return request<Post>("/api/v1/posts", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      caption,
      content_type: "post_classique",
      ...(scheduledAt ? { scheduled_at: scheduledAt } : {}),
    }),
  });
}

export async function uploadPostMedia(postId: string, file: File): Promise<void> {
  const form = new FormData();
  form.append("file", file);
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}/media`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  if (!response.ok) {
    throw new ApiError("Échec de l'envoi du média.", response.status);
  }
}

export function addPostTarget(postId: string, socialAccountId: string): Promise<void> {
  return request(`/api/v1/posts/${postId}/targets`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ social_account_id: socialAccountId }),
  });
}

export function publishPost(postId: string): Promise<PostTargetResult[]> {
  return request<PostTargetResult[]>(`/api/v1/posts/${postId}/publish`, {
    method: "POST",
    headers: authHeaders(),
  });
}

const TOKEN_KEY = "vayonis_token";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}