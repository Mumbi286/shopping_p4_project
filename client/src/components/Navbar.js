// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-left">
        <h1>Shopping App</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;