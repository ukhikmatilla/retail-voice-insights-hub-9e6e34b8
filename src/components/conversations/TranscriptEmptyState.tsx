
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

const TranscriptEmptyState: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 border border-dashed rounded-md bg-muted/30">
      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
      <p className="text-center text-muted-foreground">
        {t('transcript.empty')}
      </p>
    </div>
  );
};

export default TranscriptEmptyState;
