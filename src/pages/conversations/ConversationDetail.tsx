
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import { mockConversations } from '@/data/mockData';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, PercentIcon } from 'lucide-react';
import { format } from 'date-fns';
import InsightCard from '@/components/InsightCard';

const ConversationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const conversation = mockConversations.find(c => c.id === id);
  
  if (!conversation) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Conversation not found</h2>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  // Format duration from seconds to minutes:seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Mock transcript - in a real app, this would come from the backend
  const mockTranscript = [
    { speaker: 'Salesperson', text: 'Hello! Welcome to our store. How can I help you today?' },
    { speaker: 'Customer', text: 'Hi, I\'m looking for a new smartphone with a good camera.' },
    { speaker: 'Salesperson', text: 'We have several great options. Are you interested in any specific brand?' },
    { speaker: 'Customer', text: 'I\'ve been using Samsung for years, but I\'m open to other suggestions.' },
    { speaker: 'Salesperson', text: 'Samsung makes excellent cameras. The new Galaxy S23 Ultra has an amazing 108MP camera with great low-light performance. But if you\'re open to alternatives, the iPhone 14 Pro also has an exceptional camera system.' },
    { speaker: 'Customer', text: 'What about price? What\'s the difference between them?' },
    { speaker: 'Salesperson', text: 'The Galaxy S23 Ultra starts at $1,199 and the iPhone 14 Pro starts at $999. Both are premium devices, but they have different ecosystems.' },
    { speaker: 'Customer', text: 'That\'s quite expensive. Do you have any mid-range options with good cameras?' },
    { speaker: 'Salesperson', text: 'Yes, the Google Pixel 7a has one of the best cameras in the mid-range segment, and it\'s priced at $499. The Samsung Galaxy A54 is also excellent at $449.' },
    { speaker: 'Customer', text: 'I think I\'ll take a look at the Pixel 7a. Can I see it?' },
    { speaker: 'Salesperson', text: 'Absolutely, let me get one for you.' }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {t('conversation.transcript')}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {format(new Date(conversation.date), 'PP')}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <ClockIcon className="mr-1 h-4 w-4" />
            {formatDuration(conversation.duration)}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
            conversation.score >= 90 ? 'bg-insight-green/20 text-insight-green' :
            conversation.score >= 70 ? 'bg-insight-yellow/20 text-insight-yellow' :
            'bg-insight-red/20 text-insight-red'
          }`}>
            <PercentIcon className="mr-1 h-3 w-3" />
            {t('conversation.score')}: {conversation.score}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">{t('conversation.transcript')}</h2>
              <div className="space-y-4">
                {mockTranscript.map((line, index) => (
                  <div key={index} className="flex">
                    <div className={`w-28 flex-shrink-0 font-medium ${
                      line.speaker === 'Salesperson' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {line.speaker}:
                    </div>
                    <div>{line.text}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('conversation.insights')}</h2>
          <div className="space-y-4">
            {conversation.insights.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{t('conversation.recommendations.title')}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-insight-green mt-1.5 mr-2" />
                    <span>Offer accessories after customer shows interest in a specific phone model.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-insight-yellow mt-1.5 mr-2" />
                    <span>Address price concerns by highlighting value and financing options earlier.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-insight-green mt-1.5 mr-2" />
                    <span>Continue demonstrating strong product knowledge across multiple brands.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConversationDetail;
