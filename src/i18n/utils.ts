
import { readdirSync } from 'fs';

/**
 * Loads all translation modules for a given language
 * This function dynamically imports all JSON files in the locales/[lang] directory
 */
export function loadTranslationModules(lang: string) {
  // In a browser environment, we can't use fs, so we use a different approach
  // We'll use require.context or import.meta to load modules in the future if needed
  
  // For now, we'll use a simple object to load modules
  const modules: Record<string, any> = {};
  
  try {
    // Import common translations
    const commonModule = require(`./locales/${lang}/common.json`);
    modules.common = commonModule;
    
    // Import app translations
    const appModule = require(`./locales/${lang}/app.json`);
    modules.app = appModule;
    
    // Import auth translations
    const authModule = require(`./locales/${lang}/auth.json`);
    modules.auth = authModule;
    
    // Import dashboard translations
    const dashboardModule = require(`./locales/${lang}/dashboard.json`);
    modules.dashboard = dashboardModule;
    
    // Import sales translations
    const salesModule = require(`./locales/${lang}/sales.json`);
    modules.sales = salesModule;
    
    // Import manager translations
    const managerModule = require(`./locales/${lang}/manager.json`);
    modules.manager = managerModule;
    
    // Import hr translations
    const hrModule = require(`./locales/${lang}/hr.json`);
    modules.hr = hrModule;
    
    // Import roles translations
    const rolesModule = require(`./locales/${lang}/roles.json`);
    modules.roles = rolesModule;
    
    // Import conversation translations
    const conversationModule = require(`./locales/${lang}/conversation.json`);
    modules.conversation = conversationModule;
    
    // Import transcript translations
    const transcriptModule = require(`./locales/${lang}/transcript.json`);
    modules.transcript = transcriptModule;
    
    // Import profile translations
    const profileModule = require(`./locales/${lang}/profile.json`);
    modules.profile = profileModule;
    
    // Import onboarding translations
    const onboardingModule = require(`./locales/${lang}/onboarding.json`);
    modules.onboarding = onboardingModule;
    
    // Import insight translations
    const insightModule = require(`./locales/${lang}/insight.json`);
    modules.insight = insightModule;
    
    // Import insights (plural) translations
    const insightsModule = require(`./locales/${lang}/insights.json`);
    modules.insights = insightsModule;
    
    // Import training translations
    const trainingModule = require(`./locales/${lang}/training.json`);
    modules.training = trainingModule;
    
    // Import language translations
    const languageModule = require(`./locales/${lang}/language.json`);
    modules.language = languageModule;

  } catch (error) {
    console.error(`Error loading translation modules for ${lang}:`, error);
  }
  
  return modules;
}
