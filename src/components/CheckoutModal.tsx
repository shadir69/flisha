
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, MapPin, User } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
}

const CheckoutModal = ({ isOpen, onClose, product }: CheckoutModalProps) => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    wilaya: ''
  });

  const algeriannWilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
    'Constantine', 'Médéa', 'Mostaganem', 'MSila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
    'Ghardaïa', 'Relizane'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (product.price > (user?.flexyBalance || 0)) {
      toast({
        title: t('insufficientBalance'),
        description: "You don't have enough Flexy balance for this purchase.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: t('orderConfirmed'),
      description: `Your order for ${product.name} has been confirmed!`
    });
    
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md ${isRTL ? 'font-arabic' : ''}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-600" />
            {t('checkout')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-lg font-bold text-green-600">{product.price} DZD</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('name')} *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder={t('fullName')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('address')} *
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Enter your delivery address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('wilaya')} *
              </label>
              <Select 
                value={formData.wilaya} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, wilaya: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your wilaya" />
                </SelectTrigger>
                <SelectContent>
                  {algeriannWilayas.map(wilaya => (
                    <SelectItem key={wilaya} value={wilaya}>
                      {wilaya}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Balance Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t('flexyBalance')}:</span>
                <span className="font-bold text-green-600">{user?.flexyBalance || 0} DZD</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">{t('price')}:</span>
                <span className="font-semibold">{product.price} DZD</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                {t('cancel')}
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                {t('confirmOrder')}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
