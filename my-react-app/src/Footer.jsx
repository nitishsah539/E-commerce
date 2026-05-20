import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCartArrowDown, faShop } from "@fortawesome/free-solid-svg-icons";
import { faFirstOrder } from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-white flex justify-around py-3 shadow">

      <Link to="/home">
      <FontAwesomeIcon icon={faHouse} />

       Home
       </Link>
      <Link to="/order">
      <FontAwesomeIcon icon={faFirstOrder} />
      Orders
      </Link>
      <Link to="/cart">
      <FontAwesomeIcon icon={faCartArrowDown} />
      Cart
      </Link>
      <Link to="/shopSelect">
      <FontAwesomeIcon icon={faShop} />
       Shops
       </Link>

    </div>
  );
}