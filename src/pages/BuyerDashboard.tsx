
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Wallet, User, LogOut, Package } from 'lucide-react';

const BuyerDashboard = () => {
  const { t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== 'buyer') {
    navigate('/');
    return null;
  }

  // Mock products data
  const featuredProducts = [
    { id: 1, name: "Samsung Galaxy A54", price: 85000, category: "electronics", seller: "Tech Store", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300" },
    { id: 2, name: "iPhone 13", price: 120000, category: "electronics", seller: "Mobile World", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300" },
    { id: 3, name: "Laptop HP", price: 95000, category: "electronics", seller: "Computer Shop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" },
    { id: 4, name: "Nike Air Max", price: 15000, category: "fashion", seller: "Sports Zone", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300" },
    { id: 5, name: "Coffee Maker", price: 8500, category: "home", seller: "Home Essentials", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300" },
    { id: 6, name: "Wireless Headphones", price: 12000, category: "electronics", seller: "Audio Plus", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" }

  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
   
   

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("welcomeBack")} ,{user.name}</h2>
          <p className="text-gray-600">{t("discoverShopFlexy")}</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder={t('search') + " products..."}
                className="pl-10 text-lg py-6"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Products</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((category) => (
                <Card key={category} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 text-2xl">📱</span>
                    </div>
                    <h4 className="font-medium">{category}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Products */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Featured Products</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  )}                      </div>
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">by {product.seller}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-600">{product.price} DZD</span>
                        <Button size="sm" disabled={product.price > (user.flexyBalance || 0)}>
                          {product.price > (user.flexyBalance || 0) ? 'Insufficient Balance' : t('buyNow')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h3 className="text-xl font-semibold">Order History</h3>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No orders yet</h4>
                  <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
                  <Button onClick={() => navigate('/products')}>Browse Products</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <h3 className="text-xl font-semibold">Account Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('flexyBalance')}</CardTitle>
                  <CardDescription>Your current balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-4">
                    {user.flexyBalance} DZD
                  </div>
                  <Button variant="outline" className="w-full">
                    Recharge Balance
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <div className="text-gray-600">{user.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <div className="text-gray-600">{user.phone}</div>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;
