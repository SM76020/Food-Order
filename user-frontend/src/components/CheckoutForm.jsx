import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';

const CheckoutForm = forwardRef(({ onClearCart, cartItems }, ref) => {
  const dialogRef = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const onSubmit = async (data) => {
    try {
      const orderData = {
        customer: {
          name: data.name,
          email: data.email,
          address: data.address,
          pincode: data.pincode,
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to place order.');
      }

      const result = await response.json();
      setOrderId(result.id);
      setOrderSuccess(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an issue placing your order. Please try again.');
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setOrderSuccess(false);
      setOrderId(null);
      dialogRef.current?.showModal();
    },
  }));

  const handleClose = () => {
    dialogRef.current?.close();
    onClearCart();
  };

  return createPortal(
    <dialog id="checkout-modal" ref={dialogRef} className="modal">
      {orderSuccess ? (
        <div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your order. We will process it shortly.</p>
          <p>Order ID: {orderId}</p>
          <button className="button" onClick={() => { handleClose(); document.getElementById('cart-modal').close(); }}>Close</button>
        </div>
      ) : (
        <>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="control">
              <label>Name</label>
              <input id="name" {...register("name", { required: true })} />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="control">
              <label>Email</label>
              <input  id="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })} />
              {errors.email && <span>This field is required and must be a valid email</span>}
            </div>
            <div className="control">
              <label>Address</label>
              <input id="address" {...register("address", { required: true })} />
              {errors.address && <span>This field is required</span>}
            </div>
            <div className="control">
              <label>Pincode</label>
              <input id="pincode" {...register("pincode", { required: true })} />
              {errors.pincode && <span>This field is required</span>}
            </div>
            <div id="modal-actions" className="modal-actions">
              <button className="button" type="button" onClick={handleClose}>Cancel</button>
              <button type="submit" className="button">Place Order</button>
            </div>
          </form>
        </>
      )}
    </dialog>,
    document.getElementById('modal')
  );
});

export default CheckoutForm;
