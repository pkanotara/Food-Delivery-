import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <div className="app-download-content">
        <FiDownload className="app-download-icon" />
        <p className="app-download-title">
          For Better Experience Download <br /> FoodHub App
        </p>
        <div className="app-download-platforms">
          <div className="platform-btn">
            <FaGooglePlay />
            <span>Play Store</span>
          </div>
          <div className="platform-btn">
            <FaApple />
            <span>App Store</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
