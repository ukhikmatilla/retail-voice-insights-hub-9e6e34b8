
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SkillCriterion } from '@/mocks/conversationSkillAnalysis';

interface SkillTableProps {
  criteria: SkillCriterion[];
}

const SkillTable: React.FC<SkillTableProps> = ({ criteria }) => {
  const { language } = useLanguage();

  // Function to render the rating indicator
  const renderRating = (rating: 'good' | 'warning' | 'poor') => {
    switch (rating) {
      case 'good':
        return <span className="text-green-600">✅</span>;
      case 'warning':
        return <span className="text-yellow-600">🟡</span>;
      case 'poor':
        return <span className="text-red-600">❌</span>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3 font-medium">Criterion</th>
            <th className="text-center py-2 px-3 font-medium">Rating</th>
            <th className="text-left py-2 px-3 font-medium">Comment</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="py-2 px-3">
                {language === 'uz' ? criterion.name.uz : criterion.name.ru}
              </td>
              <td className="py-2 px-3 text-center">
                {renderRating(criterion.rating)}
              </td>
              <td className="py-2 px-3">
                {language === 'uz' ? criterion.comment.uz : criterion.comment.ru}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillTable;
