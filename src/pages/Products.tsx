
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LoginPromptModal from '@/components/LoginPromptModal';
import CheckoutModal from '@/components/CheckoutModal';
import { Search, Package, ShoppingCart, Star, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const { t, isRTL } = useLanguage();
  const { user, isAuthenticated, addToRecentlyViewed } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Extended products data
  const products = [
    { id: 1, name: "Samsung Galaxy A54", price: 85000, category: "electronics", seller: "Tech Store", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300", rating: 4.5, reviews: 128 },
    { id: 2, name: "iPhone 13", price: 120000, category: "electronics", seller: "Mobile World", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300", rating: 4.8, reviews: 245 },
    { id: 3, name: "Laptop HP", price: 95000, category: "electronics", seller: "Computer Shop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300", rating: 4.3, reviews: 89 },
    { id: 4, name: "Nike Air Max", price: 15000, category: "fashion", seller: "Sports Zone", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300", rating: 4.6, reviews: 156 },
    { id: 5, name: "Coffee Maker", price: 8500, category: "home", seller: "Home Essentials", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300", rating: 4.2, reviews: 67 },
    { id: 6, name: "Wireless Headphones", price: 12000, category: "electronics", seller: "Audio Plus", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", rating: 4.4, reviews: 203 },
    { id: 7, name: "Designer Dress", price: 25000, category: "fashion", seller: "Fashion Hub", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300", rating: 4.7, reviews: 98 },
    { id: 8, name: "Skincare Set", price: 18000, category: "beauty", seller: "Beauty Corner", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300", rating: 4.5, reviews: 142 },
    { id: 9, name: "Gaming Mouse", price: 7500, category: "electronics", seller: "Gamer Zone", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300", rating: 4.3, reviews: 76 },
    { id: 10, name: "Perfume Set", price: 22000, category: "beauty", seller: "Fragrance World", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300", rating: 4.6, reviews: 189 },
    { id: 11, name: "Bluetooth Speaker", price: 14000, category: "electronics", seller: "Sound Pro", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300", rating: 4.4, reviews: 234 },
    { id: 12, name: "Kitchen Set", price: 32000, category: "home", seller: "Kitchen Masters", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300", rating: 4.2, reviews: 87 },
    { id: 13, name: "Smart Watch", price: 45000, category: "electronics", seller: "Wearable Tech", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300", rating: 4.5, reviews: 167 },
    { id: 14, name: "Makeup Kit", price: 16000, category: "beauty", seller: "Glam Studio", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300", rating: 4.7, reviews: 298 },
    { id: 15, name: "Running Shoes", price: 19000, category: "fashion", seller: "Athletic Gear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", rating: 4.6, reviews: 178 }
  ];

  const categories = [
    { value: 'all', label: t('categories') },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'beauty', label: 'Beauty' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: any) => {
    addToRecentlyViewed(product);
    navigate(`/product/${product.id}`);
  };

  const handlePurchaseClick = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setSelectedProduct(product);
      setShowLoginModal(true);
      return;
    }

    setSelectedProduct(product);
    setShowCheckoutModal(true);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('products')}</h2>
          <p className="text-gray-600">{t("discoverLocalProducts")}</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder={t('search') + " products..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleProductClick(product)}
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({ title: "Added to wishlist" });
                    }}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <h4 className="font-semibold mb-2 line-clamp-2">{product.name}</h4>
                <p className="text-sm text-gray-500 mb-2">by {product.seller}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-green-600">{product.price} DZD</span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full gap-2 bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
                  onClick={(e) => handlePurchaseClick(e, product)}
                >
                  <ShoppingCart className="w-3 h-3" />
                  {t('buyNow')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('noProductsFound')}</h3>
            <p className="text-gray-500">{t('tryAdjustingFilters')}</p>
          </div>
        )}
      </div>

      <LoginPromptModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        productName={selectedProduct?.name || ''}
      />

      {selectedProduct && (
        <CheckoutModal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
