
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, AlertTriangle, Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dispute = () => {
  const { t, isRTL } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const orderIdFromUrl = searchParams.get('orderId');

  const [formData, setFormData] = useState({
    orderId: orderIdFromUrl || '',
    reason: '',
    description: '',
    images: [] as File[]
  });

  const disputeReasons = [
    { value: 'not_delivered', label: t('orderNotDelivered') },
    { value: 'damaged', label: t('productDamaged') },
    { value: 'not_as_described', label: t('notAsDescribed') },
    { value: 'wrong_item', label: t('wrongItem') },
    { value: 'quality_issue', label: t('qualityIssue') },
    { value: 'other', label: t('other') }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: t('loginRequired'),
        description: t('pleaseLoginToFileDispute'),
        variant: "destructive"
      });
      return;
    }

    toast({
      title: t('disputeSubmitted'),
      description: t('disputeSubmittedSuccess')
    });
    navigate('/buyer-dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(e.target.files || [])
      }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
        <div className="container mx-auto px-6 py-16 text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('loginRequired')}</h1>
          <p className="text-gray-600 mb-8">{t('loginRequiredToFileDispute')}</p>
          <Button onClick={() => navigate('/login?role=buyer')}>
            {t('loginToContinue')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('openDispute')}</h1>
            <p className="text-gray-600">{t('reportIssueHelp')}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {t('disputeDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('orderId')} *</label>
                  <Input
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleInputChange}
                    required
                    placeholder={t('enterOrderId')}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('orderIdHelp')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('disputeReason')} *</label>
                  <Select value={formData.reason} onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectDisputeReason')} />
                    </SelectTrigger>
                    <SelectContent>
                      {disputeReasons.map(reason => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('detailedDescription')} *</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder={t('provideDetailedDescription')}
                    rows={5}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('includeDetailHelp')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('uploadPhotos')} ({t('optional')})</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {t('uploadPhotosHelp')}
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      {t('chooseFiles')}
                    </Button>
                    {formData.images.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-green-600">
                          {formData.images.length} {t('filesSelected')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">{t('whatHappensNext')}</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• {t('reviewWithin24Hours')}</li>
                    <li>• {t('emailConfirmation')}</li>
                    <li>• {t('mayContactForInfo')}</li>
                    <li>• {t('resolution2to5Days')}</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  {t('submitDispute')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dispute;
