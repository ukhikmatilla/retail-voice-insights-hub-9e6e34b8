
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Uzbek translations
import uzCommon from './locales/uz/common.json';
import uzDashboard from './locales/uz/dashboard.json';
import uzInsights from './locales/uz/insights.json';
import uzTraining from './locales/uz/training.json';
import uzConversation from './locales/uz/conversation.json';
import uzTeam from './locales/uz/team.json';
import uzHr from './locales/uz/hr.json';
import uzRoles from './locales/uz/roles.json';
import uzButton from './locales/uz/button.json';
import uzLanguage from './locales/uz/language.json';
import uzStoresTranslation from './locales/uz/stores.json';
import uzTemplates from './locales/uz/templates.json';

// Russian translations
import ruCommon from './locales/ru/common.json';
import ruDashboard from './locales/ru/dashboard.json';
import ruInsights from './locales/ru/insights.json';
import ruTraining from './locales/ru/training.json';
import ruConversation from './locales/ru/conversation.json';
import ruTeam from './locales/ru/team.json';
import ruHr from './locales/ru/hr.json';
import ruRoles from './locales/ru/roles.json';
import ruButton from './locales/ru/button.json';
import ruLanguage from './locales/ru/language.json';
import ruInsight from './locales/ru/insight.json';
import ruManager from './locales/ru/manager.json';
import ruCoaching from './locales/ru/coaching.json';
import ruSotuvchi from './locales/ru/sotuvchi.json';
import ruCalls from './locales/ru/calls.json';
import ruSales from './locales/ru/sales.json';
import ruStoresTranslation from './locales/ru/stores.json';
import ruTemplates from './locales/ru/templates.json';

// English translations
import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import enInsights from './locales/en/insights.json';
import enTraining from './locales/en/training.json';
import enConversation from './locales/en/conversation.json';
import enTeam from './locales/en/team.json';
import enHr from './locales/en/hr.json';
import enRoles from './locales/en/roles.json';
import enButton from './locales/en/button.json';
import enLanguage from './locales/en/language.json';
import enStoresTranslation from './locales/en/stores.json';
import enTemplates from './locales/en/templates.json';



// Merge translations
const mergedUzTranslations = {
  ...uzCommon,
  ...uzDashboard,
  ...uzInsights,
  ...uzTraining,
  ...uzConversation,
  ...uzTeam,
  ...uzHr,
  ...uzRoles,
  ...uzButton,
  ...uzLanguage,
  ...uzStoresTranslation,
  ...uzTemplates
};

const mergedRuTranslations = {
  ...ruCommon,
  ...ruDashboard,
  ...ruInsights,
  ...ruTraining,
  ...ruConversation,
  ...ruTeam,
  ...ruHr,
  ...ruRoles,
  ...ruButton,
  ...ruLanguage,
  ...ruInsight,
  ...ruManager,
  ...ruCoaching,
  ...ruSotuvchi,
  ...ruCalls,
  ...ruSales,
  ...ruStoresTranslation,
  ...ruTemplates
};

const mergedEnTranslations = {
  ...enCommon,
  ...enDashboard,
  ...enInsights,
  ...enTraining,
  ...enConversation,
  ...enTeam,
  ...enHr,
  ...enRoles,
  ...enButton,
  ...enLanguage,
  ...enStoresTranslation,
  ...enTemplates
};


const resources = {
  uz: {
    translation: mergedUzTranslations
  },
  ru: {
    translation: mergedRuTranslations
  },
  en: {
    translation: mergedEnTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'uz',
    fallbackLng: 'en',
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
export const changeLanguage = (lang: 'uz' | 'ru' | 'en') => {
  localStorage.setItem('language', lang);
  i18n.changeLanguage(lang);
};

export default i18n;
