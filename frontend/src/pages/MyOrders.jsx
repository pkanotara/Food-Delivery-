import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPackage, FiClock } from 'react-icons/fi';
import { StoreContext } from '../context/StoreContext';
import './MyOrders.css';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setData(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      navigate('/');
    }
  }, [token]);

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('delivered')) return 'status-delivered';
    if (statusLower.includes('processing') || statusLower.includes('preparing')) return 'status-processing';
    if (statusLower.includes('delivery') || statusLower.includes('out')) return 'status-delivery';
    return 'status-pending';
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <div className="empty-orders">
            <FiPackage className="empty-icon" />
            <h3>No orders yet</h3>
            <p>Your order history will appear here</p>
          </div>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <div className="order-icon">
                <FiPackage />
              </div>
              <div className="order-info">
                <p className="order-items">
                  {order.items.map((item, idx) => {
                    if (idx === order.items.length - 1) {
                      return item.name + ' x ' + item.quantity;
                    } else {
                      return item.name + ' x ' + item.quantity + ', ';
                    }
                  })}
                </p>
                <p className="order-amount">${order.amount}</p>
                <p className="order-detail">Items: {order.items.length}</p>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status}
                </div>
                <p className="order-date">
                  <FiClock /> {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
