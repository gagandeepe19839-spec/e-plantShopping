
import React from "react";

function AboutUs() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Paradise Nursery</h1>
        <p className="about-tagline">
          Bringing Nature Closer to Your Home
        </p>
      </section>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          Paradise Nursery is an online destination for plant lovers.
          We believe that plants make every home more beautiful,
          peaceful, and refreshing.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to make healthy and beautiful houseplants
          accessible to everyone. We help customers discover plants
          that brighten their living spaces and bring them closer
          to nature.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>A wide variety of beautiful houseplants.</li>
          <li>Simple and convenient online shopping.</li>
          <li>Affordable prices for plant lovers.</li>
          <li>A greener and healthier living environment.</li>
        </ul>

        <p className="about-ending">
          Thank you for choosing Paradise Nursery.
          Let us grow a greener world together!
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
