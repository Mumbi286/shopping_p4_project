import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // fetch product by id from fake API
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <div className={`product-detail ${theme}`}>Loading...</div>;

  return (
    <div className={`product-detail ${theme}`}>
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="product-detail-container">
        <img src={product.image} alt={product.title} className="product-image"/>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
