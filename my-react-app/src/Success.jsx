import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100">

      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <button
        onClick={() => navigate("/home")}
        className="bg-green-600 text-white px-6 py-2 rounded-lg">
        Back to Home
      </button>

    </div>
  );
}