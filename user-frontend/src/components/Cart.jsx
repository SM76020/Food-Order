import React from 'react';

const Cart = ({ items, onUpdateItemQuantity }) => {
  const totalCost = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div id="cart" className='cart'>
      {items.length === 0 && <p>No items in cart!</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id} className='cart-item'>
            <p>
              {item.name} &nbsp; &nbsp; 
              Quantity: {item.quantity} &nbsp; &nbsp; 
              Price: ${item.price * item.quantity}
            </p>
            <div className='cart-item-actions'>
              <button onClick={() => onUpdateItemQuantity(item.id, 1)}> +</button> 
              <button onClick={() => onUpdateItemQuantity(item.id, -1)}>-</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <p className='cart-total'>Total Cost: ${totalCost}</p>
      </div>
    </div>
  );
};

export default Cart;
