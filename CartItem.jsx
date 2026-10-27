
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeItem,
  selectCartItems,
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
  const cartItems = useSelector(selectCartItems);

  const [checkoutMessage, setCheckoutMessage] = React.useState("");

  // Calculate total using each item's cost and quantity.
  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.cost ?? item.price ?? 0) * item.quantity,
    0
  );

  // Update quantity using the Redux updateQuantity action.
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1
        })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    setCheckoutMessage("Coming Soon!");
    if (typeof window !== "undefined") {
      window.alert("Coming Soon!");
    }
  };

  const handleContinueShopping = () => {
    window.location.href = "/plants";
  };

  const formatPrice = (value) =>
    `$${Number(value ?? 0).toFixed(2)}`;

  return (
    <>
      <Navbar />

      <main className="page-container">
        <header className="page-heading">
          <h1>Shopping Cart</h1>
          <p>Review your plants and manage your order.</p>
        </header>

        {cartItems.length === 0 ? (
          <section className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Discover beautiful houseplants for your home.</p>
            <button
              className="continue-shopping-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </section>
        ) : (
          <section className="cart-container">
            {cartItems.map((item) => {
              const unitCost = Number(item.cost ?? item.price ?? 0);

              return (
                <article className="cart-row" key={item.id ?? item.name}>
                  <img
                    className="product-image"
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`
                    }
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://placehold.co/300x300/e5efe2/24552e?text=Houseplant";
                    }}
                  />

                  <div className="cart-details">
                    <h2>{item.name}</h2>
                    <p>Unit Price: {formatPrice(unitCost)}</p>
                    <p>
                      Item Total:{" "}
                      {formatPrice(unitCost * item.quantity)}
                    </p>
                  </div>

                  <div className="quantity-controls">
                    <p>Quantity: {item.quantity}</p>

                    <button
                      type="button"
                      className="quantity-button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      className="quantity-button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="cart-item-delete"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}

            <section className="cart-total">
              <h2>
                Total Items:{" "}
                {cartItems.reduce(
                  (sum, item) => sum + Number(item.quantity),
                  0
                )}
              </h2>

              <h2>Total Amount: {formatPrice(totalAmount)}</h2>

              <button
                type="button"
                className="checkout-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              {checkoutMessage && (
                <p role="status">{checkoutMessage}</p>
              )}

              <button
                type="button"
                className="continue-shopping-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </section>
          </section>
        )}
      </main>
    </>
  );
}

export default CartItem;
