// src/pages/Products.js
import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

// Mock data for now
const products = [
  { id: 1, name: "Product A", price: 29.99, image: "/images/productA.jpg" },
  { id: 2, name: "Product B", price: 49.99, image: "/images/productB.jpg" },
  { id: 3, name: "Product C", price: 19.99, image: "/images/productC.jpg" },
  { id: 4, name: "Product D", price: 99.99, image: "/images/productD.jpg" },
];

const Products = () => {
  return (
    <div className="products-page">
      <h2>Our Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
