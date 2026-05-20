import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function Section({ search, cart, setCart, products }) {

  const role = localStorage.getItem("role");
  const selectedShop = localStorage.getItem("selectedShop");

const filteredItems = (products || [])
  .filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter(item => item.shopName === selectedShop);

  function addToCart(product) {
    let found = false;

    const updated = cart.map((item) => {
      if (item._id === product._id) {
        found = true;
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });

    if (!found) {
      updated.push({ ...product, qty: 1 });
    }

    setCart(updated);
  }

  // ➖ REMOVE
  function removeFromCart(product) {
    const updated = cart
      .map((item) =>
        item._id === product._id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    setCart(updated);
  }

  const heroTexts = [
  "Fresh groceries at your doorstep",
  "Big discounts on daily essentials",
  "Healthy products for your family",
  "Fast delivery in your area",
  "Best quality at lowest price"
];
// For Cart Animation
function flyToCart(e) {

  const cart = document.getElementById("cart-icon");

  const img = e.target.parentElement.parentElement
    .querySelector("img");

  const clone = img.cloneNode(true);

  const rect = img.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  clone.style.position = "fixed";
  clone.style.left = rect.left + "px";
  clone.style.top = rect.top + "px";
  clone.style.width = "80px";
  clone.style.height = "80px";
  clone.style.zIndex = "9999";
  clone.style.transition = "all 1s ease-in-out";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.left = cartRect.left + "px";
    clone.style.top = cartRect.top + "px";
    clone.style.width = "20px";
    clone.style.height = "20px";
    clone.style.opacity = "0.5";
  }, 50);

  setTimeout(() => {
    clone.remove();
  }, 1000);
}

  return (
    <div className="min-h-screen">
      {/* HERO */}
    <Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: 3000 }}
  pagination={{ clickable: true }}
  loop={true}
  className="mt-4 rounded-b-3xl overflow-hidden"
>
  {filteredItems.slice(0, 5).map((product) => (

    <SwiperSlide key={product._id}>

      <div className="bg-green-800 px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">

        {/* LEFT TEXT */}
        <div className="text-white max-w-lg">

          <h1 className="text-2xl md:text-4xl font-bold leading-tight">

            {role === "shopkeeper"
              ? "Manage your store easily"
              : "We bring the store to your door"}

          </h1>

          <p className="mt-3 text-sm md:text-lg text-green-100">

  {heroTexts[Math.floor(Math.random() * heroTexts.length)]}

</p>

          <button className="mt-5 bg-white text-green-700 px-5 py-2 rounded-full font-semibold hover:scale-105 transition">

            Shop Now

          </button>

        </div>

        {/* RIGHT PRODUCT */}
        <div className="mt-6 md:mt-0 flex flex-col items-center">

          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            className="h-32 md:h-44 object-contain drop-shadow-xl"
          />

          <h2 className="text-white mt-3 text-lg font-semibold">
            {product.name}
          </h2>

          <p className="text-yellow-300 font-bold">
            ₹{product.price}
          </p>

        </div>

      </div>

    </SwiperSlide>

  ))}
</Swiper>

      {/* PRODUCTS */}
      <div className="px-4 md:px-6 py-8">

        <h1 className="text-xl md:text-2xl font-bold mb-6">
          {role === "shopkeeper" ? "Your Products" : "You might need"}
        </h1>
        {filteredItems.length === 0 ? (
          <h2 className="text-center text-gray-500">
            No products found 
          </h2>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            {filteredItems.map((product) => {
              const qty =
                cart.find((i) => i._id === product._id)?.qty || 0;

              return (
                <div key={product._id} className="bg-white p-4 rounded-2xl shadow">

                  <Link to={`/productDetails/${product._id}`}>
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150";
                      }}
                      className="h-20 md:h-24 mx-auto object-contain"/>
                  </Link>

                  <div className="text-center mt-3">
                    <h3 className="text-sm md:text-base">{product.name} </h3>
                    <h2>{product.weight}</h2>
                    <h1 className="font-bold">₹{product.price}</h1>
                    
                  </div>
                  {/* USER CART */}
                  {role !== "shopkeeper" && (
                    <div className="flex justify-center mt-3 gap-2 items-center bg-green-600 text-white rounded">

                      {qty === 0 ? (
                        <button onClick={(e) => {
                          addToCart(product); flyToCart(e);
                        }} className="px-3 py-1 text-sm" > Add </button>
                      ) : (
                        <>
                          <button onClick={() => removeFromCart(product)} className="px-3" > -</button>
                          <span>{qty}</span>
                          <button onClick={(e) => {addToCart(product); flyToCart(e);}} 
                          className="px-3" > + </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}