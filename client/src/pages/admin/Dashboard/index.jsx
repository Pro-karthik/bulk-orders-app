import {PropagateLoader} from 'react-spinners'
import {useState,useEffect, use} from 'react'
import axios from '../../../axiosInstance'
import Cookies from 'js-cookie'


import { useAuth } from "../../../context/orderWebpage";

const apiStatusConstants = {
  initial : 'INITIAL',
  loading : 'LOADING',
  success : 'SUCCESS',
  failure : 'FAILURE'
}

const Dashboard = () => {
  const {user} = useAuth()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [data, setData] = useState(null)

  const fetchDashboardData = async () => {
    setApiStatus(apiStatusConstants.loading)
    const token = Cookies.get('token')
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    try {
      const response = await axios.get('/admin/dashboard', { headers })
      if(response.status === 201){
        setData(response.data)
        setApiStatus(apiStatusConstants.success)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
       fetchDashboardData()
  }, [])  


  return (
    <div>
      <div className="h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
       </div>
    </div>
  )


}

export default Dashboard