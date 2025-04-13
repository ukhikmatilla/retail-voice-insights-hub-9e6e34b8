
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Check, Flame, Star, Trophy, Users, ArrowLeft } from 'lucide-react';
import { mockBadges, mockStreak } from '@/data/mockData';

const BadgesPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const getBadgeIcon = (key: string) => {
    switch(key) {
      case 'dailyLearner': return <Check className="h-8 w-8 text-amber-500" />;
      case 'perfectScore': return <Star className="h-8 w-8 text-emerald-500" />;
      case 'fiveInARow': return <Flame className="h-8 w-8 text-orange-500" />;
      case 'scriptMaster': return <Award className="h-8 w-8 text-blue-500" />;
      case 'teamLeader': return <Users className="h-8 w-8 text-violet-500" />;
      default: return <Trophy className="h-8 w-8 text-indigo-500" />;
    }
  };
  
  const receivedBadges = mockBadges.filter(badge => badge.status === 'received');
  const lockedBadges = mockBadges.filter(badge => badge.status === 'locked');
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/sales/training')} 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> {t('common.back')}
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{t('training.badges.title')}</h1>
              <p className="text-muted-foreground mt-1">{t('training.badgesDescription')}</p>
            </div>
            {mockStreak.days > 0 && (
              <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full flex items-center border border-orange-200">
                <Flame className="h-5 w-5 mr-2 text-orange-500" />
                <span className="font-medium">{mockStreak.days} {t('training.streakDays')}</span>
              </div>
            )}
          </div>
        </div>
        
        {receivedBadges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('training.earnedBadges')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <TooltipProvider>
                {receivedBadges.map(badge => (
                  <Card key={badge.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6 pb-4 flex items-center gap-4">
                      <div className="bg-muted/50 rounded-full p-4">
                        {getBadgeIcon(badge.key)}
                      </div>
                      <div>
                        <h4 className="font-medium">{t(`training.badges.${badge.key}`)}</h4>
                        <p className="text-sm text-muted-foreground">{t(`training.badges.${badge.key}.description`)}</p>
                        {badge.earnedDate && (
                          <span className="text-xs text-muted-foreground block mt-1">
                            {new Date(badge.earnedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TooltipProvider>
            </div>
          </div>
        )}
        
        {lockedBadges.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">{t('training.lockedBadges')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <TooltipProvider>
                {lockedBadges.map(badge => (
                  <Tooltip key={badge.id}>
                    <TooltipTrigger asChild>
                      <Card className="opacity-60 hover:opacity-80 transition-opacity cursor-help">
                        <CardContent className="pt-6 pb-4 flex items-center gap-4">
                          <div className="bg-muted/30 rounded-full p-4">
                            {getBadgeIcon(badge.key)}
                          </div>
                          <div>
                            <h4 className="font-medium">{t(`training.badges.${badge.key}`)}</h4>
                            <p className="text-sm text-muted-foreground">{t(`training.badges.${badge.key}.description`)}</p>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded mt-1 inline-block">
                              {t('training.locked')}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t(`training.badges.${badge.key}.howToEarn`)}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
};

export default BadgesPage;
