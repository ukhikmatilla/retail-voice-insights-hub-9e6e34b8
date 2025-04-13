
import React from 'react';
import { useTranslation } from 'react-i18next';
import RoleLayout from '@/components/RoleLayout';

interface AiTrainerLayoutProps {
  children: React.ReactNode;
}

const AiTrainerLayout = ({ children }: AiTrainerLayoutProps) => {
  const { t } = useTranslation();

  return (
    <RoleLayout currentPath="/ai/trainer">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t('ai.trainer.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('training.recommendedFor')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            {children}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default AiTrainerLayout;
