
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  selectCartCount
} from "./CartSlice";
import "./App.css";

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

function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [checkoutMessage, setCheckoutMessage] = React.useState("");

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <>
      <Navbar />

      <main className="page-container">
        <header className="page-heading">
          <h1>Shopping Cart</h1>
          <p>Review your plants and manage your order.</p>
        </header>

        {items.length === 0 ? (
          <section className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Discover beautiful houseplants for your home.</p>
            <Link to="/plants" className="primary-button">
              Continue Shopping
            </Link>
          </section>
        ) : (
          <>
            <section aria-label="Cart items">
              {items.map((item) => (
                <article className="cart-row" key={item.id}>
                  <img
                    className="product-image"
                    src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://placehold.co/300x300/e5efe2/24552e?text=Houseplant";
                    }}
                  />

                  <div className="cart-details">
                    <h2>{item.name}</h2>
                    <p>Unit price: {formatPrice(item.price)}</p>
                    <p>
                      Item total:{" "}
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="quantity-controls">
                    <p>Quantity: {item.quantity}</p>

                    <button
                      type="button"
                      className="quantity-button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      className="quantity-button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <section className="cart-total">
              <h2>Total Items: {items.reduce(
                (sum, item) => sum + item.quantity, 0
              )}</h2>

              <h2>Total Amount: {formatPrice(total)}</h2>

              <button
                type="button"
                className="checkout-button"
                onClick={() =>
                  setCheckoutMessage(
                    "Coming Soon! Online checkout will be available soon."
                  )
                }
              >
                Checkout
              </button>

              {checkoutMessage && (
                <p role="status">{checkoutMessage}</p>
              )}

              <div>
                <Link to="/plants" className="continue-button">
                  Continue Shopping
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default CartItem;
