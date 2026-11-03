'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type Language = 'fr' | 'en'
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'fr', setLanguage: () => undefined })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')
  const value = useMemo(() => ({ language, setLanguage }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
