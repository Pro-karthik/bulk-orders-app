import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'



const ProtectedRoute = ({allowedRoles,children}) => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" />
  }
  const role = localStorage.getItem('role')
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />
  }
  return children
}

export default ProtectedRoute