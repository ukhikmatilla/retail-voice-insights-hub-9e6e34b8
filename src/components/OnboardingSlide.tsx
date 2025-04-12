
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface OnboardingSlideProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ 
  title, 
  description,
  illustration
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="mb-8 w-full max-w-[240px] h-[200px] flex items-center justify-center">
        {illustration}
      </div>
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
    </div>
  );
};

export default OnboardingSlide;
