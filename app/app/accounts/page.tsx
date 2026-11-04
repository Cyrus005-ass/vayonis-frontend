'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.accounts.list().then(setAccounts).catch(() => {}).finally(() => setLoading(false))
  }, [])
  return (
    <div className="dashboard-content">
      <div className="dashboard-heading"><div><span className="eyebrow-light">RÉSEAUX CONNECTÉS</span><h1>Votre écosystème<span>.</span></h1><p>Gérez vos comptes sociaux.</p></div></div>
      <section className="panel accounts-panel">
        {loading ? <p>Chargement…</p> : accounts.length === 0 ? <p>Aucun compte connecté.</p> : (
          <div className="upcoming-list">{accounts.map((a) => (
            <div className="account-row" key={a.id}>
              <span className="account-icon" style={{ color: '#14cfc0' }}><span/></span>
              <span className="account-copy"><b>{a.display_name || a.handle}</b><small>{a.platform || a.network}</small></span>
              <span className="account-state">Connecté</span>
            </div>
          ))}</div>
        )}
        <button className="add-account" onClick={async () => { try { const r = await api.accounts.connect('instagram'); window.location.href = r.url || r.authorization_url } catch {} }}><span>+ Ajouter un compte</span></button>
      </section>
    </div>
  )
}