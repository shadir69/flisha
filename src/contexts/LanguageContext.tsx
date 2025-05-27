
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
    // Navigation
    home: 'الرئيسية',
    shop: 'التسوق',
    products: 'المنتجات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    myOrders: 'طلباتي',
    dashboard: 'لوحة التحكم',
    
    // Platform basics
    welcome: 'مرحباً بك في فليشا',
    platformDescription: 'منصة التجارة الإلكترونية باستخدام رصيد الهاتف المحمول',
    selectLanguage: 'اختر اللغة',
    
    // Authentication
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    seller: 'بائع',
    buyer: 'مشتري',
    phoneNumber: 'رقم الهاتف',
    otpCode: 'رمز التحقق',
    enterPhone: 'أدخل رقم هاتفك',
    enterOTP: 'أدخل رمز التحقق المرسل إليك',
    sendOTP: 'إرسال رمز التحقق',
    verify: 'التحقق',
    
    // Product & Shopping
    price: 'السعر',
    buyNow: 'اشتري الآن',
    addToCart: 'أضف للسلة',
    search: 'بحث',
    categories: 'الفئات',
    bestSellers: 'الأكثر مبيعاً',
    newest: 'الأحدث',
    relatedProducts: 'منتجات ذات صلة',
    productDescription: 'وصف المنتج',
    inStock: 'متوفر في المخزن',
    outOfStock: 'غير متوفر',
    quantity: 'الكمية',
    
    // Seller dashboard
    addProduct: 'إضافة منتج',
    productName: 'اسم المنتج',
    description: 'الوصف',
    category: 'الفئة',
    uploadImages: 'رفع الصور',
    
    // Wallet & Balance
    flexyBalance: 'رصيد فليكسي',
    pendingBalance: 'الرصيد المعلق',
    availableBalance: 'الرصيد المتاح',
    withdraw: 'سحب',
    orders: 'الطلبات',
    wallet: 'المحفظة',
    
    // Contact & About
    contactUs: 'اتصل بنا',
    aboutUs: 'من نحن',
    ourMission: 'مهمتنا',
    ourVision: 'رؤيتنا',
    whyChooseUs: 'لماذا تختارنا',
    sendMessage: 'إرسال الرسالة',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    
    // Common actions
    submit: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تحرير',
    delete: 'حذف',
    view: 'عرض',
    browse: 'تصفح',
    
    // Error messages
    insufficientBalance: 'رصيد غير كافي',
    loginRequired: 'يجب تسجيل الدخول',
    errorOccurred: 'حدث خطأ',
    
    // Success messages
    purchaseSuccessful: 'تم الشراء بنجاح',
    messageSent: 'تم إرسال الرسالة',
    productAdded: 'تم إضافة المنتج'
  },
  fr: {
    // Navigation
    home: 'Accueil',
    shop: 'Boutique',
    products: 'Produits',
    about: 'À propos',
    contact: 'Contact',
    myOrders: 'Mes commandes',
    dashboard: 'Tableau de bord',
    
    // Platform basics
    welcome: 'Bienvenue sur FLISHA',
    platformDescription: 'Plateforme e-commerce utilisant le crédit mobile',
    selectLanguage: 'Choisir la langue',
    
    // Authentication
    login: 'Se connecter',
    register: 'S\'inscrire',
    logout: 'Se déconnecter',
    seller: 'Vendeur',
    buyer: 'Acheteur',
    phoneNumber: 'Numéro de téléphone',
    otpCode: 'Code OTP',
    enterPhone: 'Entrez votre numéro de téléphone',
    enterOTP: 'Entrez le code OTP envoyé',
    sendOTP: 'Envoyer le code OTP',
    verify: 'Vérifier',
    
    // Product & Shopping
    price: 'Prix',
    buyNow: 'Acheter maintenant',
    addToCart: 'Ajouter au panier',
    search: 'Rechercher',
    categories: 'Catégories',
    bestSellers: 'Meilleures ventes',
    newest: 'Nouveautés',
    relatedProducts: 'Produits connexes',
    productDescription: 'Description du produit',
    inStock: 'En stock',
    outOfStock: 'Rupture de stock',
    quantity: 'Quantité',
    
    // Seller dashboard
    addProduct: 'Ajouter un produit',
    productName: 'Nom du produit',
    description: 'Description',
    category: 'Catégorie',
    uploadImages: 'Télécharger des images',
    
    // Wallet & Balance
    flexyBalance: 'Solde Flexy',
    pendingBalance: 'Solde en attente',
    availableBalance: 'Solde disponible',
    withdraw: 'Retirer',
    orders: 'Commandes',
    wallet: 'Portefeuille',
    
    // Contact & About
    contactUs: 'Nous contacter',
    aboutUs: 'À propos de nous',
    ourMission: 'Notre mission',
    ourVision: 'Notre vision',
    whyChooseUs: 'Pourquoi nous choisir',
    sendMessage: 'Envoyer le message',
    fullName: 'Nom complet',
    email: 'E-mail',
    message: 'Message',
    
    // Common actions
    submit: 'Soumettre',
    cancel: 'Annuler',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    browse: 'Parcourir',
    
    // Error messages
    insufficientBalance: 'Solde insuffisant',
    loginRequired: 'Connexion requise',
    errorOccurred: 'Une erreur s\'est produite',
    
    // Success messages
    purchaseSuccessful: 'Achat réussi',
    messageSent: 'Message envoyé',
    productAdded: 'Produit ajouté'
  },
  en: {
    // Navigation
    home: 'Home',
    shop: 'Shop',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    myOrders: 'My Orders',
    dashboard: 'Dashboard',
    
    // Platform basics
    welcome: 'Welcome to FLISHA',
    platformDescription: 'E-commerce platform using mobile credit',
    selectLanguage: 'Select Language',
    
    // Authentication
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    seller: 'Seller',
    buyer: 'Buyer',
    phoneNumber: 'Phone Number',
    otpCode: 'OTP Code',
    enterPhone: 'Enter your phone number',
    enterOTP: 'Enter the OTP code sent to you',
    sendOTP: 'Send OTP',
    verify: 'Verify',
    
    // Product & Shopping
    price: 'Price',
    buyNow: 'Buy Now',
    addToCart: 'Add to Cart',
    search: 'Search',
    categories: 'Categories',
    bestSellers: 'Best Sellers',
    newest: 'Newest',
    relatedProducts: 'Related Products',
    productDescription: 'Product Description',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    quantity: 'Quantity',
    
    // Seller dashboard
    addProduct: 'Add Product',
    productName: 'Product Name',
    description: 'Description',
    category: 'Category',
    uploadImages: 'Upload Images',
    
    // Wallet & Balance
    flexyBalance: 'Flexy Balance',
    pendingBalance: 'Pending Balance',
    availableBalance: 'Available Balance',
    withdraw: 'Withdraw',
    orders: 'Orders',
    wallet: 'Wallet',
    
    // Contact & About
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    whyChooseUs: 'Why Choose Us',
    sendMessage: 'Send Message',
    fullName: 'Full Name',
    email: 'Email',
    message: 'Message',
    
    // Common actions
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    browse: 'Browse',
    
    // Error messages
    insufficientBalance: 'Insufficient Balance',
    loginRequired: 'Login Required',
    errorOccurred: 'An error occurred',
    
    // Success messages
    purchaseSuccessful: 'Purchase Successful',
    messageSent: 'Message Sent',
    productAdded: 'Product Added'
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
