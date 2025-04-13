
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkillScore {
  skillKey: string;
  score: number;
  trend?: 'up' | 'down' | 'stable';
}

interface StrengthsWeaknessesCardProps {
  strengths: SkillScore[];
  weaknesses: SkillScore[];
}

const StrengthsWeaknessesCard: React.FC<StrengthsWeaknessesCardProps> = ({
  strengths,
  weaknesses
}) => {
  const { t } = useTranslation();

  const renderSkillItem = (skill: SkillScore) => (
    <div key={skill.skillKey} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2">
        <span className="font-medium">{t(`insights.${skill.skillKey}`)}</span>
        <div className="flex items-center">
          {skill.trend === 'up' && <TrendingUpIcon className="h-4 w-4 text-green-500" />}
          {skill.trend === 'down' && <TrendingDownIcon className="h-4 w-4 text-red-500" />}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100">
          {skill.score}%
        </span>
        <Button variant="ghost" size="sm" className="text-xs" asChild>
          <a href={`/sales/training?skill=${skill.skillKey}`}>
            {t('insights.goToTraining')} <ChevronRightIcon className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t('insights.strengthsAndWeaknesses')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm uppercase font-semibold text-gray-500 mb-2">
              {t('insights.strengths')}
            </h4>
            <div className="space-y-1">
              {strengths.length > 0 ? (
                strengths.map(renderSkillItem)
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t('insights.noStrengthsYet')}
                </p>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm uppercase font-semibold text-gray-500 mb-2">
              {t('insights.weaknesses')}
            </h4>
            <div className="space-y-1">
              {weaknesses.length > 0 ? (
                weaknesses.map(renderSkillItem)
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t('insights.noWeaknessesYet')}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrengthsWeaknessesCard;
