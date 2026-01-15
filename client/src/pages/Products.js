import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const { addToCart } = useContext(CartContext);

  const products = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 10,
    name: `Product ${i + 1}`,
    price: 50 + i * 10
  }));

  return (
    <div className="container mt-4">
      <h2>All Products</h2>
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
