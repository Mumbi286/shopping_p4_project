import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Shop</Link>

      <div>
        <Link className="btn btn-outline-light me-2" to="/products">Products</Link>
        <Link className="btn btn-outline-warning" to="/cart">
          Cart ({cartItems.length})
        </Link>
      </div>
    </nav>
  );
}
