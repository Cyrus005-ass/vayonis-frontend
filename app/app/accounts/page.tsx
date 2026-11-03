'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.accounts.list().then(setAccounts).catch(() => {}).finally(() => setLoading(false))
  }, [])
  if (loading) return <div>Chargement…</div>
  return (
    <div>
      <h1>Comptes connectés</h1>
      {accounts.length === 0 ? <p>Aucun compte connecté.</p> : (
        <ul>{accounts.map((a) => <li key={a.id}>{a.handle || a.display_name} — {a.network || a.platform}</li>)}</ul>
      )}
      <button onClick={async () => { const r = await api.accounts.connect('instagram'); window.location.href = r.url }}>Connecter Instagram</button>
    </div>
  )
}