import React from 'react'
import {Routes,Route} from 'react-router-dom'
import {UserLayout} from '../components/layout/UserLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Collections from '../pages/Collections'
import ProductDetails from '../components/products/ProductDetails'
import Checkout from '../components/cart/Checkout'
import OrderConfirmationPage from '../pages/OrderConfirmationPage'
import OrderDetails from '../pages/OrderDetails'
import MyOrders from '../pages/MyOrders'

const AllRoutes = () => {
  return (
    <Routes >
      <Route path="/" element={<UserLayout/>} >
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='collections/:collection' element={<Collections/>}/>
          <Route path='product/:id' element={<ProductDetails/>} />
          <Route path='checkout' element={<Checkout/>} />
          <Route path='order-confirmation' element={<OrderConfirmationPage/>} ></Route>
          <Route path='order/:id' element={<OrderDetails/>} ></Route>
          <Route path='my-orders' element={<MyOrders/>} ></Route>
      </Route>
      </Routes>
  )
}

export default AllRoutes