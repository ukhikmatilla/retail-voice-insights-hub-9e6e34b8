
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';
import { TrainingTheory as TrainingTheoryType } from '@/types';

interface TrainingTheoryProps {
  theory: TrainingTheoryType;
}

const TrainingTheory: React.FC<TrainingTheoryProps> = ({ theory }) => {
  const { t } = useTranslation();

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'warning':
        return (
          <Alert key={index} variant="destructive" className="mb-4">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription>{section.content}</AlertDescription>
          </Alert>
        );
      case 'tip':
        return (
          <Alert key={index} className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            <AlertDescription>{section.content}</AlertDescription>
          </Alert>
        );
      case 'example':
        return (
          <div key={index} className="bg-muted p-4 rounded-md mb-4">
            <h4 className="font-medium mb-2">{section.title}</h4>
            <p className="text-muted-foreground">{section.content}</p>
          </div>
        );
      default:
        return (
          <div key={index} className="mb-4">
            <h4 className="font-medium mb-2">{section.title}</h4>
            <p className="text-muted-foreground">{section.content}</p>
          </div>
        );
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {t('training.theoryTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {theory.sections.map((section, index) => renderSection(section, index))}
      </CardContent>
    </Card>
  );
};

export default TrainingTheory;
