import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminHome() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const res = await axios.get("http://localhost:5000/api/products/products");
    setProducts(res.data);
  }

  async function deleteProduct(id) {
    await axios.delete(`http://localhost:5000/api/products/product/${id}`);
    loadProducts();
  }

  return (
    <div className=" min-h-screen ">

      

       <div className="bg-green-800 mt-4  rounded-b-3xl px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">

        <div className="text-white max-w-lg">
          <h1 className="text-2xl md:text-4xl font-bold">
            Manage your store easily
             
          </h1>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2331/2331966.png"
          className="h-28 md:h-40 mt-4 md:mt-0"/>
      </div>

      

     
      <div className="text-xl md:text-2xl font-bold m-2  ">
        
        Total Products: <b>{products.length}</b>
      </div>
      <h2 className="text-2xl font-bold m-2">
        Recently Added
      </h2>

    
      {products.length === 0 ? (
        <h2>No products yet </h2>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-24 ">

          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">

              <img src={`http://localhost:5000/uploads/${product.image}`} className="h-20 mx-auto object-contain" />

              <h3 className="text-center mt-2">{product.name}</h3>
              <h1 className="text-center font-bold text-green-600">
                ₹{product.price}
              </h1>

              <div className="flex justify-center gap-2 mt-3">

                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:cursor-pointer">
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:cursor-pointer">
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}