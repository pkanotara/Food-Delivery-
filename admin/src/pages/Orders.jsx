import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPackage, FiMapPin, FiPhone } from 'react-icons/fi';
import './Orders.css';

const Orders = () => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`${url}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.put(
        `${url}/api/orders/status/${orderId}`,
        { status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Management</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-icon">
              <FiPackage />
            </div>
            <div className="order-details">
              <p className="order-item-food">
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div className="order-item-address">
                <FiMapPin />
                <div>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city +
                      ', ' +
                      order.address.state +
                      ', ' +
                      order.address.country +
                      ', ' +
                      order.address.zip}
                  </p>
                </div>
              </div>
              <p className="order-item-phone">
                <FiPhone /> {order.address.phone}
              </p>
            </div>
            <div className="order-info">
              <p className="order-items-count">Items: {order.items.length}</p>
              <p className="order-amount">${order.amount}</p>
            </div>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="status-select"
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="out for delivery">Out for delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
