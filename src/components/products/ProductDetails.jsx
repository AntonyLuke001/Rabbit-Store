import React, { useEffect, useRef, useState } from 'react'
import { toast } from "sonner"
import ProductGrid from './ProductGrid'
const ProductDetails = () => {

  const selectedProduct = {
    name:"Stylish Jacket",
    price: 120,
    originalPrice: 150,
    description:"This is a stylish jacket perfect for any occasion",
    brand:"FashionBrand",
    material:"Leather",
    sizes:["S","M","L","XL"],
    colors:["Black","Red"],
    images:[{
        url:"https://picsum.photos/500/500?random=1",
        altText:"Stylish Jacket 1"
    },
    {
        url:"https://picsum.photos/500/500?random=2",
        altText:"Stylish Jacket 2"
    }

]
  }  

  const similarproducts = 
  [{
    _id:1,
    name:"Product 1",
    price:200,
    images :[{
        url:"https://picsum.photos/500/500?random=1"
    }]
  },
  {
    _id:2,
    name:"Product 2",
    price:200,
    images :[{
        url:"https://picsum.photos/500/500?random=2"
    }]
  },
  {
    _id:3,
    name:"Product 3",
    price:200,
    images :[{
        url:"https://picsum.photos/500/500?random=3"
    }]
  },
  {
    _id:4,
    name:"Product 4",
    price:200,
    images :[{
        url:"https://picsum.photos/500/500?random=4"
    }]
  }

]

  const [curentImage,setCurrentImage] = useState(selectedProduct.images[0].url);
  const selectedImage = useRef();

  const [selectedSize,setSelectedSize] = useState("");
  const [selectedColour,setSelectedColour] = useState("");
  const [quantity,setQuantity] = useState(1);
  const [isButtonDisabled,setIsButtonDisabled] = useState(false);

  const calquantity = (opp) =>
  {
    if(opp==="add")
        setQuantity(quantity+1);
    else if(opp==="minus" && quantity>1)
        setQuantity(quantity-1);
  }

  const handleAddTOCart = ()=>
  {
    if(!selectedSize || !selectedColour)
    {
        toast.error("Please select size and colour before adding to cart",{
            duration:3000
        });
        return;
    }    
        setIsButtonDisabled(true);

        setTimeout(()=>{
            toast.success("Product added to cart",{
                duration:3000
            });
            setIsButtonDisabled(false);
        },2000)
    }
  

    useEffect(()=>
    {
     selectedImage.current.src = curentImage;   
    },[curentImage])

  return (
    <div className='p-6'>
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg '>
            <div className='flex flex-col md:flex-row'>
                <div  className='hidden md:flex flex-col space-y-4 mr-6'>
                    {selectedProduct.images.map((image,index)=>
                    (
                        <img onClick={()=>setCurrentImage(image.url)}  key={index} src={image.url} alt={image.altText} 
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${curentImage===image.url?" border-black":"border-gray-300"}`}/>
                    ))}
                </div>
                <div className='md:w-1/2' >
                    <div className='mb-4'>
                        <img ref={selectedImage} src={selectedProduct.images[0].url} alt="Main Product"
                        className='w-full h-auto object-cover rounded-lg' />
                    </div>
                </div>
                <div className='md:hidden flex space-x-4 mb-4 overflow-x-scroll hide-scrollbar'>
                    {selectedProduct.images.map((image,index)=>
                    (
                        <img onClick={()=>setCurrentImage(image.url)}   key={index} src={image.url} alt={image.altText} 
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${curentImage===image.url?" border-black":"border-gray-300"}`}/>
                    ))}
                </div>
                <div className='md:w-1/2 md:ml-10' >
                    <h1 className='text-2xl md:text-3xl font-semibold mb-2' >
                    {selectedProduct.name}
                    </h1>
                    <p className='text-lg text-gray-600 mb-1 line-through' >
                        ${selectedProduct.originalPrice}
                    </p>
                    <p className='text-xl text-gray-800 font-medium mb-2' >
                        ${selectedProduct.price}
                    </p>
                    <p className='text-gray-600 mb-4' >{selectedProduct.description}</p>
                    <div className='mb-4'>
                        <p className='text-gray-700'>Colour:</p>
                        <div className='flex gap-2 mt-2' >
                            {selectedProduct.colors.map((color,index)=>
                            (
                                <button key={index} 
                                onClick={()=> setSelectedColour(color)}
                                className={`w-8 h-8 rounded-full border bg-${color.toLowerCase()} cursor-pointer brightness-50 border ${selectedColour===color?"border-black":"border-gray-300"}`} ></button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-4' >
                        <p className='text-gray-700' >Size:</p>
                        <div className='flex gap-2 mt-2' >
                            {selectedProduct.sizes.map((size,index)=>
                            (
                                <button onClick={()=> setSelectedSize(size)} className={`border p-3 rounded ${selectedSize===size?"text-white bg-black":"text-black"}`} key={index} >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-6' >
                        <p className='text-gray-700' >Quantity:</p>
                        <div className='flex space-x-4 mt-2' >
                            <button onClick={()=>calquantity("minus")} className='px-3 py-1 bg-gray-200 rounded text-xl' >-</button>
                            <span className='text-lg'>
                                {quantity}
                            </span>
                            <button onClick={()=>calquantity("add")} className='px-3 py-1 bg-gray-200 rounded text-xl' >+</button>
                        </div>
                    </div>
                    <button className={`mb-4 px-6 py-4 rounded-md w-full ${isButtonDisabled?"cursor-not-allowed bg-gray-300 text-white":" bg-black text-white cursor-pointer"}`} onClick={()=> handleAddTOCart()} >{isButtonDisabled?"Adding...":"ADD TO CART"}</button>
                    <div className='mt-10'>
                        <h3 className='text-xl font-bold mb-4 text-gray-700' >Characteristics:</h3>
                        <table className='w-full text-left text-sm text-gray-600'>
                            <tbody>
                        <tr>
                            <td className='py-1' >Brand</td>
                            <td className='py-1' >{selectedProduct.brand}</td>
                        </tr>
                        <tr>
                            <td className='py-1' >Material</td>
                            <td className='py-1' >{selectedProduct.material}</td>
                        </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-3xl text-center font-bold mb-4 mt-16'  >You May Also Like</h2>
                <ProductGrid products={similarproducts}/>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails