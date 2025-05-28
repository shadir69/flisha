
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Users, ShoppingBag, Star, Clock, Shield, Headphones, CreditCard, Truck, Award, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RecentlyViewed from '@/components/RecentlyViewed';

const Index = () => {
  console.log("Index component rendering");
  const { t, isRTL } = useLanguage();
  console.log("Language context loaded");
  const navigate = useNavigate();
  const { setGuestMode, isAuthenticated } = useAuth();
  console.log("Navigate hook loaded");

  // Mock popular products
  const popularProducts = [
    { id: 1, name: "Samsung Galaxy A54", price: 85000, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300", rating: 4.5, sales: 150 },
    { id: 2, name: "iPhone 13", price: 120000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300", rating: 4.8, sales: 203 },
    { id: 13, name: "Smart Watch", price: 45000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300", rating: 4.5, sales: 89 },
    { id: 4, name: "Nike Air Max", price: 15000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300", rating: 4.6, sales: 156 }
  ];

  // Mock featured categories
  const featuredCategories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300", count: 156 },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300", count: 89 },
    { name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300", count: 67 },
    { name: "Home & Garden", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300", count: 45 }
  ];

  const handleBrowseProducts = () => {
    setGuestMode(true);
    navigate('/products');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-red-50 to-white ${isRTL ? 'font-arabic' : ''}`}>
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/bb701b32-556c-45a5-9e1c-912d3e7e8a34.png" 
              alt="FLISHA" 
              className="w-24 h-24 object-contain"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('welcome')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('platformDescription')}
          </p>
        </div>

        {/* Browse Products */}
        <div className="text-center mb-12">
          <Button 
            onClick={handleBrowseProducts}
            size="lg"
            className="gap-2 mb-4 bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
          >
            <ShoppingBag className="w-5 h-5" />
            {t('browse')} {t('products')}
          </Button>
          <p className="text-sm text-gray-500">
           {t("herophrase")}
          </p>
        </div>

        {/* Recently Viewed - Only show if authenticated */}
        {isAuthenticated && <RecentlyViewed />}

        {/* Popular Products Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('popularProducts')}</h2>
            <p className="text-gray-600">Most loved products by our customers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <Card 
                key={product.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-2 left-2 bg-orange-500">
                      ⭐ {product.rating}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">{product.price} DZD</span>
                    <span className="text-xs text-gray-500">{product.sales} sold</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('featuredCategories')}</h2>
            <p className="text-gray-600">Shop by category</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate('/products')}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-semibold text-center">{category.name}</h4>
                  <p className="text-sm text-gray-500 text-center">{category.count} products</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modern User Type Selection */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('joinFlisha')}</h2>
            <p className="text-gray-600">{t('chooseAccountType')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Buyer Card - Modern Design */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-0 bg-gradient-to-br from-green-50 to-emerald-100" 
                  onClick={() => navigate('/login?role=buyer')}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10 text-center pb-8 pt-12">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-800 mb-3">{t('buyer')}</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed px-4">
                  {t("flexybalancephrase")}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 px-8 pb-12">
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{t('browseThousandsProducts')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{t('secureFlexPayments')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{t('fastDelivery')}</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {t('startShopping')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* Seller Card - Modern Design */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-0 bg-gradient-to-br from-red-50 to-rose-100" 
                  onClick={() => navigate('/login?role=seller')}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10 text-center pb-8 pt-12">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-800 mb-3">{t('seller')}</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed px-4">
                  {t("listmanage")}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 px-8 pb-12">
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{t('reachThousandsBuyers')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{t('easyStoreManagement')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{t('instantPayments')}</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {t('startSelling')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Shop With Us Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('whyShopWithUs')}</h2>
            <p className="text-gray-600">Reasons to choose FLISHA for your shopping needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center shadow-md shadow-grey-300 rounded-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('fastShipping')}</h3>
              <p className="text-gray-600">Quick delivery across Algeria</p>
            </div>
            
            <div className="text-center shadow-md shadow-grey-300 rounded-md p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('securePayment')}</h3>
              <p className="text-gray-600">Safe Flexy transactions</p>
            </div>
            
            <div className="text-center shadow-md shadow-grey-300 rounded-md p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('supportTeam')}</h3>
              <p className="text-gray-600">24/7 customer support</p>
            </div>
            
            <div className="text-center shadow-md shadow-grey-300 rounded-md p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('moneyBack')}</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 my-20">
          <div className="text-center shadow-md shadow-grey-300 rounded-md p-5">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-2xl">💳</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("flexyOnly")}</h3>
            <p className="text-gray-600">{t("flexyDescription")}</p>
          </div>
          
          <div className="text-center shadow-md shadow-grey-300 rounded-md p-5">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 font-bold text-2xl">🌍</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("multilingual")}</h3>
            <p className="text-gray-600">{t("languagesAvailable")}</p>
          </div>
          
          <div className="text-center shadow-md shadow-grey-300 rounded-md p-5">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-600 font-bold text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("secureTransactions")}</h3>
            <p className="text-gray-600">{t("secureDescription")}</p>
          </div>
        </div>

        {/* Flash Sale Section - Creative Feature */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-6 h-6" />
                <h2 className="text-2xl font-bold">{t('flashSale')}</h2>
              </div>
              <p className="text-lg mb-4">Up to 50% off on selected electronics!</p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm">Hours</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">34</div>
                  <div className="text-sm">Minutes</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">56</div>
                  <div className="text-sm">Seconds</div>
                </div>
              </div>
              <Button 
                className="bg-white text-orange-600 hover:bg-gray-100"
                onClick={() => navigate('/products')}
              >
                Shop Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
