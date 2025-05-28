
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  phone: string;
  role: 'buyer' | 'seller';
  flexyBalance?: number;
  pendingBalance?: number;
  availableBalance?: number;
}

interface Order {
  id: string;
  productName: string;
  buyerName: string;
  sellerName: string;
  price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'disputed';
  date: string;
  city: string;
  productImage: string;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  login: (phone: string, otp: string, role: 'buyer' | 'seller') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setGuestMode: (isGuest: boolean) => void;
  orders: Order[];
  recentlyViewed: any[];
  addToRecentlyViewed: (product: any) => void;
}

// Fake orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    productName: 'Samsung Galaxy A54',
    buyerName: 'Ahmed Mohamed',
    sellerName: 'Tech Store',
    price: 85000,
    status: 'delivered',
    date: '2025-01-15',
    city: 'Algiers',
    productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300'
  },
  {
    id: 'ORD-002',
    productName: 'iPhone 13',
    buyerName: 'Fatima Benali',
    sellerName: 'Mobile World',
    price: 120000,
    status: 'shipped',
    date: '2025-01-20',
    city: 'Oran',
    productImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'
  },
  {
    id: 'ORD-003',
    productName: 'Nike Air Max',
    buyerName: 'Youssef Kaddour',
    sellerName: 'Sports Zone',
    price: 15000,
    status: 'confirmed',
    date: '2025-01-22',
    city: 'Constantine',
    productImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300'
  },
  {
    id: 'ORD-004',
    productName: 'Laptop HP',
    buyerName: 'Amina Cherif',
    sellerName: 'Computer Shop',
    price: 95000,
    status: 'pending',
    date: '2025-01-25',
    city: 'Annaba',
    productImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300'
  },
  {
    id: 'ORD-005',
    productName: 'Wireless Headphones',
    buyerName: 'Omar Bouzid',
    sellerName: 'Audio Plus',
    price: 12000,
    status: 'disputed',
    date: '2025-01-18',
    city: 'Tlemcen',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
  },
  {
    id: 'ORD-006',
    productName: 'Coffee Maker',
    buyerName: 'Leila Mansouri',
    sellerName: 'Home Essentials',
    price: 8500,
    status: 'delivered',
    date: '2025-01-12',
    city: 'Setif',
    productImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  const login = async (phone: string, otp: string, role: 'buyer' | 'seller'): Promise<boolean> => {
    // Simulate OTP verification
    if (otp === '1234') {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: role === 'buyer' ? 'Ahmed Mohamed' : 'Sarah Store',
        phone,
        role,
        flexyBalance: role === 'buyer' ? 50000 : undefined,
        pendingBalance: role === 'seller' ? 250 : undefined,
        availableBalance: role === 'seller' ? 180 : undefined,
      };
      setUser(mockUser);
      setIsGuest(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsGuest(true);
  };

  const setGuestMode = (guestMode: boolean) => {
    setIsGuest(guestMode);
  };

  const addToRecentlyViewed = (product: any) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
  };

  const isAuthenticated = user !== null && !isGuest;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isGuest, 
      login, 
      logout, 
      isAuthenticated, 
      setGuestMode, 
      orders: mockOrders,
      recentlyViewed,
      addToRecentlyViewed
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
