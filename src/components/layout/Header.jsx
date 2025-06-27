import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { useCart, useWishlist, useAuth, useTheme } from '../../context';
import booktimeLogo from '../../assets/booktime-logo-without-BG.jpg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getItemCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`
      fixed w-full top-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-lg' 
        : 'bg-white'
      }
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div 
              className="cursor-pointer flex items-center"
              onClick={() => navigate('/')}
            >
              <img 
                src={booktimeLogo} 
                alt="Booktime Logo" 
                className="h-12 w-auto rounded-lg object-contain shadow-sm"
              />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/')} 
              className={`font-medium transition-colors hover:text-red-500 ${isActive('/') ? 'text-red-500' : 'text-gray-700'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/catalog')} 
              className={`font-medium transition-colors hover:text-red-500 ${isActive('/catalog') ? 'text-red-500' : 'text-gray-700'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => navigate('/bundles')} 
              className={`font-medium transition-colors hover:text-red-500 ${isActive('/bundles') ? 'text-red-500' : 'text-gray-700'}`}
            >
              School Bundles
            </button>
            <button 
              onClick={() => navigate('/stores')} 
              className={`font-medium transition-colors hover:text-red-500 ${isActive('/stores') ? 'text-red-500' : 'text-gray-700'}`}
            >
              Stores
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-all"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <button
              onClick={() => navigate('/wishlist')}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all"
            >
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all"
            >
              <ShoppingCart size={22} />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-xl">
                  <span className="text-2xl">{user.avatar}</span>
                  <span className="font-medium text-gray-700">{user.name}</span>
                </div>
                <button 
                  onClick={logout} 
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-medium"
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
              onClick={() => { navigate('/'); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => { navigate('/catalog'); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Shop
            </button>
            <button 
              onClick={() => { navigate('/bundles'); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              School Bundles
            </button>
            <button 
              onClick={() => { navigate('/stores'); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Stores
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 