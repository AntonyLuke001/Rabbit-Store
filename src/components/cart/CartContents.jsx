import React from 'react'
import {RiDeleteBin3Line} from "react-icons/ri";
const CartContents = () => {

    const cartProducts = [
        {
            productId:1,
            name:"T-Shirt",
            size:"Xl",
            colour:"Red",
            quantity:1,
            price:15,
            image:"https://picsum.photos/200?random=1"
        },
        {
            productId:2,
            name:"Shirt",
            size:"XXl",
            colour:"Blue",
            quantity:5,
            price:65,
            image:"https://picsum.photos/200?random=2"
        },
        {
            productId:3,
            name:"Shorts",
            size:"L",
            colour:"Green",
            quantity:3,
            price:20,
            image:"https://picsum.photos/200?random=3"
        },
        {
            productId:4,
            name:"Jean",
            size:"Xl",
            colour:"Black",
            quantity:4,
            price:10,
            image:"https://picsum.photos/200?random=4"
        },{
            productId:5,
            name:"Hoodie",
            size:"M",
            colour:"White",
            quantity:5,
            price:25,
            image:"https://picsum.photos/200?random=5"
        }

    ]
  return (
    <div>
        {cartProducts.map((product,index)=>
        (
            <div key={index} className='flex items-start justify-between py-4 border-b'>
                <div className='flex items-start'>
                    <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded'/>
                
                <div>
                    <h3>{product.name}</h3>
                    <p>Size: {product.size} | Colour: {product.colour}</p>
                    <div className='flex items-center mt-2'>
                        <button className='border rounded px-2 py-1 text-xl font-medium'>-</button>   
                        <span className='mx-4'>{product.quantity}</span>     
                        <button className='border rounded px-2 py-1 text-xl font-medium'>+</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col h-24 justify-between'>
            <p>${product.price}</p>
            <button>
                <RiDeleteBin3Line className='h-6 w-6 text-gray-600 hover:text-rabbit-red cursor-pointer '/>
            </button>
            </div>
           </div> 
        ))}
    </div>
  )
}

export default CartContents