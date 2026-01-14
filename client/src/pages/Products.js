/ client/src/pages/Products.js
import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = ({ products }) => {
  return (
    <div className="products-page">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;