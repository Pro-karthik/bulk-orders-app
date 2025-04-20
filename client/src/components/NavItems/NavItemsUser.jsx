import { Link } from 'react-router-dom';
import { FaHome ,FaShoppingCart,FaWpforms } from "react-icons/fa";

const NavItemsUser = (props) => {
  const {close} = props
  return (
        <ul className="w-100%">
          <li className="p-2 hover:bg-gray-200 md:text-lg md:hover:bg-[#C5FDFF]"><Link onClick={() => close()} className='pl-5 flex flex-row items-center gap-3' to='/user'><FaHome/> Home</Link></li>
          <li className="p-2 hover:bg-gray-200 md:text-lg md:hover:bg-[#C5FDFF]"><Link onClick={() => close()} className='pl-5 flex flex-row items-center gap-3' to="/user/mycart"><FaShoppingCart/> My Cart</Link></li>
          <li className="p-2 hover:bg-gray-200 md:text-lg md:hover:bg-[#C5FDFF]"><Link onClick={() => close()} className='pl-5 flex flex-row items-center gap-3' to="/user/orders"><FaWpforms/> My Orders</Link></li>
        </ul>
  );
}

export default NavItemsUser;