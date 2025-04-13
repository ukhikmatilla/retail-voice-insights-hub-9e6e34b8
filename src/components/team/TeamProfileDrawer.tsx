
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMobileDevice } from '@/hooks/use-mobile';
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
import { mockMemberDetails, mockTeamMembers } from '@/utils/mockData';
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
  const isMobile = useMobileDevice();

  // Reset selected transcript when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedTranscriptId(null);
    }
  }, [isOpen]);

  const memberDetails = mockMemberDetails[memberId];
  const memberInfo = mockTeamMembers.find(m => m.id === memberId);

  // Handle case where member data is not found
  if (!memberInfo || !memberDetails) {
    return null;
  }

  const tabs = getTabConfig(t, memberInfo, memberDetails, selectedTranscriptId, setSelectedTranscriptId);
  
  // Calculate width for mobile vs desktop
  const sheetWidth = isMobile ? '100%' : 'lg';

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        className={`p-0 ${isMobile ? 'w-full max-w-full' : 'sm:max-w-md md:max-w-lg'}`}
        side={isMobile ? 'bottom' : 'right'}
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{t('team.viewProfile')}</SheetTitle>
        </SheetHeader>
        <div className="p-0 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-4 pt-4 overflow-x-auto">
              {isMobile ? (
                // Mobile layout: two rows of tabs
                <>
                  <TabsList className="w-full grid grid-cols-3 mb-2">
                    {tabs.slice(0, 3).map(tab => (
                      <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                        {tab.icon}
                        <span className="text-xs sm:text-sm">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsList className="w-full grid grid-cols-3">
                    {tabs.slice(3).map(tab => (
                      <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                        {tab.icon}
                        <span className="text-xs sm:text-sm">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </>
              ) : (
                // Desktop layout: all tabs in one row with scroll
                <TabsList className="flex w-full overflow-x-auto">
                  {tabs.map(tab => (
                    <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              )}
            </div>
            
            <div className="mt-4 pb-20 max-h-[calc(100vh-200px)] overflow-y-auto">
              {tabs.map(tab => (
                <TabsContent key={tab.id} value={tab.id} className="px-4 focus-visible:outline-none focus-visible:ring-0">
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
