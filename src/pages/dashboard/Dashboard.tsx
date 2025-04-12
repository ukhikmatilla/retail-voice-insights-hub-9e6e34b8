
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import SalespersonDashboard from './SalespersonDashboard';
import ManagerDashboard from './ManagerDashboard';
import HrDashboard from './HrDashboard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth/login');
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'salesperson':
        return <SalespersonDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'hr':
        return <HrDashboard />;
      default:
        return <SalespersonDashboard />; // Default to salesperson as fallback
    }
  };
  
  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
