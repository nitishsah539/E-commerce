import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

 const shopName = localStorage.getItem("selectedShop");

  useEffect(() => {
    fetch(`http://localhost:5000/api/order/${shopName}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-4 min-h-screen">

      <h1 className="text-xl font-bold mb-4">Orders</h1>

      {orders.map((o, i) => (
        <div key={i} className="bg-white p-4 mb-3 shadow rounded">

          <h2>{o.productName}</h2>
          <p>₹{o.price}</p>
          <p>{o.weight}</p>

          <p>{o.customerName}</p>
          <p>{o.phone}</p>
          <p>{o.address}</p>
          <p>Payment: {o.paymentMethod}</p>
          <p>Status: {o.paymentStatus}</p>

          <span className="text-green-600">{o.status}</span>

        </div>
      ))}

    </div>
  );
}