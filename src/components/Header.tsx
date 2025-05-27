
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Menu, Wallet } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationLinks = [
    { label: t('home'), path: '/' },
    { label: t('shop'), path: '/products' },
    { label: t('about'), path: '/about' },
    { label: t('contact'), path: '/contact' },
  ];

  return (
    <header className={`bg-white shadow-sm border-b sticky top-0 z-50 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/bb701b32-556c-45a5-9e1c-912d3e7e8a34.png" 
              alt="FLISHA" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-bold text-gray-800">FLISHA</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => navigate(user?.role === 'seller' ? '/seller-dashboard' : '/buyer-dashboard')}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {user?.role === 'seller' ? t('dashboard') : t('myOrders')}
              </button>
            )}
          </nav>

          {/* Right Side - Language, Balance, User, Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Flexy Balance (for authenticated users) */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-lg">
                <Wallet className="w-4 h-4 text-green-600" />
                <div className="text-sm">
                  <span className="text-gray-600">{t('flexyBalance')}: </span>
                  <span className="font-bold text-green-700">{user?.flexyBalance || 0} DZD</span>
                </div>
              </div>
            )}

            {/* Language Switcher */}
            <Select value={language} onValueChange={(value: 'ar' | 'fr' | 'en') => setLanguage(value)}>
              <SelectTrigger className="w-16 border-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="ar">ع</SelectItem>
              </SelectContent>
            </Select>

            {/* User Actions */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 text-sm">{user?.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => navigate('/login')}
                size="sm"
                className="hidden md:flex bg-green-600 hover:bg-green-700"
              >
                {t('login')}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-3">
              {/* Mobile Flexy Balance */}
              {isAuthenticated && (
                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg mb-2">
                  <Wallet className="w-4 h-4 text-green-600" />
                  <div className="text-sm">
                    <span className="text-gray-600">{t('flexyBalance')}: </span>
                    <span className="font-bold text-green-700">{user?.flexyBalance || 0} DZD</span>
                  </div>
                </div>
              )}
              
              {navigationLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-green-600 font-medium text-left py-2"
                >
                  {link.label}
                </button>
              ))}
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      navigate(user?.role === 'seller' ? '/seller-dashboard' : '/buyer-dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-green-600 font-medium text-left py-2"
                  >
                    {user?.role === 'seller' ? t('dashboard') : t('myOrders')}
                  </button>
                  <div className="flex items-center gap-2 py-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">{user?.name}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-fit">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <Button 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  size="sm"
                  className="w-fit bg-green-600 hover:bg-green-700"
                >
                  {t('login')}
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
