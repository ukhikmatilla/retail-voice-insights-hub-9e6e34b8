
import React from 'react';
import { Award, BarChart3, FileText, Headphones, Upload, User } from 'lucide-react';
import { GeneralInfoTab } from './GeneralInfoTab';
import { ConversationsTab } from './ConversationsTab';
import { TranscriptTab } from './TranscriptTab';
import { TrainingTab } from './TrainingTab';
import { BadgesTab } from './BadgesTab';
import { UploadTab } from './UploadTab';
import { TeamMember, TeamMemberDetails } from '@/utils/mockData/types';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const getTabConfig = (
  t: (key: string) => string,
  memberInfo: TeamMember,
  memberDetails: TeamMemberDetails,
  selectedTranscriptId: string | null,
  onSelectTranscript: (id: string) => void
): TabItem[] => {
  return [
    { 
      id: 'info', 
      label: t('dashboard.overview'), 
      icon: <User className="h-4 w-4" />, 
      content: <GeneralInfoTab member={memberInfo} /> 
    },
    { 
      id: 'conversations', 
      label: t('team.conversations'), 
      icon: <Headphones className="h-4 w-4" />, 
      content: <ConversationsTab memberDetails={memberDetails} onSelectTranscript={onSelectTranscript} /> 
    },
    { 
      id: 'transcript', 
      label: t('team.transcript'), 
      icon: <FileText className="h-4 w-4" />, 
      content: <TranscriptTab memberDetails={memberDetails} selectedTranscriptId={selectedTranscriptId} /> 
    },
    { 
      id: 'training', 
      label: t('team.training'), 
      icon: <BarChart3 className="h-4 w-4" />, 
      content: <TrainingTab memberDetails={memberDetails} /> 
    },
    { 
      id: 'badges', 
      label: t('team.badges'), 
      icon: <Award className="h-4 w-4" />, 
      content: <BadgesTab memberDetails={memberDetails} /> 
    },
    { 
      id: 'upload', 
      label: t('team.uploadNew'), 
      icon: <Upload className="h-4 w-4" />, 
      content: <UploadTab userId={memberDetails.userId} /> 
    },
  ];
};
