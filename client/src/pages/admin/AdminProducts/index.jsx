import {useState,useEffect} from 'react';
import { PropagateLoader } from 'react-spinners';
import axios from '../../../axiosInstance'
import Cookies from 'js-cookie';
import {AddProductPopup} from '../../../components/Popup'

import ProductTable from '../../../components/ProductTable';

const apiStatusConstants = {
  initial : 'INITIAL',
  loading : 'LOADING',
  success : 'SUCCESS',
  failure : 'FAILURE'
}



const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const token = Cookies.get('jwt_token')
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const fetchProducts = async () => {
    setApiStatus(apiStatusConstants.loading);
    
    try {
      const response = await axios.get('/api/products',{
        headers: headers,

      }
  );
      setProducts(response.data);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error('Error fetching products:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    fetchProducts();
  },[])

  const onEdit = async (product) => {
    try{
      setApiStatus(apiStatusConstants.loading);
      
      const response = await axios.put(`/api/products/${product.id}`, product, { headers });
      if(response.status === 200){
        setProducts((prevProducts) => prevProducts.map((p) => (p.id === product.id ? response.data.product : p)));
        setApiStatus(apiStatusConstants.success);
      }
    }
    catch(error){
      setApiStatus(apiStatusConstants.failure);
      console.error('Error editing product:', error);
    }
  }
  
  const onDelete = async (productId) => {
    try{
      setApiStatus(apiStatusConstants.loading);
      const response = await axios.delete(`/api/products/${productId}`, { headers });
      if(response.status === 200){
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
        setApiStatus(apiStatusConstants.success);
      }
    }
    catch(error){
      setApiStatus(apiStatusConstants.failure);
      console.error('Error deleting product:', error);
    }
  }

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

  const onSubmitAddProducts = async (data) => {
    console.log(data)
    const token = Cookies.get('jwt_token')
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try{
      const response = await axios.post('/api/products', data, { headers });
      if(response.status === 201){
        console.log('Product added successfully:', response.data);
        fetchProducts()
      }
    }
    catch(error){
      console.error('Error adding product:', error);
    }
  }

  const LoadingView = () => (
    <div className="text-center h-150 flex justify-center items-center">
       <PropagateLoader color="#36d7b7" size={15}/>
    </div>
  )

  const renderThings = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoadingView/>;
      case apiStatusConstants.success:
        return <ProductTable products={products} onEdit={onEdit} onDelete={onDelete}/>;
      case apiStatusConstants.failure:
        return <FailuerView/>
      default:
        return null;
    }
  }

  return (
    <div className="p-2 h-full">
      <div className="p-2 flex justify-between items-center w-full ">
        <h1 className="text-lg font-bold md:text-2xl">Product Management</h1>
        <AddProductPopup  onSubmitAddProducts={ onSubmitAddProducts} />
      </div>
      <div className="mt-4 ">
        {renderThings()}
      </div>
    </div>
  );
}

export default AdminProducts;