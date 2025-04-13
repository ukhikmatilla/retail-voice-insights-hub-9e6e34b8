
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import Russian translations
import ruCommon from './locales/ru/common.json';
import ruAuth from './locales/ru/auth.json';
import ruDashboard from './locales/ru/dashboard.json';
import ruAi from './locales/ru/ai.json';
import ruRoles from './locales/ru/roles.json';

// Import Uzbek translations
import uzCommon from './locales/uz/common.json';
import uzAuth from './locales/uz/auth.json';
import uzDashboard from './locales/uz/dashboard.json';
import uzAi from './locales/uz/ai.json';
import uzRoles from './locales/uz/roles.json';
import uzApp from './locales/uz/app.json';
import uzOnboarding from './locales/uz/onboarding.json';
import uzTraining from './locales/uz/training.json';
import uzLanguage from './locales/uz/language.json';

const resources = {
  ru: {
    translation: {
      ...ruCommon,
      ...ruAuth,
      ...ruDashboard,
      ...ruAi,
      ...ruRoles
    }
  },
  uz: {
    translation: {
      ...uzCommon,
      ...uzAuth,
      ...uzDashboard,
      ...uzAi,
      ...uzRoles,
      app: uzApp,
      onboarding: uzOnboarding,
      training: uzTraining,
      language: uzLanguage
    }
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
    },
    returnNull: false,      // Return empty string instead of null
    returnEmptyString: false, // Return key instead of empty string
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation key: "${key}" for language: ${lng}`);
    },
    returnObjects: true, // Support nested objects in translations
    joinArrays: ' ', // How to join arrays in translations
  });

// Export a function to change language that also updates localStorage
export const changeLanguage = (lang: 'uz' | 'ru') => {
  localStorage.setItem('language', lang);
  i18n.changeLanguage(lang);
};

export default i18n;
