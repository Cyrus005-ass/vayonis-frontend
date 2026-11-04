'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function QueuePage() {
  const [posts, setPosts] = useState<any[]>([])
  useEffect(() => { api.posts.list().then(setPosts).catch(() => {}) }, [])
  return (
    <div className="dashboard-content">
      <div className="dashboard-heading"><div><span className="eyebrow-light">FILE D'ATTENTE</span><h1>Vos publications<span>.</span></h1><p>Gérez vos brouillons et publications.</p></div></div>
      <section className="panel upcoming-panel">
        {posts.length === 0 ? <p>Aucune publication.</p> : (
          <div className="upcoming-list">{posts.map((post) => (
            <button className="upcoming-row" key={post.id} onClick={() => {}}>
              <span className="post-thumb" style={{ background: `linear-gradient(135deg, #14cfc0, #0b3035)` }}/>
              <span className="post-info"><b>{post.caption || post.content}</b><small>{post.status} · {post.scheduled_at || ''}</small></span>
              <span className={`post-status ${post.status === 'draft' ? 'draft' : ''}`}>{post.status}</span>
            </button>
          ))}</div>
        )}
      </section>
    </div>
  )
}