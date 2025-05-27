
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    welcome: 'مرحباً بك في فليشا',
    platformDescription: 'منصة التجارة الإلكترونية باستخدام رصيد الهاتف المحمول',
    selectLanguage: 'اختر اللغة',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    seller: 'بائع',
    buyer: 'مشتري',
    phoneNumber: 'رقم الهاتف',
    otpCode: 'رمز التحقق',
    enterPhone: 'أدخل رقم هاتفك',
    enterOTP: 'أدخل رمز التحقق المرسل إليك',
    sendOTP: 'إرسال رمز التحقق',
    verify: 'التحقق',
    flexyBalance: 'رصيد فليكسي',
    products: 'المنتجات',
    dashboard: 'لوحة التحكم',
    orders: 'الطلبات',
    wallet: 'المحفظة',
    addProduct: 'إضافة منتج',
    pendingBalance: 'الرصيد المعلق',
    availableBalance: 'الرصيد المتاح',
    withdraw: 'سحب',
    search: 'بحث',
    categories: 'الفئات',
    bestSellers: 'الأكثر مبيعاً',
    newest: 'الأحدث',
    price: 'السعر',
    buyNow: 'اشتري الآن',
    addToCart: 'أضف للسلة'
  },
  fr: {
    welcome: 'Bienvenue sur FLISHA',
    platformDescription: 'Plateforme e-commerce utilisant le crédit mobile',
    selectLanguage: 'Choisir la langue',
    login: 'Se connecter',
    register: 'S\'inscrire',
    seller: 'Vendeur',
    buyer: 'Acheteur',
    phoneNumber: 'Numéro de téléphone',
    otpCode: 'Code OTP',
    enterPhone: 'Entrez votre numéro de téléphone',
    enterOTP: 'Entrez le code OTP envoyé',
    sendOTP: 'Envoyer le code OTP',
    verify: 'Vérifier',
    flexyBalance: 'Solde Flexy',
    products: 'Produits',
    dashboard: 'Tableau de bord',
    orders: 'Commandes',
    wallet: 'Portefeuille',
    addProduct: 'Ajouter un produit',
    pendingBalance: 'Solde en attente',
    availableBalance: 'Solde disponible',
    withdraw: 'Retirer',
    search: 'Rechercher',
    categories: 'Catégories',
    bestSellers: 'Meilleures ventes',
    newest: 'Nouveautés',
    price: 'Prix',
    buyNow: 'Acheter maintenant',
    addToCart: 'Ajouter au panier'
  },
  en: {
    welcome: 'Welcome to FLISHA',
    platformDescription: 'E-commerce platform using mobile credit',
    selectLanguage: 'Select Language',
    login: 'Login',
    register: 'Register',
    seller: 'Seller',
    buyer: 'Buyer',
    phoneNumber: 'Phone Number',
    otpCode: 'OTP Code',
    enterPhone: 'Enter your phone number',
    enterOTP: 'Enter the OTP code sent to you',
    sendOTP: 'Send OTP',
    verify: 'Verify',
    flexyBalance: 'Flexy Balance',
    products: 'Products',
    dashboard: 'Dashboard',
    orders: 'Orders',
    wallet: 'Wallet',
    addProduct: 'Add Product',
    pendingBalance: 'Pending Balance',
    availableBalance: 'Available Balance',
    withdraw: 'Withdraw',
    search: 'Search',
    categories: 'Categories',
    bestSellers: 'Best Sellers',
    newest: 'Newest',
    price: 'Price',
    buyNow: 'Buy Now',
    addToCart: 'Add to Cart'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
