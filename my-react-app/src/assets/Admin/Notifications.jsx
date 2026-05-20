import { useEffect, useState } from "react";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const shopName = localStorage.getItem("selectedShop");

  useEffect(() => {

    fetch(`http://localhost:5000/api/order/notifications/${shopName}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setNotifications(data);
      });

  }, []);

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">
        Notifications
      </h1>

      {notifications.length === 0 ? (

        <p>No notifications</p>

      ) : (

        notifications.map((n, i) => (

          <div
            key={i}
            className="bg-white shadow p-3 rounded mb-3"
          >
            <p>{n.message}</p>

            <small className="text-gray-500">
              {new Date(n.createdAt).toLocaleString()}
            </small>
          </div>

        ))

      )}

    </div>
  );
}