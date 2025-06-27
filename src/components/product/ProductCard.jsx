import React, { useState } from 'react';
import { Heart, Eye, Star, ShoppingBag } from 'lucide-react';
import { useCart, useWishlist } from '../../context';

const ProductCard = ({ product, showQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageHover, setImageHover] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
      <div className="relative">
        <div 
          className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
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
                : 'bg-white text-gray-700 hover:bg-pink-500 hover:text-white'
            }`}
          >
            <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>
          <button 
            onClick={() => showQuickView(product)}
            className="p-2.5 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
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
          <h4 className="font-bold text-lg text-gray-800 line-clamp-2 flex-1">
            {product.name}
          </h4>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{product.category}</p>
        
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
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-black text-red-600">₨{product.price}</span>
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
              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg'
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

export default ProductCard; 