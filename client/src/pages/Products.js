// src/pages/Products.js
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Products.css";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Example placeholder products
    setProducts([
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 149.99,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "https://via.placeholder.com/150",
      },
    ]);
  }, []);

  return (
    <div className={`products-page ${theme}`}>
      <h1>Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
