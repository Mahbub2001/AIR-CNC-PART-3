import { StarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchCard = ({ home }) => {
  return (
    <div className='flex overflow-hidden bg-white rounded-lg shadow-lg my-4'>
      <Link
        to={`/service-details/${home?._id}`}
        className='block relative h-48 rounded overflow-hidden w-1/2'
      >
        <img
          alt='e-commerce'
          className='object-cover object-center w-full h-full block'
          src={home?.image}
        />
      </Link>
      <div className='w-1/2 px-2 flex flex-col justify-around'>
        <div>
          <h2 className='text-gray-900 title-font text-lg font-medium'>
            {home?.title}
          </h2>
          <h3 className='text-gray-400 text-xs tracking-widest title-font mb-1 mt-1'>
            {home?.total_guest} Guests {home?.bedrooms} Bedrooms{' '}
            {home?.bathrooms} bath
          </h3>
          <h3 className='text-gray-400 text-xs tracking-widest title-font mb-1 mt-1'>
            Wifi | Air condition | Kitchen
          </h3>
          <br />
          <h3 className='text-gray-400 text-xs tracking-widest title-font mb-1 mt-1'>
            Cancellation Flexibility: Available
          </h3>
        </div>

        <div className='flex justify-between'>
          <div className='flex gap-1 mt-1'>
            <StarIcon className='h4 w-4 text-green-500' /> <span>4.8 (10)</span>
          </div>
          <p className='mt-1'>${home?.price} per night.</p>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
