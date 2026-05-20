import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShopSelect() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/shops")
      .then(res => res.json())
      .then(data => setShops(data));
  }, []);

 const handleSelect = (shop) => {
  localStorage.setItem("selectedShop", shop.shopName);
  navigate(`/home`);
};

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      <h1 className="text-xl font-bold mb-4 text-center">
        Select Nearby Shop
      </h1>

      <div className="flex flex-col gap-4">

        {shops.map((shop) => (
          <div
            key={shop._id}
            onClick={() => handleSelect(shop)}
            className="bg-white rounded-xl p-4 shadow cursor-pointer hover:shadow-md"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold">{shop.shopName}</h2>
              <span className="text-green-600 text-sm">Open</span>
            </div>

            <div className="text-sm text-gray-500 mt-2">
              📍 Nearby | ⭐ 4.5 | ⏱ 20 min
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}