
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import GuestModeIndicator from '@/components/GuestModeIndicator';
import { ArrowLeft, Smartphone, Shield, Users, Target, Eye, Heart } from 'lucide-react';

const AboutUs = () => {
  const { language,t, isRTL } = useLanguage();
  const navigate = useNavigate();


  const features_en = [
    {
      icon: Smartphone,
      title: "Mobile Credit Payments",
      description: "Shop using your Flexy mobile credit balance - no bank cards required."
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Protected payments with funds held in escrow until delivery confirmation."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Supporting local sellers and connecting communities across Algeria."
    }
  ];
  const features_ar = [
    {
      icon: Smartphone,
      title: "الدفع برصيد الهاتف",
      description: "تسوق باستخدام رصيد فليكسي الخاص بك - لا حاجة لبطاقات بنكية.",
    },
    {
      icon: Shield,
      title: "معاملات آمنة",
      description: "مدفوعات محمية يتم الاحتفاظ بها في الضمان حتى تأكيد التسليم.",
    },
    {
      icon: Users,
      title: "مجتمع مدفوع بالمستخدمين",
      description: "دعم البائعين المحليين وربط المجتمعات عبر الجزائر.",
    },
  ];
  const features_fr = [
    {
      icon: Smartphone,
      title: "Paiement par crédit mobile",
      description: "Faites vos achats avec votre solde Flexy - sans carte bancaire.",
    },
    {
      icon: Shield,
      title: "Transactions sécurisées",
      description: "Paiements protégés conservés en séquestre jusqu’à confirmation de la livraison.",
    },
    {
      icon: Users,
      title: "Communauté solidaire",
      description: "Soutenir les vendeurs locaux et connecter les communautés à travers l’Algérie.",
    },
  ];
  const features =
  language === "fr"
    ? features_fr
    : language === "ar"
    ? features_ar
    : features_en;

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
 <div className="container mx-auto px-6 py-8">
  {/* Hero Section */}
  <div className="text-center mb-12">
  <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/bb701b32-556c-45a5-9e1c-912d3e7e8a34.png" 
              alt="FLISHA" 
              className="w-24 h-24 object-contain"
            />
          </div>
    <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("aboutTitle")}</h1>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      {t("aboutIntro")}
    </p>
  </div>

  {/* Mission & Vision */}
  <div className="grid md:grid-cols-2 gap-8 mb-12">
    <Card>
      <CardContent className="p-8 text-center">
        <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">{t("ourMissionTitle")}</h2>
        <p className="text-gray-700 leading-relaxed">
          {t("ourMissionText")}
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="p-8 text-center">
        <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">{t("ourVisionTitle")}</h2>
        <p className="text-gray-700 leading-relaxed">
          {t("ourVisionText")}
        </p>
      </CardContent>
    </Card>
  </div>

  {/* How It Works */}
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t("howItWorksTitle")}</h2>
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">{t("step1Title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("step1Text")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">{t("step2Title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("step2Text")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">{t("step3Title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("step3Text")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

  {/* Key Features */}
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t("whyChooseTitle")}</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>

  {/* Trust & Safety */}
  <div className="bg-white rounded-lg p-8 text-center">
    <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("trustTitle")}</h2>
    <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
      {t("trustText")}
    </p>
    <div className="mt-8">
      <Button size="lg" onClick={() => navigate('/contact')}>
        {t("getInTouch")}
      </Button>
    </div>
  </div>
</div>


      
    </div>
  );
};

export default AboutUs;
