export default function Profile() {

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const shop = localStorage.getItem("selectedShop");

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="p-4">

      <div className="bg-white p-5 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4">
          My Profile
        </h1>

        <p><b>Name:</b> {name}</p>

        <p><b>Email:</b> {email}</p>

        <p><b>Role:</b> {role}</p>

        {role === "shopkeeper" && (
          <p><b>Shop:</b> {shop}</p>
        )}

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-5 cursor-pointer"
        >
          Logout
        </button>

      </div>

    </div>
  );
}