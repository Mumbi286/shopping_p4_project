import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "M-Pesa",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, simulate order submission
    console.log("Order submitted:", { shippingInfo, cartItems, totalPrice });
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return <h2 className="confirmation">Thank you! Your order has been placed.</h2>;
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-cart">
        <h3>Cart Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
        )}
        <p>Total: ${totalPrice}</p>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h3>Shipping Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={shippingInfo.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={shippingInfo.address}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={shippingInfo.phone}
          onChange={handleChange}
          required
        />
        <select
          name="paymentMethod"
          value={shippingInfo.paymentMethod}
          onChange={handleChange}
        >
          <option value="M-Pesa">M-Pesa</option>
          <option value="Credit Card">Credit Card</option>
        </select>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
