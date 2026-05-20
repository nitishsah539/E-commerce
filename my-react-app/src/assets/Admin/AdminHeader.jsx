import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <div className="flex items-center justify-between bg-green-800 px-6 h-20 text-white">
      <h2 className="text-xl font-semibold">ApnaMart</h2>
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-[40%]">
        <input placeholder="Search products..." className="outline-none w-full text-black"/>
      </div>
      <div className="flex gap-6 text-xl justify-center">
        <Link to="/notifications">
        
        <FontAwesomeIcon icon={faBell} />
        </Link>
        <Link to="/profile">
        <FontAwesomeIcon icon={faCircleUser}  />
        </Link>
        
      </div>

    </div>
  );
}