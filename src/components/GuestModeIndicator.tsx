
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';

const GuestModeIndicator = () => {
  const { user, isGuest, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
        <User className="w-4 h-4 text-green-700" />
        <span className="text-green-700 font-medium text-sm">{user.name}</span>
        {user.flexyBalance && (
          <span className="text-green-700 font-bold text-sm">{user.flexyBalance} DZD</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-100 px-3 py-1 rounded-full">
        <span className="text-gray-600 text-sm">Guest Mode</span>
      </div>
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => navigate('/login?role=buyer')}
        className="gap-1"
      >
        <LogIn className="w-3 h-3" />
        Login
      </Button>
    </div>
  );
};

export default GuestModeIndicator;
