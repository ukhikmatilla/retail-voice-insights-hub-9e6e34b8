
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { TeamMemberDetails } from '@/utils/mockData/types';

interface ConversationsTabProps {
  memberDetails: TeamMemberDetails;
  onSelectTranscript: (id: string) => void;
}

export const ConversationsTab: React.FC<ConversationsTabProps> = ({ 
  memberDetails, 
  onSelectTranscript 
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('team.title')}</TableHead>
            <TableHead>{t('coaching.lastActivity')}</TableHead>
            <TableHead>{t('dashboard.status')}</TableHead>
            <TableHead>{t('dashboard.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberDetails.conversations.map(conversation => (
            <TableRow key={conversation.id}>
              <TableCell className="font-medium">{conversation.fileName}</TableCell>
              <TableCell>{conversation.date}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  conversation.status === 'done' 
                    ? 'bg-green-100 text-green-800' 
                    : conversation.status === 'analyzing'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {t(`calls.table.status.${conversation.status}`) || conversation.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onSelectTranscript(conversation.id)}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">{t('team.transcript')}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                  >
                    <Headphones className="h-4 w-4" />
                    <span className="sr-only">{t('calls.table.listen')}</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
