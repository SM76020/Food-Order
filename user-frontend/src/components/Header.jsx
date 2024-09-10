import React, { useRef } from 'react';
import CartModal from './CartModal';
import CheckoutForm from './CheckoutForm';

const Header = ({ cart, onUpdateCartItemQuantity, onClearCart }) => {
  const cartModalRef = useRef();
  const checkoutModalRef = useRef();

  const cartQuantity = cart.items.reduce((count, item) => count + item.quantity, 0);

  const handleOpenCartClick = () => {
    if (cartModalRef.current) {
      cartModalRef.current.open();
    }
  };

  const handleCheckoutClick = () => {
    if (checkoutModalRef.current) {
      checkoutModalRef.current.open();
    }
  };

  let modalActions = (
    <button className='button' onClick={() => document.getElementById('cart-modal').close()}>Close</button>
  );

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className='button' onClick={() => document.getElementById('cart-modal').close()}>Close</button>  
        <button className='button' onClick={handleCheckoutClick}>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={cartModalRef} cartItems={cart.items} onUpdateCartItemQuantity={onUpdateCartItemQuantity} title="Your Cart" actions={modalActions} />
      <CheckoutForm ref={checkoutModalRef} onClearCart={onClearCart} cartItems={cart.items} />

      <div id="main-header">
        <div id="title">
          <img src="logo.jpg" alt="ReactFood Logo" />
          <h1>REACTFOOD</h1>
        </div>
        <button  className="button" onClick={handleOpenCartClick}> Cart ({cartQuantity})</button>
      </div>
    </>
  );
};

export default Header;
