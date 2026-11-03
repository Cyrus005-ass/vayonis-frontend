'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function ComposerPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const post = await api.posts.create({ content, status: 'draft', networks: [] })
      await api.posts.publish(post.id)
    } catch {} finally { setLoading(false) }
  }
  return (
    <form onSubmit={submit}>
      <h1>Composer</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Publication…' : 'Publier'}</button>
    </form>
  )
}