import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const products = [
  { id: 1, name: "Phone", price: 300 },
  { id: 2, name: "Laptop", price: 900 },
  { id: 3, name: "Headphones", price: 120 },
];

export default function Home() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container mt-4">
      <h2>Featured Products</h2>
      <div className="row">
        {products.map(p => (
          <div className="col-md-4 mb-3" key={p.id}>
            <ProductCard product={p} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
