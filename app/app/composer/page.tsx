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
      const post = await api.posts.create({ caption: content, content_type: 'text', status: 'draft' })
      await api.posts.publish(post.id)
    } catch {} finally { setLoading(false) }
  }
  return (
    <div className="dashboard-content">
      <div className="dashboard-heading"><div><span className="eyebrow-light">COMPOSER</span><h1>Nouvelle publication<span>.</span></h1><p>Rédigez et publiez.</p></div></div>
      <section className="panel">
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Votre texte…" style={{ minHeight: '120px', padding: '12px', background: '#10242a', color: '#e9f3ee', border: '1px solid #234247', borderRadius: '3px' }} />
          <button className="create-button" type="submit" disabled={loading}>{loading ? 'Publication…' : 'Publier'}</button>
        </form>
      </section>
    </div>
  )
}