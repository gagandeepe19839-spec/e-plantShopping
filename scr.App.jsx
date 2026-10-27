import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page background-image">
          <h1>Welcome To Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
          <AboutUs />
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
