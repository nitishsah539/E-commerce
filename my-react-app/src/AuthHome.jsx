import { useNavigate } from "react-router-dom";

export default function AuthHome() {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-br from-green-700 to-green-900 min-h-screen flex flex-col items-center justify-center text-white">

      <h1 className="text-4xl font-bold mb-10">Welcome 🛒</h1>

      <button
        onClick={() => navigate("/login")}
        className="bg-white text-green-800 px-6 py-3 rounded-lg mb-4 w-60 font-semibold"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/signup")}
        className="bg-white text-green-800 px-6 py-3 rounded-lg mb-4 w-60 font-semibold"
      >
        Sign Up
      </button>

      <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg w-60 font-semibold">
        Continue with Google
      </button>

    </div>
  );
}