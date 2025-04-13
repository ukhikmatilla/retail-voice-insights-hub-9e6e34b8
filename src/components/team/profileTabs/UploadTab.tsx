
import React from 'react';
import { UploadConversationForm } from '@/components/team/UploadConversationForm';

interface UploadTabProps {
  userId: string;
}

export const UploadTab: React.FC<UploadTabProps> = ({ userId }) => {
  return (
    <div className="p-1">
      <UploadConversationForm userId={userId} />
    </div>
  );
};
