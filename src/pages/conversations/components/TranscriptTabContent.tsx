
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TranscriptViewer, { TranscriptMessage } from '@/components/conversations/TranscriptViewer';

interface TranscriptTabContentProps {
  messages: TranscriptMessage[];
}

const TranscriptTabContent: React.FC<TranscriptTabContentProps> = ({ messages }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <TranscriptViewer messages={messages} />
      </CardContent>
    </Card>
  );
};

export default TranscriptTabContent;
