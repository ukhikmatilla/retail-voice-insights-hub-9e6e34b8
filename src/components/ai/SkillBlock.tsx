
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SkillBlock as SkillBlockType } from '@/mocks/conversationSkillAnalysis';
import SkillTable from './SkillTable';
import SkillAdvice from './SkillAdvice';

interface SkillBlockProps {
  skill: SkillBlockType;
}

const SkillBlock: React.FC<SkillBlockProps> = ({ skill }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Calculate the score summary
  const goodCount = skill.criteria.filter(c => c.rating === 'good').length;
  const totalCount = skill.criteria.length;
  
  // Function to render rating pills
  const renderRatingPills = () => {
    return skill.criteria.map((criterion, index) => {
      let bgColor = '';
      switch (criterion.rating) {
        case 'good':
          bgColor = 'bg-green-600';
          break;
        case 'warning':
          bgColor = 'bg-yellow-500';
          break;
        case 'poor':
          bgColor = 'bg-red-500';
          break;
      }
      
      return <div key={index} className={`w-2 h-2 rounded-full ${bgColor} mr-1`}></div>;
    });
  };

  return (
    <div className="mb-4 rounded-lg bg-white border shadow-sm overflow-hidden transition-all duration-300">
      {/* Header - Always visible */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span className="text-xl mr-3">{skill.icon}</span>
          <div>
            <h3 className="font-medium text-gray-900">
              {language === 'uz' ? skill.title.uz : skill.title.ru}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span className="mr-2">{goodCount}/{totalCount}</span>
              <div className="flex">{renderRatingPills()}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">
            {isExpanded ? t('insights.hide') : t('insights.expand')}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 animate-accordion-down">
          <SkillTable criteria={skill.criteria} />
          <SkillAdvice advice={skill.aiAdvice} />
        </div>
      )}
    </div>
  );
};

export default SkillBlock;
