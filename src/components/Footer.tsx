
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('messageSent'),
      description: t('subscribeNewsletter')
    });
    setEmail('');
  };

  const quickLinks = [
    { label: t('home'), path: '/' },
    { label: t('products'), path: '/products' },
    { label: t('aboutUs'), path: '/about' },
    { label: t('contactUs'), path: '/contact' },
    { label: t('openDispute'), path: '/dispute' }
  ];

  return (
    <footer className={`bg-gray-900 text-white mt-auto ${isRTL ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/bb701b32-556c-45a5-9e1c-912d3e7e8a34.png" 
                alt="FLISHA" 
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-xl font-bold">FLISHA</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('platformDescription')}
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button 
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('termsConditions')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('contactUs')}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@flisha.dz</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+213 123 456 789</span>
              </div>
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Tech Street, Algiers, Algeria</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Language */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('newsletter')}</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 mb-6">
              <Input 
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="sm">
                {t('submit')}
              </Button>
            </form>

            <div>
              <h5 className="font-medium mb-2">{t('selectLanguage')}</h5>
              <div className="flex gap-2">
                <Button 
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  EN
                </Button>
                <Button 
                  variant={language === 'fr' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('fr')}
                  className={language === 'fr' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  FR
                </Button>
                <Button 
                  variant={language === 'ar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('ar')}
                  className={language === 'ar' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  ع
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 FLISHA. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                {t('privacyPolicy')}
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                {t('termsConditions')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
