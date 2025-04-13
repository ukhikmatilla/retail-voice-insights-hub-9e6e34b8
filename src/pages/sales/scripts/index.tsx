
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import ScriptLibrary from '@/components/ScriptLibrary';
import { mockScriptSnippets } from '@/data/mockData';

const ScriptsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('scripts.title')}</h1>
            <p className="text-muted-foreground">
              {t('scripts.description')}
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <ScriptLibrary scripts={mockScriptSnippets} />
        </div>
      </div>
    </RoleLayout>
  );
};

export default ScriptsPage;
