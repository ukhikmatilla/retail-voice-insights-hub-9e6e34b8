
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface SkillAdviceProps {
  advice: {
    uz: string;
    ru: string;
  };
}

const SkillAdvice: React.FC<SkillAdviceProps> = ({ advice }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="mt-4 p-3 bg-green-50 text-sm text-green-800 rounded-lg border border-green-100">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-2 mt-0.5 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="font-medium mb-1">{t('insights.aiAdvice')}</p>
          <p>{language === 'uz' ? advice.uz : advice.ru}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillAdvice;
