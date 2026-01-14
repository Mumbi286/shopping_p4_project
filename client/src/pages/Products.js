// src/pages/Products.js
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Products.css";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  // For now, placeholder data
  useEffect(() => {
    const placeholderProducts = [
      { id: 1, name: "Cool Sneakers", price: 120, image: "https://via.placeholder.com/250x180?text=Sneakers" },
      { id: 2, name: "Stylish Jacket", price: 85, image: "https://via.placeholder.com/250x180?text=Jacket" },
      { id: 3, name: "Smart Watch", price: 199, image: "https://via.placeholder.com/250x180?text=Watch" },
      { id: 4, name: "Headphones", price: 50, image: "https://via.placeholder.com/250x180?text=Headphones" },
    ];
    setProducts(placeholderProducts);
  }, []);

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;