
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { LogOutIcon, SaveIcon } from 'lucide-react';

const ProfileForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { language, changeLanguage } = useLanguage();
  
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Mock save profile - in a real app, this would update the database
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update localStorage user with new name (mock update)
      if (user) {
        const updatedUser = { ...user, name: name.trim() };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      toast({
        title: t('profile.successUpdate'),
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: t('profile.errorUpdate'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang: 'uz' | 'ru') => {
    changeLanguage(lang);
  };

  if (!user) return null;

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Avatar & User Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-20 w-20 text-lg">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{t(`roles.${user.role}`)}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">{t('profile.fullName')}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          {/* Email Field (read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('profile.email')}</Label>
            <Input
              id="email"
              value={user.email}
              disabled
              readOnly
            />
          </div>
          
          {/* Role Field (read-only) */}
          <div className="space-y-2">
            <Label htmlFor="role">{t('profile.role')}</Label>
            <Input
              id="role"
              value={t(`roles.${user.role}`)}
              disabled
              readOnly
            />
          </div>
          
          {/* Language Selection */}
          <div className="space-y-3">
            <Label>{t('profile.language')}</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant={language === 'uz' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => handleLanguageChange('uz')}
              >
                {t('language.uz')}
              </Button>
              <Button
                type="button"
                variant={language === 'ru' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => handleLanguageChange('ru')}
              >
                {t('language.ru')}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
          <Button type="submit" disabled={loading}>
            <SaveIcon className="mr-2 h-4 w-4" />
            {t('profile.save')}
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleLogout}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            {t('profile.logout')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
