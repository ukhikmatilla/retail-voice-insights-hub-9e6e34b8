
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'outline', 
  size = 'default',
  className = ''
}) => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'uz' ? 'ru' : 'uz';
    changeLanguage(newLang);
  };

  // Display the language name in the current language
  const languageDisplay = language === 'ru' ? t('language.ru') : t('language.uz');

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      className={`font-medium ${className}`}
    >
      {languageDisplay}
    </Button>
  );
};

export default LanguageSelector;
