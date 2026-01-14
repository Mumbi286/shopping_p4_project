import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./../styles/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleIncrease = (productId) => updateQuantity(productId, 1);
  const handleDecrease = (productId) => updateQuantity(productId, -1);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item.id)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
