import React from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';

// Sample placeholder products for now
const sampleProducts = [
  { id: 1, name: 'Sample Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Sample Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Sample Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
];

const Home = () => {
  return (
    <div className="home-container">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {sampleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;