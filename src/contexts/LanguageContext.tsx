import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    trustedSeller: "Trusted Seller",
     // Navigation

     shop: 'Shop',

     about: 'About',
     contact: 'Contact',

     selectLanguage: 'Select Language',
     
     // Authentication
 
     register: 'Register',
  
     phoneNumber: 'Phone Number',
     otpCode: 'OTP Code',
     enterPhone: 'Enter your phone number',
     enterOTP: 'Enter the OTP code sent to you',
     sendOTP: 'Send OTP',
     verify: 'Verify',
     
     // Product & Shopping

     addToCart: 'Add to Cart',
     categories: 'Categories',
     bestSellers: 'Best Sellers',
     newest: 'Newest',
     relatedProducts: 'Related Products',
     productDescription: 'Product Description',
     inStock: 'In Stock',
     outOfStock: 'Out of Stock',
     quantity: 'Quantity',
     
     // Seller dashboard
     productName: 'Product Name',
     description: 'Description',
     uploadImages: 'Upload Images',


     Settings:'Settings',
     
     // Contact & About
   
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
     
     // Checkout & Forms
     checkout: 'Checkout',
     address: 'Address',
     wilaya: 'Wilaya',
     name: 'Name',
     confirmOrder: 'Confirm Order',
     
     // Footer
     quickLinks: 'Quick Links',
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
     whatHappensNext: "What happens next?",
  reviewWithin24Hours: "Our team will review your dispute within 24 hours",
  emailConfirmation: "You'll receive an email confirmation with your dispute ID",
  mayContactForInfo: "We may contact you or the seller for additional information",
  resolution2to5Days: "Resolution typically takes 2–5 business days",
  submitDispute: "Submit Dispute",
     
     // Error messages
     loginRequired: 'Login Required',
     errorOccurred: 'An error occurred',
     
     // Success messages
     purchaseSuccessful: 'Purchase Successful',
     messageSent: 'Message Sent',
     productAdded: 'Product Added',
     orderConfirmed: 'Order Confirmed',
 
    
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
    trustedSeller: "Vendeur de Confiance",



     shop: 'Boutique',

     about: 'À propos',
     contact: 'Contact',
 
     
     // Platform basics
   
     selectLanguage: 'Choisir la langue',
     
     // Authentication
    
     register: 'S\'inscrire',

     phoneNumber: 'Numéro de téléphone',
     otpCode: 'Code OTP',
     enterPhone: 'Entrez votre numéro de téléphone',
     enterOTP: 'Entrez le code OTP envoyé',
     sendOTP: 'Envoyer le code OTP',
     verify: 'Vérifier',
     
     // Product & Shopping
   
     addToCart: 'Ajouter au panier',
   
     categories: 'Catégories',
     bestSellers: 'Meilleures ventes',
     newest: 'Nouveautés',
     relatedProducts: 'Produits connexes',
     productDescription: 'Description du produit',
     inStock: 'En stock',
     outOfStock: 'Rupture de stock',
     quantity: 'Quantité',
     
     // Seller dashboard
 
     productName: 'Nom du produit',
     description: 'Description',

     uploadImages: 'Télécharger des images',
     
     // Wallet & Balance

     Settings:'Settings',
     
     // Contact & About
 
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

     
     // Checkout & Forms
     checkout: 'Finaliser la commande',
     address: 'Adresse',
     wilaya: 'Wilaya',
     name: 'Nom',
     confirmOrder: 'Confirmer la commande',
     
     // Footer
     quickLinks: 'Liens rapides',
  
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

     whatHappensNext: "Que se passe-t-il ensuite ?",
     reviewWithin24Hours: "Notre équipe examinera votre litige dans les 24 heures",
     emailConfirmation: "Vous recevrez une confirmation par e-mail avec votre identifiant de litige",
     mayContactForInfo: "Nous pourrions vous contacter, vous ou le vendeur, pour plus d'informations",
     resolution2to5Days: "La résolution prend généralement de 2 à 5 jours ouvrables",
     submitDispute: "Soumettre un litige",
     
     // Error messages
  
     loginRequired: 'Connexion requise',
     errorOccurred: 'Une erreur s\'est produite',
     
     // Success messages
     purchaseSuccessful: 'Achat réussi',
     messageSent: 'Message envoyé',
     productAdded: 'Produit ajouté',
     orderConfirmed: 'Commande confirmée',
 
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
    trustedSeller: "بائع موثوق",

     // Navigation

    shop: 'التسوق',
    about: 'من نحن',
    contact: 'اتصل بنا',

    
    // Platform basics
  selectLanguage: 'اختر اللغة',
    
    // Authentication
    register: 'إنشاء حساب',
 
    phoneNumber: 'رقم الهاتف',
    otpCode: 'رمز التحقق',
    enterPhone: 'أدخل رقم هاتفك',
    enterOTP: 'أدخل رمز التحقق المرسل إليك',
    sendOTP: 'إرسال رمز التحقق',
    verify: 'التحقق',
    
    // Product & Shopping

    addToCart: 'أضف للسلة',
    categories: 'الفئات',
    bestSellers: 'الأكثر مبيعاً',
    newest: 'الأحدث',
    relatedProducts: 'منتجات ذات صلة',
    productDescription: 'وصف المنتج',
    inStock: 'متوفر في المخزن',
    outOfStock: 'غير متوفر',
    quantity: 'الكمية',
    
    // Seller dashboard
    productName: 'اسم المنتج',
    description: 'الوصف',
    uploadImages: 'رفع الصور',
    
    // Wallet & Balance

    Settings:'الاعدادات',
    
    // Contact & About
 
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
    
    // Checkout & Forms
    checkout: 'إتمام الشراء',
    address: 'العنوان',
    wilaya: 'الولاية',
    name: 'الاسم',
    confirmOrder: 'تأكيد الطلب',
    
    // Footer
    quickLinks: 'روابط سريعة',
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

    whatHappensNext: "ماذا سيحدث بعد ذلك؟",
    reviewWithin24Hours: "سيقوم فريقنا بمراجعة النزاع خلال 24 ساعة",
    emailConfirmation: "ستتلقى تأكيدًا عبر البريد الإلكتروني يحتوي على رقم النزاع الخاص بك",
    mayContactForInfo: "قد نتواصل معك أو مع البائع للحصول على معلومات إضافية",
    resolution2to5Days: "عادةً ما تستغرق عملية الحل من 2 إلى 5 أيام عمل",
    submitDispute: "إرسال النزاع",
    
    // Error messages
    loginRequired: 'يجب تسجيل الدخول',
    errorOccurred: 'حدث خطأ',
    
    // Success messages
    purchaseSuccessful: 'تم الشراء بنجاح',
    messageSent: 'تم إرسال الرسالة',
    productAdded: 'تم إضافة المنتج',
    orderConfirmed: 'تم تأكيد الطلب',

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
