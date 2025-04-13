
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Check, Flame, Star, Trophy, Users, ArrowRight } from 'lucide-react';
import { Badge as BadgeType, StreakInfo } from '@/types';
import { useNavigate } from 'react-router-dom';

interface BadgeBoardProps {
  badges: BadgeType[];
  streak: StreakInfo;
}

const BadgeBoard: React.FC<BadgeBoardProps> = ({ badges, streak }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getBadgeIcon = (key: string) => {
    switch(key) {
      case 'dailyLearner': return <Check className="h-6 w-6 text-amber-500" />;
      case 'perfectScore': return <Star className="h-6 w-6 text-emerald-500" />;
      case 'fiveInARow': return <Flame className="h-6 w-6 text-orange-500" />;
      case 'scriptMaster': return <Award className="h-6 w-6 text-blue-500" />;
      case 'teamLeader': return <Users className="h-6 w-6 text-violet-500" />;
      default: return <Trophy className="h-6 w-6 text-indigo-500" />;
    }
  };
  
  const recentBadges = badges.filter(badge => badge.status === 'received').slice(0, 4);
  
  const viewAllBadges = () => {
    navigate('/sales/training/badges');
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('training.gameProgress')}</CardTitle>
            <CardDescription>{t('training.gameProgressDesc')}</CardDescription>
          </div>
          {streak.days > 0 && (
            <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full flex items-center border border-orange-200">
              <Flame className="h-4 w-4 mr-1 text-orange-500" />
              <span className="text-sm font-medium">{streak.days} {t('training.streakDays')}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TooltipProvider>
            {recentBadges.map(badge => (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  <div 
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                      badge.status === 'received' ? 'bg-white' : 'bg-gray-50 opacity-50'
                    } hover:border-primary/50 transition-colors cursor-help`}
                  >
                    <div className="mb-2">
                      {getBadgeIcon(badge.key)}
                    </div>
                    <h4 className="text-sm font-medium text-center">{t(`training.badges.${badge.key}`)}</h4>
                    {badge.earnedDate && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {new Date(badge.earnedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t(`training.badges.${badge.key}.description`)}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={viewAllBadges}>
          {t('training.viewAllBadges')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BadgeBoard;
