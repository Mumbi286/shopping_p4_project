import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h2>Product Detail</h2>
      <p>Product ID: {id}</p>
      <p>This will be fetched from backend later.</p>
    </div>
  );
}
