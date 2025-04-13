
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsComponentProps {
  tabs: Tab[];
  defaultValue?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  defaultValue,
  onTabChange,
  className = '',
}) => {
  const { t } = useTranslation();
  const defaultTab = defaultValue || tabs[0]?.id || '';
  
  return (
    <Tabs 
      defaultValue={defaultTab} 
      className={className}
      onValueChange={onTabChange}
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-auto-fill mb-6">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            className="px-4 py-2"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent 
          key={tab.id} 
          value={tab.id}
          className="animate-fade-in"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
