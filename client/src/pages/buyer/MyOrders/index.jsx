import {PropagateLoader} from 'react-spinners'
import Cookies from 'js-cookie'
import axios from '../../../axiosInstance';

import { useEffect, useState } from "react";
import OrderCard from '../../../components/OrderCard';
const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};


const MyOrders = () => {
   const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
     const [orders, setOrders] = useState([]);
     const token = Cookies.get('jwt_token')
     
   
     const fetchOrders = async () => {
       setApiStatus(apiStatusConstants.loading);
         const headers = {
           Authorization : `Bearer ${token}`,
           'Content-Type' : 'application/json'
         }
         try{
             const response = await axios.get('/api/orders', { headers });
             if(response.status === 200){
               setOrders(response.data)
               setApiStatus(apiStatusConstants.success)
               console.log(response.data)
             }
         }
         catch(err){
           console.log(err)
           setApiStatus(apiStatusConstants.failure)
         }
     }
   
     useEffect(() => {
        fetchOrders()
     },[])
   
     const FailuerView = () => (
       <div className="flex flex-col justify-center items-center text-center h-120 ">
       <img
       className="w-1/2 h-1/2"
         src='https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
         alt="failure view"
       />
       <h1 className="font-bold text-xl mt-2">Oops! Something Went Wrong</h1>
       <p className="mt-3">
         We are having some trouble to complete your request. Please try again.
       </p>
       <button
         type="button"
         className="rounded bg-blue-500 text-white px-4 py-2 mt-4 hover:bg-blue-700"
         onClick={fetchProducts}
       >
         Retry
       </button>
     </div>
     )
   
     const LoadingView = () => (
       <div className="text-center h-150 flex justify-center items-center">
          <PropagateLoader color="#36d7b7" size={15}/>
       </div>
     )
   
     const SuccessView = () => (
       <>
         <h1 className='font-bold text-xl pt-3 pb-3 md:text-3xl'>Orders</h1>
         <ul className='list-none flex justify-center items-center flex-col flex-wrap gap-4 md:flex-row gap-6'>
             {
               orders.map((item) => (<OrderCard key={item.id} details={item}/>))
             }
         </ul>
       </>
     )
   
     const renderThings = () => {
       switch (apiStatus) {
         case apiStatusConstants.loading:
           return <LoadingView/>;
         case apiStatusConstants.success:
           return <SuccessView/>;
         case apiStatusConstants.failure:
           return <FailuerView/>
         default:
           return null;
       }
     }

     return (
        <div className='p-3'>
           {renderThings()}
        </div>
     )
}

export default MyOrders