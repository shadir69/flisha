
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import GuestModeIndicator from '@/components/GuestModeIndicator';
import LoginPromptModal from '@/components/LoginPromptModal';
import { ArrowLeft, ShoppingCart, Package, Star, Heart, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { t, isRTL } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock product data - in real app, fetch based on id
  const product = {
    id: parseInt(id || '1'),
    name: "Samsung Galaxy A54",
    price: 85000,
    originalPrice: 95000,
    category: "electronics",
    seller: "Tech Store",
    description: "The Samsung Galaxy A54 features a stunning 6.4-inch Super AMOLED display, powerful Exynos 1380 processor, and a versatile triple camera system. Perfect for capturing life's moments with crystal-clear quality.",
    features: [
      "6.4-inch Super AMOLED Display",
      "50MP Main Camera + 12MP Ultra-wide",
      "5000mAh Battery with 25W Fast Charging",
      "128GB Storage + 6GB RAM",
      "IP67 Water Resistance"
    ],
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500"
    ],
    inStock: 15,
    rating: 4.5,
    reviews: 128
  };

  // Mock related products
  const relatedProducts = [
    { id: 2, name: "iPhone 13", price: 120000, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300" },
    { id: 3, name: "Laptop HP", price: 95000, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" },
    { id: 4, name: "Wireless Headphones", price: 12000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" }
  ];

  const handlePurchaseClick = () => {
    if (!isAuthenticated) {
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

    toast({
      title: "Purchase Successful",
      description: `You bought ${product.name} for ${product.price} DZD`
    });
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
    

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600">by {product.seller}</p>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">{product.price} DZD</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">{product.originalPrice} DZD</span>
                )}
              </div>
              <p className="text-green-600 font-medium">{product.inStock} items in stock</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1 gap-2"
                onClick={handlePurchaseClick}
              >
                <ShoppingCart className="w-4 h-4" />
                {t('buyNow')}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold mb-2">{relatedProduct.name}</h4>
                  <span className="text-lg font-bold text-blue-600">{relatedProduct.price} DZD</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <LoginPromptModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        productName={product.name}
      />
    </div>
  );
};

export default ProductDetail;
