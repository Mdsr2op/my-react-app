import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, MapPin, Phone, Mail, Star, Package, Truck, Clock, ChevronRight, Heart, User, Plus, Minus, Filter, ChevronDown, Home, Book, Palette, Pencil, Gamepad2, School, CreditCard, ArrowLeft, Check, AlertCircle, Moon, Sun, Zap, TrendingUp, Award, Shield, Eye, ShoppingBag, Gift, Bell, ArrowRight, Sparkles, BookOpen, Users, Target, Briefcase, GraduationCap, Activity, BarChart, CheckCircle, XCircle, Info, ChevronUp, Share2 } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Notification Context
const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };
  
  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Cart Context
const CartContext = createContext();
const AuthContext = createContext();
const WishlistContext = createContext();

// Enhanced Cart Provider
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addNotification } = useContext(NotificationContext);

  const addToCart = (item, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        addNotification(`Updated ${item.name} quantity in cart`);
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      addNotification(`Added ${item.name} to cart`);
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    }
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      addNotification(`Removed ${item.name} from cart`, 'info');
    }
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    addNotification('Cart cleared', 'info');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, getTotal, getItemCount, isCartOpen, setIsCartOpen, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Wishlist Provider
const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { addNotification } = useContext(NotificationContext);

  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        addNotification(`Removed ${item.name} from wishlist`, 'info');
        return prev.filter(i => i.id !== item.id);
      }
      addNotification(`Added ${item.name} to wishlist`);
      return [...prev, item];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Auth Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    setUser({ email, name: 'John Doe', avatar: '👤' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Enhanced Sample Data
const categories = [
  { id: 1, name: 'Islamic Books', icon: Book, color: 'from-emerald-400 to-teal-600', count: 1250 },
  { id: 2, name: 'General Books', icon: BookOpen, color: 'from-blue-400 to-indigo-600', count: 3420 },
  { id: 3, name: 'Art & Craft', icon: Palette, color: 'from-purple-400 to-pink-600', count: 890 },
  { id: 4, name: 'Stationery', icon: Pencil, color: 'from-amber-400 to-orange-600', count: 2100 },
  { id: 5, name: 'Toys', icon: Gamepad2, color: 'from-pink-400 to-rose-600', count: 650 },
  { id: 6, name: 'School Bundles', icon: GraduationCap, color: 'from-indigo-400 to-purple-600', count: 45 }
];

const products = [
  { 
    id: 1, 
    name: 'Holy Quran with Translation', 
    price: 1500, 
    originalPrice: 1800,
    category: 'Islamic Books', 
    inStock: true, 
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=300&h=300&fit=crop', 
    featured: true,
    rating: 4.9,
    reviews: 234,
    description: 'Beautiful hardcover edition with Arabic text and English translation',
    badge: 'Best Seller'
  },
  { 
    id: 2, 
    name: 'Oxford Advanced Dictionary', 
    price: 2500, 
    originalPrice: 2999,
    category: 'General Books', 
    inStock: true, 
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop', 
    featured: false,
    rating: 4.7,
    reviews: 189,
    description: 'Comprehensive English dictionary for advanced learners'
  },
  { 
    id: 3, 
    name: 'Professional Watercolor Set', 
    price: 850, 
    originalPrice: 1200,
    category: 'Art & Craft', 
    inStock: true, 
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop', 
    featured: true,
    rating: 4.8,
    reviews: 156,
    description: '24 vibrant colors with premium brushes',
    badge: 'Limited Stock'
  },
  { 
    id: 4, 
    name: 'Premium Leather Notebook', 
    price: 450, 
    originalPrice: 550,
    category: 'Stationery', 
    inStock: false, 
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop', 
    featured: false,
    rating: 4.6,
    reviews: 92,
    description: 'Handcrafted leather cover with premium paper'
  },
  { 
    id: 5, 
    name: 'STEM Building Blocks Set', 
    price: 1200, 
    originalPrice: 1500,
    category: 'Toys', 
    inStock: true, 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', 
    featured: true,
    rating: 4.9,
    reviews: 312,
    description: 'Educational building blocks for creative learning',
    badge: 'Award Winner'
  },
  { 
    id: 6, 
    name: 'Islamic Stories Collection', 
    price: 650, 
    originalPrice: 850,
    category: 'Islamic Books', 
    inStock: true, 
    image: 'https://images.unsplash.com/photo-1584286595398-a59511e0649f?w=300&h=300&fit=crop', 
    featured: false,
    rating: 4.8,
    reviews: 178,
    description: 'Inspiring stories from Islamic history for children'
  },
  { 
    id: 7, 
    name: 'Professional Sketch Pad A3', 
    price: 350, 
    originalPrice: 450,
    category: 'Art & Craft', 
    inStock: true, 
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=300&h=300&fit=crop', 
    featured: false,
    rating: 4.5,
    reviews: 67,
    description: 'Heavy-weight paper perfect for sketching and drawing'
  },
  { 
    id: 8, 
    name: 'Scientific Calculator FX-991', 
    price: 1800, 
    originalPrice: 2200,
    category: 'Stationery', 
    inStock: true, 
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop', 
    featured: true,
    rating: 4.7,
    reviews: 423,
    description: 'Advanced scientific calculator for engineering students',
    badge: 'Top Rated'
  }
];

const schoolBundles = [
  { 
    id: 1, 
    school: 'Roots School System', 
    grades: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'], 
    basePrice: 5500,
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop',
    discount: 15,
    students: 2340
  },
  { 
    id: 2, 
    school: 'Army Public School', 
    grades: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'], 
    basePrice: 6000,
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop',
    discount: 10,
    students: 3120
  },
  { 
    id: 3, 
    school: 'Beaconhouse School', 
    grades: ['Class 1', 'Class 2', 'Class 3', 'Class 4'], 
    basePrice: 6500,
    logo: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=100&h=100&fit=crop',
    discount: 12,
    students: 1890
  }
];

const stores = [
  { 
    id: 1, 
    name: 'Manhattan Branch', 
    address: '123 Broadway, New York, NY 10001', 
    phone: '+1 212 555-0123', 
    hours: '9:00 AM - 9:00 PM',
    services: ['Same Day Delivery', 'Gift Wrapping', 'Book Binding'],
    rating: 4.8
  },
  { 
    id: 2, 
    name: 'Downtown Los Angeles', 
    address: '456 Spring Street, Los Angeles, CA 90013', 
    phone: '+1 213 555-0456', 
    hours: '10:00 AM - 8:00 PM',
    services: ['Express Pickup', 'Student Discount', 'Bulk Orders'],
    rating: 4.7
  },
  { 
    id: 3, 
    name: 'Chicago Loop', 
    address: '789 State Street, Chicago, IL 60601', 
    phone: '+1 312 555-0789', 
    hours: '10:00 AM - 9:00 PM',
    services: ['VIP Lounge', 'Coffee Shop', 'Kids Play Area'],
    rating: 4.9
  }
];

// Toast Notifications Component
const Notifications = () => {
  const { notifications } = useContext(NotificationContext);
  
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`
            animate-slide-in-right bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 
            flex items-center space-x-3 min-w-[300px] border-l-4
            ${notification.type === 'success' ? 'border-green-500' : ''}
            ${notification.type === 'error' ? 'border-red-500' : ''}
            ${notification.type === 'info' ? 'border-blue-500' : ''}
          `}
        >
          {notification.type === 'success' && <CheckCircle className="text-green-500" size={20} />}
          {notification.type === 'error' && <XCircle className="text-red-500" size={20} />}
          {notification.type === 'info' && <Info className="text-blue-500" size={20} />}
          <span className="text-gray-800 dark:text-gray-200">{notification.message}</span>
        </div>
      ))}
    </div>
  );
};

// Enhanced Header Component
const Header = ({ currentPage, setCurrentPage }) => {
  const { getItemCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      fixed w-full top-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg' 
        : 'bg-white dark:bg-gray-900'
      }
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 
              className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer flex items-center"
              onClick={() => setCurrentPage('home')}
            >
              <Sparkles className="mr-2 text-indigo-600" size={28} />
              BookMart
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`font-medium transition-colors hover:text-indigo-600 ${currentPage === 'home' ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('catalog')} 
              className={`font-medium transition-colors hover:text-indigo-600 ${currentPage === 'catalog' ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => setCurrentPage('bundles')} 
              className={`font-medium transition-colors hover:text-indigo-600 ${currentPage === 'bundles' ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'}`}
            >
              School Bundles
            </button>
            <button 
              onClick={() => setCurrentPage('stores')} 
              className={`font-medium transition-colors hover:text-indigo-600 ${currentPage === 'stores' ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Stores
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <button
              onClick={() => setCurrentPage('wishlist')}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <ShoppingCart size={22} />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <span className="text-2xl">{user.avatar}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                </div>
                <button 
                  onClick={logout} 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300
          ${mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'}
        `}>
          <nav className="flex flex-col space-y-3">
            <button 
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentPage('catalog'); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Shop
            </button>
            <button 
              onClick={() => { setCurrentPage('bundles'); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              School Bundles
            </button>
            <button 
              onClick={() => { setCurrentPage('stores'); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Stores
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Enhanced Hero Section
const HeroSection = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Your Next Favorite Book",
      subtitle: "Explore thousands of titles across all genres",
      gradient: "from-purple-600 via-pink-600 to-indigo-600",
      icon: Book
    },
    {
      title: "Back to School Mega Sale",
      subtitle: "Up to 40% off on school bundles",
      gradient: "from-indigo-600 via-blue-600 to-cyan-600",
      icon: GraduationCap
    },
    {
      title: "Premium Art Supplies",
      subtitle: "Unleash your creativity with professional tools",
      gradient: "from-pink-600 via-rose-600 to-orange-600",
      icon: Palette
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden mt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-full animate-float-delay-1"></div>
        <div className="absolute bottom-20 left-32 w-10 h-10 bg-white/10 rounded-full animate-float-delay-2"></div>
        <div className="absolute bottom-40 right-40 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  currentSlide === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 absolute'
                }`}
              >
                <div className="text-8xl mb-4 block flex justify-center">
                  <slide.icon size={80} className="text-white" />
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center max-w-2xl mx-auto shadow-2xl">
            <input
              type="text"
              placeholder="Search for books, stationery, or school bundles..."
              className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white/70 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-white text-indigo-600 p-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 mr-1">
              <Search size={24} />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center space-x-2 animate-fade-in-up">
              <Zap size={20} />
              <span>Same Day Delivery</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center space-x-2 animate-fade-in-up animation-delay-200">
              <Award size={20} />
              <span>Quality Guaranteed</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center space-x-2 animate-fade-in-up animation-delay-400">
              <Shield size={20} />
              <span>Secure Payment</span>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { icon: Book, value: '50,000+', label: 'Books Available', color: 'text-indigo-600' },
    { icon: Users, value: '100,000+', label: 'Happy Customers', color: 'text-purple-600' },
    { icon: Truck, value: '24hr', label: 'Fast Delivery', color: 'text-pink-600' },
    { icon: Award, value: '15+', label: 'Years of Service', color: 'text-orange-600' }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  <Icon size={48} className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Enhanced Category Grid
const CategoryGrid = ({ setCurrentPage }) => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Shop by Category
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">Find exactly what you're looking for</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setCurrentPage('catalog')}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${category.color} h-40 flex flex-col items-center justify-center text-white relative`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <Icon size={40} className="mb-3 group-hover:scale-110 transition-transform duration-500" />
                  <span className="font-bold">{category.name}</span>
                  <span className="text-xs opacity-80 mt-1">{category.count} items</span>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <ArrowRight className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0" size={20} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, showQuickView }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [imageHover, setImageHover] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
      <div className="relative">
        <div 
          className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden"
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${imageHover ? 'scale-110' : ''}`}
          />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-pulse">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
              -{discount}%
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-full shadow-lg transition-all duration-300 ${
              isInWishlist(product.id) 
                ? 'bg-pink-500 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-500 hover:text-white'
            }`}
          >
            <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>
          <button 
            onClick={() => showQuickView(product)}
            className="p-2.5 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
          >
            <Eye size={18} />
          </button>
        </div>
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-2 flex-1">
            {product.name}
          </h4>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{product.category}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₨{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">₨{product.originalPrice}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
            product.inStock
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.inStock ? (
            <span className="flex items-center justify-center">
              <ShoppingBag size={18} className="mr-2" />
              Add to Cart
            </span>
          ) : (
            'Notify Me'
          )}
        </button>
      </div>
    </div>
  );
};

// Quick View Modal
const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">₨{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through ml-3">₨{product.originalPrice}</span>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border dark:border-gray-600 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl transition-all ${
                    isInWishlist(product.id)
                      ? 'bg-pink-500 text-white'
                      : 'border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                </button>
              </div>
              
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  onClose();
                }}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Truck size={18} className="mr-2" />
                  Free delivery on orders above ₨2,000
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Shield size={18} className="mr-2" />
                  100% Genuine Products
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Package size={18} className="mr-2" />
                  Easy 7-day returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Featured Products
const FeaturedProducts = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const featuredProducts = products.filter(p => p.featured);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Featured Products
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Handpicked just for you</p>
          </div>
          <button className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center hover:gap-3 gap-2 transition-all">
            View All <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} showQuickView={setQuickViewProduct} />
            </div>
          ))}
        </div>
      </div>
      
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
};

// Enhanced Catalog Page
const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Shop All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Browse our complete collection</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-28">
              <h3 className="font-bold text-xl mb-6 flex items-center">
                <Filter size={24} className="mr-2" /> Filters
              </h3>
              
              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Categories</h4>
                <div className="space-y-2">
                  {['All', ...categories.map(c => c.name)].map(cat => (
                    <label key={cat} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="mr-3 text-indigo-600"
                      />
                      <span className="group-hover:text-indigo-600 transition-colors">{cat}</span>
                      {cat !== 'All' && (
                        <span className="ml-auto text-sm text-gray-500">
                          {products.filter(p => p.category === cat).length}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>₨{priceRange[0]}</span>
                    <span>₨{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
              
              {/* Availability */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Availability</h4>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-3 text-indigo-600" />
                  <span>In Stock Only</span>
                </label>
              </div>
              
              {/* Clear Filters */}
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange([0, 10000]);
                }}
                className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-indigo-600 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">
                {filteredProducts.length} products found
              </span>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-600 rounded-xl bg-gray-800 text-white outline-none focus:border-indigo-600"
                >
                  <option value="featured" className="bg-gray-800 text-white">Featured</option>
                  <option value="price-low" className="bg-gray-800 text-white">Price: Low to High</option>
                  <option value="price-high" className="bg-gray-800 text-white">Price: High to Low</option>
                  <option value="rating" className="bg-gray-800 text-white">Highest Rated</option>
                </select>
                
                {/* View Mode */}
                <div className="flex items-center border dark:border-gray-600 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : ''} rounded-l-xl`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : ''} rounded-r-xl`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} showQuickView={setQuickViewProduct} />
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <Package size={80} className="mx-auto mb-4 text-gray-300" />
                <p className="text-xl text-gray-600 dark:text-gray-400">No products found</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 10000]);
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};

// Enhanced Cart Slide-out
const CartSlideout = () => {
  const { cart, updateQuantity, removeFromCart, getTotal, isCartOpen, setIsCartOpen } = useContext(CartContext);
  
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 h-full overflow-y-auto shadow-2xl animate-slide-in-right">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={80} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-white dark:bg-gray-600 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                        <p className="font-bold text-indigo-600 dark:text-indigo-400 mt-1">₨{item.price}</p>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <span className="font-semibold">₨{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t dark:border-gray-700 pt-6">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold">₨{getTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                    <span className="font-semibold">₨150</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t dark:border-gray-700">
                    <span>Total</span>
                    <span className="text-indigo-600 dark:text-indigo-400">₨{getTotal() + 150}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-bold mb-3">
                  Checkout
                </button>
                
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced School Bundles Page
const SchoolBundlesPage = () => {
  const { addToCart } = useContext(CartContext);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [customizing, setCustomizing] = useState(false);

  const handleAddBundle = () => {
    if (selectedSchool && selectedGrade) {
      const bundle = {
        id: `bundle-${selectedSchool.id}-${selectedGrade}`,
        name: `${selectedSchool.school} - ${selectedGrade} Bundle`,
        price: selectedSchool.basePrice * (1 - selectedSchool.discount / 100),
        originalPrice: selectedSchool.basePrice,
        category: 'School Bundle',
        image: '📚',
        inStock: true
      };
      addToCart(bundle);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            School Book Bundles
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete book sets for every school and grade
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
            <School size={48} className="mx-auto mb-3 text-indigo-600" />
            <h3 className="text-3xl font-bold mb-2">50+</h3>
            <p className="text-gray-600 dark:text-gray-400">Partner Schools</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
            <Users size={48} className="mx-auto mb-3 text-purple-600" />
            <h3 className="text-3xl font-bold mb-2">10,000+</h3>
            <p className="text-gray-600 dark:text-gray-400">Happy Students</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
            <TrendingUp size={48} className="mx-auto mb-3 text-pink-600" />
            <h3 className="text-3xl font-bold mb-2">30%</h3>
            <p className="text-gray-600 dark:text-gray-400">Average Savings</p>
          </div>
        </div>

        {/* Bundle Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8">Select Your School & Grade</h2>
          
          {/* School Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4">Choose Your School</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {schoolBundles.map((school) => (
                <button
                  key={school.id}
                  onClick={() => {
                    setSelectedSchool(school);
                    setSelectedGrade(null);
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedSchool?.id === school.id
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="w-16 h-16 mb-4 mx-auto rounded-full overflow-hidden">
                    <img 
                      src={school.logo} 
                      alt={school.school}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{school.school}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>{school.students}+ students</p>
                    <p className="text-green-600 font-semibold">{school.discount}% discount</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Grade Selection */}
          {selectedSchool && (
            <div className="mb-8 animate-fade-in">
              <label className="block text-sm font-medium mb-4">Select Grade</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {selectedSchool.grades.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedGrade === grade
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Bundle Summary */}
          {selectedSchool && selectedGrade && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl p-8 animate-fade-in">
              <h3 className="font-bold text-2xl mb-6">Bundle Summary</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">School</span>
                    <span className="font-semibold">{selectedSchool.school}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Grade</span>
                    <span className="font-semibold">{selectedGrade}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Includes</span>
                    <span className="font-semibold">All Required Books</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-600 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Original Price</span>
                      <span className="line-through text-gray-500">₨{selectedSchool.basePrice}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Discount</span>
                      <span className="text-green-600 font-semibold">-{selectedSchool.discount}%</span>
                    </div>
                    <div className="flex items-center justify-between text-2xl font-bold pt-4 border-t dark:border-gray-500">
                      <span>Total</span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        ₨{Math.round(selectedSchool.basePrice * (1 - selectedSchool.discount / 100))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddBundle}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-bold"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setCustomizing(true)}
                      className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-bold"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <CheckCircle className="mx-auto mb-2 text-green-600" size={24} />
                  <p className="text-sm">Quality Guaranteed</p>
                </div>
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-blue-600" size={24} />
                  <p className="text-sm">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-purple-600" size={24} />
                  <p className="text-sm">Easy Returns</p>
                </div>
                <div className="text-center">
                  <Gift className="mx-auto mb-2 text-pink-600" size={24} />
                  <p className="text-sm">Bonus Stationery</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: School, title: 'Select School', desc: 'Choose your school from our partner list' },
              { icon: GraduationCap, title: 'Pick Grade', desc: 'Select your grade level' },
              { icon: Package, title: 'Review Bundle', desc: 'Check included books and price' },
              { icon: Truck, title: 'Get Delivery', desc: 'Receive at your doorstep' }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Store Locator Page
const StoreLocatorPage = () => {
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Visit Our Stores
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experience our products in person at any of our locations
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Store List */}
          <div className="lg:col-span-1 space-y-4">
            {stores.map((store) => (
              <div
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all ${
                  selectedStore?.id === store.id
                    ? 'shadow-2xl ring-2 ring-indigo-600 transform scale-105'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{store.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{store.address}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Phone size={16} className="mr-2" />
                        {store.phone}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock size={16} className="mr-2" />
                        {store.hours}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < Math.floor(store.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{store.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Services */}
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <p className="text-sm font-semibold mb-2">Available Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {store.services.map((service, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Map & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
              <div className="text-center z-10">
                <MapPin size={64} className="mx-auto mb-4 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400 font-semibold">Interactive Map</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{selectedStore.name}</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="font-bold text-2xl mb-6">Get in Touch</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 bg-gray-800 text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 bg-gray-800 text-white placeholder-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 bg-gray-800 text-white placeholder-gray-400"
                />
                <select className="px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 bg-gray-800 text-white">
                  <option className="bg-gray-800 text-white">Select Store</option>
                  {stores.map(store => (
                    <option key={store.id} value={store.id} className="bg-gray-800 text-white">{store.name}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full mt-6 px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 dark:bg-gray-700"
              />
              <button className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-bold">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wishlist Page
const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20">
        <div className="container mx-auto px-4 text-center">
          <Heart size={80} className="mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Save items you love for later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          My Wishlist ({wishlist.length} items)
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} showQuickView={setQuickViewProduct} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => {
              wishlist.forEach(item => addToCart(item));
              wishlist.forEach(item => toggleWishlist(item));
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-bold"
          >
            Add All to Cart
          </button>
        </div>
      </div>
      
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};

// Enhanced Login Page
const LoginPage = ({ setCurrentPage }) => {
  const { login } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      login('demo@example.com', 'password');
      setCurrentPage('home');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
              <Sparkles className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isSignUp ? 'Join our community of book lovers' : 'Sign in to continue shopping'}
            </p>
          </div>
          
          <div className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 dark:bg-gray-700 transition-all"
              />
            )}
            
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 dark:bg-gray-700 transition-all"
            />
            
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 dark:bg-gray-700 transition-all"
            />
            
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-600 dark:bg-gray-700 transition-all"
              />
            )}
            
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </a>
              </div>
            )}
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-bold flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>{isSignUp ? 'Create Account' : 'Sign In'}</>
              )}
            </button>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-2 border dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-2 border dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
          
          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-indigo-600 hover:text-indigo-700 ml-1 font-bold"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { addNotification } = useContext(NotificationContext);

  const handleSubscribe = () => {
    if (email) {
      addNotification('Successfully subscribed to newsletter!');
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Bell size={48} className="mx-auto mb-6 text-white animate-bounce" />
          <h3 className="text-4xl font-black text-white mb-4">Stay Updated</h3>
          <p className="text-xl text-white/90 mb-8">
            Get exclusive offers and new arrival alerts straight to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl outline-none text-gray-800"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Subscribe
            </button>
          </div>
          
          <p className="text-white/70 text-sm mt-4">
            Join 50,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer
const Footer = () => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Sparkles className="mr-2 text-indigo-400" size={32} />
              <h3 className="text-3xl font-black">BookMart</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner for all educational needs. Quality books, stationery, and school supplies delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  {social === 'facebook' && 'f'}
                  {social === 'twitter' && 't'}
                  {social === 'instagram' && 'i'}
                  {social === 'youtube' && 'y'}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'FAQs', 'Track Order', 'Returns'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <ChevronRight size={16} className="mr-1 transform group-hover:translate-x-1 transition-transform" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <ChevronRight size={16} className="mr-1 transform group-hover:translate-x-1 transition-transform" />
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone size={20} className="mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Hotline</p>
                  <p className="font-semibold">+1 800 BOOKMART</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail size={20} className="mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold">info@bookmart.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Locations</p>
                  <p className="font-semibold">3 Stores in NY, LA & Chicago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-gray-400">We Accept:</span>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded px-3 py-1 text-blue-600 font-bold">VISA</div>
              <div className="bg-white rounded px-3 py-1 text-red-600 font-bold">MasterCard</div>
              <div className="bg-blue-600 rounded px-3 py-1 text-white font-bold">PayPal</div>
              <div className="bg-green-600 rounded px-3 py-1 text-white font-bold">Apple Pay</div>
              <div className="bg-purple-600 rounded px-3 py-1 text-white font-bold">Stripe</div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
            &copy; 2025 BookMart. All rights reserved. Made with ❤️ in USA
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'catalog':
        return <CatalogPage />;
      case 'cart':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20">
            <div className="container mx-auto px-4 text-center">
              <ShoppingCart size={80} className="mx-auto mb-6 text-gray-300" />
              <h2 className="text-3xl font-bold mb-4">View Cart in Sidebar</h2>
              <p className="text-gray-600 dark:text-gray-400">Click the cart icon in the header to view your cart</p>
            </div>
          </div>
        );
      case 'bundles':
        return <SchoolBundlesPage />;
      case 'stores':
        return <StoreLocatorPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      default:
        return (
          <>
            <HeroSection setCurrentPage={setCurrentPage} />
            <StatsSection />
            <CategoryGrid setCurrentPage={setCurrentPage} />
            <FeaturedProducts />
            <NewsletterSection />
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div className={`min-h-screen transition-colors duration-300 bg-gray-900 text-white`}>
                <style jsx global>{`
                  @keyframes fade-in-up {
                    from {
                      opacity: 0;
                      transform: translateY(20px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  @keyframes slide-in-right {
                    from {
                      transform: translateX(100%);
                    }
                    to {
                      transform: translateX(0);
                    }
                  }
                  
                  @keyframes scale-in {
                    from {
                      transform: scale(0);
                    }
                    to {
                      transform: scale(1);
                    }
                  }
                  
                  @keyframes float {
                    0%, 100% {
                      transform: translateY(0) rotate(0deg);
                    }
                    33% {
                      transform: translateY(-20px) rotate(5deg);
                    }
                    66% {
                      transform: translateY(-10px) rotate(-5deg);
                    }
                  }
                  
                  .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                  }
                  
                  .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                  }
                  
                  .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                  }
                  
                  .animate-float {
                    animation: float 6s ease-in-out infinite;
                  }
                  
                  .animate-float-delay-1 {
                    animation: float 6s ease-in-out infinite;
                    animation-delay: 2s;
                  }
                  
                  .animate-float-delay-2 {
                    animation: float 6s ease-in-out infinite;
                    animation-delay: 4s;
                  }
                  
                  .animate-fade-in {
                    animation: fade-in-up 0.6s ease-out;
                  }
                  
                  .animation-delay-200 {
                    animation-delay: 200ms;
                  }
                  
                  .animation-delay-400 {
                    animation-delay: 400ms;
                  }
                  
                  /* Custom Scrollbar */
                  ::-webkit-scrollbar {
                    width: 10px;
                  }
                  
                  ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                  }
                  
                  ::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 5px;
                  }
                  
                  ::-webkit-scrollbar-thumb:hover {
                    background: #555;
                  }
                  
                  /* Dark mode scrollbar */
                  .dark ::-webkit-scrollbar-track {
                    background: #1f2937;
                  }
                  
                  .dark ::-webkit-scrollbar-thumb {
                    background: #4b5563;
                  }
                  
                  .dark ::-webkit-scrollbar-thumb:hover {
                    background: #6b7280;
                  }
                `}</style>
                <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Notifications />
                {renderPage()}
                <Footer />
                <CartSlideout />
              </div>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;