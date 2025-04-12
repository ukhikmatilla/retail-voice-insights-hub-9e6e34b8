
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SkillBlock as SkillBlockType } from '@/mocks/conversationSkillAnalysis';
import SkillBlock from './SkillBlock';

interface SkillFeedbackAccordionProps {
  skills: SkillBlockType[];
}

const SkillFeedbackAccordion: React.FC<SkillFeedbackAccordionProps> = ({ skills }) => {
  const { t } = useTranslation();

  if (!skills || skills.length === 0) {
    return (
      <div className="text-center p-6 border border-dashed rounded-lg bg-gray-50">
        <p className="text-gray-500">{t('insights.noSkillAnalysisAvailable')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-3">{t('insights.skillAnalysis')}</h2>
      {skills.map((skill) => (
        <SkillBlock key={skill.key} skill={skill} />
      ))}
    </div>
  );
};

export default SkillFeedbackAccordion;
