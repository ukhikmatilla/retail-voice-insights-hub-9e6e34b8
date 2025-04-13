
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TeamMember } from '@/utils/mockData/types';

interface GeneralInfoTabProps {
  memberInfo: TeamMember;
}

export const GeneralInfoTab: React.FC<GeneralInfoTabProps> = ({ memberInfo }) => {
  const { t } = useTranslation();
  
  // Create an array of info items to render
  const infoItems = [
    { label: 'team.role', value: t(`roles.${memberInfo.role}`) },
    { label: 'team.status', value: t(`team.status.${memberInfo.status}`) },
    { label: 'team.lastLogin', value: memberInfo.lastLogin || '-' },
    { label: 'dashboard.stats.avgScore', value: memberInfo.averageScore },
    { label: 'dashboard.stats.totalConversations', value: memberInfo.conversationsCount },
    { label: 'dashboard.stats.successRate', value: `${memberInfo.successRate}%` }
  ];

  if (memberInfo.store) {
    infoItems.splice(2, 0, { label: 'stores.store', value: memberInfo.store });
  }

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col items-center justify-center p-4 text-center">
        {memberInfo.avatar && (
          <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
            <img src={memberInfo.avatar} alt={memberInfo.name} className="h-full w-full object-cover" />
          </div>
        )}
        <h3 className="text-xl font-semibold">{memberInfo.name}</h3>
        <p className="text-muted-foreground">{memberInfo.email}</p>
      </div>

      <div className="space-y-3">
        {infoItems.map((item, index) => (
          <div key={index} className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">{t(item.label)}</span>
            <span className="font-medium">
              {typeof item.value === 'number' && item.label.includes('Score') 
                ? `${item.value}%` 
                : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
