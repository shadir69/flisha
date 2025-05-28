
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Package } from 'lucide-react';

const RecentlyViewed = () => {
  const { t } = useLanguage();
  const { recentlyViewed } = useAuth();
  const navigate = useNavigate();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('recentlyViewed')}</h2>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recentlyViewed.map((product) => (
          <Card 
            key={product.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <CardContent className="p-3">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <h4 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h4>
              <span className="text-sm font-bold text-green-600">{product.price} DZD</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
