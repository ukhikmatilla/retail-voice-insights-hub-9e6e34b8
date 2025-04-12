
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ children, allowedRoles }) => {
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
  
  // If user's role is not allowed, redirect to their appropriate dashboard
  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'salesperson':
        return <Navigate to="/sales/dashboard" replace />;
      case 'manager':
        return <Navigate to="/manager/dashboard" replace />;
      case 'hr':
        return <Navigate to="/hr/dashboard" replace />;
      default:
        return <Navigate to="/auth/login" replace />;
    }
  }
  
  return <>{children}</>;
};

export default RoleProtectedRoute;
