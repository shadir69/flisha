
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Wallet, User, LogOut, Package, Truck, CheckCircle, Clock } from 'lucide-react';

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

  // Enhanced categories with icons and colors
  const categories = [
    { 
      name: t('electronics'), 
      icon: '📱', 
      count: 156, 
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-700'
    },
    { 
      name: t('fashion'), 
      icon: '👗', 
      count: 89, 
      color: 'from-pink-400 to-pink-600',
      textColor: 'text-pink-700'
    },
    { 
      name: t('homeGarden'), 
      icon: '🏡', 
      count: 67, 
      color: 'from-green-400 to-green-600',
      textColor: 'text-green-700'
    },
    { 
      name: t('sports'), 
      icon: '⚽', 
      count: 45, 
      color: 'from-orange-400 to-orange-600',
      textColor: 'text-orange-700'
    }
  ];

  // Fake orders for the buyer
  const buyerOrders = [
    {
      id: "ORD-B001",
      product: "Samsung Galaxy A54",
      seller: "Tech Store",
      total: 85000,
      status: "Delivered",
      orderDate: "2025-01-10",
      deliveryDate: "2025-01-14",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300"
    },
    {
      id: "ORD-B002",
      product: "Nike Air Max 270",
      seller: "Sports Zone",
      total: 25000,
      status: "In Transit",
      orderDate: "2025-01-15",
      estimatedDelivery: "2025-01-18",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300"
    },
    {
      id: "ORD-B003",
      product: "Coffee Maker Deluxe",
      seller: "Home Essentials",
      total: 12000,
      status: "In Transit",
      orderDate: "2025-01-16",
      estimatedDelivery: "2025-01-19",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300"
    },
    {
      id: "ORD-B004",
      product: "Wireless Headphones",
      seller: "Audio Plus",
      total: 18000,
      status: "Delivered",
      orderDate: "2025-01-08",
      deliveryDate: "2025-01-12",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "In Transit":
        return <Truck className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("welcomeBack")}, {user.name}</h2>
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
            <TabsTrigger value="browse">{t('browseProducts')}</TabsTrigger>
            <TabsTrigger value="orders">{t('myOrders')}</TabsTrigger>
            <TabsTrigger value="account">{t('account')}</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Enhanced Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {categories.map((category, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-white text-3xl">{category.icon}</span>
                    </div>
                    <h4 className={`font-semibold text-lg mb-2 ${category.textColor}`}>{category.name}</h4>
                    <p className="text-sm text-gray-500">{category.count} {t('products')}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Products */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('featuredProducts')}</h3>
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
                          {product.price > (user.flexyBalance || 0) ? t('insufficientBalance') : t('buyNow')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h3 className="text-xl font-semibold">{t('orderHistory')}</h3>
            <div className="space-y-4">
              {buyerOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img 
                        src={order.image} 
                        alt={order.product}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{order.product}</h4>
                            <p className="text-gray-600 text-sm">{t('seller')}: {order.seller}</p>
                            <p className="text-gray-500 text-sm">{t('order')} #{order.id}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)} variant="secondary">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {t(order.status.toLowerCase().replace(/\s+/g, ''))}
                            </div>
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-500">{t('total')}</p>
                            <p className="font-semibold text-blue-600">{order.total} DZD</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{t('orderDate')}</p>
                            <p className="font-medium">{order.orderDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {order.status === "Delivered" ? t('deliveredOn') : t('estimatedDelivery')}
                            </p>
                            <p className="font-medium">
                              {order.status === "Delivered" ? order.deliveryDate : order.estimatedDelivery}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
