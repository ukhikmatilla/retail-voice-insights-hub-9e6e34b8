
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudioPlayer from '@/components/conversations/AudioPlayer';
import TranscriptTab from './TranscriptTab';
import InsightsTab from './InsightsTab';
import { TranscriptMessage } from '@/components/conversations/TranscriptMessageBubble';

interface ConversationContentProps {
  duration: number;
  transcript: TranscriptMessage[];
  skills: any[];
  insights: any[];
}

const ConversationContent: React.FC<ConversationContentProps> = ({
  duration,
  transcript,
  skills,
  insights
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('transcript');
  
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Audio player */}
      <AudioPlayer duration={duration} />
      
      {/* Transcript and Insights */}
      <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="transcript">{t('conversations.transcript')}</TabsTrigger>
          <TabsTrigger value="insights">{t('conversations.insights')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transcript" className="space-y-4 animate-fade-in">
          <TranscriptTab messages={transcript} />
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4 animate-fade-in">
          <InsightsTab skills={skills} insights={insights} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversationContent;
