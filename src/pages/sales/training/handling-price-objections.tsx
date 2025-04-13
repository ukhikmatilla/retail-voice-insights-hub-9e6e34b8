import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTrainingModuleData, useTheoryData, useQuizData, useVideoData } from '@/hooks/useTrainingModuleData';
import TrainingResult from '@/components/training/TrainingResult';
import TrainingModuleCard from '@/components/TrainingModuleCard';
import { mockTrainings } from '@/data/mockData';
import { Training } from '@/types';
import { TrainingStepsProvider } from '@/components/training/TrainingStepsProvider';
import TrainingContentArea from '@/components/training/TrainingContentArea';

const TrainingModuleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { training, isMobile, sidebarOpen, toggleSidebar } = useTrainingModuleData(slug);
  const theoryData = useTheoryData();
  const quizData = useQuizData();
  const videoData = useVideoData();

  const [showResult, setShowResult] = useState(false);
  const [trainingResult, setTrainingResult] = useState({
    score: 0,
    completed: false,
    earnedBadges: [],
    feedback: ''
  });

  useEffect(() => {
    if (!training) return;

    document.title = training.title + ' | ' + t('sales.training');
  }, [training, t]);

  const handleBackToTraining = () => {
    navigate('/sales/training');
  };

  const handleCompleteModule = (result: { score: number; completed: boolean; earnedBadges: string[]; feedback: string }) => {
    setTrainingResult({
      score: result.score,
      completed: result.completed,
      earnedBadges: result.earnedBadges,
      feedback: result.feedback
    });
    setShowResult(true);
  };

  const handleRetryModule = () => {
    setShowResult(false);
  };

  if (!training) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent>
            {t('common.error.moduleNotFound')}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="outline"
        onClick={handleBackToTraining}
        className="mb-4 flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('training.backToTraining')}
      </Button>

      {!showResult ? (
        <TrainingStepsProvider moduleKey="priceObjections">
          <TrainingContentArea
            theoryData={theoryData}
            quizData={quizData}
            videoData={videoData}
          />
        </TrainingStepsProvider>
      ) : (
        <TrainingResult
          score={trainingResult.score}
          completed={trainingResult.completed}
          earnedBadges={trainingResult.earnedBadges}
          feedback={trainingResult.feedback}
          onRetry={handleRetryModule}
        />
      )}
    </div>
  );
};

export default TrainingModuleDetail;
