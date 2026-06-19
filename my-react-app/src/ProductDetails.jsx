import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createOrder } from "./assets/Admin/api";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await axios.get(`http://localhost:5000/api/products/products`);
      const found = res.data.find(p => p._id === id);
      setProduct(found);
    }
    load();
  }, [id]);

  if (!product) return <h1>Loading...</h1>;

  function handleBuy() {
    const orderData = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      userEmail: "test@gmail.com",
      address: "Delhi"
    };

    createOrder(orderData);
    alert("Order placed ");
  }

  return (
    <div className="bg-gray-100 p-4 md:p-6 min-h-screen">

      {/* HEADER */}
      <div className="bg-green-600 flex gap-7 items-center p-3 rounded-lg text-white">
        <button onClick={() => window.history.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-lg font-bold">Product Details</h1>
      </div>

      {/* MAIN */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mt-6 flex flex-col md:flex-row gap-6">

        {/* IMAGE */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <img
            src={`https://e-commerce-uwpk.onrender.com/uploads/${product.image}`}
            alt={product.name}
            className="h-40 md:h-60 object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="flex-1">

          <h2 className="text-lg md:text-xl font-semibold">
            {product.name}
          </h2>

          <p className="text-yellow-500 text-sm mt-1">
            ⭐ 4.5 Rating
          </p>

          <h1 className="text-xl md:text-2xl font-bold mt-2 text-green-600">
            ₹{product.price}
          </h1>

          <p className="text-gray-500 mt-2">
            Weight: {product.weight}
          </p>

          <div className="flex gap-4 mt-6 flex-wrap">
            <button className="border border-green-500 text-green-600 px-4 py-2 rounded-full">
              Add to Cart
            </button>

            <button onClick={handleBuy} className="bg-green-500 text-white px-6 py-2 rounded-full">
              Buy Now
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}