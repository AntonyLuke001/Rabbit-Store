import React, { useEffect, useRef, useState } from 'react'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
const NewProducts = () => {

    const scrollRef = useRef(null);
    const [isDragging,setIsDragging] = useState(false);
    const [startX,setStartX] = useState(0);
    const [scrollLeft,setScrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight,setCanScrollRight] = useState(true);

    const newArrivals =[
        {
            _id:"1",
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=1",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:"2",
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=2",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:"3",
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=3",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:"4",
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=4",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:"5",
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=5",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:"6",
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=6",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:"7",
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=7",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:"8",
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=8",
                    altText:"Stylish Jacket"
                }
            ]
        }
    ];

    const handleMouseDown = (e) =>
    {
        setIsDragging(true);
        setStartX(e.pageX- scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft);

    }

    const handleMouseMove = (e)=>
    {
        if(!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;   
    }

    const    handleMouseUpOrLeave = ()=>
    {
        setIsDragging(false );
    }

    const scroll = (direction) => {
        const container = scrollRef.current;
        if(container){     
        const amount = Math.round(container.clientWidth*0.8);       
        const scrollAmount = direction === "left"?-amount:amount;
        scrollRef.current.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
    }

    const updateScrollButtons = ()=>
    {
        const container = scrollRef.current;
        if(container){
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

            setCanScrollLeft(leftScroll>0);
            setCanScrollRight(rightScrollable);
        }

    
    }

    useEffect(()=>
    {
        const container = scrollRef.current;
        if(container){
            container.addEventListener("scroll",updateScrollButtons);
            updateScrollButtons();
            return()=> container.removeEventListener("scroll",updateScrollButtons);
        }

    },[])

    return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl font-bold mb-4'>New Arrivals</h2>
            <p className='text-lg text-gray-600 mb-8'>Discover the latest styles straight off the runway, freshly added to keep your wardrobe
                on the cutting edge of fashion 
            </p>
            <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
                <button
                 onClick={()=>scroll("left")} 
                 disabled = {!canScrollLeft}
                className={`p-2 rounded border ${canScrollLeft?" bg-white text-black cursor-pointer border-gray-200" :"bg-gray-200 text-gray-800 cursor-not-allowed border-none" }`}><FaCircleChevronLeft  className='text-2xl' /></button>
                <button
                 onClick={()=>scroll("right")}
                 disabled = {!canScrollRight} 
                 className={`p-2 rounded border ${canScrollRight?" bg-white text-black cursor-pointer border-gray-200" :"bg-gray-200 text-gray-800 cursor-not-allowed border-none" }`} ><FaCircleChevronRight className='text-2xl' /></button>
            </div>
        </div>
        <div  ref={scrollRef} className={`container mx-auto overflow-x-scroll hide-scrollbar flex space-x-6 relative ${isDragging?"cursor-grabbing":"cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        
        >
            {newArrivals.map((product)=>
            (
                <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative' >
                    <img 
                    draggable='false'
                    className='w-full h-[500px] rounded-lg object-cover' src={product.images[0].url} alt={product.images[0].altText || product.name}/>
                    <div className='absolute w-full bottom-0 left-0 opacity-100 backdrop-blur-2xl text-white p-4 rounded-b-lg'>
                        <Link to={`.product/${product._id}`} className="block">
                        <h1 className='font-medium'>{product.name}</h1>
                        <p className='mt-1'>{product.price}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default NewProducts