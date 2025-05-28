
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Users, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  console.log("Index component rendering");
  const { t, isRTL } = useLanguage();
  console.log("Language context loaded");
  const navigate = useNavigate();
  const { setGuestMode } = useAuth();
  console.log("Navigate hook loaded");

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

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate('/login?role=buyer')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-200 group-hover:to-green-300 transition-colors">
                <User className="w-8 h-8 text-green-700" />
              </div>
              <CardTitle className="text-2xl">{t('buyer')}</CardTitle>
              <CardDescription>
                {t("flexybalancephrase")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {t('login')}  {t('buyer')}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate('/login?role=seller')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-red-200 group-hover:to-red-300 transition-colors">
                <Users className="w-8 h-8 text-red-700" />
              </div>
              <CardTitle className="text-2xl">{t('seller')}</CardTitle>
              <CardDescription>
                {t("listmanage")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                {t('login')}  {t('seller')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className=" grid md:grid-cols-3 gap-8 my-20 ">
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
          
          <div className="text-center shadow-md shadow-grey-300 rounded-md p-5 ">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-600 font-bold text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("secureTransactions")}</h3>
            <p className="text-gray-600">{t("secureDescription")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
