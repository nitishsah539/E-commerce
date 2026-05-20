import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setRole }) {

  const navigate = useNavigate();
 
  const [user, setUser] = useState({
    email: "",
    password: ""
  });


  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }


 async function handleSubmit(e) {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    });

    const data = await res.json();

    console.log("ROLE:", data.role); 

    if (!data.success) {
      alert(data.message);
      return;
    }

    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("selectedShop", data.shopName);
    setRole(data.role);

    alert("Login Successful 🎉");

    if (data.role === "shopkeeper") {
      navigate("/admin");
    } else {
      navigate("/shopSelect");
    }

  } catch {
    alert("Server error");
  }
}

  return (
    <div className="bg-green-800 min-h-screen flex items-center justify-center">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-80">

        <h2 className="text-xl mb-4">Login</h2>

        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full mb-2"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 w-full mb-2"
        />

     

        <button type="submit" className="bg-green-600 text-white w-full py-2 cursor-pointer">
          Login
        </button>
         <div className="text-left text-sm mb-2 mt-2">
          <Link to="/forgot-password" className="text-blue-600  ">
            Forgot Password?
          </Link>
        </div>

        <p className="mt-3 text-sm">
          New user? <Link to="/" className="hover:text-blue-600">Sign Up</Link>
        </p>

      </form>
    </div>
  );
}