
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { TrainingQuiz as TrainingQuizType, QuizQuestion } from '@/types';

interface TrainingQuizProps {
  quiz: TrainingQuizType;
  onComplete: (result: { score: number; completed: boolean }) => void;
}

const TrainingQuiz: React.FC<TrainingQuizProps> = ({ quiz, onComplete }) => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      calculateResult();
    }
  };
  
  const handleCheck = () => {
    setShowFeedback(true);
  };
  
  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowFeedback(false);
    setQuizCompleted(false);
  };
  
  const calculateResult = () => {
    let correctAnswers = 0;
    
    for (let i = 0; i < quiz.questions.length; i++) {
      if (selectedAnswers[i] === quiz.questions[i].correctAnswer) {
        correctAnswers++;
      }
    }
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    setQuizCompleted(true);
    onComplete({ score, completed: passed });
  };
  
  const renderQuestion = (question: QuizQuestion) => {
    return (
      <div>
        <h3 className="text-lg font-medium mb-4">{question.question}</h3>
        <RadioGroup 
          value={selectedAnswers[currentQuestion]?.toString()} 
          onValueChange={(value) => handleAnswer(parseInt(value))}
        >
          {question.options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-2 p-3 rounded-md ${
                showFeedback && index === question.correctAnswer 
                  ? 'bg-green-50 border border-green-200' 
                  : showFeedback && index === selectedAnswers[currentQuestion] && index !== question.correctAnswer 
                    ? 'bg-red-50 border border-red-200' 
                    : 'hover:bg-muted/50'
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
              {showFeedback && index === question.correctAnswer && (
                <Check className="h-5 w-5 text-green-600" />
              )}
              {showFeedback && index === selectedAnswers[currentQuestion] && index !== question.correctAnswer && (
                <X className="h-5 w-5 text-red-600" />
              )}
            </div>
          ))}
        </RadioGroup>
        
        {showFeedback && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}
      </div>
    );
  };
  
  const renderResult = () => {
    let correctAnswers = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (selectedAnswers[i] === quiz.questions[i].correctAnswer) {
        correctAnswers++;
      }
    }
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    return (
      <div className="text-center py-6">
        <div className={`text-2xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-amber-600'}`}>
          {score}%
        </div>
        <p className="mb-4">{correctAnswers} {t('training.correctOf')} {quiz.questions.length} {t('training.questions')}</p>
        
        <div className="flex justify-center gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={handleRetry} 
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {t('button.retry')}
          </Button>
        </div>
      </div>
    );
  };
  
  if (quizCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('training.quizResult')}</CardTitle>
        </CardHeader>
        <CardContent>{renderResult()}</CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t('training.quizTitle')}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderQuestion(quiz.questions[currentQuestion])}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {t('training.question')} {currentQuestion + 1} {t('training.of')} {quiz.questions.length}
        </div>
        <div className="flex gap-2">
          {!showFeedback ? (
            <Button onClick={handleCheck}>{t('training.checkAnswer')}</Button>
          ) : (
            <Button onClick={handleNext} className="flex items-center gap-1">
              {currentQuestion === quiz.questions.length - 1 ? t('button.finish') : t('training.nextQuestion')}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrainingQuiz;
