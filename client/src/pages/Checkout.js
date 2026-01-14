import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./../styles/Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart, totalPrice } = useContext(CartContext);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    email: "",
    paymentMethod: "M-Pesa",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed! Total: KES ${totalPrice}`);
    clearCart(); // clears cart after checkout
    setShippingInfo({ name: "", address: "", email: "", paymentMethod: "M-Pesa" });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul className="checkout-items">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity} - KES {item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="total">Total: KES {totalPrice}</p>

          <form className="checkout-form" onSubmit={handleSubmit}>
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
              type="email"
              name="email"
              placeholder="Email"
              value={shippingInfo.email}
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
        </>
      )}
    </div>
  );
};

export default Checkout;
