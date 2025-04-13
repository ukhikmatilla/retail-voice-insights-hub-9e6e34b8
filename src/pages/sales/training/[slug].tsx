
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

// Sample mock training module structure
const mockModuleSteps = [
  {
    id: 'intro',
    title: 'Introduction',
    type: 'theory' as const,
    status: 'completed' as const,
    content: "Price objections are one of the most common challenges sales professionals face. They occur when a prospect expresses concern about the cost of your product or service."
  },
  {
    id: 'lesson1',
    title: 'Lesson 1: Psychology of Pricing',
    type: 'video' as const,
    status: 'in_progress' as const,
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    content: "Understanding how customers perceive value is essential to overcoming price objections."
  },
  {
    id: 'lesson2',
    title: 'Lesson 2: What NOT to Say',
    type: 'video' as const,
    status: 'locked' as const,
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    content: "Never immediately offer discounts when facing price objections. This devalues your product and reduces your profit margin unnecessarily."
  },
  {
    id: 'lesson3',
    title: 'Lesson 3: Effective Scripts',
    type: 'video' as const,
    status: 'locked' as const,
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    content: "Using the right language can help redirect the customer's focus from price to value."
  },
  {
    id: 'practice',
    title: 'Practice: Role Simulation',
    type: 'theory' as const,
    status: 'locked' as const,
    content: "Practice these techniques with role-playing scenarios to build confidence in real-world situations."
  },
  {
    id: 'ai-advice',
    title: 'AI Recommendations',
    type: 'theory' as const,
    status: 'locked' as const,
    content: "Based on your responses in previous lessons, here are personalized suggestions for improvement."
  },
  {
    id: 'quiz',
    title: 'Final Test',
    type: 'quiz' as const,
    status: 'locked' as const
  }
];

// Sample mock data for the training module components
const mockTheoryData: TrainingTheoryType = {
  sections: [
    {
      title: "Understanding Price Objections",
      content: "Price objections are one of the most common challenges sales professionals face. They occur when a prospect expresses concern about the cost of your product or service.",
      type: "text"
    },
    {
      title: "Common Mistakes",
      content: "Never immediately offer discounts when facing price objections. This devalues your product and reduces your profit margin unnecessarily.",
      type: "warning"
    },
    {
      title: "Value-Based Approach",
      content: "Focus on communicating the value and ROI of your solution rather than defending the price point.",
      type: "tip"
    },
    {
      title: "Practical Example",
      content: "When a customer says 'Your product is too expensive,' respond with 'I understand price is important. May I ask what specific aspect of the pricing concerns you?' This helps uncover the real objection.",
      type: "example"
    }
  ] as TheorySection[]
};

const mockVideoData = {
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  duration: "10:25"
};

const mockQuizData: TrainingQuizType = {
  questions: [
    {
      id: "q1",
      question: "What should you do first when facing a price objection?",
      options: [
        "Immediately offer a discount",
        "Acknowledge the concern and probe deeper",
        "Compare your price to competitors",
        "Change the subject"
      ],
      correctAnswer: 1,
      explanation: "Acknowledging the concern validates the customer's perspective, while probing deeper helps you understand their specific price objection."
    },
    {
      id: "q2",
      question: "Which approach is most effective for handling price objections?",
      options: [
        "Value-based selling",
        "Price-matching",
        "Discounting",
        "Delaying the discussion"
      ],
      correctAnswer: 0,
      explanation: "Value-based selling focuses on the benefits and ROI of your solution rather than the price itself."
    }
  ],
  passingScore: 70
};

const TrainingModuleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [training, setTraining] = useState<Training | null>(null);
  const [currentStep, setCurrentStep] = useState('intro');
  const [steps, setSteps] = useState(mockModuleSteps);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Find training by slug
    const foundTraining = mockTrainings.find(
      (module) => module.title.toLowerCase().replace(/\s+/g, '-') === slug
    ) || {
      id: '1',
      title: 'Handling Price Objections',
      description: 'Learn effective strategies to address price concerns from customers.',
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

  const handleStepChange = (stepId: string) => {
    setCurrentStep(stepId);
    
    // Update steps progress
    const updatedSteps = steps.map(step => {
      if (step.id === stepId) {
        return { ...step, status: 'in_progress' as const };
      } else if (step.status === 'locked') {
        return step;
      } else {
        return { ...step, status: 'completed' as const };
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
        status: 'in_progress' as const
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
            {steps.find(step => step.id === currentStep)?.title || 'Navigate'}
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
                step={steps.find(step => step.id === currentStep)!}
                theoryData={mockTheoryData}
                videoData={mockVideoData}
                quizData={mockQuizData}
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
