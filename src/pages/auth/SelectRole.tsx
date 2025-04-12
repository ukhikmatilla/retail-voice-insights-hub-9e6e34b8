
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import { UserIcon, UsersIcon, GraduationCapIcon } from 'lucide-react';

const SelectRole = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: 'salesperson' | 'manager' | 'hr') => {
    setIsLoading(true);
    // In a real app, this would update the user's role in the database
    setTimeout(() => {
      switch(role) {
        case 'salesperson':
          navigate('/sales/dashboard');
          break;
        case 'manager':
          navigate('/manager/dashboard');
          break;
        case 'hr':
          navigate('/hr/dashboard');
          break;
        default:
          navigate('/sales/dashboard');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">RetailVoiceAI</h1>
          <LanguageSelector />
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              {t('auth.selectRole')}
            </h1>
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start p-4 h-auto" 
                onClick={() => handleRoleSelect('salesperson')}
                disabled={isLoading}
              >
                <UserIcon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{t('roles.salesperson')}</div>
                  <p className="text-sm text-muted-foreground">
                    {t('roles.salespersonDesc')}
                  </p>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start p-4 h-auto" 
                onClick={() => handleRoleSelect('manager')}
                disabled={isLoading}
              >
                <UsersIcon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{t('roles.manager')}</div>
                  <p className="text-sm text-muted-foreground">
                    {t('roles.managerDesc')}
                  </p>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start p-4 h-auto" 
                onClick={() => handleRoleSelect('hr')}
                disabled={isLoading}
              >
                <GraduationCapIcon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{t('roles.hr')}</div>
                  <p className="text-sm text-muted-foreground">
                    {t('roles.hrDesc')}
                  </p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SelectRole;
