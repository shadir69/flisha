
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import GuestModeIndicator from '@/components/GuestModeIndicator';
import { ArrowLeft, Smartphone, Shield, Users, Target, Eye, Heart } from 'lucide-react';

const AboutUs = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const features = [
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About FLISHA</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing e-commerce in Algeria by enabling purchases with mobile credit
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To democratize e-commerce by making online shopping accessible to everyone in Algeria, 
                regardless of banking status, through innovative mobile credit payment solutions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To become Algeria's leading mobile-first marketplace, empowering local businesses 
                and creating opportunities for everyone to participate in the digital economy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How FLISHA Works</h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Browse & Shop</h3>
                    <p className="text-gray-600 text-sm">
                      Explore thousands of products from verified local sellers across Algeria
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Pay with Flexy</h3>
                    <p className="text-gray-600 text-sm">
                      Use your mobile credit balance to purchase items - no bank card needed
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Secure Delivery</h3>
                    <p className="text-gray-600 text-sm">
                      Receive your items and confirm delivery to release payment to the seller
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose FLISHA?</h2>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Built on Trust</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            FLISHA is designed with buyer and seller protection at its core. Our escrow system ensures 
            that payments are secure, and our dispute resolution process protects both parties. 
            We verify all sellers and monitor transactions to maintain a safe marketplace for everyone.
          </p>
          <div className="mt-8">
            <Button size="lg" onClick={() => navigate('/contact')}>
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
