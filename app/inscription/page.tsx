import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'
export default function InscriptionPage() { return <main className="auth-page"><div className="auth-card"><a className="auth-brand" href="/"><img src="/vayonis-mark.png" alt="" /> VAYONIS</a><span className="eyebrow-light">COMMENCEZ SIMPLEMENT</span><h1>Donnez une direction à vos idées.</h1><p>Un espace calme pour composer, programmer et comprendre ce qui résonne.</p><AuthForm mode="inscription" /><small>Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link></small></div></main> }
