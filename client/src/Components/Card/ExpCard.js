import React from 'react'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
const ExpCard = ({ exp }) => {
  return (
    <div className='lg:w-1/4 md:w-1/2 p-4 w-full'>
      <Link
        to='/coming-soon'
        className='block relative h-32 rounded overflow-hidden'
      >
        <img
          alt='e-commerce'
          className='object-cover object-center w-full h-full block'
          src={exp.image}
        />
      </Link>
      <div className='mt-4'>
        <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
          {exp.location}
        </h3>
        <h2 className='text-gray-900 title-font text-lg font-medium'>
          {exp.title}
        </h2>
        <p className='mt-1'>${exp.price} per person</p>
        <div className='flex mt-1'>
          <StarIcon className='h3 w-3 text-green-500' />
          <StarIcon className='h3 w-3 text-green-500' />
          <StarIcon className='h3 w-3 text-green-500' />
          <StarIcon className='h3 w-3 text-green-500' />
          <StarIcon className='h3 w-3 text-green-500' />{' '}
          <span>{exp.ratings}</span>
        </div>
      </div>
    </div>
  )
}

export default ExpCard
