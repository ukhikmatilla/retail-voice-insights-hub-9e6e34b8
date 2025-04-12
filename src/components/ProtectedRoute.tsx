
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  // Check if onboarding is completed
  const isOnboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  
  // If onboarding is not complete, redirect to onboarding
  if (!isOnboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
