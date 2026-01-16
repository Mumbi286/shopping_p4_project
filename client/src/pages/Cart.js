// client/src/pages/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();

  const handleChange = (id, e) => {
    updateQty(id, parseInt(e.target.value));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link to="/products">Go shopping</Link>
        </div>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <input type="number" value={item.qty} min="1" onChange={(e) => handleChange(item.id, e)} />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>Total: ${total}</h3>
          <Button as={Link} to="/checkout" variant="primary">Checkout</Button>
        </>
      )}
    </div>
  );
};

export default Cart;
