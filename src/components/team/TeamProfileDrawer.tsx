
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { mockMemberDetails, mockTeamMembers } from '@/utils/teamMockData';
import { getTabConfig } from './profileTabs/TabConfig';

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

  const tabs = getTabConfig(t, memberInfo, memberDetails, selectedTranscriptId, setSelectedTranscriptId);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
