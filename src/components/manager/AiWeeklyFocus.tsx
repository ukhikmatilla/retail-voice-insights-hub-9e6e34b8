
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for AI focus
const mockFocus = {
  skill: 'dashboard.aiFocus.valueComm',
  description: 'dashboard.aiFocus.valueCommDesc',
  trainingModuleId: 'value-comm-101',
  trainingUrl: '/manager/training/value-comm-101'
};

const AiWeeklyFocus: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 text-primary mr-2" />
          {t('dashboard.aiFocus.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="font-medium">
            <span className="text-primary">{t('dashboard.aiFocus.recommendation')}</span>
          </p>
          <h3 className="text-xl font-semibold">
            {t(mockFocus.skill)}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t(mockFocus.description)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          size="sm" 
          className="w-full"
          onClick={() => navigate(mockFocus.trainingUrl)}
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          {t('dashboard.aiFocus.viewTraining')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiWeeklyFocus;
