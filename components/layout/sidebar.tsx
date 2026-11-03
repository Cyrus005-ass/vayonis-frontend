'use client'

import Link from 'next/link'
import { Brand } from '@/components/brand'

const links = [['Accueil', '/app'], ['Composer', '/app/composer'], ['File d’attente', '/app/queue'], ['Calendrier', '/app/calendar'], ['Réseaux', '/app/accounts'], ['Analyses', '/app/analytics'], ['Réglages', '/app/settings']]

export function Sidebar() {
  return <aside className="app-sidebar"><Brand /> <nav aria-label="Navigation principale">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></aside>
}
