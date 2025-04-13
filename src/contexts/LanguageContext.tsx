
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n';

type Language = 'uz' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'uz'
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update the language when the component mounts
    changeLanguage(language);
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
