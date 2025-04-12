
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TeamMember } from '@/types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    // In a real app, this would navigate to the specific team member's details
    // For now, we'll just show a toast or alert
    alert(`View details for ${member.name}`);
  };

  const handleAssignTraining = () => {
    // In a real app, this would open a modal to assign training
    alert(`Assign training to ${member.name}`);
  };

  const isUnderperforming = member.averageScore < 75;

  return (
    <Card className={`mb-4 overflow-hidden ${isUnderperforming ? 'border-insight-red/50' : ''}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">{member.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            member.averageScore >= 90 ? 'bg-insight-green/20 text-insight-green' :
            member.averageScore >= 75 ? 'bg-insight-yellow/20 text-insight-yellow' :
            'bg-insight-red/20 text-insight-red'
          }`}>
            {member.averageScore}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {t('dashboard.stats.totalConversations')}
            </p>
            <p className="font-medium">{member.conversationsCount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t('dashboard.stats.successRate')}
            </p>
            <p className="font-medium">{member.successRate}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-muted/50 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleViewDetails}>
          {t('common.viewDetails')}
        </Button>
        <Button variant="secondary" size="sm" onClick={handleAssignTraining}>
          {t('common.assignTraining')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamMemberCard;
