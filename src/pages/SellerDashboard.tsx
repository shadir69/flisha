import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import ProductForm from '@/components/ProductForm';
import { Package, Wallet, User, LogOut } from 'lucide-react';

const SellerDashboard = () => {
  const { t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProductForm, setShowProductForm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
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
          <p className="text-gray-600">Manage your store and track your sales</p>
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
                Awaiting delivery confirmation
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
                Ready for withdrawal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Active listings
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
              <h3 className="text-xl font-semibold">Your Products</h3>
              <Button onClick={() => setShowProductForm(true)} className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                <Package className="w-4 h-4 mr-2" />
                {t('addProduct')}
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No products yet</h4>
                  <p className="text-gray-500 mb-4">Start by adding your first product</p>
                  <Button onClick={() => setShowProductForm(true)} className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                    Add Your First Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h3 className="text-xl font-semibold">Recent Orders</h3>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No orders yet</h4>
                  <p className="text-gray-500">Orders will appear here when customers buy your products</p>
                </div>
              </CardContent>
            </Card>
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
