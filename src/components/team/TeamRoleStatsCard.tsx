
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TeamRoleStatsCardProps {
  roleKey: string;
  count: number;
  avgScore: number;
  improvement: number;
  isActive?: boolean;
  onClick?: () => void;
}

export const TeamRoleStatsCard: React.FC<TeamRoleStatsCardProps> = ({
  roleKey,
  count,
  avgScore,
  improvement,
  isActive = false,
  onClick
}) => {
  const { t } = useTranslation();

  // Define color based on score
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card 
      className={`${isActive ? 'border-primary' : ''} hover:border-primary/50 transition-colors cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-lg">
              {t(`roles.${roleKey}`)}
            </h3>
          </div>
          {isActive && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {t('team.filtering')}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('team.stats.count', { count })}
            </span>
            <span className="font-medium">{count}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('team.stats.avgScore')}
            </span>
            <span className={`font-medium ${getScoreColor(avgScore)}`}>
              {avgScore}%
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('team.stats.improvement')}
            </span>
            <span className="font-medium text-green-600">
              +{improvement}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
