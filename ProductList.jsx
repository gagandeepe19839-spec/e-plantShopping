
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItems,
  selectCartCount
} from "./CartSlice";
import "./App.css";

const plantCategories = [
  {
    name: "Air Purifying Plants",
    plants: [
      { id: "p1", name: "Snake Plant", price: 18, image: "photo-1501004318641-b39e6451bec6" },
      { id: "p2", name: "Peace Lily", price: 22, image: "photo-1497250681960-ef046c08a56e" },
      { id: "p3", name: "Spider Plant", price: 15, image: "photo-1459156212016-c812468e2115" },
      { id: "p4", name: "Areca Palm", price: 25, image: "photo-1485955900006-10f4d324d411" },
      { id: "p5", name: "Rubber Plant", price: 28, image: "photo-1509423350716-97f9360b4e09" },
      { id: "p6", name: "Boston Fern", price: 20, image: "photo-1446071103084-c257b5f70672" }
    ]
  },
  {
    name: "Indoor Flowering Plants",
    plants: [
      { id: "p7", name: "Anthurium", price: 24, image: "photo-1494438639946-1ebd1d20bf85" },
      { id: "p8", name: "African Violet", price: 16, image: "photo-1466692476868-aef1dfb1e735" },
      { id: "p9", name: "Orchid", price: 32, image: "photo-1463320726281-696a485928c7" },
      { id: "p10", name: "Kalanchoe", price: 19, image: "photo-1483794344563-d27a8d18014e" },
      { id: "p11", name: "Bromeliad", price: 27, image: "photo-1509423350716-97f9360b4e09" },
      { id: "p12", name: "Jasmine", price: 21, image: "photo-1497250681960-ef046c08a56e" }
    ]
  },
  {
    name: "Easy Care Plants",
    plants: [
      { id: "p13", name: "Aloe Vera", price: 14, image: "photo-1509423350716-97f9360b4e09" },
      { id: "p14", name: "Jade Plant", price: 17, image: "photo-1501004318641-b39e6451bec6" },
      { id: "p15", name: "ZZ Plant", price: 26, image: "photo-1485955900006-10f4d324d411" },
      { id: "p16", name: "Pothos", price: 13, image: "photo-1497250681960-ef046c08a56e" },
      { id: "p17", name: "Monstera", price: 30, image: "photo-1459156212016-c812468e2115" },
      { id: "p18", name: "Lucky Bamboo", price: 12, image: "photo-1446071103084-c257b5f70672" }
    ]
  }
];

function Navbar() {
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Paradise Nursery</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">
          Cart <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  return (
    <>
      <Navbar />
      <main className="page-container">
        <header className="page-heading">
          <h1>Our Houseplants</h1>
          <p>Discover the perfect plants to brighten your home.</p>
        </header>

        {plantCategories.map((category) => (
          <section className="plant-category" key={category.name}>
            <h2>{category.name}</h2>

            <div className="product-grid">
              {category.plants.map((plant) => {
                const added = cartItems.some(
                  (item) => item.id === plant.id
                );

                return (
                  <article className="product-card" key={plant.id}>
                    <img
                      className="product-image"
                      src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=500&q=80`}
                      alt={plant.name}
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://placehold.co/400x300/e5efe2/24552e?text=Houseplant";
                      }}
                    />

                    <h3>{plant.name}</h3>
                    <p>${plant.price.toFixed(2)}</p>

                    <button
                      className="add-button"
                      disabled={added}
                      onClick={() => dispatch(addToCart(plant))}
                    >
                      {added ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default ProductList;
