
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

// Create nested resources structure for better organization
const resources = {
  ru: {
    common: ruCommon,
    auth: ruAuth,
    dashboard: ruDashboard,
    ai: ruAi,
    roles: ruRoles,
    // Add empty objects for namespaces that exist in uz but not in ru
    // to prevent fallback to another language
    app: {},
    onboarding: {},
    training: {},
    language: {
      ru: "Русский",
      uz: "Узбекский"
    }
  },
  uz: {
    common: uzCommon,
    auth: uzAuth,
    dashboard: uzDashboard,
    ai: uzAi,
    roles: uzRoles,
    app: uzApp,
    onboarding: uzOnboarding,
    training: uzTraining,
    language: uzLanguage
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    // Get stored language or default to 'ru'
    lng: localStorage.getItem('language') === 'uz' ? 'uz' : 'ru',
    fallbackLng: 'ru', // Always fallback to Russian, not English
    defaultNS: 'common',
    ns: ['common', 'auth', 'dashboard', 'ai', 'roles', 'app', 'onboarding', 'training', 'language'],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // Prevents loading issues with React 18
    },
    returnNull: false,      // Return empty string instead of null
    returnEmptyString: false, // Return key instead of empty string
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation key: "${key}" for language: ${lng}, namespace: ${ns}`);
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
