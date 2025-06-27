import React from 'react';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context';

const CartSlideout = () => {
  const { cart, updateQuantity, removeFromCart, getTotal, isCartOpen, setIsCartOpen } = useCart();
  
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-slide-in-right">
        <div className="sticky top-0 bg-white p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={80} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600 mb-6">Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="font-bold text-red-600 mt-1">₨{item.price}</p>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <span className="font-semibold">₨{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-6">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₨{getTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold">₨150</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-red-600">₨{getTotal() + 150}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 mb-4">
                  Checkout
                </button>
                
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-gray-600 hover:text-gray-800 transition-colors"
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

export default CartSlideout; 