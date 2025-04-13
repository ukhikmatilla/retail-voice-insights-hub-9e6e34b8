
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TrainingModuleContent from '@/components/training/TrainingModuleContent';
import { useTrainingSteps } from '@/components/training/TrainingStepsProvider';
import { TrainingTheory, TrainingQuiz } from '@/types';

interface TrainingContentAreaProps {
  theoryData: TrainingTheory;
  quizData: TrainingQuiz;
  videoData: {
    videoUrl: string;
    duration: string;
  };
}

const TrainingContentArea: React.FC<TrainingContentAreaProps> = ({
  theoryData,
  quizData,
  videoData
}) => {
  const { t } = useTranslation();
  const { steps, currentStep, handlePrevStep, handleNextStep } = useTrainingSteps();
  
  const currentStepData = steps.find(step => step.id === currentStep);
  
  // Added logging to help debug step issues
  if (!currentStepData) {
    console.error(`Could not find step with id: ${currentStep}`);
    console.log('Available steps:', steps);
  }
  
  return (
    <Card className="p-6">
      {currentStepData ? (
        <TrainingModuleContent 
          step={currentStepData}
          theoryData={theoryData}
          videoData={videoData}
          quizData={quizData}
          onComplete={handleNextStep}
        />
      ) : (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">{t('common.error.stepNotFound')}</p>
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={handlePrevStep}
          disabled={currentStep === 'intro'}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('training.previousLesson')}
        </Button>
        
        <Button 
          onClick={handleNextStep}
          disabled={currentStep === 'quiz'}
        >
          {t('training.nextLesson')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TrainingContentArea;
