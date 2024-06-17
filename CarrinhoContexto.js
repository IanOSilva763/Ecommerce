import React, { createContext, useState } from 'react';

export const CarrinhoContexto = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CarrinhoContexto.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CarrinhoContexto.Provider>
  );
};
