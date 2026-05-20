import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function MyCart({ cart, setCart }) {

  function removeItem(id) {
    const newCart = cart.filter(item => item._id !== id);
    setCart(newCart);
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">

        {/* HEADER */}
        <div className=" flex gap-5 items-center p-4 rounded-xl ">
          

          <h1 className="text-xl font-bold">
            My Cart
          </h1>
        </div>

        {/* EMPTY CART */}
        <div className="bg-white mt-10 p-10 rounded-2xl shadow text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Cart is Empty 
          </h1>

          <p className="text-gray-500 mt-2">
            Add some products to continue shopping
          </p>

          <Link to="/home">
            <button className="mt-5 bg-green-500 text-white px-6 py-2 rounded-full">
              Shop Now
            </button>
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">

      

      {/* CART ITEMS */}
      <div className="mt-6 flex flex-col gap-5">

        {cart.map(item => (

          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row gap-5 items-center"
          >

            {/* IMAGE */}
            <div className="w-full md:w-1/4 flex justify-center">
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                className="h-32 object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1 w-full">

              <h2 className="text-lg md:text-xl font-semibold">
                {item.name}
              </h2>

              <p className="text-yellow-500 text-sm mt-1">
                ⭐ 4.5 Rating
              </p>

              <h1 className="text-2xl font-bold text-green-600 mt-2">
                ₹{item.price}
              </h1>

              <p className="text-gray-500 mt-1">
                Quantity: {item.qty}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-5 flex-wrap">

                <button
                  onClick={() => removeItem(item._id)}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white duration-200"
                >
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </button>

                <Link to="/buy" state={item}>
                  <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-700 duration-200">
                    Buy Now
                  </button>
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* TOTAL */}
      <div className="bg-white mt-8 p-5 rounded-2xl shadow-md flex justify-between items-center flex-wrap gap-4">

        <h1 className="text-2xl font-bold">
          Total: ₹{totalPrice}
        </h1>

        <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 duration-200">
          Checkout
        </button>

      </div>

    </div>
  );
}