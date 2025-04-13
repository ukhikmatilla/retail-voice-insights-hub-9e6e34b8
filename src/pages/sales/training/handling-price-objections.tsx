
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrainingVideo from '@/components/training/TrainingVideo';
import TrainingTheory from '@/components/training/TrainingTheory';
import TrainingAIHint from '@/components/training/TrainingAIHint';
import TrainingQuiz from '@/components/training/TrainingQuiz';
import TrainingResult from '@/components/training/TrainingResult';
import ScriptCard from '@/components/ScriptCard';
import { TrainingModule, TrainingResult as TrainingResultType } from '@/types';

// Mock data for the price objections training module
const mockPriceObjectionsModule: TrainingModule = {
  id: "handling-price-objections",
  title: "Handling Price Objections",
  description: "Learn effective strategies to address price concerns from customers.",
  level: "intermediate",
  dueDate: "2025-05-01",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video URL
  videoDuration: "5:30",
  skill: "objections",
  theory: {
    sections: [
      {
        title: "Understanding Price Objections",
        content: "Price objections are rarely about the actual price but rather about the perceived value. When a customer says 'It's too expensive,' they are really saying 'I don't see enough value to justify this price.'",
        type: "text"
      },
      {
        title: "Common Mistake",
        content: "Immediately offering a discount when hearing price objections. This devalues your product and trains customers to always ask for discounts.",
        type: "warning"
      },
      {
        title: "Effective Approach",
        content: "First acknowledge the concern, then reframe the conversation to focus on value rather than price. Ask questions to understand the specific concern behind the objection.",
        type: "tip"
      },
      {
        title: "Customer: 'Your competitor offers this for less'",
        content: "Response: 'I understand price is important. May I ask what features you're comparing? Our product includes X, Y, and Z which aren't available in the lower-priced alternatives.'",
        type: "example"
      },
      {
        title: "Customer: 'I need to think about it'",
        content: "Response: 'I understand. What specific aspects would you like to think more about? Perhaps I can provide more information on those areas now.'",
        type: "example"
      }
    ]
  },
  aiTips: [
    "You tend to move to pricing discussions too early. Try establishing more value first.",
    "In your last three conversations, you didn't ask enough questions to understand the customer's specific concerns when they mentioned price.",
    "Try using the 'feel, felt, found' technique: 'I understand how you feel, others have felt the same way, but they found that...'"
  ],
  quiz: {
    questions: [
      {
        id: "q1",
        question: "What should be your first response when a customer says 'That's too expensive'?",
        options: [
          "Immediately offer a discount",
          "Compare to competitor prices",
          "Acknowledge their concern and ask what specifically seems expensive",
          "Explain that quality costs money"
        ],
        correctAnswer: 2,
        explanation: "Acknowledging the concern shows empathy, and asking for specifics helps you understand their actual objection so you can address it precisely."
      },
      {
        id: "q2",
        question: "Which approach is most effective when handling price objections?",
        options: [
          "Focus only on price",
          "Focus on value in relation to price",
          "Avoid discussing price completely",
          "Always offer payment plans"
        ],
        correctAnswer: 1,
        explanation: "The most effective approach is to help the customer understand the value they receive relative to the price they pay."
      },
      {
        id: "q3",
        question: "A customer says: 'Your competitor offers something similar for 15% less.' What's the best response?",
        options: [
          "Immediately match the competitor's price",
          "Say negative things about the competitor's quality",
          "Acknowledge the concern and highlight your product's unique features and benefits",
          "Tell the customer they're mistaken about competitor pricing"
        ],
        correctAnswer: 2,
        explanation: "This response shows you take their concern seriously while focusing on value differentiation rather than just price competition."
      }
    ],
    passingScore: 70
  },
  relatedScripts: [
    {
      id: "script1",
      category: "objections",
      scenario: "Customer says: 'This is way more than I expected to pay'",
      aiAnswer: "I understand your concern about the price. May I ask what price range you were expecting? This helps me understand if there might be a different option that better fits your budget while still meeting your needs.",
      source: "Based on 85% success rate from top performers",
      expanded: false
    },
    {
      id: "script2",
      category: "objections",
      scenario: "Customer says: 'I need to think about it'",
      aiAnswer: "I completely understand needing time to consider. To help you make the best decision, could you share what specific aspects you'd like to think more about? That way I can provide any additional information that might be helpful.",
      source: "Proven effective in 78% of delayed purchase scenarios",
      expanded: false
    },
    {
      id: "script3",
      category: "objections",
      scenario: "Customer says: 'Your competitor offers this for less'",
      aiAnswer: "I appreciate you bringing that up. There are often differences in features and quality that affect price. Could you share which competitor and what features you're comparing? This will help me explain our value proposition better and ensure you're making an apples-to-apples comparison.",
      source: "Increases conversion by 23% vs. direct price matching",
      expanded: false
    }
  ],
  badges: ["objection-master", "perfect-score"]
};

const HandlingPriceObjectionsTraining: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState<'video' | 'theory' | 'quiz' | 'result'>('video');
  const [result, setResult] = useState<TrainingResultType | null>(null);
  
  const handleQuizComplete = (quizResult: { score: number; completed: boolean }) => {
    setResult({
      score: quizResult.score,
      completed: quizResult.completed,
      earnedBadges: quizResult.score === 100 ? ["perfect-score", "objection-master"] : ["objection-master"],
      feedback: quizResult.completed 
        ? t('training.feedbackSuccess') 
        : t('training.feedbackImprovement')
    });
    setCurrentSection('result');
  };
  
  const handleRetryModule = () => {
    setCurrentSection('video');
    setResult(null);
  };

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/sales/training" className="text-muted-foreground hover:text-foreground flex items-center mb-2">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t('training.backToTraining')}
              </Link>
              <h1 className="text-3xl font-bold">{mockPriceObjectionsModule.title}</h1>
              <p className="text-muted-foreground">{mockPriceObjectionsModule.description}</p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium capitalize mb-2">
                {mockPriceObjectionsModule.level}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('training.dueDate')}: {mockPriceObjectionsModule.dueDate}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar - progress and navigation */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t('training.progress')}</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button 
                    variant={currentSection === 'video' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setCurrentSection('video')}
                  >
                    1. {t('training.watchVideo')}
                  </Button>
                  <Button 
                    variant={currentSection === 'theory' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setCurrentSection('theory')}
                  >
                    2. {t('training.readTheory')}
                  </Button>
                  <Button 
                    variant={currentSection === 'quiz' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setCurrentSection('quiz')}
                  >
                    3. {t('training.takeQuiz')}
                  </Button>
                  {result && (
                    <Button 
                      variant={currentSection === 'result' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setCurrentSection('result')}
                    >
                      4. {t('training.seeResults')}
                    </Button>
                  )}
                </nav>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">{t('training.relatedScripts')}</h4>
                  <div className="space-y-2">
                    {mockPriceObjectionsModule.relatedScripts.map((script) => (
                      <div key={script.id} className="text-sm">
                        <ScriptCard script={script} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2">
            {currentSection === 'video' && (
              <>
                <TrainingVideo 
                  videoUrl={mockPriceObjectionsModule.videoUrl} 
                  duration={mockPriceObjectionsModule.videoDuration} 
                />
                <div className="flex justify-end">
                  <Button onClick={() => setCurrentSection('theory')}>
                    {t('training.continueToTheory')}
                  </Button>
                </div>
              </>
            )}
            
            {currentSection === 'theory' && (
              <>
                <TrainingTheory theory={mockPriceObjectionsModule.theory} />
                <TrainingAIHint tips={mockPriceObjectionsModule.aiTips} />
                <div className="flex justify-end">
                  <Button onClick={() => setCurrentSection('quiz')}>
                    {t('training.continueToQuiz')}
                  </Button>
                </div>
              </>
            )}
            
            {currentSection === 'quiz' && (
              <TrainingQuiz 
                quiz={mockPriceObjectionsModule.quiz} 
                onComplete={handleQuizComplete}
              />
            )}
            
            {currentSection === 'result' && result && (
              <TrainingResult 
                score={result.score}
                completed={result.completed}
                earnedBadges={result.earnedBadges}
                feedback={result.feedback}
                onRetry={handleRetryModule}
              />
            )}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default HandlingPriceObjectionsTraining;
