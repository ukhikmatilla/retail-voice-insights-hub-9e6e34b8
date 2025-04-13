
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { TeamTable } from '@/components/team/TeamTable';
import { TeamProfileDrawer } from '@/components/team/TeamProfileDrawer';
import { InviteMemberForm } from '@/components/team/InviteMemberForm';
import { TeamRoleStatsCard } from '@/components/team/TeamRoleStatsCard';
import { mockTeamMembers } from '@/utils/mockData';

const ManagerTeam = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  
  // Calculate role-based statistics
  const roleStats = useMemo(() => {
    const stats = {
      manager: { count: 0, avgScore: 0, improvement: 5 },
      hr: { count: 0, avgScore: 0, improvement: 3 },
      salesperson: { count: 0, avgScore: 0, improvement: 7 }
    };
    
    let totals = { manager: 0, hr: 0, salesperson: 0 };
    
    mockTeamMembers.forEach(member => {
      if (member.role in stats) {
        stats[member.role as keyof typeof stats].count++;
        
        if (member.averageScore) {
          totals[member.role as keyof typeof totals] += member.averageScore;
        }
      }
    });
    
    // Calculate averages
    Object.keys(stats).forEach(role => {
      const count = stats[role as keyof typeof stats].count;
      if (count > 0) {
        stats[role as keyof typeof stats].avgScore = 
          Math.round(totals[role as keyof typeof totals] / count);
      }
    });
    
    return stats;
  }, [mockTeamMembers]);
  
  // Filter members by role if filter is applied
  const filteredMembers = useMemo(() => {
    if (!roleFilter) return mockTeamMembers;
    return mockTeamMembers.filter(member => member.role === roleFilter);
  }, [roleFilter, mockTeamMembers]);
  
  const handleViewProfile = (memberId: string) => {
    setSelectedMemberId(memberId);
  };
  
  const handleCloseProfile = () => {
    setSelectedMemberId(null);
  };

  const handleRoleFilterChange = (role: string | null) => {
    setRoleFilter(role);
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
        
        {/* Role Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(roleStats).map(([role, stats]) => (
            <TeamRoleStatsCard 
              key={role}
              roleKey={role}
              count={stats.count}
              avgScore={stats.avgScore}
              improvement={stats.improvement}
              isActive={roleFilter === role}
              onClick={() => handleRoleFilterChange(roleFilter === role ? null : role)}
            />
          ))}
        </div>
        
        {/* Role filter indicator */}
        {roleFilter && (
          <div className="flex items-center mb-4">
            <span className="text-sm mr-2">{t('team.filteringBy')}: {t(`roles.${roleFilter}`)}</span>
            <button 
              onClick={() => handleRoleFilterChange(null)}
              className="text-xs bg-gray-100 hover:bg-gray-200 rounded px-2 py-1"
            >
              {t('team.clearFilter')}
            </button>
          </div>
        )}
        
        <div className="mt-6">
          <TeamTable 
            members={filteredMembers} 
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
