
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Star, ThumbsUp, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

const ProductReviews = ({ productId }: { productId: number }) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Ahmed M.',
      rating: 5,
      comment: 'Excellent product! Very satisfied with the quality and fast delivery.',
      date: '2025-01-20',
      verified: true,
      helpful: 12
    },
    {
      id: '2',
      userName: 'Fatima B.',
      rating: 4,
      comment: 'Good value for money. The product works as described.',
      date: '2025-01-18',
      verified: true,
      helpful: 8
    },
    {
      id: '3',
      userName: 'Youssef K.',
      rating: 5,
      comment: 'Amazing quality! Highly recommend this product to everyone.',
      date: '2025-01-15',
      verified: false,
      helpful: 6
    }
  ];

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      toast({
        title: t('loginRequired'),
        description: 'Please login to write a review',
        variant: "destructive"
      });
      return;
    }

    if (newRating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a rating',
        variant: "destructive"
      });
      return;
    }

    toast({
      title: 'Review Submitted',
      description: 'Thank you for your review!'
    });
    setNewReview('');
    setNewRating(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">{t('customerReviews')}</h3>
        
        {/* Write Review Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">{t('writeReview')}</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setNewRating(i + 1)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-6 h-6 ${i < newRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                placeholder="Share your experience with this product..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows={3}
              />
              <Button onClick={handleSubmitReview}>
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.userName}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {t('verified')}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                    <ThumbsUp className="w-4 h-4" />
                    {t('helpfulReview')} ({review.helpful})
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
