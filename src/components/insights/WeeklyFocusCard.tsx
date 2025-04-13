
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { TargetIcon, BookOpenIcon, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface WeeklyFocusCardProps {
  skillKey: string;
  context: string;
  score?: number;
  recommendation?: string;
}

const WeeklyFocusCard: React.FC<WeeklyFocusCardProps> = ({
  skillKey,
  context,
  score,
  recommendation
}) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TargetIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{t('insights.weeklySkill')}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  {t('insights.weeklySkillTooltip', { defaultValue: 'AI determines your focus area based on recent conversation analysis' })}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold mb-2">
          {t(`insights.${skillKey}`)}
          {score && <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-1 rounded">{score}%</span>}
        </h3>
        <p className="text-muted-foreground">
          {context}
        </p>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start gap-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <BookOpenIcon className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <h4 className="font-medium text-sm text-amber-800">{t('insights.frequentIssue')}</h4>
            <p className="text-xs text-amber-700 mt-1">
              {recommendation || t('insights.weeklySkillDescription')}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <a href={`/sales/training?skill=${skillKey}`}>
            {t('insights.startTraining')}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WeeklyFocusCard;
