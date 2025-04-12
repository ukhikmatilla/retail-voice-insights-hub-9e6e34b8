
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { loadTranslationModules } from './utils';

// Load all translation modules for each language
const resources = {
  uz: {
    translation: loadTranslationModules('uz')
  },
  ru: {
    translation: loadTranslationModules('ru')
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'uz',
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // Prevents loading issues with React 18
    }
  });

// Export a function to change language that also updates localStorage
export const changeLanguage = (lang: 'uz' | 'ru') => {
  localStorage.setItem('language', lang);
  i18n.changeLanguage(lang);
};

export default i18n;
