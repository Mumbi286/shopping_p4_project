import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card h-100">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body d-flex flex-column">
        <h5>{product.name}</h5>
        <p>${product.price}</p>

        <Link
          to={`/product/${product.id}`}
          className="btn btn-outline-primary mb-2"
        >
          View
        </Link>

        <button
          className="btn btn-success mt-auto"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
