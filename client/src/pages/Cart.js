import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) return <h2>Your cart is empty.</h2>;

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image_url} alt={item.title} />
          <div className="cart-item-info">
            <h3>{item.title}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div className="quantity-control">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
