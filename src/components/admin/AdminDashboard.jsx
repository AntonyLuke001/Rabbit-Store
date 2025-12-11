import React from 'react'
import  { Link } from "react-router-dom"
const AdminDashboard = () => {

  const orders = [
    {
        _id:123123,
        user:{
            name:"John Doe"
        },
        totalPrice:110,
        status:"Processing"
    },
    {
        _id:123124,
        user:{
            name:"Jane Smith"
        },
        totalPrice:95,
        status:"Completed"
    }
    
  ]  

  return (
    <div className='p-6 max-w-7xl mx-auto' >

        <h1 className='text=3xl font-bold mb-6' >Admin Dashboard</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' >
          <div className='p-4 shadow-md rounded-lg' >
            <h2 className='text-xl font-semibold' >Revenue</h2>
            <p className='text-2xl' >$10000</p>
          </div>
          <div className='p-4 shadow-md rounded-lg' >
            <h2 className='text-xl font-semibold' >Total Orders</h2>
            <p className='text-2xl' >200</p>
            <Link to="/admin/orders" className="text-blue-500 hover:underline"  >Manage Orders</Link>
          </div>
          <div className='p-4 shadow-md rounded-lg' >
            <h2 className='text-xl font-semibold' >Total Products</h2>
            <p className='text-2xl' >100</p>
            <Link to="/admin/products" className="text-blue-500 hover:underline"  >Manage Products</Link>
          </div>
        </div>
        <div className='mt-6' >
          <h2 className='text-2xl font-bold mb-4' >Recent Orders</h2>
          <div className='overflow-x-auto' >
                <table className='min-w-full text-gray-500 text-left' >
                  <thead className='bg-gray-100 text-gray-700 text-xs' >
                    <tr>
                        <th className='py-3 px-4' >Order ID</th>
                        <th className='py-3 px-4' >User</th>
                        <th className='py-3 px-4' >Total Price</th>
                        <th className='py-3 px-4' >Status</th>
                    </tr>
                  </thead>
                  <tbody>
                      {orders.length>0?(
                            orders.map((order)=>
                            (
                                <tr key={order._id} 
                                className='border-b cursor-pointer hover:bg-gray-50'
                                >
                                  <td className='p-4' >{order._id}</td>
                                  <td className='p-4' >{order.user.name}</td>
                                  <td className='p-4' >${order.totalPrice}</td>
                                  <td className='p-4' >{order.status}</td>
                                </tr>
                            ))

                      )
                      :
                      (
                        <tr className='p-4 text-center text-gray-500' colspan={4} >No recent orders found</tr>
                      )}
                  </tbody>
                </table>
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard