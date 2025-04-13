
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { mockStores } from '@/utils/teamMockData';

interface UploadConversationFormProps {
  userId: string;
}

export const UploadConversationForm: React.FC<UploadConversationFormProps> = ({ userId }) => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = React.useState(false);
  const [selectedStore, setSelectedStore] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">{t('team.uploadNew')}</Label>
        <Input 
          id="file" 
          type="file" 
          accept=".mp3,.wav,.zip" 
          required 
          multiple
        />
        <p className="text-xs text-muted-foreground">
          {'.mp3, .wav, .zip'}
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="store">{t('dashboard.storeName')}</Label>
        <Select value={selectedStore} onValueChange={setSelectedStore}>
          <SelectTrigger id="store">
            <SelectValue placeholder={t('dashboard.storeName')} />
          </SelectTrigger>
          <SelectContent>
            {mockStores.map(store => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date">{t('coaching.lastActivity')}</Label>
        <Input id="date" type="date" required />
      </div>
      
      <Button type="submit" disabled={isUploading} className="w-full">
        {isUploading ? (
          <span className="animate-pulse">{t('calls.upload.button')}</span>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            {t('calls.upload.button')}
          </>
        )}
      </Button>
    </form>
  );
};
