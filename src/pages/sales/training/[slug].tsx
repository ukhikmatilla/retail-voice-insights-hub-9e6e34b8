
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoleLayout from '@/components/RoleLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { mockTrainings } from '@/data/mockData';
import { Training, TrainingTheory as TrainingTheoryType, TheorySection, TrainingQuiz as TrainingQuizType } from '@/types';
import TrainingModuleSidebar from '@/components/training/TrainingModuleSidebar';
import TrainingModuleContent from '@/components/training/TrainingModuleContent';

// Define the Step type here to match exactly with our component interfaces
type StepType = 'video' | 'theory' | 'quiz';
type StepStatus = 'completed' | 'in_progress' | 'locked';

interface Step {
  id: string;
  title: string;
  type: StepType;
  status: StepStatus;
  youtubeUrl?: string;
  content?: string;
}

const TrainingModuleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [training, setTraining] = useState<Training | null>(null);
  const [currentStep, setCurrentStep] = useState('intro');
  const [steps, setSteps] = useState<Step[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  useEffect(() => {
    // Generate steps from translations
    const moduleKey = 'priceObjections'; // This would be dynamic based on slug in a real app
    
    // Create steps array from translations
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
  }, [t]);

  useEffect(() => {
    // Find training by slug
    const foundTraining = mockTrainings.find(
      (module) => module.title.toLowerCase().replace(/\s+/g, '-') === slug
    ) || {
      id: '1',
      title: t('training_content.priceObjections.title'),
      description: t('training_content.priceObjections.description'),
      skill: 'objections',
      level: 'intermediate',
      status: 'recommended',
      progress: 0,
      dueDate: '2025-05-01'
    };

    setTraining(foundTraining);
    
    // Set document title
    document.title = foundTraining.title + ' | ' + t('sales.training');

    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      document.title = t('sales.training');
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [slug, t]);

  // Create theory data from translations
  const getTheoryData = (): TrainingTheoryType => {
    const moduleKey = 'priceObjections';
    
    return {
      sections: [
        {
          title: t(`training_content.${moduleKey}.theory.section1.title`),
          content: t(`training_content.${moduleKey}.theory.section1.content`),
          type: "text"
        },
        {
          title: t(`training_content.${moduleKey}.theory.section2.title`),
          content: t(`training_content.${moduleKey}.theory.section2.content`),
          type: "warning"
        },
        {
          title: t(`training_content.${moduleKey}.theory.section3.title`),
          content: t(`training_content.${moduleKey}.theory.section3.content`),
          type: "tip"
        },
        {
          title: t(`training_content.${moduleKey}.theory.section4.title`),
          content: t(`training_content.${moduleKey}.theory.section4.content`),
          type: "example"
        }
      ] as TheorySection[]
    };
  };

  // Create quiz data from translations
  const getQuizData = (): TrainingQuizType => {
    const moduleKey = 'priceObjections';
    
    return {
      questions: [
        {
          id: "q1",
          question: t(`training_content.${moduleKey}.quiz.question1.question`),
          options: [
            t(`training_content.${moduleKey}.quiz.question1.options.0`),
            t(`training_content.${moduleKey}.quiz.question1.options.1`),
            t(`training_content.${moduleKey}.quiz.question1.options.2`),
            t(`training_content.${moduleKey}.quiz.question1.options.3`)
          ],
          correctAnswer: 1,
          explanation: t(`training_content.${moduleKey}.quiz.question1.explanation`)
        },
        {
          id: "q2",
          question: t(`training_content.${moduleKey}.quiz.question2.question`),
          options: [
            t(`training_content.${moduleKey}.quiz.question2.options.0`),
            t(`training_content.${moduleKey}.quiz.question2.options.1`),
            t(`training_content.${moduleKey}.quiz.question2.options.2`),
            t(`training_content.${moduleKey}.quiz.question2.options.3`)
          ],
          correctAnswer: 0,
          explanation: t(`training_content.${moduleKey}.quiz.question2.explanation`)
        }
      ],
      passingScore: 70
    };
  };

  // Get AI tips from translations
  const getAITips = (): string[] => {
    const moduleKey = 'priceObjections';
    const tips: string[] = [];
    
    for (let i = 0; i < 6; i++) {
      const tipKey = `training_content.${moduleKey}.tips.${i}`;
      if (t(tipKey) !== tipKey) {
        tips.push(t(tipKey));
      } else {
        break;
      }
    }
    
    return tips;
  };

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!training) {
    return (
      <RoleLayout currentPath="/sales/training">
        <div className="container py-6">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout currentPath="/sales/training">
      <div className="container py-6 animate-fade-in">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="pl-0" 
            onClick={() => navigate('/sales/training')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{training.title}</h1>
          <p className="text-muted-foreground mt-2">{training.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-1">
              <span className="font-medium">{t('training.skill')}:</span> {t(`insights.${training.skill}`)}
            </div>
            <div className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-1">
              <span className="font-medium">{t('training.level')}:</span> {training.level}
            </div>
          </div>
        </div>
        
        {isMobile && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4 w-full flex justify-between" 
            onClick={toggleSidebar}
          >
            {steps.find(step => step.id === currentStep)?.title || t('training.moduleContents')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          {(sidebarOpen || !isMobile) && (
            <div className={`${isMobile ? 'absolute inset-0 z-10 bg-background p-6 h-screen' : ''}`}>
              {isMobile && (
                <Button 
                  variant="ghost" 
                  className="mb-4" 
                  onClick={toggleSidebar}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('common.close')}
                </Button>
              )}
              <TrainingModuleSidebar 
                steps={steps} 
                currentStep={currentStep} 
                onSelectStep={handleStepChange} 
              />
            </div>
          )}
          
          {/* Content */}
          <div className="md:col-span-3">
            <Card className="p-6">
              <TrainingModuleContent 
                step={steps.find(step => step.id === currentStep) || steps[0]}
                theoryData={getTheoryData()}
                videoData={{
                  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  duration: "10:25"
                }}
                quizData={getQuizData()}
                onComplete={handleNextStep}
              />
              
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
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default TrainingModuleDetail;
