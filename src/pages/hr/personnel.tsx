import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { 
  Search,
  Plus,
  Eye,
  Edit2,
  Trash,
  Filter
} from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { mockTeamMembers } from '@/utils/mockData';
import { TeamProfileDrawer } from '@/components/team/TeamProfileDrawer';
import { TeamTable } from '@/components/team/TeamTable';
import { useForm } from 'react-hook-form';

const HrPersonnel = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const isMobile = window.innerWidth < 768;
  
  // Filter users based on search term, role, and status
  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleViewProfile = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  const handleCloseProfile = () => {
    setSelectedMemberId(null);
  };

  // Mobile filters drawer
  const FiltersDrawer = () => (
    <Drawer open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('hr.actions.filters')}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <FormLabel>{t('team.role')}</FormLabel>
              <Select 
                value={roleFilter} 
                onValueChange={setRoleFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('insights.filters.all')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                  <SelectItem value="hr">{t('roles.hr')}</SelectItem>
                  <SelectItem value="manager">{t('roles.manager')}</SelectItem>
                  <SelectItem value="salesperson">{t('roles.salesperson')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <FormLabel>{t('dashboard.status')}</FormLabel>
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('insights.filters.all')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                  <SelectItem value="active">{t('team.status.active')}</SelectItem>
                  <SelectItem value="pending">{t('team.status.pending')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={() => setIsFiltersOpen(false)}
            >
              {t('insights.filters.apply')}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  const AddPersonnelModal = () => {
    const form = useForm({
      defaultValues: {
        name: '',
        email: '',
        role: 'salesperson',
      }
    });
    
    const handleSubmit = (data: any) => {
      console.log('Adding new personnel:', data);
      setIsAddModalOpen(false);
    };
    
    return (
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('hr.actions.addEmployee')}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hr">{t('roles.hr')}</SelectItem>
                        <SelectItem value="manager">{t('roles.manager')}</SelectItem>
                        <SelectItem value="salesperson">{t('roles.salesperson')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit">
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t('hr.dashboard.personnel')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('hr.dashboard.personnelDescription')}
            </p>
          </div>
          <div className="flex gap-2">
            {isMobile && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setIsFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> {t('hr.actions.addEmployee')}
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px]">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t('hr.actions.searchEmployee')}
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {!isMobile && (
                <>
                  <div className="w-[200px]">
                    <Select 
                      value={roleFilter} 
                      onValueChange={setRoleFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('team.role')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                        <SelectItem value="hr">{t('roles.hr')}</SelectItem>
                        <SelectItem value="manager">{t('roles.manager')}</SelectItem>
                        <SelectItem value="salesperson">{t('roles.salesperson')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-[200px]">
                    <Select 
                      value={statusFilter} 
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('dashboard.status')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                        <SelectItem value="active">{t('team.status.active')}</SelectItem>
                        <SelectItem value="pending">{t('team.status.pending')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        
        {filteredMembers.length > 0 ? (
          <TeamTable 
            members={filteredMembers}
            onViewProfile={handleViewProfile}
          />
        ) : (
          <Card className="p-8 text-center text-muted-foreground">
            <p>{t('common.noResults')}</p>
          </Card>
        )}
        
        {selectedMemberId && (
          <TeamProfileDrawer 
            isOpen={!!selectedMemberId}
            onClose={handleCloseProfile}
            memberId={selectedMemberId}
          />
        )}
        
        {/* Mobile filters drawer */}
        {isMobile && <FiltersDrawer />}
        
        {/* Add personnel modal */}
        <AddPersonnelModal />
      </div>
    </RoleLayout>
  );
};

export default HrPersonnel;
