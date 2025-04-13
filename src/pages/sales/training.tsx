
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import MicroTrainingCard from '@/components/MicroTrainingCard';
import ScriptLibrary from '@/components/ScriptLibrary';
import BadgeBoard from '@/components/BadgeBoard';
import TrainingHeader from '@/components/training/TrainingHeader';
import TrainingFilterPanel from '@/components/training/TrainingFilterPanel';
import TrainingModuleList from '@/components/training/TrainingModuleList';
import TrainingProgressChart from '@/components/training/TrainingProgressChart';
import { generateProgressData, filterTrainingModules } from '@/utils/trainingUtils';
import { mockTrainings, mockMicroTraining, mockScriptSnippets, mockBadges, mockStreak } from '@/data/mockData';

// Mock training modules
const trainingModules = [
  {
    id: '1',
    title: 'Handling Price Objections',
    description: 'Learn effective strategies to address price concerns from customers.',
    skill: 'objections',
    level: 'intermediate',
    status: 'recommended',
    progress: 0,
    dueDate: '2025-05-01'
  },
  {
    id: '2',
    title: 'Building Initial Trust',
    description: 'Master the art of establishing trust in the first minutes of customer interaction.',
    skill: 'trustBuilding',
    level: 'beginner',
    status: 'inProgress',
    progress: 35,
    dueDate: '2025-04-25'
  },
  {
    id: '3',
    title: 'Effective Cross-selling',
    description: 'Discover techniques to increase basket size through relevant recommendations.',
    skill: 'crossSelling',
    level: 'advanced',
    status: 'inProgress',
    progress: 75,
    dueDate: '2025-04-20'
  },
  {
    id: '4',
    title: 'Advanced Closing Techniques',
    description: 'Learn psychology-based approaches to closing sales with higher success rates.',
    skill: 'closing',
    level: 'advanced',
    status: 'completed',
    progress: 100,
    completedDate: '2025-04-01'
  },
  {
    id: '5',
    title: 'Value Communication',
    description: 'Learn how to effectively communicate product value rather than features.',
    skill: 'valueExplanation',
    level: 'intermediate',
    status: 'completed',
    progress: 100,
    completedDate: '2025-03-15'
  },
  {
    id: '6',
    title: 'Understanding Customer Signals',
    description: 'Recognize verbal and non-verbal cues to better address customer needs.',
    skill: 'trustBuilding',
    level: 'intermediate',
    status: 'assigned',
    progress: 0,
    dueDate: '2025-05-10'
  }
];

const SalesTraining = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [filters, setFilters] = useState({
    skill: 'all',
    level: 'all',
    status: 'all',
  });
  
  // Progress chart data
  const progressData = generateProgressData();
  
  // Find recommended module for AI goal
  const recommendedModule = trainingModules.find(module => module.status === 'recommended') || trainingModules[0];
  
  // Filter modules based on selected filters
  const filteredModules = filterTrainingModules(trainingModules, filters);
  
  // Handler for filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">{t('sales.training')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('sales.trainingDescription', 'Personalized training modules to improve your sales skills based on AI analysis.')}
        </p>
        
        {/* AI Goal of the Week */}
        <div className="mb-8">
          <TrainingHeader recommendedModule={recommendedModule} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - Left side on desktop, top on mobile */}
          <div className="lg:col-span-1">
            {/* Filter Panel */}
            <div className="space-y-6">
              <TrainingFilterPanel 
                filters={filters} 
                onChange={handleFilterChange} 
              />
              
              {/* Micro-Training of the Day */}
              <MicroTrainingCard microTraining={mockMicroTraining} />
            </div>
          </div>
          
          {/* Training Modules and other content */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">{t('sales.trainingModules')}</h2>
            
            {/* Training Module List */}
            <TrainingModuleList modules={filteredModules} />
            
            {/* Script Library */}
            <div className="mb-8">
              <ScriptLibrary scripts={mockScriptSnippets} />
            </div>
            
            {/* Progress Chart */}
            <div className="mb-8">
              <TrainingProgressChart data={progressData} />
            </div>
            
            {/* Gamification and Challenges */}
            <div>
              <BadgeBoard badges={mockBadges} streak={mockStreak} />
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default SalesTraining;
