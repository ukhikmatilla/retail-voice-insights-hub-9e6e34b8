
import React from 'react';
import { TFunction } from 'i18next';
import {
  User,
  Headphones,
  BookOpen,
  Award,
  Upload,
  Zap
} from 'lucide-react';
import { TeamMember } from '@/utils/mockData/types';
import { TeamMemberDetails } from '@/utils/mockData/types';
import { GeneralInfoTab } from './GeneralInfoTab';
import { ConversationsTab } from './ConversationsTab';
import { TrainingTab } from './TrainingTab';
import { BadgesTab } from './BadgesTab';
import { UploadTab } from './UploadTab';
import { TranscriptTab } from './TranscriptTab';

export const getTabConfig = (
  t: TFunction,
  memberInfo: TeamMember,
  memberDetails: TeamMemberDetails,
  selectedTranscriptId: string | null,
  setSelectedTranscriptId: (id: string | null) => void
) => {
  return [
    {
      id: 'info',
      label: t('common.general'),
      icon: <User className="h-4 w-4" />,
      content: <GeneralInfoTab memberInfo={memberInfo} />
    },
    {
      id: 'conversations',
      label: t('team.conversations'),
      icon: <Headphones className="h-4 w-4" />,
      content: (
        <ConversationsTab 
          conversations={memberDetails.conversations} 
          onSelectTranscript={setSelectedTranscriptId}
          selectedTranscriptId={selectedTranscriptId}
        />
      )
    },
    {
      id: 'transcript',
      label: t('team.transcript'),
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <TranscriptTab 
          memberDetails={memberDetails} 
          selectedTranscriptId={selectedTranscriptId} 
        />
      )
    },
    {
      id: 'training',
      label: t('team.training'),
      icon: <BookOpen className="h-4 w-4" />,
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
      content: <UploadTab userId={memberInfo.id} />
    }
  ];
};
