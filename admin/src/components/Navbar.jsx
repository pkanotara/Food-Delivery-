import React from 'react';
import { FiUser } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <h1 className="logo">FoodHub Admin</h1>
        <div className="profile-icon">
          <FiUser />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
