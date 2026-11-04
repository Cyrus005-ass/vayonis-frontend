'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { api } from '@/lib/api'

const questions = [
  { title: 'Qu’est-ce qui vous amène ici ?', options: ['Structurer ma présence', 'Publier plus régulièrement', 'Comprendre ce qui fonctionne'] },
  { title: 'Où vive votre audience ?', options: ['Instagram et Facebook', 'LinkedIn', 'Un peu partout'] },
  { title: 'Quel rythme vous ressemble ?', options: ['Quelques fois par semaine', 'Quand l’idée est juste', 'Je veux trouver mon rythme'] },
]

export function AuthForm({ mode }: { mode: 'connexion' | 'inscription' }) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [answers, setAnswers] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isQuiz = mode === 'inscription' && step > 0

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    if (mode === 'inscription' && step === 0) {
      setStep(1)
      return
    }
    if (mode === 'inscription' && step < questions.length) {
      if (!answers[step - 1]) return
      setStep((value) => value + 1)
      return
    }
    setLoading(true)
    try {
      if (mode === 'inscription') await api.auth.register(email, password)
      else await api.auth.login(email, password)
      router.push('/app')
      router.refresh()
    } catch {
      setError('Impossible de valider ces informations. Vérifiez vos champs puis réessayez.')
    } finally {
      setLoading(false)
    }
  }

  if (isQuiz) {
    const question = questions[step - 1]
    return <form className="auth-form quiz-form" onSubmit={submit}>
      <div className="quiz-progress"><span style={{ width: `${(step / questions.length) * 100}%` }} /></div>
      <div className="quiz-meta"><span>Votre direction</span><b>{step} / {questions.length}</b></div>
      <h2>{question.title}</h2>
      <div className="quiz-options">{question.options.map((option) => <button key={option} type="button" className={answers[step - 1] === option ? 'selected' : ''} onClick={() => setAnswers((current) => { const next = [...current]; next[step - 1] = option; return next })}>{option}{answers[step - 1] === option && <Check />}</button>)}</div>
      {error && <p className="auth-error" role="alert">{error}</p>}
<div className="quiz-actions"><button className="quiz-back" type="button" onClick={() => setStep((value) => value - 1)}><ArrowLeft /> Retour</button><button className="auth-submit" type="submit" disabled={!answers[step - 1]} onClick={submit}>{step === questions.length ? 'Entrer dans Vayonis' : 'Continuer'} <ArrowRight /></button></div>
    </form>
  }

  return <form className="auth-form" onSubmit={submit}>
    {mode === 'inscription' && <label>Nom complet<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Julie Martin" /></label>}
    <label>Adresse e-mail<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.fr" /></label>
    <label>Mot de passe<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8 caractères minimum" /></label>
    {error && <p className="auth-error" role="alert">{error}</p>}
    <button className="auth-submit" disabled={loading}>{loading ? <><LoaderCircle className="spin" /> Chargement…</> : mode === 'inscription' ? 'Continuer' : 'Se connecter'}</button>
  </form>
}
