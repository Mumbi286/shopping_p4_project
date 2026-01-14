// src/pages/Products.js
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Products.css";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  // Fetch products from backend API
  useEffect(() => {
    fetch("http://localhost:5555/products") // adjust API endpoint if needed
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image_url} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
