
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, Users, ShoppingCart } from 'lucide-react';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const LoginPromptModal = ({ isOpen, onClose, productName }: LoginPromptModalProps) => {
  const navigate = useNavigate();

  const handleLoginAs = (role: 'buyer' | 'seller') => {
    navigate(`/login?role=${role}&redirect=${encodeURIComponent(window.location.pathname)}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            Login Required
          </DialogTitle>
          <DialogDescription>
            {productName 
              ? `To purchase "${productName}", please login or create an account.`
              : "To make a purchase, please login or create an account."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Button 
            onClick={() => handleLoginAs('buyer')}
            className="w-full bg-green-600 hover:bg-green-700 gap-2"
          >
            <User className="w-4 h-4" />
            Login as Buyer
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => handleLoginAs('seller')}
            className="w-full gap-2"
          >
            <Users className="w-4 h-4" />
            Login as Seller
          </Button>
          
          <Button 
            variant="ghost"
            onClick={onClose}
            className="w-full"
          >
            Continue Browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPromptModal;
