
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { TeamMember } from '@/utils/teamMockData';

interface TeamTableProps {
  members: TeamMember[];
  onViewProfile: (memberId: string) => void;
}

export const TeamTable: React.FC<TeamTableProps> = ({ members, onViewProfile }) => {
  const { t } = useTranslation();
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="grid gap-4">
        {members.map(member => (
          <Card key={member.id} className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">{member.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid gap-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('team.role')}:</span>
                  <span>{t(`roles.${member.role}`)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('team.status')}:</span>
                  <span className={`${member.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
                    {t(`team.status.${member.status}`)}
                  </span>
                </div>
                {member.lastLogin && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('team.lastLogin')}:</span>
                    <span>{member.lastLogin}</span>
                  </div>
                )}
                {member.averageScore !== undefined && (
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">{t('dashboard.stats.avgScore')}:</span>
                    <span className={`font-medium ${
                      member.averageScore >= 80 ? 'text-green-600' :
                      member.averageScore >= 50 ? 'text-amber-600' : 
                      'text-red-600'
                    }`}>
                      {member.averageScore}
                    </span>
                  </div>
                )}
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onViewProfile(member.id)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {t('team.viewProfile')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('team.title')}</TableHead>
            <TableHead>{t('team.role')}</TableHead>
            <TableHead>{t('team.status')}</TableHead>
            <TableHead>{t('team.lastLogin')}</TableHead>
            <TableHead>{t('dashboard.stats.avgScore')}</TableHead>
            <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  {member.avatar && (
                    <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                      <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div>
                    <div>{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{t(`roles.${member.role}`)}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  member.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {t(`team.status.${member.status}`)}
                </span>
              </TableCell>
              <TableCell>
                {member.lastLogin || '-'}
              </TableCell>
              <TableCell>
                {member.averageScore !== undefined ? (
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    member.averageScore >= 80 ? 'bg-green-100 text-green-800' :
                    member.averageScore >= 50 ? 'bg-yellow-100 text-yellow-800' :
                    member.averageScore > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.averageScore}
                  </span>
                ) : '-'}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onViewProfile(member.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {t('team.viewProfile')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
