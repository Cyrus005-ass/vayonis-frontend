'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null)
  useEffect(() => { api.analytics.get().then(setStats).catch(() => {}) }, [])
  const bars: number[] = []
  return (
    <div className="dashboard-content">
      <div className="dashboard-heading"><div><span className="eyebrow-light">ANALYSES</span><h1>Vos performances<span>.</span></h1><p>Vue d'ensemble de votre activité.</p></div></div>
      <section className="metric-grid" aria-label="Indicateurs clés">
        <div className="metric-card"><div className="metric-icon"></div><span>Total posts</span><strong>{stats?.total_posts ?? 0}</strong><small></small></div>
        <div className="metric-card"><div className="metric-icon"></div><span>Publiés</span><strong>{stats?.published ?? 0}</strong><small></small></div>
        <div className="metric-card"><div className="metric-icon"></div><span>Programmés</span><strong>{stats?.scheduled ?? 0}</strong><small></small></div>
        <div className="metric-card"><div className="metric-icon"></div><span>Échecs</span><strong>{stats?.failed ?? 0}</strong><small></small></div>
      </section>
      <section className="panel activity-panel" style={{ marginTop: '12px' }}>
        <div className="panel-heading"><div><span className="eyebrow-light">ACTIVITÉ</span><h2>Portée sur 7 jours.</h2></div></div>
{bars.length === 0 ? <p>Aucune donnée pour le moment.</p> : (
        <div className="chart">
          <div className="chart-y"><span>24</span><span>18</span><span>12</span><span>6</span><span>0</span></div>
          <div className="chart-body">
            <div className="chart-lines"><i/><i/><i/><i/><i/></div>
            <div className="chart-bars">{bars.map((h, i) => <span key={i} style={{ height: `${h * 3}px` }}><b>{h}</b></span>)}</div>
            <div className="chart-x"><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span></div>
          </div>
        </div>
      )}
      </section>
    </div>
  )
}