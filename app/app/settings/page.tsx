'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  useEffect(() => { api.profile.get().then(setProfile).catch(() => {}) }, [])
  return (
    <div className="dashboard-content">
      <div className="dashboard-heading"><div><span className="eyebrow-light">RÉGLAGES</span><h1>Paramètres<span>.</span></h1><p>Gérez votre profil.</p></div></div>
      <section className="panel">
        {profile ? (
          <div>
            <p><b>Nom :</b> {profile.full_name || profile.name}</p>
            <p><b>Email :</b> {profile.email}</p>
          </div>
        ) : <p>Chargement…</p>}
      </section>
    </div>
  )
}