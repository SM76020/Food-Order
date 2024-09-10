import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';


const CartModal = forwardRef(function CartModal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialogRef = useRef();

  // Expose a method to open the modal using the ref passed to this component
  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
  }));

  return createPortal(
    <dialog id="cart-modal" ref={dialogRef}>
      <h2>{title}</h2>
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <div id="modal-actions">{actions}</div>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
