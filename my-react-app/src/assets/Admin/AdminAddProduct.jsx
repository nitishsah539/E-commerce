import { useState } from "react";
import { addProduct, getProducts } from "./api";

export default function AdminAddProduct({ setProducts }) {

  const [form, setForm] = useState({
    name: "",
    price: "",
    weight: ""
  });

  const [image, setImage] = useState(null);

  const shopName = localStorage.getItem("selectedShop");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {

    if (!form.name || !form.price || !image) {
      alert("All fields required");
      return;
    }

    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("weight", form.weight);
    fd.append("image", image);
    fd.append("shopName", shopName);

    await addProduct(fd);

    const updatedProducts = await getProducts();
    setProducts(updatedProducts);

    alert("Product Added ");

    setForm({ name: "", price: "", weight: "" });
    setImage(null);
  }

  return (
    <div className="p-4 max-w-md mx-auto">

      <h1 className="text-xl font-bold mb-4 text-center">
        Add Product
      </h1>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="weight"
        value={form.weight}
        onChange={handleChange}
        placeholder="Weight"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-3"
      />

      <button type="submit"
        onClick={handleSubmit}
        className="bg-green-600 text-white w-full py-2  rounded-lg"
      >
        Add Product
      </button>

    </div>
  );
}