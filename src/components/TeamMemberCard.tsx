
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TeamMember } from '@/utils/teamMockData';
import { useTranslation } from 'react-i18next';
import { Eye } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
  onViewProfile?: (memberId: string) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onViewProfile }) => {
  const { t } = useTranslation();
  
  const isUnderperforming = member.averageScore < 75;

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(member.id);
    }
  };

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
      <CardFooter className="px-6 py-3 bg-muted/50 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleViewProfile}>
          <Eye className="mr-2 h-4 w-4" />
          {t('team.viewProfile')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamMemberCard;
