'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function QueuePage() {
  const [posts, setPosts] = useState<any[]>([])
  useEffect(() => { api.posts.list().then(setPosts).catch(() => {}) }, [])
  return (
    <div>
      <h1>File de publication</h1>
      {posts.length === 0 ? <p>Aucune publication.</p> : (
        <ul>{posts.map((p) => <li key={p.id}>{p.content || p.caption} — {p.status}</li>)}</ul>
      )}
    </div>
  )
}