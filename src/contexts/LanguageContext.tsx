import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  isRTL: boolean;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Common
    welcome: "Welcome to FLISHA",
    login: "Login",
    logout: "Logout",
    search: "Search",
    products: "Products",
    orders: "Orders",
    wallet: "Wallet",
    dashboard: "Dashboard",
    account: "Account",
    settings: "Settings",
    profile: "Profile",
    
    // User types
    buyer: "Buyer",
    seller: "Seller",
    
    // Dashboard specific
    manageStore: "Manage your store and track your sales",
    yourProducts: "Your Products",
    recentOrders: "Recent Orders",
    orderHistory: "Order History",
    myOrders: "My Orders",
    browseProducts: "Browse Products",
    featuredProducts: "Featured Products",
    totalProducts: "Total Products",
    activeListings: "Active listings",
    
    // Product related
    addProduct: "Add Product",
    category: "Category",
    stock: "Stock",
    product: "Product",
    price: "Price",
    total: "Total",
    buyNow: "Buy Now",
    
    // Order related
    order: "Order",
    customer: "Customer",
    date: "Date",
    orderDate: "Order Date",
    deliveredOn: "Delivered On",
    estimatedDelivery: "Estimated Delivery",
    
    // Status
    awaitingconfirmation: "Awaiting Confirmation",
    pendingshipment: "Pending Shipment",
    shipped: "Shipped",
    delivered: "Delivered",
    intransit: "In Transit",
    active: "Active",
    lowstock: "Low Stock",
    outofstock: "Out of Stock",
    
    // Balance
    pendingBalance: "Pending Balance",
    availableBalance: "Available Balance",
    flexyBalance: "Flexy Balance",
    awaitingDeliveryConfirmation: "Awaiting delivery confirmation",
    readyForWithdrawal: "Ready for withdrawal",
    withdraw: "Withdraw",
    
    // Categories
    electronics: "Electronics",
    fashion: "Fashion",
    homeGarden: "Home & Garden",
    sports: "Sports",
    beauty: "Beauty",
    
    // Home page
    platformDescription: "Algeria's premier e-commerce platform powered by Flexy payments",
    browse: "Browse",
    herophrase: "No registration required to browse products",
    flexybalancephrase: "Shop with your Flexy balance for instant, secure transactions",
    listmanage: "List and manage your products to reach customers across Algeria",
    joinFlisha: "Join FLISHA Today",
    chooseAccountType: "Choose your account type and start your journey",
    browseThousandsProducts: "Browse thousands of products",
    secureFlexPayments: "Secure Flexy payments",
    fastDelivery: "Fast delivery nationwide",
    reachThousandsBuyers: "Reach thousands of buyers",
    easyStoreManagement: "Easy store management",
    instantPayments: "Instant payments",
    startShopping: "Start Shopping",
    startSelling: "Start Selling",
    
    // Shopping
    insufficientBalance: "Insufficient Balance",
    
    // Footer & Navigation
    home: "Home",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    dispute: "Dispute",
    termsConditions: "Terms & Conditions",
    
    // Recently viewed
    recentlyViewed: "Recently Viewed",
    noRecentlyViewed: "No recently viewed products",
    
    // Various
    popularProducts: "Popular Products",
    featuredCategories: "Featured Categories",
    whyShopWithUs: "Why Shop With Us",
    fastShipping: "Fast Shipping",
    securePayment: "Secure Payment",
    supportTeam: "24/7 Support",
    moneyBack: "Money Back Guarantee",
    flashSale: "Flash Sale",
    trustedSeller: "Trusted Seller"
  },
  
  fr: {
    // Common
    welcome: "Bienvenue sur FLISHA",
    login: "Connexion",
    logout: "Déconnexion",
    search: "Rechercher",
    products: "Produits",
    orders: "Commandes",
    wallet: "Portefeuille",
    dashboard: "Tableau de bord",
    account: "Compte",
    settings: "Paramètres",
    profile: "Profil",
    
    // User types
    buyer: "Acheteur",
    seller: "Vendeur",
    
    // Dashboard specific
    manageStore: "Gérez votre boutique et suivez vos ventes",
    yourProducts: "Vos Produits",
    recentOrders: "Commandes Récentes",
    orderHistory: "Historique des Commandes",
    myOrders: "Mes Commandes",
    browseProducts: "Parcourir les Produits",
    featuredProducts: "Produits Vedettes",
    totalProducts: "Total des Produits",
    activeListings: "Annonces actives",
    
    // Product related
    addProduct: "Ajouter un Produit",
    category: "Catégorie",
    stock: "Stock",
    product: "Produit",
    price: "Prix",
    total: "Total",
    buyNow: "Acheter Maintenant",
    
    // Order related
    order: "Commande",
    customer: "Client",
    date: "Date",
    orderDate: "Date de Commande",
    deliveredOn: "Livré le",
    estimatedDelivery: "Livraison Estimée",
    
    // Status
    awaitingconfirmation: "En Attente de Confirmation",
    pendingshipment: "En Attente d'Expédition",
    shipped: "Expédié",
    delivered: "Livré",
    intransit: "En Transit",
    active: "Actif",
    lowstock: "Stock Faible",
    outofstock: "Rupture de Stock",
    
    // Balance
    pendingBalance: "Solde en Attente",
    availableBalance: "Solde Disponible",
    flexyBalance: "Solde Flexy",
    awaitingDeliveryConfirmation: "En attente de confirmation de livraison",
    readyForWithdrawal: "Prêt pour le retrait",
    withdraw: "Retirer",
    
    // Categories
    electronics: "Électronique",
    fashion: "Mode",
    homeGarden: "Maison & Jardin",
    sports: "Sports",
    beauty: "Beauté",
    
    // Home page
    platformDescription: "La plateforme e-commerce de premier plan en Algérie alimentée par les paiements Flexy",
    browse: "Parcourir",
    herophrase: "Aucune inscription requise pour parcourir les produits",
    flexybalancephrase: "Achetez avec votre solde Flexy pour des transactions instantanées et sécurisées",
    listmanage: "Listez et gérez vos produits pour atteindre les clients à travers l'Algérie",
    joinFlisha: "Rejoignez FLISHA Aujourd'hui",
    chooseAccountType: "Choisissez votre type de compte et commencez votre voyage",
    browseThousandsProducts: "Parcourez des milliers de produits",
    secureFlexPayments: "Paiements Flexy sécurisés",
    fastDelivery: "Livraison rapide dans tout le pays",
    reachThousandsBuyers: "Atteignez des milliers d'acheteurs",
    easyStoreManagement: "Gestion facile de boutique",
    instantPayments: "Paiements instantanés",
    startShopping: "Commencer les Achats",
    startSelling: "Commencer à Vendre",
    
    // Shopping
    insufficientBalance: "Solde Insuffisant",
    
    // Footer & Navigation
    home: "Accueil",
    aboutUs: "À Propos",
    contactUs: "Nous Contacter",
    dispute: "Litige",
    termsConditions: "Conditions Générales",
    
    // Recently viewed
    recentlyViewed: "Récemment Vus",
    noRecentlyViewed: "Aucun produit récemment vu",
    
    // Various
    popularProducts: "Produits Populaires",
    featuredCategories: "Catégories Vedettes",
    whyShopWithUs: "Pourquoi Acheter Chez Nous",
    fastShipping: "Expédition Rapide",
    securePayment: "Paiement Sécurisé",
    supportTeam: "Support 24/7",
    moneyBack: "Garantie de Remboursement",
    flashSale: "Vente Flash",
    trustedSeller: "Vendeur de Confiance"
  },
  
  ar: {
    // Common
    welcome: "مرحباً بك في فليشا",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    search: "بحث",
    products: "المنتجات",
    orders: "الطلبات",
    wallet: "المحفظة",
    dashboard: "لوحة التحكم",
    account: "الحساب",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    
    // User types
    buyer: "مشتري",
    seller: "بائع",
    
    // Dashboard specific
    manageStore: "أدر متجرك وتتبع مبيعاتك",
    yourProducts: "منتجاتك",
    recentOrders: "الطلبات الحديثة",
    orderHistory: "تاريخ الطلبات",
    myOrders: "طلباتي",
    browseProducts: "تصفح المنتجات",
    featuredProducts: "المنتجات المميزة",
    totalProducts: "إجمالي المنتجات",
    activeListings: "القوائم النشطة",
    
    // Product related
    addProduct: "إضافة منتج",
    category: "الفئة",
    stock: "المخزون",
    product: "المنتج",
    price: "السعر",
    total: "الإجمالي",
    buyNow: "اشتري الآن",
    
    // Order related
    order: "الطلب",
    customer: "العميل",
    date: "التاريخ",
    orderDate: "تاريخ الطلب",
    deliveredOn: "تم التسليم في",
    estimatedDelivery: "التسليم المتوقع",
    
    // Status
    awaitingconfirmation: "في انتظار التأكيد",
    pendingshipment: "في انتظار الشحن",
    shipped: "تم الشحن",
    delivered: "تم التسليم",
    intransit: "في الطريق",
    active: "نشط",
    lowstock: "مخزون منخفض",
    outofstock: "نفد المخزون",
    
    // Balance
    pendingBalance: "الرصيد المعلق",
    availableBalance: "الرصيد المتاح",
    flexyBalance: "رصيد فليكسي",
    awaitingDeliveryConfirmation: "في انتظار تأكيد التسليم",
    readyForWithdrawal: "جاهز للسحب",
    withdraw: "سحب",
    
    // Categories
    electronics: "الإلكترونيات",
    fashion: "الأزياء",
    homeGarden: "المنزل والحديقة",
    sports: "الرياضة",
    beauty: "الجمال",
    
    // Home page
    platformDescription: "منصة التجارة الإلكترونية الرائدة في الجزائر مدعومة بمدفوعات فليكسي",
    browse: "تصفح",
    herophrase: "لا يلزم التسجيل لتصفح المنتجات",
    flexybalancephrase: "تسوق برصيد فليكسي للمعاملات الفورية والآمنة",
    listmanage: "أدرج وأدر منتجاتك للوصول إلى العملاء في جميع أنحاء الجزائر",
    joinFlisha: "انضم إلى فليشا اليوم",
    chooseAccountType: "اختر نوع حسابك وابدأ رحلتك",
    browseThousandsProducts: "تصفح آلاف المنتجات",
    secureFlexPayments: "مدفوعات فليكسي آمنة",
    fastDelivery: "توصيل سريع في جميع أنحاء البلاد",
    reachThousandsBuyers: "اوصل إلى آلاف المشترين",
    easyStoreManagement: "إدارة متجر سهلة",
    instantPayments: "مدفوعات فورية",
    startShopping: "ابدأ التسوق",
    startSelling: "ابدأ البيع",
    
    // Shopping
    insufficientBalance: "رصيد غير كافي",
    
    // Footer & Navigation
    home: "الرئيسية",
    aboutUs: "معلومات عنا",
    contactUs: "اتصل بنا",
    dispute: "نزاع",
    termsConditions: "الشروط والأحكام",
    
    // Recently viewed
    recentlyViewed: "المشاهدة مؤخراً",
    noRecentlyViewed: "لا توجد منتجات مشاهدة مؤخراً",
    
    // Various
    popularProducts: "المنتجات الشائعة",
    featuredCategories: "الفئات المميزة",
    whyShopWithUs: "لماذا تتسوق معنا",
    fastShipping: "الشحن السريع",
    securePayment: "الدفع الآمن",
    supportTeam: "الدعم على مدار الساعة",
    moneyBack: "ضمان استرداد الأموال",
    flashSale: "تخفيضات سريعة",
    trustedSeller: "بائع موثوق"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

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
