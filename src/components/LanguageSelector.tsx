
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'outline', size = 'default' }) => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'uz' ? 'ru' : 'uz';
    changeLanguage(newLang);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      className="font-medium"
    >
      {language === 'uz' ? t('language.uz') : t('language.ru')}
    </Button>
  );
};

export default LanguageSelector;
