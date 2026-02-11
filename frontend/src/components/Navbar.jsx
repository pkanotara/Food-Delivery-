import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="logo">FoodHub</h1>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu('home')}
          className={menu === 'home' ? 'active' : ''}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu('menu')}
          className={menu === 'menu' ? 'active' : ''}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu('mobile-app')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu('contact')}
          className={menu === 'contact' ? 'active' : ''}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <div className="cart-icon">🛒</div>
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <div className="profile-icon">👤</div>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <span>📦</span>
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <span>🚪</span>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
