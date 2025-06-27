import React, { createContext, useContext, useState } from 'react';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addNotification } = useNotification();

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
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      getTotal, 
      getItemCount, 
      isCartOpen, 
      setIsCartOpen, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 