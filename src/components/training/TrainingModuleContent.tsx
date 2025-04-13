
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
              <h3>{step.title}</h3>
              <p>{step.content}</p>
            </div>
            <TrainingAIHint tips={getAITips()} />
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">{t('training.finalQuiz')}</h3>
            <p className="text-muted-foreground mb-6">{t('training.quizDescription')}</p>
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
            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
            {step.id === 'ai-advice' ? (
              <TrainingAIHint tips={getAITips()} />
            ) : (
              <TrainingTheory theory={theoryData} />
            )}
            <div className="prose max-w-none">
              <p>{step.content}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">{step.title}</h2>
      {renderContent()}
    </div>
  );
};

export default TrainingModuleContent;
