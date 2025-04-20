import { Outlet,  useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/orderWebpage"
import {MobileNavItemsPopup,LogoutBtnLg,LogoutBtnSm} from "../../../components/Popup"
import NavItemsAdmin from "../../../components/NavItems/NavItemsAdmin"

const AdminLayout = () => {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const LogoutHandler = () => {
      logoutUser()
      navigate("/login")
  }

  return (
    <div className="h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="h-1/10 bg-[#4DEB0E] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-md font-bold md:text-xl">Agrofix fresh</h1>
        <div className="flex items-center space-x-4 md:hidden">
           <LogoutBtnSm LogoutHandler={LogoutHandler}/>
           <MobileNavItemsPopup/>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm md:text-lg">Hello, {user?.email}</span>
          <LogoutBtnLg LogoutHandler={LogoutHandler}/>
          </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex h-9/10">
        <aside className="h-full w-60 bg-[#C2F6AD] shadow-md hidden flex flex-col justify-between items-between md:block">
          <NavItemsAdmin/>
          <div className="flex flex-col items-center justify-center h-8/10 p-2">
            <h1 className="mt-auto text-center bottom-0 text-lg">© 2025 Agrofix fresh. All rights reserved. </h1>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
