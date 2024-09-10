import { useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState({
    items: [],
  });

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const itemExists = prevCart.items.some(cartItem => cartItem.id === item.id);
      if (itemExists) {
        return {
          items: prevCart.items.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          ),
        };
      } else {
        return { items: [...prevCart.items, { ...item, quantity: 1 }] };
      }
    });
  };

  const updateItemQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      return {
        items: prevCart.items.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        ).filter(item => item.quantity > 0),
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  return { cart, addItemToCart, updateItemQuantity, clearCart };
};

export default useCart;
