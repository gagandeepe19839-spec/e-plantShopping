
import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <main className="landing-page">
      <section className="landing-content">
        <h1>Paradise Nursery</h1>

        <p>
          Welcome to Paradise Nursery, your destination for beautiful
          houseplants. Discover nature's beauty and bring freshness,
          happiness, and greenery into your home.
        </p>

        <p>
          Find your perfect plant and start building your own green
          paradise today!
        </p>

        <Link to="/plants" className="primary-button">
          Get Started
        </Link>

        <div>
          <Link
            to="/about"
            style={{
              display: "inline-block",
              marginTop: "24px",
              color: "white",
              textDecoration: "underline"
            }}
          >
            About Us
          </Link>
        </div>
      </section>
    </main>
  );
}

export default App;
