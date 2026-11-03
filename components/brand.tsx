import Image from 'next/image'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? 'brand-compact' : ''}`} href="/" aria-label="Accueil Vayonis">
      <Image className="brand-mark-image" src="/vayonis-mark.png" alt="" width={32} height={32} priority />
      {!compact && <span>VAYONIS</span>}
    </a>
  )
}
