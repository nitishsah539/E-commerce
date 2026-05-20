import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
  adminKey: "",
  shopName: ""   
});

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Password mismatch ");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      const data = await res.json();

      alert(data.message);

      if (data.success) navigate("/login");

    } catch {
      alert("Server error...");
    }
  }

  return (
    <div className="bg-green-800 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-80">

        <h2 className="text-xl mb-4">Sign Up</h2>

        <input name="name" onChange={handleChange} placeholder="Name" className="border p-2 w-full mb-2" />
        <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full mb-2" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="border p-2 w-full mb-2" />
        <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirm Password" className="border p-2 w-full mb-2" />

     
      <select name="role" onChange={handleChange} className="border p-2 w-full mb-2">
  <option value="user">Customer</option>
  <option value="shopkeeper">Shopkeeper</option>
</select>


{user.role === "shopkeeper" && (
  <input
    name="adminKey"
    onChange={handleChange}
    placeholder="Enter Shop Secret Key"
    className="border p-2 w-full mb-2"
  />
)}

{user.role === "shopkeeper" && (
  <input
    name="shopName"
    onChange={handleChange}
    placeholder="Enter Shop Name"
    className="border p-2 w-full mb-2"
  />
)}

<button type="submit" className="bg-green-600 text-white w-full py-2 cursor-pointer">
  Sign Up
</button>

        <p className="mt-3 text-sm">
          Already account? <Link to="/login" className="hover:text-blue-600">Login</Link>
        </p>

      </form>
    </div>
  );
}