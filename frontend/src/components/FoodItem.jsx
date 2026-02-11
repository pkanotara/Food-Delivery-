import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import './FoodItem.css';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/uploads/${image}`}
          alt={name}
        />
        {!cartItems[id] ? (
          <div className="add" onClick={() => addToCart(id)}>
            +
          </div>
        ) : (
          <div className="food-item-counter">
            <div onClick={() => removeFromCart(id)} className="counter-btn">
              -
            </div>
            <p>{cartItems[id]}</p>
            <div onClick={() => addToCart(id)} className="counter-btn">
              +
            </div>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <span className="rating">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
