
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Book, Play, MessageSquare, ListTodo, Check, Lock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Step {
  id: string;
  title: string;
  type: 'video' | 'theory' | 'quiz';
  status: 'completed' | 'in_progress' | 'locked';
}

interface TrainingModuleSidebarProps {
  steps: Step[];
  currentStep: string;
  onSelectStep: (stepId: string) => void;
}

const TrainingModuleSidebar: React.FC<TrainingModuleSidebarProps> = ({ 
  steps, 
  currentStep, 
  onSelectStep 
}) => {
  const { t } = useTranslation();
  
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4 mr-2" />;
      case 'quiz':
        return <ListTodo className="h-4 w-4 mr-2" />;
      case 'theory':
      default:
        return <Book className="h-4 w-4 mr-2" />;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-muted/30 rounded-lg p-4">
      <h3 className="font-medium mb-4">{t('training.moduleContents')}</h3>
      
      <ScrollArea className="h-[calc(100vh-300px)]">
        <nav>
          <ul className="space-y-1">
            {steps.map((step, index) => (
              <li key={step.id}>
                <button
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors",
                    currentStep === step.id 
                      ? "bg-primary text-primary-foreground" 
                      : step.status === 'locked'
                        ? "text-muted-foreground hover:bg-muted cursor-not-allowed"
                        : "hover:bg-muted text-left"
                  )}
                  onClick={() => step.status !== 'locked' && onSelectStep(step.id)}
                  disabled={step.status === 'locked'}
                >
                  <div className="flex items-center">
                    <span className="w-5 mr-2 text-xs font-semibold inline-block">
                      {index + 1}.
                    </span>
                    <span className="mr-1">{getStepIcon(step.type)}</span>
                    <span className="line-clamp-2 text-left">{step.title}</span>
                  </div>
                  {getStatusIcon(step.status)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      
      <div className="mt-4 pt-4 border-t">
        <div className="text-sm">
          <span className="font-medium">{t('training.progress')}: </span>
          {steps.filter(s => s.status === 'completed').length} / {steps.length}
        </div>
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{ 
              width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingModuleSidebar;
