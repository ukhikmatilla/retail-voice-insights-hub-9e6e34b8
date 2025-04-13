
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FilterSelectorProps {
  onOpenFilters: () => void;
  showBadge?: boolean;
  activeFilters?: number;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({ 
  onOpenFilters, 
  showBadge = false, 
  activeFilters = 0 
}) => {
  const { t } = useTranslation();
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onOpenFilters}
      className="relative"
    >
      <Filter className="h-4 w-4 mr-2" />
      {t('filters.title', 'Filters')}
      
      {showBadge && activeFilters > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
          {activeFilters}
        </span>
      )}
    </Button>
  );
};

export default FilterSelector;
