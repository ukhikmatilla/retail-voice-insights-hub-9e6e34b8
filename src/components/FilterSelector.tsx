
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
}

const FilterSelector: React.FC<FilterSelectorProps> = ({
  value,
  onValueChange,
  placeholder,
  options
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelector;
