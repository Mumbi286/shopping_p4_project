// src/pages/Home.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Home.css";

const Home = () => {
  const { addToCart } = useContext(CartContext);

  // Placeholder products (for demo)
  const products = [
    {
      id: 1,
      title: "Red T-Shirt",
      price: 19.99,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Blue Jeans",
      price: 49.99,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      title: "Sneakers",
      price: 89.99,
      image: "https://via.placeholder.com/150"
    },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to Our Shop</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
