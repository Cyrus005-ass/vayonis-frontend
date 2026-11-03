'use client'

import { useState } from 'react'
import { ArrowRight, AtSign, Check, ChevronDown, CirclePlay, Globe2, Image, Menu, MessageCircle, Music2, Play, Sparkles, X } from 'lucide-react'

const channels = [
  { name: 'Instagram', icon: AtSign, color: '#ff7268', handle: '@vayonis.studio' },
  { name: 'LinkedIn', icon: Globe2, color: '#42e8f5', handle: 'Vayonis Studio' },
  { name: 'Facebook', icon: AtSign, color: '#c9ff70', handle: 'Vayonis' },
  { name: 'TikTok', icon: Music2, color: '#f7f7f2', handle: 'Bientôt disponible' },
  { name: 'YouTube', icon: Play, color: '#ff7268', handle: 'Bientôt disponible' },
  { name: 'Pinterest', icon: Image, color: '#ff9e8f', handle: 'Bientôt disponible' },
  { name: 'Threads', icon: MessageCircle, color: '#d7e5df', handle: 'Bientôt disponible' },
]

function Brand() {
  return <a className="brand" href="#top" aria-label="Accueil Vayonis"><img className="brand-mark-image" src="/vayonis-mark.png" alt="" /><span>VAYONIS</span></a>
}

function NetworkNode({ channel, index, active }: { channel: typeof channels[number], index: number, active: boolean }) {
  const Icon = channel.icon
  return <div className={`network-node node-${index} ${active ? 'active' : ''}`} style={{ '--node-color': channel.color } as React.CSSProperties}><span className="node-line" /><span className="node-icon"><Icon size={16} strokeWidth={1.7} /></span><span className="node-label">{channel.name}</span><small>{active ? 'Connecté' : 'Prêt'}</small></div>
}

function DiffusionScene({ active }: { active: boolean }) {
  return <div className={`diffusion-scene ${active ? 'is-active' : ''}`} aria-label="Animated diffusion map showing one post reaching three social networks">
    <div className="scene-grid" /><div className="orbital orbital-one" /><div className="orbital orbital-two" />
    <div className="beam beam-one" /><div className="beam beam-two" /><div className="beam beam-three" />
    <div className="origin"><span className="origin-core"><Sparkles size={17} /></span><span className="origin-ring" /><b>UNE<br />IDÉE</b></div>
    {channels.map((channel, index) => <NetworkNode key={channel.name} channel={channel} index={index} active={active} />)}
    <div className="mini-post"><span className="mini-post-image" /><span className="mini-post-copy"><b>Lumière du matin, nouvelles idées.</b><small>À l’instant · Prêt à publier</small></span><Check size={14} /></div>
  </div>
}

function ComposerDemo() {
  const [selected, setSelected] = useState<string[]>(['Instagram', 'LinkedIn'])
  const [published, setPublished] = useState(false)
  const [text, setText] = useState('Une nouvelle semaine commence avec un point de vue clair. Que créez-vous ensuite ?')
  const toggle = (name: string) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  return <div className="composer-shell">
    <div className="composer-main"><div className="composer-top"><span className="eyebrow">Éditeur en direct</span><span className="draft-state"><span /> Brouillon enregistré</span></div><textarea value={text} onChange={(event) => setText(event.target.value)} aria-label="Post caption" /><div className="composer-toolbar"><button type="button"><Sparkles size={15} /> Améliorer le texte</button><button type="button">Ajouter un média</button><span>0:42</span></div><div className="composer-channel-list">{channels.map(({ name, icon: Icon, color }) => <button type="button" key={name} onClick={() => toggle(name)} className={selected.includes(name) ? 'chosen' : ''}><Icon size={16} style={{ color }} />{name}<span className="channel-check">{selected.includes(name) && <Check size={12} />}</span></button>)}</div><button className="publish-button" type="button" onClick={() => setPublished(true)}>{published ? <><Check size={16} /> Simulation complete</> : <><Play size={15} fill="currentColor" /> Simuler la diffusion</>}</button></div>
    <div className="composer-preview"><div className="preview-label"><span>Aperçu</span><span className="preview-live"><span /> {published ? 'Publié' : 'Prêt'}</span></div><div className="preview-card"><div className="preview-photo" /><div className="preview-author"><span className="avatar">V</span><div><b>Vayonis Studio</b><small>{selected.length ? selected.join(' · ') : 'Choisir un réseau'}</small></div><span>•••</span></div><p>{text}</p><div className="preview-actions"><span>♡ 124</span><span>↗ Partager</span><span>Enregistrer</span></div></div></div>
  </div>
}

export default function Page() {
  const [active, setActive] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  return <main id="top">
    <nav className="site-nav"><Brand /><div className={`nav-links ${mobileOpen ? 'open' : ''}`}><a href="#studio" onClick={() => setMobileOpen(false)}>Le studio</a><a href="#composer" onClick={() => setMobileOpen(false)}>Comment ça marche</a><a href="#networks" onClick={() => setMobileOpen(false)}>Réseaux</a><a href="#roadmap" onClick={() => setMobileOpen(false)}>Feuille de route</a><a className="nav-cta" href="/connexion" onClick={() => setMobileOpen(false)}>Se connecter <ArrowRight size={14} /></a></div><button className="menu-button" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button></nav>
    <section className="hero section-pad"><div className="hero-copy"><div className="kicker"><span className="kicker-dot" /> Studio de publication digitale <span className="kicker-line" /></div><h1>Publiez une fois.<br /><em>VAYONIS</em> s’occupe du reste.</h1><p>Écrivez une publication, choisissez vos réseaux et suivez sa diffusion, réseau par réseau.</p><div className="hero-actions"><a href="/inscription" className="primary-button">Créer mon espace <ArrowRight size={17} /></a><a href="#studio" className="text-button"><CirclePlay size={18} /> Découvrir Vayonis</a></div><div className="proof"><div className="proof-avatars"><span>J</span><span>A</span><span>M</span><span>+</span></div><span>Pensé pour celles et ceux qui ont<br /><b>quelque chose à dire.</b></span></div></div><aside className="hero-side-note"><div className="hero-note-mark"><span /><span /><span /></div><span className="eyebrow">Vayonis s’occupe du reste</span><p>De l’adaptation des formats à la diffusion sur chaque réseau, vous gardez l’idée. Nous gérons le mouvement.</p><a href="/inscription" className="text-button">Commencer simplement <ArrowRight size={17} /></a></aside><div className="hero-visual"><DiffusionScene active={active} /><button className="scene-toggle" type="button" onClick={() => setActive(!active)}><span className={active ? 'pulse' : ''} />{active ? 'Diffusion live' : 'Aperçu de la diffusion'} <ArrowRight size={14} /></button></div></section>
    <section className="signal-strip"><span>UNE CRÉATION</span><i /><span>TROIS DESTINATIONS</span><i /><span>ZÉRO FRICTION</span><i /><span>PLUS DE SIGNAL</span></section>
    <section className="intro section-pad" id="studio"><div className="section-heading"><span className="eyebrow">01 / Le studio</span><h2>Transformez l’étincelle<br />en <em>signal.</em></h2></div><div className="intro-story"><p className="large-copy">Les meilleures idées méritent d’aller plus loin que l’instant où elles naissent. Vayonis trace un chemin clair du <strong>brouillon</strong> à la <strong>diffusion.</strong></p><div className="story-stat"><span>01</span><p>Un espace dédié aux mots, aux visuels et au rythme de votre présence.</p></div><div className="story-stat"><span>02</span><p>Une façon plus sereine de rester constant sans ressembler à tout le monde.</p></div></div></section>
    <section className="image-break section-pad"><div className="image-card"><img src="/vayonis-creator.png" alt="Directrice artistique au travail dans un studio" /><div className="image-caption"><span>Dans l’atelier de</span><b>Des personnes qui créent<br />la prochaine idée.</b><ArrowRight size={18} /></div></div><div className="image-note"><span className="eyebrow">Un rythme plus juste</span><p>Moins d’onglets ouverts.<br /><em>Plus de création.</em></p></div></section>
    <section className="composer-section section-pad" id="composer"><div className="section-heading"><span className="eyebrow">02 / L’éditeur</span><h2>Créez une idée.<br /><em>Rendez-la mémorable.</em></h2><p>Écrivez une fois. Adaptez chaque format. Suivez précisément sa diffusion.</p></div><ComposerDemo /></section>
    <section className="networks-section section-pad" id="networks"><div className="networks-copy"><span className="eyebrow">03 / Le réseau</span><h2>Votre idée,<br /><em>en mouvement.</em></h2><p>Vayonis relie les espaces où votre audience est déjà présente, puis donne à chaque destination l’attention qu’elle mérite.</p><a href="#composer" className="text-button">Voir le parcours <ArrowRight size={17} /></a></div><div className="network-list">{channels.map((item, i) => { const Icon = item.icon; return <div className="network-row" key={item.name}><span className="network-index">0{i + 1}</span><span className="network-row-icon" style={{ color: item.color }}><Icon size={20} /></span><b>{item.name}</b><span className={i > 2 ? 'coming-soon' : 'connected'}>{i > 2 ? 'Bientôt disponible' : 'Disponible'}</span><ArrowRight size={17} /></div> })}</div></section>
    <section className="roadmap section-pad" id="roadmap"><div className="roadmap-head"><span className="eyebrow">04 / Journal de bord</span><h2>Construit au grand jour.<br /><em>Avancer avec intention.</em></h2></div><div className="roadmap-list"><div className="roadmap-item done"><span>01</span><div><small>Disponible maintenant</small><h3>Le signal essentiel</h3><p>Éditeur, comptes connectés et diffusion fluide pour Instagram, LinkedIn et Facebook.</p></div><Check size={18} /></div><div className="roadmap-item"><span>02</span><div><small>En préparation</small><h3>Un langage visuel plus riche</h3><p>Médiathèque, programmation intelligente et aperçu plus expressif de chaque destination.</p></div><Sparkles size={18} /></div><div className="roadmap-item"><span>03</span><div><small>À l’horizon</small><h3>Encore plus de destinations</h3><p>TikTok et YouTube, avec les outils qui rendent une présence distribuée cohérente.</p></div><ChevronDown size={18} /></div></div></section>
    <section className="final-cta section-pad"><div className="final-orb"><span /><span /><span /></div><div className="final-copy"><span className="eyebrow">Le signal vous appartient</span><h2>Rendez la prochaine<br /><em>idée visible.</em></h2><a href="/inscription" className="primary-button">Créer mon espace <ArrowRight size={17} /></a></div></section>
    <footer><Brand /><span>Une idée. Plusieurs destinations.</span><span>© 2026 Studio Vayonis</span></footer>
  </main>
}
