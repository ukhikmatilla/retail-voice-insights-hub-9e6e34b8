
import React from 'react';
import { TeamMemberDetails } from '@/utils/mockData/types';

interface BadgesTabProps {
  memberDetails: TeamMemberDetails;
}

export const BadgesTab: React.FC<BadgesTabProps> = ({ memberDetails }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 p-1">
      {memberDetails.badges.map(badge => (
        <div key={badge.id} className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
          <div className="text-3xl mb-2">{badge.icon}</div>
          <h4 className="text-sm font-medium">{badge.title}</h4>
          <p className="text-xs text-muted-foreground">{badge.earnedDate}</p>
        </div>
      ))}
    </div>
  );
};
