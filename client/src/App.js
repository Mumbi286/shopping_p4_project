/ src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import "./styles/index.css";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;