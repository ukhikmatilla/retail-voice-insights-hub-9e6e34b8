
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock training data
const mockTrainingStats = {
  modulesCompleted: 124,
  activeSellers: 32,
  recommendedModule: {
    id: 'objection-handling',
    title: 'dashboard.training.recommendedModuleTitle',
    description: 'dashboard.training.recommendedModuleDesc',
    path: '/manager/training/objection-handling'
  }
};

const TrainingStats: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.training.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 border p-4 rounded-md">
            <div className="bg-blue-100 p-2 rounded-md">
              <GraduationCap className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('dashboard.training.modulesCompleted')}</p>
              <p className="font-bold text-lg">{mockTrainingStats.modulesCompleted}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 border p-4 rounded-md">
            <div className="bg-green-100 p-2 rounded-md">
              <Users className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('dashboard.training.activeSellers')}</p>
              <p className="font-bold text-lg">{mockTrainingStats.activeSellers}</p>
            </div>
          </div>
        </div>
        
        <div className="border p-4 rounded-md bg-gray-50 space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <p className="text-sm font-medium">{t('dashboard.training.recommended')}</p>
          </div>
          
          <div>
            <h4 className="font-medium">{t(mockTrainingStats.recommendedModule.title)}</h4>
            <p className="text-sm text-muted-foreground my-1">
              {t(mockTrainingStats.recommendedModule.description)}
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(mockTrainingStats.recommendedModule.path)}
            className="w-full"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            {t('dashboard.training.viewModule')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingStats;
