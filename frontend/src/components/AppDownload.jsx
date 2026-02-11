import React from 'react';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> FoodHub App
      </p>
      <div className="app-download-platforms">
        <div className="platform-btn">📱 Play Store</div>
        <div className="platform-btn">🍎 App Store</div>
      </div>
    </div>
  );
};

export default AppDownload;
