
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Trophy, CheckCircle, X, Clock, Calendar, Book, Video, Award, Brain } from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import TrainingTheory from '@/components/training/TrainingTheory';
import TrainingVideo from '@/components/training/TrainingVideo';
import TrainingQuiz from '@/components/training/TrainingQuiz';
import TrainingResult from '@/components/training/TrainingResult';
import ScriptCard from '@/components/ScriptCard';

import { TrainingModule, TrainingStep, ScriptSnippet, TrainingTheory as TrainingTheoryType, TrainingQuiz as TrainingQuizType, TrainingResult as TrainingResultType } from '@/types';

const TrainingModuleDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<string>('intro');
  const [quizResult, setQuizResult] = useState<TrainingResultType | null>(null);
  const [moduleCompleted, setModuleCompleted] = useState<boolean>(false);
  
  // Mock training module data
  const trainingModule: TrainingModule = {
    id: '1',
    title: t('training_content.priceObjections.title', { defaultValue: 'Handling Price Objections' }),
    description: t('training_content.priceObjections.description', { defaultValue: 'Learn effective techniques for addressing price-related concerns and objections' }),
    level: 'intermediate',
    skill: 'objection', // Changed from objections to objection
    theoryId: 'theory-1',
    videoId: 'video-1',
    quizId: 'quiz-1',
    estimatedTime: '25 min',
    dueDate: '2025-05-01',
    
    // Added required fields
    theory: {
      id: "theory-1",
      title: t('training_content.priceObjections.theory.title', { defaultValue: 'Price Objections Theory' }),
      content: t('training_content.priceObjections.theory.content', { defaultValue: 'Main content about handling price objections' }),
      sections: [
        {
          title: t('training_content.priceObjections.theory.section1.title', { defaultValue: 'Understanding Price Objections' }),
          content: t('training_content.priceObjections.theory.section1.content', { defaultValue: 'Content for section 1' }),
          type: 'text'
        },
        {
          title: t('training_content.priceObjections.theory.section2.title', { defaultValue: 'Important Warning' }),
          content: t('training_content.priceObjections.theory.section2.content', { defaultValue: 'Content for section 2' }),
          type: 'warning'
        },
        {
          title: t('training_content.priceObjections.theory.section3.title', { defaultValue: 'Helpful Tips' }),
          content: t('training_content.priceObjections.theory.section3.content', { defaultValue: 'Content for section 3' }),
          type: 'tip'
        },
        {
          title: t('training_content.priceObjections.theory.section4.title', { defaultValue: 'Example Dialog' }),
          content: t('training_content.priceObjections.theory.section4.content', { defaultValue: 'Content for section 4' }),
          type: 'example'
        }
      ]
    },
    
    quiz: {
      id: "quiz-1",
      question: t('training_content.priceObjections.quiz.mainQuestion', { defaultValue: 'Main quiz question' }),
      options: [
        t('training_content.priceObjections.quiz.mainOptions.0', { defaultValue: 'Option 1' }),
        t('training_content.priceObjections.quiz.mainOptions.1', { defaultValue: 'Option 2' }),
        t('training_content.priceObjections.quiz.mainOptions.2', { defaultValue: 'Option 3' }),
        t('training_content.priceObjections.quiz.mainOptions.3', { defaultValue: 'Option 4' })
      ],
      correctAnswer: t('training_content.priceObjections.quiz.mainCorrectAnswer', { defaultValue: 'Option 2' }),
      explanation: t('training_content.priceObjections.quiz.mainExplanation', { defaultValue: 'Explanation for the main question' }),
      questions: [
        {
          id: "q1",
          question: t('training_content.priceObjections.steps.quiz.question1.question', { defaultValue: 'Question 1' }),
          options: [
            t('training_content.priceObjections.steps.quiz.question1.options.0', { defaultValue: 'Option 1' }),
            t('training_content.priceObjections.steps.quiz.question1.options.1', { defaultValue: 'Option 2' }),
            t('training_content.priceObjections.steps.quiz.question1.options.2', { defaultValue: 'Option 3' }),
            t('training_content.priceObjections.steps.quiz.question1.options.3', { defaultValue: 'Option 4' })
          ],
          correctAnswer: 1,
          explanation: t('training_content.priceObjections.steps.quiz.question1.explanation', { defaultValue: 'Explanation 1' })
        },
        {
          id: "q2",
          question: t('training_content.priceObjections.steps.quiz.question2.question', { defaultValue: 'Question 2' }),
          options: [
            t('training_content.priceObjections.steps.quiz.question2.options.0', { defaultValue: 'Option 1' }),
            t('training_content.priceObjections.steps.quiz.question2.options.1', { defaultValue: 'Option 2' }),
            t('training_content.priceObjections.steps.quiz.question2.options.2', { defaultValue: 'Option 3' }),
            t('training_content.priceObjections.steps.quiz.question2.options.3', { defaultValue: 'Option 4' })
          ],
          correctAnswer: 0,
          explanation: t('training_content.priceObjections.steps.quiz.question2.explanation', { defaultValue: 'Explanation 2' })
        }
      ],
      passingScore: 70
    },
    
    // Add AI tips
    aiTips: [
      t('training_content.priceObjections.tips.0', { defaultValue: 'Emphasize value before discussing price' }),
      t('training_content.priceObjections.tips.1', { defaultValue: 'Listen to understand the real concern behind price objections' }),
      t('training_content.priceObjections.tips.2', { defaultValue: 'Use specific examples of how your product saves money long-term' })
    ],
    
    // Add related scripts
    relatedScripts: [
      {
        id: 's1',
        category: 'objection', // Changed from objections to objection
        scenario: t('training_content.priceObjections.scripts.scenario1', { defaultValue: 'Customer says: "Your competitor offers the same product for less"' }),
        aiAnswer: t('training_content.priceObjections.scripts.answer1', { defaultValue: 'I understand price is an important factor. Let me explain what makes our solution different and why many customers find our value proposition compelling despite the price difference...' }),
        source: t('training_content.priceObjections.scripts.source', { defaultValue: 'Based on 78 successful responses' })
      },
      {
        id: 's2',
        category: 'objection', // Changed from objections to objection
        scenario: t('training_content.priceObjections.scripts.scenario2', { defaultValue: 'Customer says: "I don\'t have the budget for this"' }),
        aiAnswer: t('training_content.priceObjections.scripts.answer2', { defaultValue: 'I appreciate your budget constraints. Many of our current customers initially felt the same way. Let me share how they found our flexible payment options helped them manage cash flow while still getting the benefits they needed...' }),
        source: t('training_content.priceObjections.scripts.source', { defaultValue: 'Based on 65 successful responses' })
      },
      {
        id: 's3',
        category: 'objection', // Changed from objections to objection
        scenario: t('training_content.priceObjections.scripts.scenario3', { defaultValue: 'Customer says: "I need to think about it and compare prices"' }),
        aiAnswer: t('training_content.priceObjections.scripts.answer3', { defaultValue: 'That makes perfect sense. To help with your comparison, could I ask what specific aspects of our solution are most important to you? This will help me highlight the areas where we provide the most value relative to our competitors...' }),
        source: t('training_content.priceObjections.scripts.source', { defaultValue: 'Based on 91 successful responses' })
      }
    ],
    
    // Add video URL and duration
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoDuration: '12:45'
  };
  
  // Training steps
  const steps: TrainingStep[] = [
    { id: 'intro', type: 'intro', moduleId: trainingModule.id },
    { id: 'theory', type: 'theory', moduleId: trainingModule.id },
    { id: 'video', type: 'video', moduleId: trainingModule.id },
    { id: 'aiAdvice', type: 'aiAdvice', moduleId: trainingModule.id },
    { id: 'quiz', type: 'quiz', moduleId: trainingModule.id }
  ];
  
  // Get current step data
  const getCurrentStep = () => {
    return steps.find(step => step.id === currentStep) || steps[0];
  };
  
  // Calculate progress
  const calculateProgress = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    return Math.round((currentIndex / (steps.length - 1)) * 100);
  };
  
  // Handle next step
  const handleNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };
  
  // Handle quiz completion
  const handleQuizComplete = (result: TrainingResultType) => {
    setQuizResult(result);
    
    if (result.completed) {
      setModuleCompleted(true);
    }
  };
  
  return (
    <RoleLayout currentPath="/sales/training">
      <div className="container py-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/sales/training')}
              className="mb-2"
            >
              ← {t('button.back')}
            </Button>
            <h1 className="text-2xl font-bold">{trainingModule.title}</h1>
            <p className="text-muted-foreground">{trainingModule.description}</p>
          </div>
          
          <div className="flex flex-col items-end mt-4 md:mt-0">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              {trainingModule.dueDate && (
                <span>{t('training.dueDate')}: {trainingModule.dueDate}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{t('training.estimatedTime')}: {trainingModule.estimatedTime}</span>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>{t('training.progress')}</span>
            <span>{calculateProgress()}%</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>
        
        {/* Content tabs */}
        <Tabs defaultValue="content" className="w-full">
          <TabsList>
            <TabsTrigger value="content">{t('training.moduleContents')}</TabsTrigger>
            <TabsTrigger value="scripts">{t('scripts.title')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Steps sidebar */}
              <Card className="col-span-1">
                <CardContent className="p-4">
                  <ul className="space-y-4">
                    {steps.map((step) => (
                      <li key={step.id}>
                        <Button
                          variant={step.id === currentStep ? "default" : "ghost"}
                          className={`w-full justify-start ${step.id === currentStep ? 'bg-primary text-primary-foreground' : ''}`}
                          onClick={() => setCurrentStep(step.id)}
                        >
                          {step.type === 'intro' && t('training_content.priceObjections.steps.intro.title')}
                          {step.type === 'theory' && t('training.theory')}
                          {step.type === 'video' && t('training.video')}
                          {step.type === 'aiAdvice' && t('insights.aiAdvice')}
                          {step.type === 'quiz' && t('training.quiz')}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Main content area */}
              <div className="col-span-1 md:col-span-3">
                {/* Quiz result */}
                {moduleCompleted && quizResult ? (
                  <TrainingResult result={quizResult} />
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      {/* Intro step */}
                      {getCurrentStep().id === 'intro' && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold">{t('training_content.priceObjections.steps.intro.title')}</h2>
                          <p>{t('training_content.priceObjections.steps.intro.content')}</p>
                          
                          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8">
                            <Button onClick={handleNextStep}>
                              {t('button.start')}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Theory step */}
                      {getCurrentStep().id === 'theory' && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold">{t('training.theory')}</h2>
                          <TrainingTheory theory={trainingModule.theory!} />
                          
                          <div className="flex justify-between mt-8">
                            <Button variant="outline" onClick={handlePrevStep}>
                              {t('button.prevLesson')}
                            </Button>
                            <Button onClick={handleNextStep}>
                              {t('button.nextLesson')}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Video step */}
                      {getCurrentStep().id === 'video' && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold">{t('training.video')}</h2>
                          <TrainingVideo videoUrl={trainingModule.videoUrl!} duration={trainingModule.videoDuration!} />
                          
                          <div className="flex justify-between mt-8">
                            <Button variant="outline" onClick={handlePrevStep}>
                              {t('button.prevLesson')}
                            </Button>
                            <Button onClick={handleNextStep}>
                              {t('button.nextLesson')}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* AI advice step */}
                      {getCurrentStep().id === 'aiAdvice' && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold">{t('insights.aiAdvice')}</h2>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 space-y-4">
                            <div className="flex items-center gap-2 text-blue-700">
                              <Brain className="h-5 w-5" />
                              <h3 className="font-medium">{t('training.aiTipsTitle')}</h3>
                            </div>
                            
                            <ul className="space-y-2">
                              {trainingModule.aiTips?.map((tip, index) => (
                                <li key={index} className="text-blue-700 text-sm flex items-start gap-2">
                                  <span>•</span> {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between mt-8">
                            <Button variant="outline" onClick={handlePrevStep}>
                              {t('button.prevLesson')}
                            </Button>
                            <Button onClick={handleNextStep}>
                              {t('button.nextLesson')}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Quiz step */}
                      {getCurrentStep().id === 'quiz' && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold">{t('training.finalQuiz')}</h2>
                          <p className="text-muted-foreground">
                            {t('training.quizDescription')}
                          </p>
                          
                          <TrainingQuiz quiz={trainingModule.quiz!} onComplete={handleQuizComplete} />
                          
                          <div className="flex justify-start mt-8">
                            <Button variant="outline" onClick={handlePrevStep}>
                              {t('button.prevLesson')}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scripts">
            <div className="mt-6 space-y-6">
              <h2 className="text-xl font-bold">{t('scripts.title')}</h2>
              <p className="text-muted-foreground">{t('training_content.priceObjections.scriptsDescription', { defaultValue: 'Use these scripts when handling price objections from customers' })}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainingModule.relatedScripts?.map((script) => (
                  <ScriptCard key={script.id} script={script} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RoleLayout>
  );
};

export default TrainingModuleDetail;
