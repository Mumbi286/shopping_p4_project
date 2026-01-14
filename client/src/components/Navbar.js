import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      style={{ backgroundColor: theme.navBackground, color: theme.navText }}
      className="navbar"
    >
      <h1 className="navbar-logo">ShopCart</h1>
      <div className="navbar-links">
        <a href="/" style={{ color: theme.navText }}>Home</a>
        <a href="/products" style={{ color: theme.navText }}>Products</a>
        <a href="/cart" style={{ color: theme.navText }}>Cart</a>
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: theme.buttonBackground,
            color: theme.buttonText,
          }}
        >
          Toggle Theme
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
