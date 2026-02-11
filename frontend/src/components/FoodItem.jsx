import React, { useContext } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
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
            <FiPlus />
          </div>
        ) : (
          <div className="food-item-counter">
            <div onClick={() => removeFromCart(id)} className="counter-btn">
              <FiMinus />
            </div>
            <p>{cartItems[id]}</p>
            <div onClick={() => addToCart(id)} className="counter-btn">
              <FiPlus />
            </div>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="rating">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
