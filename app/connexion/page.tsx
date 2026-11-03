import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'
export default function ConnexionPage() { return <main className="auth-page"><div className="auth-card"><a className="auth-brand" href="/"><img src="/vayonis-mark.png" alt="" /> VAYONIS</a><span className="eyebrow-light">BON RETOUR</span><h1>Votre espace créatif vous attend.</h1><p>Retrouvez vos contenus, vos comptes et votre rythme de publication.</p><AuthForm mode="connexion" /><small>Pas encore de compte ? <Link href="/inscription">Créer mon espace</Link></small></div></main> }
