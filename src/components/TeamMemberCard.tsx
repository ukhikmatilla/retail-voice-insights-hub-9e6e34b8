
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TeamMember } from '@/utils/mockData/types';
import { useTranslation } from 'react-i18next';
import { Eye, UserCheck, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
          <div className="flex items-center">
            {member.avatar && (
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-muted">
                <img src={member.avatar} alt="" className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-base">{member.name}</h3>
              <p className="text-xs text-muted-foreground">{member.email}</p>
            </div>
          </div>
          <Badge variant={member.status === 'active' ? 'success' : 'warning'} className="whitespace-nowrap ml-2">
            {t(`team.status.${member.status}`)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {t('team.role')}
            </p>
            <p className="font-medium">{t(`roles.${member.role}`)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t('dashboard.stats.avgScore')}
            </p>
            <p className={`font-medium ${
              member.averageScore >= 90 ? 'text-insight-green' :
              member.averageScore >= 75 ? 'text-insight-yellow' :
              'text-insight-red'
            }`}>
              {member.averageScore}%
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
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
