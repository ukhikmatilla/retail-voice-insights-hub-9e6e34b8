
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Generate steps from translations
    const getTranslatedTitle = (stepId: string): string => {
      const key = `training_content.${moduleKey}.steps.${stepId}.title`;
      const translated = t(key);
      // Check if translation key exists and return a fallback if not
      return translated !== key ? translated : `${stepId.charAt(0).toUpperCase() + stepId.slice(1)} Content`;
    };

    const getTranslatedContent = (stepId: string): string => {
      const key = `training_content.${moduleKey}.steps.${stepId}.content`;
      return t(key);
    };

    const generatedSteps: Step[] = [
      {
        id: 'intro',
        title: getTranslatedTitle('intro'),
        type: 'theory',
        status: 'completed',
        content: getTranslatedContent('intro')
      },
      {
        id: 'lesson1',
        title: getTranslatedTitle('lesson1'),
        type: 'video',
        status: 'in_progress',
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content: getTranslatedContent('lesson1')
      },
      {
        id: 'lesson2',
        title: getTranslatedTitle('lesson2'),
        type: 'video',
        status: 'locked',
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content: getTranslatedContent('lesson2')
      },
      {
        id: 'lesson3',
        title: getTranslatedTitle('lesson3'),
        type: 'video',
        status: 'locked',
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content: getTranslatedContent('lesson3')
      },
      {
        id: 'practice',
        title: getTranslatedTitle('practice'),
        type: 'theory',
        status: 'locked',
        content: getTranslatedContent('practice')
      },
      {
        id: 'ai-advice',
        title: getTranslatedTitle('aiAdvice'),
        type: 'theory',
        status: 'locked',
        content: getTranslatedContent('aiAdvice')
      },
      {
        id: 'quiz',
        title: getTranslatedTitle('quiz'),
        type: 'quiz',
        status: 'locked'
      }
    ];
    
    setSteps(generatedSteps);
    setIsInitialized(true);

    console.log('Initialized steps:', generatedSteps);
  }, [t, moduleKey]);

  const handleStepChange = (stepId: string) => {
    if (!stepId) {
      console.error('Invalid step ID provided to handleStepChange');
      return;
    }

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
    if (currentIndex < 0) {
      console.error(`Current step ${currentStep} not found in steps array`);
      return;
    }
    
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      if (!nextStep) {
        console.error(`Next step at index ${currentIndex + 1} is undefined`);
        return;
      }
      
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
    if (currentIndex < 0) {
      console.error(`Current step ${currentStep} not found in steps array`);
      return;
    }
    
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      if (!prevStep) {
        console.error(`Previous step at index ${currentIndex - 1} is undefined`);
        return;
      }
      
      setCurrentStep(prevStep.id);
    }
  };

  // Provide empty initial values until initialization completes
  if (!isInitialized) {
    return (
      <TrainingStepsContext.Provider value={{
        steps: [],
        currentStep: '',
        handleStepChange: () => {},
        handleNextStep: () => {},
        handlePrevStep: () => {}
      }}>
        <div className="animate-pulse p-8">
          <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-24 bg-muted rounded mb-4"></div>
          <div className="h-12 bg-muted rounded"></div>
        </div>
      </TrainingStepsContext.Provider>
    );
  }

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
