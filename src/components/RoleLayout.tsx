
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import {
  LogOutIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  LightbulbIcon,
  GraduationCapIcon,
  UsersIcon,
  UserIcon,
  LineChartIcon,
  BookOpenIcon,
  SettingsIcon,
  StoreIcon
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active: boolean;
}

interface RoleLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

const RoleLayout: React.FC<RoleLayoutProps> = ({ children, currentPath }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  // Get navigation items based on user role
  const getNavItems = (): NavItem[] => {
    if (!user) return [];

    const rolePaths: Record<string, string> = {
      'salesperson': '/sales',
      'manager': '/manager',
      'hr': '/hr'
    };
    
    const basePath = rolePaths[user.role] || '/sales';
    
    const baseItems: NavItem[] = [
      { 
        label: t('dashboard.overview'),
        icon: <LayoutDashboardIcon className="h-5 w-5" />,
        href: `${basePath}/dashboard`,
        active: currentPath === `${basePath}/dashboard`
      }
    ];
    
    // Add role-specific items
    switch(user.role) {
      case 'salesperson':
        return [
          ...baseItems,
          { 
            label: t('dashboard.conversations'),
            icon: <MessageSquareIcon className="h-5 w-5" />,
            href: '/sales/conversations',
            active: currentPath === '/sales/conversations'
          },
          { 
            label: t('dashboard.insights'),
            icon: <LightbulbIcon className="h-5 w-5" />,
            href: '/sales/insights',
            active: currentPath === '/sales/insights'
          },
          { 
            label: t('dashboard.training'),
            icon: <GraduationCapIcon className="h-5 w-5" />,
            href: '/sales/training',
            active: currentPath === '/sales/training'
          }
        ];
      case 'manager':
        return [
          ...baseItems,
          { 
            label: t('dashboard.team'),
            icon: <UsersIcon className="h-5 w-5" />,
            href: '/manager/team',
            active: currentPath === '/manager/team'
          },
          {
            label: t('dashboard.stores'),
            icon: <StoreIcon className="h-5 w-5" />,
            href: '/manager/stores',
            active: currentPath === '/manager/stores'
          },
          { 
            label: t('dashboard.insights'),
            icon: <LightbulbIcon className="h-5 w-5" />,
            href: '/manager/insights',
            active: currentPath === '/manager/insights'
          },
          { 
            label: t('dashboard.coaching'),
            icon: <GraduationCapIcon className="h-5 w-5" />,
            href: '/manager/coaching',
            active: currentPath === '/manager/coaching'
          }
        ];
      case 'hr':
        return [
          ...baseItems,
          { 
            label: t('dashboard.personnel'),
            icon: <UserIcon className="h-5 w-5" />,
            href: '/hr/personnel',
            active: currentPath === '/hr/personnel'
          },
          { 
            label: t('dashboard.analysis'),
            icon: <LineChartIcon className="h-5 w-5" />,
            href: '/hr/analysis',
            active: currentPath === '/hr/analysis'
          },
          { 
            label: t('dashboard.trainingManagement'),
            icon: <BookOpenIcon className="h-5 w-5" />,
            href: '/hr/training-management',
            active: currentPath === '/hr/training-management'
          }
        ];
      default:
        return baseItems;
    }
  };
  
  const navItems = getNavItems();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar text-sidebar-foreground shrink-0 border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold">RetailVoiceAI</h1>
        </div>
        
        <div className="flex flex-col flex-1 py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item, i) => (
              <Button
                key={i}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start ${item.active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'}`}
                onClick={() => navigate(item.href)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-sidebar-border mt-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              className="flex items-center w-full justify-start p-2 hover:bg-sidebar-accent/50"
              onClick={() => navigate('/profile/settings')}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-sidebar-foreground/70">{t(`roles.${user?.role}`)}</p>
              </div>
              <SettingsIcon className="ml-auto h-4 w-4 opacity-70" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <LanguageSelector variant="secondary" className="w-full" />
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleLogout}
              className="bg-sidebar-accent/50 hover:bg-sidebar-accent"
            >
              <LogOutIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">RetailVoiceAI</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile/settings')}
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
          <LanguageSelector size="sm" />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleLogout}
          >
            <LogOutIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden flex overflow-x-auto py-2 px-4 border-b">
        {navItems.map((item, i) => (
          <Button
            key={i}
            variant={item.active ? "secondary" : "ghost"}
            size="sm"
            className="mr-2 whitespace-nowrap"
            onClick={() => navigate(item.href)}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default RoleLayout;
