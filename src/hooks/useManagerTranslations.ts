
import { useTranslation } from 'react-i18next';

export const useManagerTranslations = () => {
  const { t, i18n } = useTranslation();
  
  return {
    t,
    language: i18n.language,
    isUzbek: i18n.language === 'uz',
    isRussian: i18n.language === 'ru'
  };
};
