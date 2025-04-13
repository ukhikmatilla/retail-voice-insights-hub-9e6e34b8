
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, CheckCircle, HelpCircle, X } from 'lucide-react';
import { mockMicroTraining } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const MicroTrainingDetail = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  
  // In real app, we would fetch the specific micro-training by id
  const microTraining = mockMicroTraining;
  
  const handleComplete = () => {
    setCompleted(true);
    toast({
      title: t('training.microCompleted'),
      description: t('training.badgeEarned'),
    });
    
    // In a real app, we would update the user's progress
    setTimeout(() => {
      navigate('/sales/training');
    }, 2000);
  };
  
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
          
          <h1 className="text-2xl md:text-3xl font-bold">{t('training.microTitle')}</h1>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>~{microTraining.estimatedTime} {t('common.min')}</span>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{microTraining.title}</CardTitle>
            <CardDescription>
              {t('training.todayTraining')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="text-amber-500 h-5 w-5" />
                  <h3 className="text-lg font-medium">{t('training.question')}</h3>
                </div>
                <p className="pl-7 text-base">{microTraining.question}</p>
              </div>
              
              {showAnswer ? (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <h3 className="text-lg font-medium">{t('training.answer')}</h3>
                  </div>
                  <p className="pl-7 text-base bg-muted/50 p-3 rounded-md">{microTraining.answer}</p>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowAnswer(true)} 
                  className="ml-7"
                >
                  {t('training.showAnswer')}
                </Button>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t p-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/sales/training')}
              disabled={completed}
            >
              {t('common.cancel')}
            </Button>
            
            <Button 
              onClick={handleComplete} 
              disabled={!showAnswer || completed}
            >
              {completed ? (
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" /> {t('training.completed')}
                </span>
              ) : (
                t('training.markComplete')
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </RoleLayout>
  );
};

export default MicroTrainingDetail;
