'use client'

import Link from 'next/link'

const links = [['Accueil', '/app'], ['Composer', '/app/composer'], ['Calendrier', '/app/calendar'], ['Réglages', '/app/settings']]

export function BottomNav() {
  return <nav className="mobile-bottom-nav" aria-label="Navigation mobile">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
}
