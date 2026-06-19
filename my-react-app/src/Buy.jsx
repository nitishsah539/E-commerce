import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Buy() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  async function handlePayment() {
  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

const orderData = {
  customerName: name,
  phone,
  address,
  productName: item.name,
  price: item.price,
  qty: item.qty || 1,
  shopName: localStorage.getItem("selectedShop"),

  paymentMethod: "COD",
  paymentStatus: "pending"
};
  await fetch("https://e-commerce-uwpk.onrender.com/api/order/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  });

  navigate("/success");
}

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-4">
          Checkout
        </h1>

        {item && (
          <div className="mb-4 text-center">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-gray-600">₹{item.price}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <textarea
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-3 rounded-lg h-24"
          />

          <button
            onClick={handlePayment}
            className="bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            Proceed to Payment
          </button>

        </div>

      </div>
    </div>
  );
}