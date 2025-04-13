
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type StepType = 'video' | 'theory' | 'quiz';
export type StepStatus = 'completed' | 'in_progress' | 'locked';

export interface Step {
  id: string;
  title: string;
  type: StepType;
  status: StepStatus;
  youtubeUrl?: string;
  content?: string;
}

interface TrainingStepsContextType {
  steps: Step[];
  currentStep: string;
  handleStepChange: (stepId: string) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const TrainingStepsContext = createContext<TrainingStepsContextType | null>(null);

export const useTrainingSteps = () => {
  const context = useContext(TrainingStepsContext);
  if (!context) {
    throw new Error('useTrainingSteps must be used within a TrainingStepsProvider');
  }
  return context;
};

interface TrainingStepsProviderProps {
  moduleKey: string;
  children: React.ReactNode | ((context: TrainingStepsContextType) => React.ReactNode);
}

export const TrainingStepsProvider: React.FC<TrainingStepsProviderProps> = ({ 
  moduleKey, 
  children 
}) => {
  const { t } = useTranslation();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState('intro');

  useEffect(() => {
    // Generate steps from translations
    const generatedSteps: Step[] = [
      {
        id: 'intro',
        title: t(`training_content.${moduleKey}.steps.intro.title`),
        type: 'theory',
        status: 'completed',
        content: t(`training_content.${moduleKey}.steps.intro.content`)
      },
      {
        id: 'lesson1',
        title: t(`training_content.${moduleKey}.steps.lesson1.title`),
        type: 'video',
        status: 'in_progress',
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content: t(`training_content.${moduleKey}.steps.lesson1.content`)
      },
      {
        id: 'lesson2',
        title: t(`training_content.${moduleKey}.steps.lesson2.title`),
        type: 'video',
        status: 'locked',
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content: t(`training_content.${moduleKey}.steps.lesson2.content`)
      },
      {
        id: 'lesson3',
        title: t(`training_content.${moduleKey}.steps.lesson3.title`),
        type: 'video',
        status: 'locked',
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content: t(`training_content.${moduleKey}.steps.lesson3.content`)
      },
      {
        id: 'practice',
        title: t(`training_content.${moduleKey}.steps.practice.title`),
        type: 'theory',
        status: 'locked',
        content: t(`training_content.${moduleKey}.steps.practice.content`)
      },
      {
        id: 'ai-advice',
        title: t(`training_content.${moduleKey}.steps.aiAdvice.title`),
        type: 'theory',
        status: 'locked',
        content: t(`training_content.${moduleKey}.steps.aiAdvice.content`)
      },
      {
        id: 'quiz',
        title: t(`training_content.${moduleKey}.steps.quiz.title`),
        type: 'quiz',
        status: 'locked'
      }
    ];
    
    setSteps(generatedSteps);
  }, [t, moduleKey]);

  const handleStepChange = (stepId: string) => {
    setCurrentStep(stepId);
    
    // Update steps progress
    const updatedSteps = steps.map(step => {
      if (step.id === stepId) {
        return { ...step, status: 'in_progress' as StepStatus };
      } else if (step.status === 'locked') {
        return step;
      } else {
        return { ...step, status: 'completed' as StepStatus };
      }
    });
    
    setSteps(updatedSteps);
  };

  const handleNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      // Unlock next step
      const updatedSteps = [...steps];
      updatedSteps[currentIndex + 1] = {
        ...updatedSteps[currentIndex + 1],
        status: 'in_progress' as StepStatus
      };
      setSteps(updatedSteps);
      setCurrentStep(nextStep.id);
    }
  };

  const handlePrevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      setCurrentStep(prevStep.id);
    }
  };

  const value = {
    steps,
    currentStep,
    handleStepChange,
    handleNextStep,
    handlePrevStep
  };

  // Return either the children as a function with the context or just the children
  return (
    <TrainingStepsContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </TrainingStepsContext.Provider>
  );
};
