
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Step } from './TrainingStepsProvider';

interface TrainingMobileNavProps {
  steps: Step[];
  currentStep: string;
  isMobile: boolean;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const TrainingMobileNav: React.FC<TrainingMobileNavProps> = ({
  steps,
  currentStep,
  isMobile,
  sidebarOpen,
  toggleSidebar
}) => {
  const { t } = useTranslation();

  if (!isMobile) return null;
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-4 w-full flex justify-between" 
        onClick={toggleSidebar}
      >
        {steps.find(step => step.id === currentStep)?.title || t('training.moduleContents')}
        <ArrowRight className="h-4 w-4" />
      </Button>
      
      {sidebarOpen && (
        <div className="absolute inset-0 z-10 bg-background p-6 h-screen">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={toggleSidebar}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.close')}
          </Button>
        </div>
      )}
    </>
  );
};

export default TrainingMobileNav;
