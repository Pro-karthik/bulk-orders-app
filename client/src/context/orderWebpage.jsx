import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);