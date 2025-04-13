
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  
  // Get stored language or default to 'ru' instead of 'uz'
  const [language, setLanguage] = useState<string>(() => {
    const storedLang = localStorage.getItem('language');
    // Only allow 'ru' or 'uz', default to 'ru' if anything else
    return storedLang === 'uz' ? 'uz' : 'ru';
  });

  useEffect(() => {
    // Initialize with stored language or default
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const changeLanguage = (lang: string) => {
    // Only allow 'ru' or 'uz'
    const validLang = lang === 'uz' ? 'uz' : 'ru';
    localStorage.setItem('language', validLang);
    setLanguage(validLang);
    i18n.changeLanguage(validLang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
