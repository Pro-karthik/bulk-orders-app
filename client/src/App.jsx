import { useState } from 'react'
import { Routes, Route ,Navigate} from 'react-router-dom'
import './App.css'

import InitialPage from './components/initialPage'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './pages/admin/AdminLayout/AdminLayout'
import BuyerLayout from './pages/buyer/UserLayout/UserLayout'
import ProductCatalogue from './pages/buyer/ProductCatalogue'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrderMng from './pages/admin/AdminOrderMng'
import MyCart from './pages/buyer/MyCart'
import MyOrders from './pages/buyer/MyOrders'
import NotFound from './components/NotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/admin' element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>}
        >
            <Route index element={<Dashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='orders' element={<AdminOrderMng />} />
        </Route>
        <Route path='/user' element={
          <ProtectedRoute allowedRoles={['ADMIN','USER']}>
            <BuyerLayout />
          </ProtectedRoute>}
        >
            <Route index element={<ProductCatalogue />} />
            <Route path='mycart' element={<MyCart />} />
            <Route path='orders' element={<MyOrders/>}/>
        </Route>
        <Route path='/not-found' element={<NotFound/>}/>
        <Route path='*' element={<Navigate to='/not-found' replace />}/>
      </Routes>
    </>
  )
}

export default App
