
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { TeamMember } from '@/utils/mockData/types';

interface GeneralInfoTabProps {
  member: TeamMember;
}

export const GeneralInfoTab: React.FC<GeneralInfoTabProps> = ({ member }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center space-x-4">
        {member.avatar && (
          <div className="h-16 w-16 rounded-full bg-gray-100 overflow-hidden">
            <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-medium">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
      </div>
      
      <div className="grid gap-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">{t('team.role')}</p>
            <p className="text-sm text-muted-foreground">{t(`roles.${member.role}`)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">{t('team.status')}</p>
            <p className={`text-sm ${member.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
              {t(`team.status.${member.status}`)}
            </p>
          </div>
        </div>
        
        {member.store && (
          <div>
            <p className="text-sm font-medium">{t('dashboard.storeName')}</p>
            <p className="text-sm text-muted-foreground">{member.store}</p>
          </div>
        )}
        
        {member.lastLogin && (
          <div>
            <p className="text-sm font-medium">{t('team.lastLogin')}</p>
            <p className="text-sm text-muted-foreground">{member.lastLogin}</p>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 pt-4">
        <Button variant="outline" size="sm">
          {t('team.changeRole')}
        </Button>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          {t('team.delete')}
        </Button>
      </div>
    </div>
  );
};
