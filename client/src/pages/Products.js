// client/src/pages/Products.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Product 1", price: 50 },
  { id: 2, name: "Product 2", price: 80 },
  { id: 3, name: "Product 3", price: 120 }
];

const Products = () => {
  const { addToCart } = useCart();

  return (
    <div>
      <h1>Products</h1>
      <Row>
        {products.map(p => (
          <Col key={p.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>${p.price}</Card.Text>
                <Button variant="success" onClick={() => addToCart(p)}>Add to Cart</Button>{" "}
                <Button as={Link} to={`/products/${p.id}`} variant="primary">View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
