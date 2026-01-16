// client/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";

const products = [
  { id: 1, name: "Product 1", price: 50 },
  { id: 2, name: "Product 2", price: 80 },
  { id: 3, name: "Product 3", price: 120 }
];

const Home = () => (
  <div>
    <h1>Welcome to ShopApp</h1>
    <Row>
      {products.map(p => (
        <Col key={p.id} md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{p.name}</Card.Title>
              <Card.Text>${p.price}</Card.Text>
              <Button as={Link} to={`/products/${p.id}`} variant="primary">View</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default Home;
