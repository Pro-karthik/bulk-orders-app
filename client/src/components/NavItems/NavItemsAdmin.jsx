import { Link } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";

const NavItemsAdmin = (props) => {
  const {close} = props
  return (
        <ul className="w-100%">
          <li className="p-2 hover:bg-gray-200 md:text-lg md:hover:bg-[#89F35F]"><Link onClick={() => close()} className='pl-5 flex flex-row items-center gap-3' to='/admin'><MdDashboardCustomize/> Dashboard</Link></li>
          <li className="p-2 hover:bg-gray-200 md:text-lg md:hover:bg-[#89F35F]"><Link onClick={() => close()} className='pl-5 flex flex-row items-center gap-3' to="/admin/products"><GiFruitBowl/> Manage Products</Link></li>
          <li className="p-2 hover:bg-gray-200 md:text-lg md:hover:bg-[#89F35F]"><Link onClick={() => close()} className='pl-5 flex flex-row items-center gap-3' to="/admin/orders"><FaCartShopping/> Manage Orders</Link></li>
        </ul>
  );
}

export default NavItemsAdmin;