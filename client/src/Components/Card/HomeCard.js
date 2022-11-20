import { StarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({ home }) => {
  return (
    <div className='lg:w-1/3 md:w-1/2 p-4 w-full'>
      <Link
        to={`/service-details/${home?._id}`}
        className='block relative h-48 rounded overflow-hidden'
      >
        <img
          alt='home-img'
          className='object-cover object-center w-full h-full block'
          src={home?.image}
        />
      </Link>
      <div className='mt-4'>
        <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
          {home?.location}
        </h3>
        <h2 className='text-gray-900 title-font text-lg font-medium'>
          {home?.title}
        </h2>
        <p className='mt-1'>${home?.price} per person</p>
        <div className='flex mt-1'>
          <StarIcon className='h3 w-3 text-green-500' />
          <StarIcon className='h3 w-3 text-green-500' />
          <StarIcon className='h3 w-3 text-green-500' />
          <StarIcon className='h3 w-3 text-green-500' />
          <StarIcon className='h3 w-3 text-green-500' /> <span>64</span>
        </div>
      </div>
    </div>
  )
}

export default HomeCard
