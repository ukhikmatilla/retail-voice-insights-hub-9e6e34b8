import { useState } from 'react';
import { format, subMonths } from 'date-fns';

interface Insight {
  id: string;
  type: 'improvement' | 'opportunity' | 'issue';
  content: string;
}

interface Conversation {
  id: string;
  score: number;
  duration: number;
  insights: Insight[];
  language: 'uz' | 'ru';
  date: Date;
}

type DateFilter = 'all' | 'week' | 'month';
type LanguageFilter = 'all' | 'uz' | 'ru';
type SortBy = 'date' | 'score';

interface UseConversationsResult {
  data: Conversation[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  error?: string;
}

const useConversations = (
  conversations: Conversation[],
  searchQuery: string,
  scoreFilter: number[],
  dateFilter: DateFilter,
  languageFilter: LanguageFilter,
  sortBy: SortBy,
  page: number,
  pageSize: number
): UseConversationsResult => {
  try {
    const filteredConversations = conversations.filter((conversation) => {
      if (scoreFilter[0] > 0 && conversation.score < scoreFilter[0]) {
        return false;
      }

      if (searchQuery) {
        const hasMatch = conversation.insights.some((insight) =>
          insight.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (!hasMatch) return false;
      }

      if (dateFilter !== 'all') {
        const now = new Date();
        let startDate;
        if (dateFilter === 'week') {
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        } else if (dateFilter === 'month') {
          startDate = subMonths(now, 1);
        } else {
          startDate = now
        }
        if (conversation.date < startDate) return false;
      }

      if (languageFilter !== 'all') {
        if (conversation.language !== languageFilter) return false;
      }

      return true;
    });

    const sortedConversations = [...filteredConversations].sort((a, b) => {
      if (sortBy === 'date') {
        return b.date.getTime() - a.date.getTime();
      } else if (sortBy === 'score') {
        return b.score - a.score;
      }
      return 0;
    });

    const totalItems = sortedConversations.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedConversations = sortedConversations.slice(startIndex, endIndex);

    return {
      data: paginatedConversations,
      currentPage: page,
      totalPages,
      totalItems,
    };
  } catch (error) {
    return {
      data: [],
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      error: 'Failed to load conversations',
    };
  }
};

export default useConversations;