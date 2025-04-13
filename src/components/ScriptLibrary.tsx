
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { ScriptSnippet } from '@/types';
import ScriptCard from './ScriptCard';

interface ScriptLibraryProps {
  scripts: ScriptSnippet[];
}

const ScriptLibrary: React.FC<ScriptLibraryProps> = ({ scripts }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(scripts.map(script => script.category))];
  
  // Filter scripts based on search term and active category
  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.scenario.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          script.aiAnswer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || script.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{t('training.scriptLibrary')}</span>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t('training.searchScripts')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4 w-full overflow-x-auto flex no-scrollbar pb-1">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {t(`insights.${category === 'all' ? 'filters.all' : category}`)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="space-y-4">
            {filteredScripts.length > 0 ? (
              filteredScripts.map(script => (
                <ScriptCard key={script.id} script={script} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {t('training.noScriptsFound')}
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScriptLibrary;
