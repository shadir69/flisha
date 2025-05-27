
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

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  login: (phone: string, otp: string, role: 'buyer' | 'seller') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setGuestMode: (isGuest: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(true);

  const login = async (phone: string, otp: string, role: 'buyer' | 'seller'): Promise<boolean> => {
    // Simulate OTP verification
    if (otp === '1234') {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: role === 'buyer' ? 'Ahmed Mohamed' : 'Sarah Store',
        phone,
        role,
        flexyBalance: role === 'buyer' ? 150 : undefined,
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

  const isAuthenticated = user !== null && !isGuest;

  return (
    <AuthContext.Provider value={{ user, isGuest, login, logout, isAuthenticated, setGuestMode }}>
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
