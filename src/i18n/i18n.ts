
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import JSON files
import commonEn from './locales/en/common.json';
import dashboardEn from './locales/en/dashboard.json';
import insightsEn from './locales/en/insights.json';
import trainingEn from './locales/en/training.json';
import conversationEn from './locales/en/conversation.json';
import teamEn from './locales/en/team.json';
import hrEn from './locales/en/hr.json';
import rolesEn from './locales/en/roles.json';
import buttonEn from './locales/en/button.json';
import languageEn from './locales/en/language.json';
import storesEn from './locales/en/stores.json';
import templatesEn from './locales/en/templates.json';

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: commonEn,
      dashboard: dashboardEn,
      insights: insightsEn,
      training: trainingEn,
      conversation: conversationEn,
      team: teamEn,
      hr: hrEn,
      roles: rolesEn,
      button: buttonEn,
      language: languageEn,
      stores: storesEn,
      templates: templatesEn
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  ns: ['common', 'dashboard', 'insights', 'training', 'conversation', 'team', 'hr', 'roles', 'button', 'language', 'stores', 'templates'],
  defaultNS: 'common'
});

export default i18n;
