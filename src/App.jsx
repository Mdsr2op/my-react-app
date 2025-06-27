import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  ThemeProvider, 
  NotificationProvider, 
  AuthProvider, 
  WishlistProvider, 
  CartProvider 
} from './context';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Notifications from './components/ui/Notifications';
import CartSlideout from './components/ui/CartSlideout';
import HomePage from './pages/home/HomePage';
import CatalogPage from './pages/catalog/CatalogPage';
import BundlesPage from './pages/bundles/BundlesPage';
import StoresPage from './pages/stores/StoresPage';
import WishlistPage from './pages/wishlist/WishlistPage';
import LoginPage from './pages/auth/LoginPage';

// Simple Cart Page component
const CartPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-28 pb-20">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">View Cart in Sidebar</h2>
      <p className="text-gray-600">Click the cart icon in the header to view your cart</p>
    </div>
  </div>
);


const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="min-h-screen transition-colors duration-300 bg-white text-gray-900">
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
                `}</style>
                
                <Header />
                <Notifications />
                
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/bundles" element={<BundlesPage />} />
                  <Route path="/stores" element={<StoresPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/cart" element={<CartPage />} />
                </Routes>
                
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