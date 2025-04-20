import { useEffect, useState } from "react";
import { useAuth } from "../../../context/orderWebpage";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import {PlaceOrderPopup} from "../../../components/Popup";
import axios from "../../../axiosInstance";
import Cookies from 'js-cookie'



const MyCart = () => {
  const { mycart, addToCart, decreaseQuantity, removeFromCart, removeAllFromCart } = useAuth();
  const [cartState, setCartState] = useState([]);
  
  
  useEffect(() => {
    setCartState(mycart);
  }, [mycart]);

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold md:text-4xl">My Cart</h1>
      <div className="flex justify-end items-center">
        <button onClick={removeAllFromCart} className="text-blue-400 p-2 outline-0 border-0">
          Remove All
        </button>
      </div>
      {cartState.length === 0 ? (
        <div className="flex justify-center items-center h-80">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
        </div>
      ) : (
        <>
        <ul className="flex flex-col gap-4 mt-4">
          {cartState.map((item) => (
            <li key={item.id} className="flex justify-between items-center shadow-lg p-4 rounded-lg">
              <img
                src="https://m.media-amazon.com/images/I/81QTmxHxyhL._AC_SL1500_.jpg"
                alt={item.name}
                className="h-20 w-20 object-cover rounded-lg m-2"
              />
              <div className="flex flex-col justify-between h-full">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-lg"> ₹{item.price * item.quantity}</p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="text-blue-400 p-2 outline-0 border-0"
                  >
                    <CiCircleMinus />
                  </button>
                  <p className="text-lg">{item.quantity}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="text-blue-400 p-2 outline-0 border-0"
                  >
                    <CiCirclePlus />
                  </button>
                </div>
                
              </div>
              <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 p-2 outline-0 border-0"
                >
                 <MdCancel/>
                </button>
               
            </li>
          ))}
        </ul>
       <PlaceOrderPopup/>
       </>
      )}
        
    </div>
  );
};

export default MyCart;
