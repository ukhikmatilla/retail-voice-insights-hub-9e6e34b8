
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'uz' ? 'ru' : 'uz';
    setLanguage(newLang);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      className={`font-medium ${className}`}
    >
      {t(`language.${language}`)}
    </Button>
  );
};

export default LanguageSelector;
