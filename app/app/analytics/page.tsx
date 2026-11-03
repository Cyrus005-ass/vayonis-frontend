'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null)
  useEffect(() => { api.analytics.get().then(setStats).catch(() => {}) }, [])
  return (
    <div>
      <h1>Analytics</h1>
      {stats ? (
        <ul>
          <li>Total : {stats.total_posts}</li>
          <li>Publiés : {stats.published}</li>
          <li>Programmés : {stats.scheduled}</li>
          <li>Échecs : {stats.failed}</li>
        </ul>
      ) : <p>Chargement…</p>}
    </div>
  )
}