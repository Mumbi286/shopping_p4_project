export default function Checkout() {
  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <form>
        <input className="form-control mb-2" placeholder="Name" />
        <input className="form-control mb-2" placeholder="Address" />
        <input className="form-control mb-2" placeholder="Card Number" />

        <button className="btn btn-primary w-100">
          Place Order
        </button>
      </form>
    </div>
  );
}
