import { Outlet, Link ,useNavigate} from "react-router-dom"
import { useAuth } from "../../../context/orderWebpage"


const BuyerLayout = () => {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const LogoutHandler = () => {
      logoutUser()
      navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <div>
          <span className="mr-4">Hi, {user?.email}</span>
          <button onClick={LogoutHandler} className="bg-red-600 px-3 py-1 rounded">Logout</button>
        </div>
      </header>

      <nav className="bg-white shadow px-6 py-2 flex gap-6">
        <Link to="/user" className="text-green-700">Home</Link>
        <Link to="/user/profile" className="text-green-700">Profile</Link>
        <Link to="/user/orders" className="text-green-700">My Orders</Link>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default BuyerLayout
