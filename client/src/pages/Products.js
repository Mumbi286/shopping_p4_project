import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch
  useEffect(() => {
    const fetchProducts = async () => {
      // Replace this with actual API call when backend is ready
      const sampleProducts = [
        { id: 101, name: 'Product A', price: 39.99, image: 'https://via.placeholder.com/150' },
        { id: 102, name: 'Product B', price: 59.99, image: 'https://via.placeholder.com/150' },
        { id: 103, name: 'Product C', price: 24.99, image: 'https://via.placeholder.com/150' },
      ];
      setProducts(sampleProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-page">
      <h2>All Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
