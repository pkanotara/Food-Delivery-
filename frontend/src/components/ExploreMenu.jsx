import React from 'react';
import './ExploreMenu.css';

const menuList = [
  { menu_name: 'Salad', menu_image: '🥗' },
  { menu_name: 'Rolls', menu_image: '🌯' },
  { menu_name: 'Deserts', menu_image: '🍰' },
  { menu_name: 'Sandwich', menu_image: '🥪' },
  { menu_name: 'Cake', menu_image: '🎂' },
  { menu_name: 'Pure Veg', menu_image: '🥬' },
  { menu_name: 'Pasta', menu_image: '🍝' },
  { menu_name: 'Noodles', menu_image: '🍜' }
];

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes crafted
        with the finest ingredients and culinary expertise. Our mission is to
        satisfy your cravings and elevate your dining experience, one delicious
        meal at a time.
      </p>
      <div className="explore-menu-list">
        {menuList.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? 'All' : item.menu_name
              )
            }
            key={index}
            className="explore-menu-list-item"
          >
            <div
              className={`menu-icon ${
                category === item.menu_name ? 'active' : ''
              }`}
            >
              {item.menu_image}
            </div>
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
