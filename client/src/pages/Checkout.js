// client/src/pages/Checkout.js
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart(); // Clear cart on checkout
  };

  if (cart.length === 0 && !submitted) {
    return (
      <div className={`checkout ${theme}`}>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className={`checkout ${theme}`}>
      {!submitted ? (
        <>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Pay Now</button>
          </form>
        </>
      ) : (
        <div>
          <h2>Thank you for your purchase, {name}!</h2>
          <p>A confirmation email has been sent to {email}</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
