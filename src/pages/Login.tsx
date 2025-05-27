
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as 'buyer' | 'seller') || 'buyer';
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { t, isRTL } = useLanguage();
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!phone || phone.length < 8) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
      toast({
        title: "OTP Sent",
        description: "Use code: 1234 for demo purposes"
      });
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const success = await login(phone, otp, role);
    setLoading(false);

    if (success) {
      toast({
        title: "Success",
        description: "Login successful!"
      });
      navigate(role === 'seller' ? '/seller-dashboard' : '/buyer-dashboard');
    } else {
      toast({
        title: "Error", 
        description: "Invalid OTP code. Use 1234 for demo.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 ${isRTL ? 'font-arabic' : ''}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <CardTitle className="text-2xl">
                {t('login')} - {t(role)}
              </CardTitle>
              <CardDescription>
                {step === 'phone' ? t('enterPhone') : t('enterOTP')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'phone' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('phoneNumber')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+213 xxx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={isRTL ? 'text-right' : ''}
                />
              </div>
              <Button 
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Sending...' : t('sendOTP')}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">{t('otpCode')}</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={4}
                  className={`text-center text-2xl tracking-wider ${isRTL ? 'text-right' : ''}`}
                />
                <p className="text-sm text-gray-500 text-center">
                  Demo: Use code "1234"
                </p>
              </div>
              <Button 
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Verifying...' : t('verify')}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setStep('phone')}
                className="w-full"
              >
                Change Phone Number
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
