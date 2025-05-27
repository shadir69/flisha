
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import GuestModeIndicator from '@/components/GuestModeIndicator';
import LoginPromptModal from '@/components/LoginPromptModal';
import { Search, ArrowLeft, Package, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const { t, isRTL } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  // Mock products data
  const products = [
    { id: 1, name: "Samsung Galaxy A54", price: 85000, category: "electronics", seller: "Tech Store", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300" },
    { id: 2, name: "iPhone 13", price: 120000, category: "electronics", seller: "Mobile World", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300" },
    { id: 3, name: "Laptop HP", price: 95000, category: "electronics", seller: "Computer Shop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" },
    { id: 4, name: "Nike Air Max", price: 15000, category: "fashion", seller: "Sports Zone", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300" },
    { id: 5, name: "Coffee Maker", price: 8500, category: "home", seller: "Home Essentials", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300" },
    { id: 6, name: "Wireless Headphones", price: 12000, category: "electronics", seller: "Audio Plus", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePurchaseClick = (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); // Prevent card click navigation
    
    if (!isAuthenticated) {
      setSelectedProduct(product.name);
      setShowLoginModal(true);
      return;
    }

    if (product.price > (user?.flexyBalance || 0)) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough Flexy balance for this purchase.",
        variant: "destructive"
      });
      return;
    }

    // Proceed with purchase logic
    toast({
      title: "Purchase Successful",
      description: `You bought ${product.name} for ${product.price} DZD`
    });
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">FLISHA</h1>
          </div>
          
          <GuestModeIndicator />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('products')}</h2>
          <p className="text-gray-600">Discover amazing products from local sellers</p>
          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                🛍️ You're browsing in Guest Mode. Login to make purchases and access your Flexy balance.
              </p>
            </div>
          )}
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
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
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
                  )}
                </div>
                <h4 className="font-semibold mb-2">{product.name}</h4>
                <p className="text-sm text-gray-500 mb-2">by {product.seller}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-blue-600">{product.price} DZD</span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={(e) => handlePurchaseClick(e, product)}
                >
                  <ShoppingCart className="w-3 h-3" />
                  {isAuthenticated ? t('buyNow') : 'Buy Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <LoginPromptModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        productName={selectedProduct}
      />
    </div>
  );
};

export default Products;
