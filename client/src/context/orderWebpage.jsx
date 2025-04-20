import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mycart,setMycart] = useState([])

  const loginUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      Cookies.set('jwt_token', token); 
      setUser(decoded);
      localStorage.setItem('role', decoded.role); 
      setLoading(false);
    } catch (err) {
      console.error("Invalid token");
    }
  };

  const addToCart = (product) => {
    console.log('contxt')
    setMycart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
  
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (productId) => {
    setMycart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); 
    });
  };

  const removeFromCart = (productId) => {
    setMycart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  
  const removeAllFromCart = () => {
    setMycart([])
  }


  const logoutUser = () => {
    Cookies.remove('jwt_token'); 
    localStorage.removeItem('role'); 
    setUser(null);
    setLoading(true);
  };

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        localStorage.setItem('role', decoded.role);
        setLoading(false);
      } catch {
        Cookies.remove('jwt_token');
        localStorage.removeItem('role');
      }
    }
    setLoading(false);
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser ,addToCart,decreaseQuantity,removeFromCart,removeAllFromCart,mycart}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);