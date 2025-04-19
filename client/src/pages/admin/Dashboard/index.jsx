import {PropagateLoader} from 'react-spinners'
import {useState,useEffect} from 'react'


import { useAuth } from "../../../context/orderWebpage";

const apiStatusConstants = {
  initial : 'INITIAL',
  loading : 'LOADING',
  success : 'SUCCESS',
  failure : 'FAILURE'
}

const Dashboard = () => {
  // const {user} = useAuth()
  // const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  // const [data, setData] = useState(null)

  

  return (
    <div>
      <div className="h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
       </div>
    </div>
  )


}

export default Dashboard