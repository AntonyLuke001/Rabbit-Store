import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewProducts from '../components/products/NewProducts'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeaturesSection from '../components/products/FeaturesSection'
const placeholderproducts = [
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

const Home = () => {
  return (
    <div>
        <Hero />
        <GenderCollectionSection/>
        <NewProducts/>

        <h2 className='text-3xl font-bold text-center mb-4' >Best Seller</h2>
        <ProductDetails/>

        <div className='container mx-auto' >
          <h2 className='text-3xl text-center font-bold mb-4' >Top Wears for Women</h2>
        
        <ProductGrid products={placeholderproducts} />
        </div>
        <FeaturedCollection/>
        <FeaturesSection />
    </div>
  )
}

export default Home