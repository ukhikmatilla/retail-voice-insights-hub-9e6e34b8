
import React from 'react';
import { useTranslation } from 'react-i18next';
import TrainingTheory from '@/components/training/TrainingTheory';
import TrainingVideo from '@/components/training/TrainingVideo';
import TrainingQuiz from '@/components/training/TrainingQuiz';
import TrainingAIHint from '@/components/training/TrainingAIHint';
import { TrainingTheory as TrainingTheoryType, TrainingQuiz as TrainingQuizType } from '@/types';

interface Step {
  id: string;
  title: string;
  type: 'video' | 'theory' | 'quiz';
  status: 'completed' | 'in_progress' | 'locked';
  youtubeUrl?: string;
  content?: string;
}

interface VideoData {
  videoUrl: string;
  duration: string;
}

interface TrainingModuleContentProps {
  step: Step;
  theoryData: TrainingTheoryType;
  videoData: VideoData;
  quizData: TrainingQuizType;
  onComplete: () => void;
}

const TrainingModuleContent: React.FC<TrainingModuleContentProps> = ({
  step,
  theoryData,
  videoData,
  quizData,
  onComplete
}) => {
  const { t } = useTranslation();

  // Early return if step is undefined to prevent errors
  if (!step) {
    console.error('Training step is undefined');
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">{t('common.error.contentNotFound')}</p>
      </div>
    );
  }

  // Use the step ID to get appropriate translations
  const getStepTitle = (stepId: string): string => {
    const translationKey = `training_content.priceObjections.steps.${stepId}.title`;
    const translated = t(translationKey);
    // Return the original title if the translation key doesn't exist (returns the key itself)
    return translated === translationKey ? step.title : translated;
  };

  const getStepContent = (stepId: string): string => {
    const translationKey = `training_content.priceObjections.steps.${stepId}.content`;
    const translated = t(translationKey);
    return translated === translationKey ? (step.content || '') : translated;
  };

  // Get tips from translations for AI hints
  const getAITips = (): string[] => {
    const moduleKey = 'priceObjections';
    const tipCount = step.id === 'ai-advice' ? 4 : 2;
    const startIndex = step.id === 'ai-advice' ? 0 : Math.floor(Math.random() * 2);
    
    const tips: string[] = [];
    for (let i = startIndex; i < startIndex + tipCount; i++) {
      const tipKey = `training_content.${moduleKey}.tips.${i}`;
      if (t(tipKey) !== tipKey) {
        tips.push(t(tipKey));
      }
    }
    
    return tips;
  };

  const renderContent = () => {
    switch (step.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <TrainingVideo videoUrl={videoData.videoUrl} duration={videoData.duration} />
            <div className="prose max-w-none">
              <h3>{getStepTitle(step.id)}</h3>
              <p>{getStepContent(step.id)}</p>
            </div>
            <TrainingAIHint tips={getAITips()} />
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">{t('training.finalQuiz')}</h3>
            <p className="text-muted-foreground mb-6">
              {t(`training_content.priceObjections.steps.quiz.intro`, {
                defaultValue: t('training.quizDescription')
              })}
            </p>
            <TrainingQuiz quiz={quizData} onComplete={(result) => {
              console.log("Quiz completed with score:", result.score);
              if (result.completed) {
                onComplete();
              }
            }} />
          </div>
        );
      case 'theory':
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">{getStepTitle(step.id) || t('training.theory')}</h3>
            {step.id === 'ai-advice' ? (
              <TrainingAIHint tips={getAITips()} />
            ) : (
              <TrainingTheory theory={theoryData} />
            )}
            <div className="prose max-w-none">
              <p>{getStepContent(step.id)}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">{getStepTitle(step.id) || t('training.content')}</h2>
      {renderContent()}
    </div>
  );
};

export default TrainingModuleContent;
