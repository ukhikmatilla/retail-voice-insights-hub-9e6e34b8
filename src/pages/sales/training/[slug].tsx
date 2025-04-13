
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoleLayout from '@/components/RoleLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTrainingModuleData, useTheoryData, useQuizData, useVideoData } from '@/hooks/useTrainingModuleData';
import { TrainingStepsProvider, useTrainingSteps } from '@/components/training/TrainingStepsProvider';
import TrainingModuleHeader from '@/components/training/TrainingModuleHeader';
import TrainingMobileNav from '@/components/training/TrainingMobileNav';
import TrainingModuleSidebar from '@/components/training/TrainingModuleSidebar';
import TrainingContentArea from '@/components/training/TrainingContentArea';

const TrainingModuleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { training, isMobile, sidebarOpen, toggleSidebar } = useTrainingModuleData(slug);
  const theoryData = useTheoryData();
  const quizData = useQuizData();
  const videoData = useVideoData();

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
        <TrainingModuleHeader training={training} />
        
        <TrainingStepsProvider moduleKey="priceObjections">
          {isMobile && (
            <TrainingMobileNavContainer 
              isMobile={isMobile} 
              sidebarOpen={sidebarOpen} 
              toggleSidebar={toggleSidebar} 
            />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            {(sidebarOpen || !isMobile) && (
              <SidebarContainer 
                isMobile={isMobile} 
                toggleSidebar={toggleSidebar} 
              />
            )}
            
            {/* Content */}
            <div className="md:col-span-3">
              <TrainingContentArea 
                theoryData={theoryData}
                quizData={quizData}
                videoData={videoData}
              />
            </div>
          </div>
        </TrainingStepsProvider>
      </div>
    </RoleLayout>
  );
};

// Helper components to access context
const TrainingMobileNavContainer = ({ isMobile, sidebarOpen, toggleSidebar }) => {
  const { steps, currentStep } = useTrainingSteps();
  
  return (
    <TrainingMobileNav 
      steps={steps}
      currentStep={currentStep}
      isMobile={isMobile}
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
    />
  );
};

const SidebarContainer = ({ isMobile, toggleSidebar }) => {
  const { steps, currentStep, handleStepChange } = useTrainingSteps();
  
  return (
    <div className={`${isMobile ? 'absolute inset-0 z-10 bg-background p-6 h-screen' : ''}`}>
      {isMobile && (
        <MobileSidebarCloseButton toggleSidebar={toggleSidebar} />
      )}
      <TrainingModuleSidebar 
        steps={steps} 
        currentStep={currentStep} 
        onSelectStep={handleStepChange} 
      />
    </div>
  );
};

const MobileSidebarCloseButton = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  
  return (
    <Button 
      variant="ghost" 
      className="mb-4" 
      onClick={toggleSidebar}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {t('common.close')}
    </Button>
  );
};

export default TrainingModuleDetail;
