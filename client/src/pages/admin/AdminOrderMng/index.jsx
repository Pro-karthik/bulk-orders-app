import axios from "../../../axiosInstance";
import Cookies from "js-cookie";
import { use, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import OrderTable from "../../../components/OrderTable";


const apiStatusConstants = {
  initial : 'INITIAL',
  loading : 'LOADING',
  success : 'SUCCESS',
  failure : 'FAILURE'
}

const getNextStatus = (status) => {
  if (status === 'Pending') return 'InProgress';
  if (status === 'InProgress') return 'Delivered';
  return 'Delivered';
};


const AdminOrderMng = () => {
  const [orders, setOrders] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const token = Cookies.get("jwt_token");

  const fetchOrders = async () => {
    setApiStatus(apiStatusConstants.loading);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get("/api/orders", { headers });
      setOrders(response.data);
      console.log(response.data);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  }

  const updateStatus = async (id, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.put(`/api/orders/${id}`, { status: nextStatus }, { headers });
      if (response.status === 200) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status: nextStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
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
      onClick={fetchOrders}
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
    <div className='p-3'>
         <OrderTable orders={orders} updateStatus={updateStatus}/>
    </div>
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
    <div className="p-3">
      <h1 className="text-lg font-bold md:text-2xl">Admin Order Management</h1>
      {renderThings()}
    </div>
  );
}

export default AdminOrderMng;