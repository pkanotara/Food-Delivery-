import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { StoreContext } from '../context/StoreContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const hasItems = Object.keys(cartItems).some(key => cartItems[key] > 0);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {!hasItems ? (
          <div className="empty-cart">
            <FiShoppingCart className="empty-cart-icon" />
            <h3>Your cart is empty</h3>
            <p>Add some delicious items to get started!</p>
            <button onClick={() => navigate('/')}>Browse Menu</button>
          </div>
        ) : (
          foodList.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={`${url}/uploads/${item.image}`} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                      <FiTrash2 />
                    </button>
                  </div>
                  <hr />
                </div>
              );
            }
          })
        )}
      </div>
      {hasItems && (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
