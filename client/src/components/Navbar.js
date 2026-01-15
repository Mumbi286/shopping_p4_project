import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Shop</Link>

      <div>
        <Link className="btn btn-outline-light me-2" to="/products">Products</Link>

        {!user ? (
          <>
            <Link className="btn btn-outline-info me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-success" to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-warning me-2" to="/cart">
              Cart ({cartItems.length})
            </Link>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
