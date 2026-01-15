import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 && <p>No items in cart.</p>}

      {cartItems.map(item => (
        <div className="card mb-2 p-2" key={item.id}>
          <div className="d-flex justify-content-between">
            <span>{item.name}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <Link to="/checkout" className="btn btn-success mt-3">
          Checkout
        </Link>
      )}
    </div>
  );
}
