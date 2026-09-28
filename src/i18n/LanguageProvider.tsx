import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext } from './context';
import type { Language } from './translations';
import { getTranslations } from './translations';

const STORAGE_KEY = 'cv-generator-language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === 'en' || stored === 'es') return stored;
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('es') ? 'es' : 'en';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLanguage);
      document.documentElement.lang = newLanguage;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: getTranslations(language),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
