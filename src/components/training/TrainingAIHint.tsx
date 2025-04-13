
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Brain } from 'lucide-react';

interface TrainingAIHintProps {
  tips: string[];
}

const TrainingAIHint: React.FC<TrainingAIHintProps> = ({ tips }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="bg-indigo-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
            <Brain className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-indigo-900 mb-2">{t('training.aiTipsTitle')}</h3>
            <div className="space-y-2">
              {tips.map((tip, index) => (
                <p key={index} className="text-sm text-indigo-700">{tip}</p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingAIHint;
