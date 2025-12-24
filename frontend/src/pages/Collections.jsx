import React, { useEffect, useRef,useState } from 'react'
import { FaFilter } from 'react-icons/fa6'
import FilterSidebar from '../components/products/FilterSidebar'
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';

const Collections = () => {

  const [products,setProducts] = useState([]);;
  const sidebarRef = useRef(null);
  const [isSidebarOpen , setIsSidebarOpen] = useState(false);

  const toggleSidebar = ()=>
  {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const handleClickOutside = (e)=>
  {
    if(sidebarRef.current && !sidebarRef.current.contains(e.target))
      setIsSidebarOpen(false);
  }

  useEffect(()=>
  {
    document.addEventListener("mousedown",handleClickOutside);

    return ()=>
    {
      document.removeEventListener("mousedown",handleClickOutside);
    } 
  },[])

  useEffect(()=>
  {
    setTimeout(()=>
    {
      const fetchedProducts = [
  {
    _id:1,
    name:"Product 1",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=1"
    }
  ]},
    {
    _id:2,
    name:"Product 2",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=2"
    }
    ]},
    {
    _id:3,
    name:"Product 3",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=3"
    }
    ]},
     {
    _id:4,
    name:"Product 4",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=4"
    }
    ]},
     {
    _id:5,
    name:"Product 5",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=5"
    }
    ]},
     {
    _id:6,
    name:"Product 6",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=5"
    }
    ]},
     {
    _id:7,
    name:"Product 7",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=7"
    }
    ]},
     {
    _id:8,
    name:"Product 8",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=8"
    }
    ]},
  ];

  setProducts(fetchedProducts);
    }, 3000)


  },[])

  return (
    <div className='flex flex-col lg:flex-row' >
          <button onClick={toggleSidebar}  className='lg:hidden border p-2 flex justify-center items-center' >
            <FaFilter className='mr-2'/> Filters
          </button>

          <div ref={sidebarRef} className={`${isSidebarOpen ?"translate-x-0":"-translate-x-full"} fixed z-50 inset-y-0 left-0 bg-white w-64 overflow-y-auto shadow-lg transition-transform duration-300 lg:translate-x-0 lg:static`} >
            <FilterSidebar/>
          </div>
          <div className='grow p-4' >
            <h2></h2>
            <SortOptions/>

            <ProductGrid products={products} />
          </div>

    </div>
  )
}

export default Collections