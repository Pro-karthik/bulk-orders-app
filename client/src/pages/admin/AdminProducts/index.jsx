import {useState,useEffect} from 'react';
import { GridLoader } from 'react-spinners';
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
    <div className="text-center h-8/10 ">
    <img
      src='https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      alt="failure view"
    />
    <h1>Oops! Something Went Wrong</h1>
    <p>
      We are having some trouble to complete your request. Please try again.
    </p>
    <button
      type="button"
      className="retry-btn"
      onClick={this.FetchApiDetails}
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

  const renderThings = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <div className="text-center h-full "><GridLoader
        color="#4b8ecc"
        size={10}
      /></div>;
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
        <h1 className="text-lg">Product Management</h1>
        <AddProductPopup  onSubmitAddProducts={ onSubmitAddProducts} />
      </div>
      <div className="mt-4 ">
        {renderThings()}
      </div>
    </div>
  );
}

export default AdminProducts;