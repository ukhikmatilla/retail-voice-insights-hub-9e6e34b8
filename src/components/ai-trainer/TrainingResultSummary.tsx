
import { useTranslation } from 'react-i18next';
import { Trophy, Award, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type Badge = {
  id: string;
  name: string;
};

type SuggestedModule = {
  id: string;
  name: string;
  path: string;
};

interface TrainingResultSummaryProps {
  score: number;
  visible: boolean;
  earnedBadges: Badge[];
  suggestedModules: SuggestedModule[];
}

const TrainingResultSummary = ({
  score,
  visible,
  earnedBadges,
  suggestedModules,
}: TrainingResultSummaryProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!visible) return null;

  const maxScore = 10;
  const scorePercentage = (score / maxScore) * 100;

  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'text-green-500';
    if (scorePercentage >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getProgressColor = () => {
    if (scorePercentage >= 80) return 'bg-green-500';
    if (scorePercentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          {t('ai.trainer.score')}
        </CardTitle>
        <CardDescription>
          {t('ai.trainer.results.improveTip')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold">
            {t('ai.trainer.results.scorePrefix')}{' '}
            <span className={getScoreColor()}>
              {score}/{maxScore}
            </span>
          </h3>
          {/* Fix: Replace the Progress component with a custom div implementation
              that allows us to style both the background and indicator */}
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor()} transition-all`}
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
        </div>

        {earnedBadges.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Award className="h-4 w-4" />
              {t('ai.trainer.results.badgesEarned')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map((badge) => (
                <Badge
                  key={badge.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <Award className="h-3 w-3" />
                  {t(`ai.trainer.badges.${badge.id}`)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {suggestedModules.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t('ai.trainer.results.suggestedModules')}
            </h4>
            <div className="space-y-2">
              {suggestedModules.map((module) => (
                <Button
                  key={module.id}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => navigate(module.path)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {module.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">{t('ai.trainer.results.tryAgain')}</Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingResultSummary;
