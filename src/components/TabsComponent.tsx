import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
  value: string;
  label: string;
}

interface TabsComponentProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Tab[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  value,
  onValueChange,
  tabs,
}) => {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className="grid w-full grid-cols-3 md:w-auto">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabsComponent;