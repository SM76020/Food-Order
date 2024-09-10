import React from 'react';
import Header from './components/Header';
import FoodList from './components/FoodList';
import useCart from './components/UseCart';

const App = () => {
  const { cart, addItemToCart, updateItemQuantity, clearCart } = useCart();

  return (
    <div>
      <Header cart={cart} onUpdateCartItemQuantity={updateItemQuantity} onClearCart={clearCart} />
      <FoodList onAddToCart={addItemToCart} />
    </div>
  );
};

export default App;
