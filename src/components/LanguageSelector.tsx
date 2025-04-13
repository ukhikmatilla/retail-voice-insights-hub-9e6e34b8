
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n';

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
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'uz');
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'uz' ? 'ru' : 'uz'
    changeLanguage(newLang as 'uz' | 'ru');
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
