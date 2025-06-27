import React from 'react';
import { Heart, ShoppingCart, X, Star } from 'lucide-react';
import { useWishlist, useCart, useNotification } from '../../context';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addNotification } = useNotification();

  const handleAddToCart = (product) => {
    addToCart(product);
    addNotification(`${product.name} added to cart!`, 'success');
  };

  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product);
    addNotification(`${product.name} removed from wishlist`, 'info');
  };

  const handleClearWishlist = () => {
    clearWishlist();
    addNotification('Wishlist cleared', 'info');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-6 rounded-full">
                <Heart size={80} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Your Wishlist is Empty
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start building your wishlist by browsing our collection and clicking the heart icon 
              on products you love. Your saved items will appear here.
            </p>
            <button
              onClick={() => window.location.href = '/catalog'}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              My Wishlist
            </h1>
            <p className="text-gray-600">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          {wishlist.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={handleClearWishlist}
                className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition-all duration-300"
              >
                <X size={18} />
                Clear All
              </button>
              <button
                onClick={() => {
                  wishlist.forEach(product => addToCart(product));
                  addNotification('All wishlist items added to cart!', 'success');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <ShoppingCart size={18} />
                Add All to Cart
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <div
              key={product.id}
              className="relative animate-fade-in-up bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => handleRemoveFromWishlist(product)}
                className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <X size={16} />
              </button>

              <div className="relative">
                <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              
              <div className="p-5">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                
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
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-red-600">₨{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">₨{product.originalPrice}</span>
                  )}
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage; 