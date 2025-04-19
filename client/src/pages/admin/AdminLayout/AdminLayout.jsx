import { Outlet, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/orderWebpage"

const AdminLayout = () => {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const LogoutHandler = () => {
      logoutUser()
      navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div>
          <span className="mr-4">Welcome, {user?.email}</span>
          <button onClick={LogoutHandler} className="bg-red-600 px-3 py-1 rounded">Logout</button>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex">
        <aside className="w-60 bg-white p-4 shadow-md">
          <ul className="space-y-4">
            <li><Link to="/admin" className="text-blue-700">Dashboard</Link></li>
            <li><Link to="/admin/products" className="text-blue-700">Manage Products</Link></li>
            <li><Link to="/admin/orders" className="text-blue-700">Manage Orders</Link></li>
          </ul>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
