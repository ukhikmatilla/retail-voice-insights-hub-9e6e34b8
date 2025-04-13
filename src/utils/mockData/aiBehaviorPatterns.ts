
export interface AIBehaviorPattern {
  id: string;
  observation: string;
  storeId?: string;
  severity: 'critical' | 'warning' | 'info';
  relatedTrainingModule?: string;
  relatedConversationId?: string;
}

export const mockAIBehaviorPatterns: AIBehaviorPattern[] = [
  {
    id: 'aibp-1',
    observation: "Many sellers at Bukhara Mall don't offer upsells or complementary products",
    storeId: '3',
    severity: 'warning',
    relatedTrainingModule: 'cross-selling-techniques'
  },
  {
    id: 'aibp-2',
    observation: "Trust-building steps are skipped in 70% of calls across all stores",
    severity: 'critical',
    relatedTrainingModule: 'building-customer-trust'
  },
  {
    id: 'aibp-3',
    observation: "Price objections are poorly handled in Chorsu Market",
    storeId: '4',
    severity: 'critical',
    relatedTrainingModule: 'handling-price-objections',
    relatedConversationId: 'conv-123'
  },
  {
    id: 'aibp-4',
    observation: "Product benefits are explained well in Yunusabad Plaza",
    storeId: '1',
    severity: 'info'
  },
  {
    id: 'aibp-5',
    observation: "Follow-up questions are rarely asked in Samarkand City",
    storeId: '2',
    severity: 'warning',
    relatedTrainingModule: 'effective-questioning'
  },
  {
    id: 'aibp-6',
    observation: "Closing techniques are rushed in Namangan City Center",
    storeId: '5',
    severity: 'warning',
    relatedTrainingModule: 'closing-sales-effectively'
  }
];
