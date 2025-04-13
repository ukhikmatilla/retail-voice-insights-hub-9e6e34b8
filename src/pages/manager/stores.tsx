
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import { Button } from '@/components/ui/button';
import { StoreTable } from '@/components/stores/StoreTable';
import { StoreFormModal } from '@/components/stores/StoreFormModal';
import { AssignSellerModal } from '@/components/stores/AssignSellerModal';
import { Store } from '@/types/stores';

// Mock data for stores
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Central Store',
    location: 'Main Street 123',
    score: 85,
    sellersCount: 5,
    lastUpdated: new Date(2025, 3, 10),
  },
  {
    id: '2',
    name: 'East Branch',
    location: 'East Avenue 45',
    score: 65,
    sellersCount: 3,
    lastUpdated: new Date(2025, 3, 8),
  },
  {
    id: '3',
    name: 'West Mall',
    score: 42,
    sellersCount: 2,
    lastUpdated: new Date(2025, 3, 5),
  },
  {
    id: '4',
    name: 'North Point',
    location: 'North Boulevard 78',
    score: 91,
    sellersCount: 8,
    lastUpdated: new Date(2025, 3, 2),
  },
];

const ManagerStoresPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false);
  const [isEditStoreModalOpen, setIsEditStoreModalOpen] = useState(false);
  const [isAssignSellerModalOpen, setIsAssignSellerModalOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  
  const handleAddStore = (newStore: Omit<Store, 'id' | 'sellersCount' | 'lastUpdated' | 'score'>) => {
    const store: Store = {
      id: `store-${Date.now()}`,
      sellersCount: 0,
      lastUpdated: new Date(),
      score: 0,
      ...newStore
    };
    
    setStores([...stores, store]);
    setIsAddStoreModalOpen(false);
  };
  
  const handleEditStore = (updatedStore: Partial<Store> & { id: string }) => {
    setStores(stores.map(store => 
      store.id === updatedStore.id ? { ...store, ...updatedStore } : store
    ));
    setIsEditStoreModalOpen(false);
    setSelectedStoreId(null);
  };
  
  const handleDeleteStore = (storeId: string) => {
    setStores(stores.filter(store => store.id !== storeId));
  };
  
  const handleAssignSeller = (storeId: string, sellerCount: number) => {
    setStores(stores.map(store => 
      store.id === storeId 
        ? { 
            ...store, 
            sellersCount: store.sellersCount + sellerCount,
            lastUpdated: new Date()
          } 
        : store
    ));
    setIsAssignSellerModalOpen(false);
    setSelectedStoreId(null);
  };
  
  const openEditModal = (storeId: string) => {
    setSelectedStoreId(storeId);
    setIsEditStoreModalOpen(true);
  };
  
  const openAssignSellerModal = (storeId: string) => {
    setSelectedStoreId(storeId);
    setIsAssignSellerModalOpen(true);
  };
  
  const selectedStore = selectedStoreId 
    ? stores.find(store => store.id === selectedStoreId) 
    : undefined;
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t('stores.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('manager.storesOverview')}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={() => setIsAddStoreModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {t('stores.add')}
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <StoreTable 
            stores={stores}
            onEdit={openEditModal}
            onDelete={handleDeleteStore}
            onAssignSeller={openAssignSellerModal}
          />
        </div>
        
        <StoreFormModal
          isOpen={isAddStoreModalOpen}
          onClose={() => setIsAddStoreModalOpen(false)}
          onSubmit={handleAddStore}
          mode="add"
        />
        
        {selectedStore && (
          <>
            <StoreFormModal
              isOpen={isEditStoreModalOpen}
              onClose={() => {
                setIsEditStoreModalOpen(false);
                setSelectedStoreId(null);
              }}
              onSubmit={handleEditStore}
              mode="edit"
              initialData={selectedStore}
            />
            
            <AssignSellerModal
              isOpen={isAssignSellerModalOpen}
              onClose={() => {
                setIsAssignSellerModalOpen(false);
                setSelectedStoreId(null);
              }}
              onSubmit={(sellerCount) => handleAssignSeller(selectedStore.id, sellerCount)}
              storeName={selectedStore.name}
            />
          </>
        )}
      </div>
    </RoleLayout>
  );
};

export default ManagerStoresPage;
