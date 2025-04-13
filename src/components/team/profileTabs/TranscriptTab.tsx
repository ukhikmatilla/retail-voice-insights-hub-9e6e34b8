
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TeamMemberDetails } from '@/utils/mockData/types';

interface TranscriptTabProps {
  memberDetails: TeamMemberDetails;
  selectedTranscriptId: string | null;
}

export const TranscriptTab: React.FC<TranscriptTabProps> = ({ 
  memberDetails, 
  selectedTranscriptId 
}) => {
  const { t } = useTranslation();

  const getTranscript = () => {
    let transcript = '';
    if (selectedTranscriptId) {
      const conversation = memberDetails.conversations.find(c => c.id === selectedTranscriptId);
      if (conversation && conversation.status === 'done') {
        transcript = memberDetails.selectedTranscript || '';
      }
    } else if (memberDetails.selectedTranscript) {
      transcript = memberDetails.selectedTranscript;
    }
    return transcript;
  };

  const transcript = getTranscript();

  if (!transcript) {
    return (
      <div className="flex h-40 items-center justify-center text-center p-6 text-muted-foreground">
        {t('team.transcript')} {t('common.error.contentNotFound')}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4 p-4">
        <div className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
          {transcript}
        </div>
      </div>
    </ScrollArea>
  );
};
