
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoleLayout from '@/components/RoleLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import TrainingTheory from '@/components/training/TrainingTheory';
import TrainingVideo from '@/components/training/TrainingVideo';
import TrainingQuiz from '@/components/training/TrainingQuiz';
import { mockTrainings } from '@/data/mockData';
import { Training } from '@/types';

const TrainingModuleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('theory');
  const [training, setTraining] = useState<Training | null>(null);

  useEffect(() => {
    // Find training by slug
    const foundTraining = mockTrainings.find(
      (module) => module.title.toLowerCase().replace(/\s+/g, '-') === slug
    ) || {
      id: '1',
      title: 'Handling Price Objections',
      description: 'Learn effective strategies to address price concerns from customers.',
      skill: 'objections',
      level: 'intermediate',
      status: 'recommended',
      progress: 0,
      dueDate: '2025-05-01'
    };

    setTraining(foundTraining);
    
    // Set document title
    document.title = foundTraining.title + ' | ' + t('sales.training');

    return () => {
      document.title = t('sales.training');
    };
  }, [slug, t]);

  if (!training) {
    return (
      <RoleLayout currentPath="/sales/training">
        <div className="container py-6">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout currentPath="/sales/training">
      <div className="container py-6 animate-fade-in">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="pl-0" 
            onClick={() => navigate('/sales/training')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{training.title}</h1>
          <p className="text-muted-foreground mt-2">{training.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-1">
              <span className="font-medium">{t('training.skill')}:</span> {t(`insights.${training.skill}`)}
            </div>
            <div className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-1">
              <span className="font-medium">{t('training.level')}:</span> {training.level}
            </div>
          </div>
        </div>
        
        <Tabs 
          defaultValue="theory" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="theory">{t('training.theory')}</TabsTrigger>
            <TabsTrigger value="video">{t('training.video')}</TabsTrigger>
            <TabsTrigger value="quiz">{t('training.quiz')}</TabsTrigger>
          </TabsList>
          
          <Card className="p-6">
            <TabsContent value="theory">
              <TrainingTheory trainingId={training.id} />
            </TabsContent>
            
            <TabsContent value="video">
              <TrainingVideo trainingId={training.id} />
            </TabsContent>
            
            <TabsContent value="quiz">
              <TrainingQuiz trainingId={training.id} />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </RoleLayout>
  );
};

export default TrainingModuleDetail;
