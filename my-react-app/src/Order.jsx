import { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical,faCheck, faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await axios.get("https://e-commerce-uwpk.onrender.com/api/orders/orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-3">

     
   

      <h1 className="text-lg font-semibold my-4">Your Orders</h1>

      {orders.length === 0 ? (
        <h2>No orders yet</h2>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl shadow p-4 mb-4">

            {/* Top */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  Order placed
                  <span className="bg-green-500 text-white text-xs px-1.5 rounded-full">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {order.name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg">₹{order.price}</h2>

                <span className="bg-gray-100 p-2 rounded-full">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="flex gap-3 mt-4">
              <img
                src={`http://localhost:5000/uploads/${order.image}`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>

            {/* Buttons */}
            <div className="flex mt-4 border-t text-sm font-medium">
              <div className="w-1/2 text-center py-3 cursor-pointer">
                Rate Order
              </div>

              <div className="w-1/2 text-center py-3 border-l text-pink-600 cursor-pointer">
                Order Again
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
}