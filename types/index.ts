export type SocialNetwork = 'instagram' | 'linkedin' | 'facebook' | 'tiktok' | 'youtube' | 'pinterest' | 'threads'

export type ApiResponse<T> = {
  data: T
  message?: string
}

export type UserProfile = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export type SocialAccount = {
  id: string
  network: SocialNetwork
  handle: string
  connected: boolean
  expiresAt?: string
}

export type SocialPost = {
  id: string
  content: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  networks: SocialNetwork[]
  scheduledAt?: string
  publishedAt?: string
}
