import type { ApiResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const TOKEN_KEY = 'vayonis_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
  if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY)
}

function authHeaders(): Record<string, string> {
  const t = getToken()
  return t ? { Authorization: `Bearer ${t}` } : {}
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...(init?.headers || {}) },
  })
  if (!response.ok) throw new Error('La requête n\'a pas pu aboutir.')
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const body = new URLSearchParams()
      body.set('username', email)
      body.set('password', password)
      const r = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!r.ok) throw new Error('Email ou mot de passe incorrect.')
      const data = await r.json()
      if (data.access_token) localStorage.setItem(TOKEN_KEY, data.access_token)
      return data
    },
    register: async (email: string, password: string) => {
      const data = await request<any>('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, onboarding: { profile_type: 'creator', age_range: '25-34', goal: 'publish', current_platforms: [] } }),
      })
      if (data.access_token) localStorage.setItem(TOKEN_KEY, data.access_token)
      return data
    },
  },
  profile: {
    get: () => request<any>('/api/v1/users/me'),
  },
  accounts: {
    list: () => request<any[]>('/api/v1/social-accounts'),
    connect: (network: string) => request<{ authorization_url: string }>(`/api/v1/social-accounts/${network}/connect`),
    disconnect: (id: string) => request<void>(`/api/v1/social-accounts/${id}`, { method: 'DELETE' }),
  },
  posts: {
    list: () => request<any[]>('/api/v1/posts'),
    create: (post: any) => request<any>('/api/v1/posts', { method: 'POST', body: JSON.stringify(post) }),
    publish: (id: string) => request<any>(`/api/v1/posts/${id}/publish`, { method: 'POST' }),
  },
}