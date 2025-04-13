
import { Conversation, ConversationInsight } from '@/types';

const insightTypes = ["improvement", "opportunity", "improvement"];

const generateRandomInsight = (): ConversationInsight => {
  const type = insightTypes[Math.floor(Math.random() * insightTypes.length)];
  return {
    id: Math.random().toString(36).substring(2, 9),
    type: type,
    content: `Insight: ${Math.random().toString(36).substring(3, 15)}`,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 31536000000)
    ).toISOString(), // Random date within the last year
  };
};

const generateRandomInsights = (count: number): ConversationInsight[] => {
  return Array.from({ length: count }, () => generateRandomInsight());
};

const generateRandomConversation = (id: number): Conversation => {
  const insightsCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 insights

  return {
    id: id.toString(),
    date: new Date(
      Date.now() - Math.floor(Math.random() * 31536000000)
    ).toISOString(), // Random date within the last year
    duration: Math.floor(Math.random() * 3600) + 60, // Duration between 1 minute and 1 hour
    score: Math.floor(Math.random() * 101), // Score between 0 and 100
    insights: generateRandomInsights(insightsCount),
  };
};

export const mockConversations: Conversation[] = Array.from({ length: 100 }, (_, i) =>
  generateRandomConversation(i + 1)
);
