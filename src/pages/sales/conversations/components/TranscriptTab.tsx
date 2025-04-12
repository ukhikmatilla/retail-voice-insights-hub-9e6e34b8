
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TranscriptViewer from '@/components/conversations/TranscriptViewer';
import { TranscriptMessage } from '@/components/conversations/TranscriptMessageBubble';

interface TranscriptTabProps {
  messages: TranscriptMessage[];
}

const TranscriptTab: React.FC<TranscriptTabProps> = ({ messages }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <TranscriptViewer messages={messages} />
      </CardContent>
    </Card>
  );
};

export default TranscriptTab;
