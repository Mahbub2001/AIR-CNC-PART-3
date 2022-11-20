import React from 'react'
import { useLoaderData } from 'react-router-dom'
import HomeDetails from '../Components/Details/HomeDetails'
import DetailsCart from '../Components/Details/DetailsCart'

const Details = () => {
  const homeData = useLoaderData()

  return (
    <div>
      {/* Header */}
      <div className='flex flex-wrap h-[400px]'>
        <div className='w-1/2 h-full overflow-hidden'>
          <img
            alt='feature'
            className='object-cover object-start h-full w-full'
            src={homeData.image}
          />
        </div>
        <div className='w-1/2 h-full overflow-hidden'>
          <img
            alt='feature'
            className='object-cover object-start h-full w-full'
            src='https://i.ibb.co/DCzG2cp/christine-roy-ir5-MHI6r-Pg0-unsplash-1.jpg'
          />
        </div>
      </div>

      {/* Main Content */}
      <div className='md:flex justify-between sm:mx-10 md:mx-20 px-4 lg:mx-40 py-12'>
        {/* Details */}
        <HomeDetails homeData={homeData} />
        {/* Cart */}
        <DetailsCart homeData={homeData} />
      </div>
    </div>
  )
}

export default Details
