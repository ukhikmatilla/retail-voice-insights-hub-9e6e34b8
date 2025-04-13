
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoleLayout from '@/components/RoleLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import TrainingTheory from '@/components/training/TrainingTheory';
import TrainingVideo from '@/components/training/TrainingVideo';
import TrainingQuiz from '@/components/training/TrainingQuiz';
import { mockTrainings } from '@/data/mockData';
import { Training } from '@/types';

// Sample mock data for the training module components
const mockTheoryData = {
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
  ]
};

const mockVideoData = {
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  duration: "10:25"
};

const mockQuizData = {
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
  const [activeTab, setActiveTab] = useState('theory');
  const [training, setTraining] = useState<Training | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

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

    return () => {
      document.title = t('sales.training');
    };
  }, [slug, t]);

  const handleQuizComplete = (result: { score: number; completed: boolean }) => {
    console.log("Quiz completed with score:", result.score);
    setQuizCompleted(true);
    // Here you would typically update the user's progress
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
        
        <Tabs 
          defaultValue="theory" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="theory">{t('training.theory')}</TabsTrigger>
            <TabsTrigger value="video">{t('training.video')}</TabsTrigger>
            <TabsTrigger value="quiz">{t('training.quiz')}</TabsTrigger>
          </TabsList>
          
          <Card className="p-6">
            <TabsContent value="theory">
              <TrainingTheory theory={mockTheoryData} />
            </TabsContent>
            
            <TabsContent value="video">
              <TrainingVideo videoUrl={mockVideoData.videoUrl} duration={mockVideoData.duration} />
            </TabsContent>
            
            <TabsContent value="quiz">
              <TrainingQuiz quiz={mockQuizData} onComplete={handleQuizComplete} />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </RoleLayout>
  );
};

export default TrainingModuleDetail;
