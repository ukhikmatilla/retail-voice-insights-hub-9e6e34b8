
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { TeamTable } from '@/components/team/TeamTable';
import { TeamProfileDrawer } from '@/components/team/TeamProfileDrawer';
import { InviteMemberForm } from '@/components/team/InviteMemberForm';
import { mockTeamMembers } from '@/utils/teamMockData';

const ManagerTeam = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  
  const handleViewProfile = (memberId: string) => {
    setSelectedMemberId(memberId);
  };
  
  const handleCloseProfile = () => {
    setSelectedMemberId(null);
  };
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t('team.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('manager.teamOverview')}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <InviteMemberForm />
          </div>
        </div>
        
        <div className="mt-6">
          <TeamTable 
            members={mockTeamMembers} 
            onViewProfile={handleViewProfile}
          />
        </div>
        
        {selectedMemberId && (
          <TeamProfileDrawer
            isOpen={Boolean(selectedMemberId)}
            onClose={handleCloseProfile}
            memberId={selectedMemberId}
          />
        )}
      </div>
    </RoleLayout>
  );
};

export default ManagerTeam;
