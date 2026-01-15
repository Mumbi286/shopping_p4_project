// client/src/pages/ProductDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Product 1", price: 50 },
  { id: 2, name: "Product 2", price: 80 },
  { id: 3, name: "Product 3", price: 120 }
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) return <div>Product not found</div>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Price: ${product.price}</Card.Text>
        <Button variant="success" onClick={() => addToCart(product)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductDetail;
