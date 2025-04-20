import {PropagateLoader} from 'react-spinners'
import {useState,useEffect, use} from 'react'
import axios from '../../../axiosInstance'
import Cookies from 'js-cookie'

import StatCard from '../../../components/StatCard'
import { FaBox, FaHourglassHalf, FaSpinner, FaTruck, FaMoneyBillWave } from 'react-icons/fa'
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';




import { useAuth } from "../../../context/orderWebpage";

const apiStatusConstants = {
  initial : 'INITIAL',
  loading : 'LOADING',
  success : 'SUCCESS',
  failure : 'FAILURE'
}

const colors = ['#facc15', '#3b82f6', '#10b981'];

const Dashboard = () => {
  const {user} = useAuth()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [data, setData] = useState(null)

  const fetchDashboardData = async () => {
    setApiStatus(apiStatusConstants.loading)
    const token = Cookies.get('jwt_token')
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    try {
      const response = await axios.get('/api/stats', { headers })
      if(response.status === 200){
        setData(response.data)
        setApiStatus(apiStatusConstants.success)
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
       fetchDashboardData()
  }, [])  

  const SuccessView = () => {
    const {
      totalOrders,
      pendingOrders,
      inProgressOrders,
      deliveredOrders,
      totalRevenue,
      ordersByMonth,
      orderStatusDistribution,
    } = data;
    return (<>
    <h1 className="text-2xl mt-2 font-bold mb-4">Welcome to the Dashboard</h1>
    <div className="flex flex-wrap justify-between gap-4 mb-8">
      <StatCard title="Total Orders" value={totalOrders} icon={<FaBox />} color="bg-gray-800" />
      <StatCard title="Pending" value={pendingOrders} icon={<FaHourglassHalf />} color="bg-yellow-500" />
      <StatCard title="In Progress" value={inProgressOrders} icon={<FaSpinner />} color="bg-blue-500" />
      <StatCard title="Delivered" value={deliveredOrders} icon={<FaTruck />} color="bg-green-500" />
      <StatCard title="Total Revenue" value={`₹${totalRevenue}`} icon={<FaMoneyBillWave />} color="bg-purple-600" />
    </div>
   
    <div className="flex flex-col lg:flex-row gap-6">
    <div className="bg-white p-4 rounded-2xl shadow flex-1">
      <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={orderStatusDistribution}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {orderStatusDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-4 rounded-2xl shadow flex-1">
      <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ordersByMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  </>)
  }

  const LoadingView = () => (
    <div className="text-center h-9/10 flex justify-center items-center">
       <PropagateLoader color="#36d7b7" size={15}/>
    </div>
  )

  const renderDashboardContent = () => {

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoadingView/>
      case apiStatusConstants.success:
        return SuccessView()
      case apiStatusConstants.failure:
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-red-500 text-xl font-bold mb-4">Failed to fetch data</h2>
          </div>
        )
      default:
        return null
    }
  }


  return (
      <div className="h-screen p-2">
          {renderDashboardContent()}
       </div>
  
  )


}

export default Dashboard