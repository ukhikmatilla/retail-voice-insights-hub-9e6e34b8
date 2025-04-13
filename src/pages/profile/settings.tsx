
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoleLayout from '@/components/RoleLayout';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import ProfileForm from '@/components/profile/ProfileForm';
import { useAuth } from '@/contexts/AuthContext';

const ProfileSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Redirect if user is not authenticated
  if (!user) {
    navigate('/auth/login');
    return null;
  }
  
  return (
    <RoleProtectedRoute allowedRoles={['salesperson', 'manager', 'hr']}>
    <RoleLayout currentPath="/profile/settings">

        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">{t('profile.title')}</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <ProfileForm />
          </div>
        </div>
      </RoleLayout>
    </RoleProtectedRoute>
  );
};

export default ProfileSettings;
