import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dialogRef = useRef(null); // Ref to the dialog element

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders/pending');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch pending orders:', error);
      }
    };

    const interval = setInterval(fetchPendingOrders, 1000); // Fetch orders every second

    return () => clearInterval(interval); // Cleanup function to stop interval on component unmount
  }, []);

  const handleAccept = async (orderId) => {
    try {
      await axios.post(`http://localhost:3000/orders/${orderId}/accept`);
      setSelectedOrder(null); // Close modal
      // Refresh the orders
      setOrders(orders.filter(order => order.id !== orderId));
      dialogRef.current.close(); // Close the modal
    } catch (error) {
      console.error('Failed to accept order:', error);
    }
  };

  const handleReject = async (orderId) => {
    try {
      await axios.post(`http://localhost:3000/orders/${orderId}/reject`);
      setSelectedOrder(null); // Close modal
      // Refresh the orders
      setOrders(orders.filter(order => order.id !== orderId));
      dialogRef.current.close(); // Close the modal
    } catch (error) {
      console.error('Failed to reject order:', error);
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    if (dialogRef.current) {
      dialogRef.current.showModal(); // Show modal dialog
    }
  };

  return (
    <div className="order-details-container">
      <h2 className="pending-orders-title">Orders</h2>
      {orders.map((order, index) => (
        <div key={order.id} className="order-item">
          <p>Order ID: {order.id}</p>
          <p>Name: {order.customer.name}</p>
          <button onClick={() => openOrderDetails(order)} className="view-details-btn">View Details</button>
        </div>
      ))}

      <dialog ref={dialogRef} className="order-details-modal">
        {selectedOrder && (
          <>
            <h3>Order Details</h3>
            <p>Name: {selectedOrder.customer.name}</p>
            <p>Email: {selectedOrder.customer.email}</p>
            <p>Address: {selectedOrder.customer.address}</p>
            <p>Pincode: {selectedOrder.customer.pincode}</p>
            <h4>Items:</h4>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={item.id} className="order-item-list">{item.name} - {item.quantity}</li>
              ))}
            </ul>
          <button onClick={() => dialogRef.current.close()} className="close-modal-btn">Close</button>
          </>
        )}
      </dialog>
    </div>
  );
};

export default OrderDetails;
