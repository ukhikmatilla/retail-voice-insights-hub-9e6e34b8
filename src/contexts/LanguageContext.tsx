
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage as i18nChangeLanguage } from '@/i18n';

interface LanguageContextProps {
  language: 'uz' | 'ru';
  changeLanguage: (lang: 'uz' | 'ru') => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<'uz' | 'ru'>(
    (localStorage.getItem('language') as 'uz' | 'ru') || 'uz'
  );

  useEffect(() => {
    // Initialize with stored language or default
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const changeLanguage = (lang: 'uz' | 'ru') => {
    // Use the i18n function from our index file to update localStorage as well
    i18nChangeLanguage(lang);
    setLanguage(lang);
    console.log('Language changed to:', lang);
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
