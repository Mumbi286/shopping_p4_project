import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className={`home ${theme}`}>
      <h1>Welcome to Our Store</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} className="product-image"/>
              <h3>{product.title}</h3>
            </Link>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
