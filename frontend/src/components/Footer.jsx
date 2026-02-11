import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h2>FoodHub</h2>
          <p>
            Your favorite food delivered fresh and fast. We partner with the best
            restaurants in your area to bring you delicious meals right to your
            doorstep.
          </p>
          <div className="footer-social-icons">
            <span>📘</span>
            <span>🐦</span>
            <span>📷</span>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-234-567-8900</li>
            <li>contact@foodhub.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © FoodHub.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
