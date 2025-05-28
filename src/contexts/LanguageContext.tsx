
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
    herophrase: 'استكشف آلاف المنتجات من البائعين المحليين',
     listmanage: 'أضف منتجاتك وادِر متجرك',
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
    Settings:'الاعدادات',
    
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
    
    // Checkout & Forms
    checkout: 'إتمام الشراء',
    address: 'العنوان',
    wilaya: 'الولاية',
    name: 'الاسم',
    confirmOrder: 'تأكيد الطلب',
    
    // Footer
    quickLinks: 'روابط سريعة',
    termsConditions: 'الشروط والأحكام',
    privacyPolicy: 'سياسة الخصوصية',
    socialMedia: 'وسائل التواصل الاجتماعي',
    newsletter: 'النشرة الإخبارية',
    subscribeNewsletter: 'اشترك في النشرة',
    
    // Dispute
    openDispute: 'فتح نزاع',
    disputeReason: 'سبب النزاع',
    orderNotDelivered: 'لم يتم تسليم الطلب',
    productDamaged: 'المنتج تالف',
    notAsDescribed: 'لا يطابق الوصف',
    wrongItem: 'منتج خاطئ',
    qualityIssue: 'مشكلة في الجودة',
    other: 'أخرى',
    
    // Error messages
    insufficientBalance: 'رصيد غير كافي',
    loginRequired: 'يجب تسجيل الدخول',
    errorOccurred: 'حدث خطأ',
    
    // Success messages
    purchaseSuccessful: 'تم الشراء بنجاح',
    messageSent: 'تم إرسال الرسالة',
    productAdded: 'تم إضافة المنتج',
    orderConfirmed: 'تم تأكيد الطلب',

    flexybalancephrase: 'تصفح واشترِ المنتجات باستخدام رصيدك في فليكسي',
    flexyOnly: "الدفع عبر فليكسي فقط",
    flexyDescription: "ادفع باستخدام رصيد هاتفك المحمول بأمان",
    multilingual: "متعدد اللغات",
    languagesAvailable: "متوفر باللغات العربية والفرنسية والإنجليزية",
    secureTransactions: "معاملات آمنة",
    secureDescription: "معالجة دفع آمنة وموثوقة",
    discoverShopFlexy: "اكتشف منتجات رائعة وتسوق باستخدام رصيد فليكسي الخاص بك",
    welcomeBack: "مرحبًا بعودتك",
    discoverLocalProducts: "اكتشف منتجات رائعة من البائعين المحليين",
    aboutTitle: "حول فليشـا",
aboutIntro: "نُحدث ثورة في التجارة الإلكترونية في الجزائر من خلال تمكين الشراء عبر رصيد الهاتف",

ourMissionTitle: "مهمتنا",
ourMissionText: "نهدف إلى دمقرطة التجارة الإلكترونية من خلال جعل التسوق عبر الإنترنت متاحًا للجميع في الجزائر، بغض النظر عن وجود حساب بنكي، وذلك عبر حلول مبتكرة للدفع برصيد الهاتف.",

ourVisionTitle: "رؤيتنا",
ourVisionText: "أن نصبح السوق الرائد في الجزائر عبر الهواتف المحمولة، مع تمكين الأعمال المحلية وخلق فرص للجميع للمشاركة في الاقتصاد الرقمي.",

howItWorksTitle: "كيف تعمل فليشـا؟",
step1Title: "تصفح وتسوق",
step1Text: "استكشف آلاف المنتجات من بائعين محليين موثوقين في جميع أنحاء الجزائر",
step2Title: "ادفع برصيد فليكسي",
step2Text: "استخدم رصيد هاتفك لشراء المنتجات - دون الحاجة إلى بطاقة بنكية",
step3Title: "توصيل آمن",
step3Text: "استلم طلبك وأكد التوصيل لتحويل الدفع للبائع",

whyChooseTitle: "لماذا تختار فليشـا؟",

trustTitle: "نُبنى على الثقة",
trustText: "فليشـا مصممة لحماية المشتري والبائع على حد سواء. نظام الضمان الخاص بنا يضمن أن المدفوعات آمنة، وآلية حل النزاعات تحمي جميع الأطراف. نتحقق من جميع البائعين ونراقب المعاملات لضمان سوق آمن للجميع.",
getInTouch: "اتصل بنا",
contactTitle: "اتصل بنا",
contactIntro: "تواصل مع فريقنا. نحن هنا لمساعدتك!",

namePlaceholder: "أدخل اسمك الكامل",

emailPlaceholder: "أدخل بريدك الإلكتروني",
phone: "رقم الهاتف",
phonePlaceholder: "أدخل رقم هاتفك",

messagePlaceholder: "كيف يمكننا مساعدتك؟",
sendButton: "إرسال الرسالة",

businessHours: "ساعات العمل",
mondayFriday: "الإثنين - الجمعة",
saturday: "السبت",
sunday: "الأحد",
closed: "مغلق",




  },
  fr: {
    // Navigation
    herophrase: 'Découvrez des milliers de produits auprès de vendeurs locaux',
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
    Settings:'Settings',
    
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
    
    // Checkout & Forms
    checkout: 'Finaliser la commande',
    address: 'Adresse',
    wilaya: 'Wilaya',
    name: 'Nom',
    confirmOrder: 'Confirmer la commande',
    
    // Footer
    quickLinks: 'Liens rapides',
    termsConditions: 'Conditions générales',
    privacyPolicy: 'Politique de confidentialité',
    socialMedia: 'Réseaux sociaux',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'S\'abonner à la newsletter',
    
    // Dispute
    openDispute: 'Ouvrir un litige',
    disputeReason: 'Raison du litige',
    orderNotDelivered: 'Commande non livrée',
    productDamaged: 'Produit endommagé',
    notAsDescribed: 'Non conforme à la description',
    wrongItem: 'Mauvais article',
    qualityIssue: 'Problème de qualité',
    other: 'Autre',
    
    // Error messages
    insufficientBalance: 'Solde insuffisant',
    loginRequired: 'Connexion requise',
    errorOccurred: 'Une erreur s\'est produite',
    
    // Success messages
    purchaseSuccessful: 'Achat réussi',
    messageSent: 'Message envoyé',
    productAdded: 'Produit ajouté',
    orderConfirmed: 'Commande confirmée',

     listmanage: 'Ajoutez vos produits et gérez votre boutique',
     flexybalancephrase: 'Parcourez et achetez des produits en utilisant votre solde Flexy',
     flexyOnly: "Paiements uniquement via Flexy",
     flexyDescription: "Payez en toute sécurité avec votre crédit mobile",
     multilingual: "Multilingue",
     languagesAvailable: "Disponible en arabe, français et anglais",
     secureTransactions: "Transactions sécurisées",
     secureDescription: "Traitement de paiement sûr et fiable",
     discoverShopFlexy: "Découvrez des produits incroyables et achetez avec votre solde Flexy",
      welcomeBack: "Bon retour",
      discoverLocalProducts: "Découvrez des produits incroyables de vendeurs locaux",
      aboutTitle: "À propos de FLISHA",
aboutIntro: "Révolutionner le e-commerce en Algérie en permettant les achats avec le crédit mobile",

ourMissionTitle: "Notre mission",
ourMissionText: "Démocratiser le commerce en ligne en le rendant accessible à tous en Algérie, quel que soit le statut bancaire, grâce à des solutions innovantes de paiement via crédit mobile.",

ourVisionTitle: "Notre vision",
ourVisionText: "Devenir la première marketplace mobile-first en Algérie, en soutenant les entreprises locales et en créant des opportunités pour tous de participer à l’économie numérique.",

howItWorksTitle: "Comment fonctionne FLISHA",
step1Title: "Parcourez et achetez",
step1Text: "Explorez des milliers de produits auprès de vendeurs locaux vérifiés à travers l’Algérie",
step2Title: "Payez avec Flexy",
step2Text: "Utilisez votre solde de crédit mobile pour acheter - sans carte bancaire",
step3Title: "Livraison sécurisée",
step3Text: "Recevez vos articles et confirmez la livraison pour libérer le paiement au vendeur",

whyChooseTitle: "Pourquoi choisir FLISHA ?",

trustTitle: "Basé sur la confiance",
trustText: "FLISHA est conçue avec la protection des acheteurs et des vendeurs au cœur de son fonctionnement. Notre système d’escrow garantit des paiements sécurisés, et notre processus de résolution des litiges protège les deux parties. Tous les vendeurs sont vérifiés et les transactions sont surveillées pour assurer un marché sûr.",
getInTouch: "Contactez-nous",
contactTitle: "Contactez-nous",
contactIntro: "Contactez notre équipe. Nous sommes là pour vous aider !",
namePlaceholder: "Entrez votre nom complet",
emailPlaceholder: "Entrez votre adresse email",
phone: "Numéro de téléphone",
phonePlaceholder: "Entrez votre numéro de téléphone",

messagePlaceholder: "Comment pouvons-nous vous aider ?",
sendButton: "Envoyer le message",

businessHours: "Horaires d'ouverture",
mondayFriday: "Lundi - Vendredi",
saturday: "Samedi",
sunday: "Dimanche",
closed: "Fermé",




  },
  en: {
    // Navigation
    herophrase: 'Explore thousands of products from local sellers',
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
    Settings:'Settings',
    
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
    
    // Checkout & Forms
    checkout: 'Checkout',
    address: 'Address',
    wilaya: 'Wilaya',
    name: 'Name',
    confirmOrder: 'Confirm Order',
    
    // Footer
    quickLinks: 'Quick Links',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    socialMedia: 'Social Media',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Subscribe to Newsletter',
    
    // Dispute
    openDispute: 'Open Dispute',
    disputeReason: 'Dispute Reason',
    orderNotDelivered: 'Order not delivered',
    productDamaged: 'Product damaged',
    notAsDescribed: 'Not as described',
    wrongItem: 'Wrong item',
    qualityIssue: 'Quality issue',
    other: 'Other',
    
    // Error messages
    insufficientBalance: 'Insufficient Balance',
    loginRequired: 'Login Required',
    errorOccurred: 'An error occurred',
    
    // Success messages
    purchaseSuccessful: 'Purchase Successful',
    messageSent: 'Message Sent',
    productAdded: 'Product Added',
    orderConfirmed: 'Order Confirmed',

      listmanage: 'List your products and manage your store',
       flexybalancephrase: 'Browse and purchase products using your Flexy balance',
       flexyOnly: "Flexy Payments Only",
       flexyDescription: "Pay using your mobile credit balance securely",
       multilingual: "Multilingual",
       languagesAvailable: "Available in Arabic, French, and English",
       secureTransactions: "Secure Transactions",
       secureDescription: "Safe and reliable payment processing",

       discoverShopFlexy: "Discover amazing products and shop with your Flexy balance",
       welcomeBack: "Welcome back",
       discoverLocalProducts: "Discover amazing products from local sellers",

       aboutTitle: "About FLISHA",
       aboutIntro: "Revolutionizing e-commerce in Algeria by enabling purchases with mobile credit",
     
       ourMissionTitle: "Our Mission",
       ourMissionText: "To democratize e-commerce by making online shopping accessible to everyone in Algeria, regardless of banking status, through innovative mobile credit payment solutions.",
     
       ourVisionTitle: "Our Vision",
       ourVisionText: "To become Algeria's leading mobile-first marketplace, empowering local businesses and creating opportunities for everyone to participate in the digital economy.",
     
       howItWorksTitle: "How FLISHA Works",
       step1Title: "Browse & Shop",
       step1Text: "Explore thousands of products from verified local sellers across Algeria",
       step2Title: "Pay with Flexy",
       step2Text: "Use your mobile credit balance to purchase items - no bank card needed",
       step3Title: "Secure Delivery",
       step3Text: "Receive your items and confirm delivery to release payment to the seller",
     
       whyChooseTitle: "Why Choose FLISHA?",
     
       trustTitle: "Built on Trust",
       trustText: "FLISHA is designed with buyer and seller protection at its core. Our escrow system ensures that payments are secure, and our dispute resolution process protects both parties. We verify all sellers and monitor transactions to maintain a safe marketplace for everyone.",
       getInTouch: "Get in Touch",
       contactTitle: "Contact Us",
       contactIntro: "Get in touch with our team. We're here to help!",
      
       namePlaceholder: "Enter your full name",
      
       emailPlaceholder: "Enter your email address",
       phone: "Phone Number",
       phonePlaceholder: "Enter your phone number",
    
       messagePlaceholder: "How can we help you?",
       sendButton: "Send Message",
       businessHours: "Business Hours",
       mondayFriday: "Monday - Friday",
       saturday: "Saturday",
       sunday: "Sunday",
       closed: "Closed",

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
