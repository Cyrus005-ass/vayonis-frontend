'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  useEffect(() => { api.profile.get().then(setProfile).catch(() => {}) }, [])
  return (
    <div>
      <h1>Paramètres</h1>
      {profile ? <p>{profile.name} — {profile.email}</p> : <p>Chargement…</p>}
    </div>
  )
}