import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBell, faCircleUser, faCartArrowDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFirstOrder } from "@fortawesome/free-brands-svg-icons";

export default function AdminFooter() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow flex justify-around py-3 text-sm">

      <Link to="/admin" className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon icon={faHouse} />
        <span>Dashboard</span>
      </Link>

      <Link to="/admin/orders">
  <button className=" flex flex-col items-center cursor-pointer">
    <FontAwesomeIcon icon={faFirstOrder} />
   <span>View Orders</span>
  </button>
</Link>

      <Link to="/notifications" className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon icon={faBell} />
        <span>Notifications</span>
      </Link>

      <Link to="/add-product" className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon icon={faPlus} />
        <span>Add Product</span>
      </Link>

    </div>
  );
}