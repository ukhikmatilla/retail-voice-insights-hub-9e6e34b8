
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Headphones, 
  FileText,
  Award,
  BarChart3,
  User,
  Upload
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  mockMemberDetails, 
  mockTeamMembers,
  TeamMember
} from '@/utils/teamMockData';
import { UploadConversationForm } from './UploadConversationForm';

interface TeamProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
}

export const TeamProfileDrawer: React.FC<TeamProfileDrawerProps> = ({
  isOpen,
  onClose,
  memberId
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('info');
  const [selectedTranscriptId, setSelectedTranscriptId] = useState<string | null>(null);

  const memberDetails = mockMemberDetails[memberId];
  const memberInfo = mockTeamMembers.find(m => m.id === memberId);

  // Handle case where member data is not found
  if (!memberInfo || !memberDetails) {
    return null;
  }

  const renderGeneralInfo = (member: TeamMember) => (
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

  const renderConversations = () => (
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
                    onClick={() => setSelectedTranscriptId(conversation.id)}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">{t('calls.table.transcript')}</span>
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

  const renderTranscript = () => {
    let transcript = '';
    if (selectedTranscriptId) {
      const conversation = memberDetails.conversations.find(c => c.id === selectedTranscriptId);
      if (conversation && conversation.status === 'done') {
        transcript = memberDetails.selectedTranscript || '';
      }
    } else if (memberDetails.selectedTranscript) {
      transcript = memberDetails.selectedTranscript;
    }

    if (!transcript) {
      return (
        <div className="flex h-40 items-center justify-center text-center p-6 text-muted-foreground">
          {t('team.transcript')} {t('common.error.contentNotFound')}
        </div>
      );
    }

    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4 p-4">
          <div className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
            {transcript}
          </div>
        </div>
      </ScrollArea>
    );
  };

  const renderTraining = () => (
    <div className="space-y-6 p-1">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-medium">{t('team.progress')}</h4>
          <span className="text-sm text-muted-foreground">
            {`${memberDetails.trainingModules.filter(m => m.progress === 100).length}/${memberDetails.trainingModules.length}`}
          </span>
        </div>
        <Progress 
          value={
            (memberDetails.trainingModules.filter(m => m.progress === 100).length / 
            memberDetails.trainingModules.length) * 100
          } 
        />
      </div>
      
      <div className="space-y-4">
        {memberDetails.trainingModules.map(module => (
          <div key={module.id} className="rounded-lg border p-3">
            <h4 className="font-medium">{module.title}</h4>
            <div className="mt-2 flex items-center justify-between">
              <Progress value={module.progress} className="w-2/3" />
              <span className="text-sm text-muted-foreground">{module.progress}%</span>
            </div>
            {module.completedDate && (
              <p className="mt-2 text-xs text-muted-foreground">
                {t('training.status.completed')}: {module.completedDate}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderBadges = () => (
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

  const renderUpload = () => (
    <div className="p-1">
      <UploadConversationForm userId={memberId} />
    </div>
  );

  // Define tabs in array for easier management
  const tabs = [
    { id: 'info', label: t('dashboard.overview'), icon: <User className="h-4 w-4" />, content: renderGeneralInfo(memberInfo) },
    { id: 'conversations', label: t('team.conversations'), icon: <Headphones className="h-4 w-4" />, content: renderConversations() },
    { id: 'transcript', label: t('team.transcript'), icon: <FileText className="h-4 w-4" />, content: renderTranscript() },
    { id: 'training', label: t('team.training'), icon: <BarChart3 className="h-4 w-4" />, content: renderTraining() },
    { id: 'badges', label: t('team.badges'), icon: <Award className="h-4 w-4" />, content: renderBadges() },
    { id: 'upload', label: t('team.uploadNew'), icon: <Upload className="h-4 w-4" />, content: renderUpload() },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={() => onClose()}>
      <SheetContent className="sm:max-w-md md:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t('team.viewProfile')}</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 mb-4">
              {tabs.slice(0, 3).map(tab => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="w-full grid grid-cols-3">
              {tabs.slice(3).map(tab => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="mt-6">
              {tabs.map(tab => (
                <TabsContent key={tab.id} value={tab.id}>
                  {tab.content}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
