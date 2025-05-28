
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import ProductForm from '@/components/ProductForm';
import { Package, Wallet, User, LogOut, Eye, Edit, Trash2 } from 'lucide-react';

const SellerDashboard = () => {
  const { t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProductForm, setShowProductForm] = useState(false);

  // Sample products for the seller
  const sellerProducts = [
    {
      id: 1,
      name: "Samsung Galaxy A54",
      price: 85000,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
      stock: 15,
      status: "Active"
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      price: 25000,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      stock: 8,
      status: "Active"
    },
    {
      id: 3,
      name: "Coffee Maker Deluxe",
      price: 12000,
      category: "Home & Garden",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300",
      stock: 3,
      status: "Low Stock"
    },
    {
      id: 4,
      name: "Wireless Headphones",
      price: 18000,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      stock: 0,
      status: "Out of Stock"
    }
  ];

  // Sample orders for the seller
  const sellerOrders = [
    {
      id: "ORD-001",
      customerName: "Ahmed Benali",
      product: "Samsung Galaxy A54",
      total: 85000,
      status: "Awaiting Confirmation",
      date: "2025-01-15",
      quantity: 1
    },
    {
      id: "ORD-002",
      customerName: "Fatima Khadra",
      product: "Nike Air Max 270",
      total: 25000,
      status: "Pending Shipment",
      date: "2025-01-14",
      quantity: 1
    },
    {
      id: "ORD-003",
      customerName: "Mohamed Cherif",
      product: "Coffee Maker Deluxe",
      total: 12000,
      status: "Shipped",
      date: "2025-01-13",
      quantity: 1
    },
    {
      id: "ORD-004",
      customerName: "Amina Saidi",
      product: "Wireless Headphones",
      total: 18000,
      status: "Delivered",
      date: "2025-01-10",
      quantity: 1
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Awaiting Confirmation":
        return "bg-yellow-100 text-yellow-800";
      case "Pending Shipment":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Active":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-orange-100 text-orange-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user || user.role !== 'seller') {
    navigate('/');
    return null;
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard')}</h2>
          <p className="text-gray-600">{t('manageStore')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('pendingBalance')}</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {user.pendingBalance} DZD
              </div>
              <p className="text-xs text-muted-foreground">
                {t('awaitingDeliveryConfirmation')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('availableBalance')}</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {user.availableBalance} DZD
              </div>
              <p className="text-xs text-muted-foreground">
                {t('readyForWithdrawal')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('totalProducts')}</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerProducts.length}</div>
              <p className="text-xs text-muted-foreground">
                {t('activeListings')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">{t('products')}</TabsTrigger>
            <TabsTrigger value="orders">{t('orders')}</TabsTrigger>
            <TabsTrigger value="wallet">{t('wallet')}</TabsTrigger>
            <TabsTrigger value="settings">{t('Settings')}</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{t('yourProducts')}</h3>
              <Button onClick={() => setShowProductForm(true)} className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                <Package className="w-4 h-4 mr-2" />
                {t('addProduct')}
              </Button>
            </div>
            
            <div className="grid gap-4">
              {sellerProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg">{product.name}</h4>
                          <Badge className={getStatusColor(product.status)}>
                            {t(product.status.toLowerCase().replace(/\s+/g, ''))}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{t('category')}: {product.category}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-bold text-blue-600">{product.price} DZD</span>
                            <span className="text-sm text-gray-500">{t('stock')}: {product.stock}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h3 className="text-xl font-semibold">{t('recentOrders')}</h3>
            <div className="space-y-4">
              {sellerOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{t('order')} #{order.id}</h4>
                        <p className="text-gray-600">{t('customer')}: {order.customerName}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {t(order.status.toLowerCase().replace(/\s+/g, ''))}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('product')}</p>
                        <p className="font-medium">{order.product}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('total')}</p>
                        <p className="font-medium">{order.total} DZD</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('date')}</p>
                        <p className="font-medium">{order.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <h3 className="text-xl font-semibold">Wallet Management</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Balance</CardTitle>
                  <CardDescription>Ready for withdrawal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-4">
                    {user.availableBalance} DZD
                  </div>
                  <Button className="w-full" disabled={!user.availableBalance || user.availableBalance === 0}>
                    {t('withdraw')} to Bank Card
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Balance</CardTitle>
                  <CardDescription>Awaiting delivery confirmation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-4">
                    {user.pendingBalance} DZD
                  </div>
                  <p className="text-sm text-gray-500">
                    Funds will be available after buyers confirm delivery
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h3 className="text-xl font-semibold">Account Settings</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Store Name</label>
                    <div className="text-gray-600">{user.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <div className="text-gray-600">{user.phone}</div>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {showProductForm && (
        <ProductForm onClose={() => setShowProductForm(false)} />
      )}
    </div>
  );
};

export default SellerDashboard;
