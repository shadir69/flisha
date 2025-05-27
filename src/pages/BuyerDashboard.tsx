
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
    {
      id: 1,
      name: "Samsung Galaxy A54",
      price: 85000,
      image: "/placeholder.svg",
      seller: "Tech Store"
    },
    {
      id: 2,
      name: "iPhone 13",
      price: 120000,
      image: "/placeholder.svg", 
      seller: "Mobile World"
    },
    {
      id: 3,
      name: "Laptop HP",
      price: 95000,
      image: "/placeholder.svg",
      seller: "Computer Shop"
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">FLISHA</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <Wallet className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">{user.flexyBalance} DZD</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">Discover amazing products and shop with your Flexy balance</p>
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
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
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
