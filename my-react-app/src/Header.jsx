import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,  faCircleUser,faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header({ setSearch }) {
  return (
    <div className="flex items-center justify-between bg-green-800 px-6 h-20 text-white">

      <h2 className="text-xl font-semibold">ApnaMart</h2>

      <div className="flex items-center bg-white rounded-full px-4 py-2 w-[40%]">
        <input placeholder="Search..."className="outline-none w-full text-black" onChange={(e) => setSearch(e.target.value)}/>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>

      <div  className="flex gap-6 mr-5">
      <Link to="/cart">
        <FontAwesomeIcon  icon={faCartShopping} id="cart-icon" className="hover:scale-110 transition duration-300"/>
        </Link>
        <Link to="/profile" >
        <FontAwesomeIcon icon={faCircleUser} className="hover:scale-110 transition duration-300"/>
        </Link>
        
      </div>
    </div>
  );
}