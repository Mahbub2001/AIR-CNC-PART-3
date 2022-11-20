import {
  BeakerIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  HomeIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import React from 'react'

const HomeDetails = ({ homeData }) => {
  return (
    <div className='flex-1 max-w-lg'>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-gray-900 title-font text-lg font-medium'>
            {homeData.title}
          </h2>
          <br />
          <h3 className='text-gray-400 text-xs tracking-widest title-font mb-1 mt-1'>
            {homeData.location}.
          </h3>
          <h3 className='text-gray-400 text-xs tracking-widest title-font mb-1 mt-1'>
            {homeData.total_guest} Guests {homeData.bedrooms} Bedrooms{' '}
            {homeData.bathrooms} bathrooms.
          </h3>
        </div>
        <div>
          <div className='flex flex-col items-center justify-center'>
            <img
              alt=''
              referrerPolicy='no-referrer'
              className='w-16 h-16 border rounded-full'
              src={homeData?.host?.image}
            />
            <p>{homeData?.host?.name}</p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className='flex flex-col items-start pb-4 my-2 mt-8 mx-auto max-w-7xl sm:flex-row'>
          <div className='inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1 text-neutral-600 rounded-full bg-gray-50 sm:mr-3'>
            <HomeIcon />
          </div>
          <div className='flex-grow prose sm:text-left prose-md'>
            <p className='text-gray-500 text-xl'>Entire Home</p>
            <p className='text-gray-400'>
              You will have the condominium to yourself.
            </p>
          </div>
        </div>
        <div className='flex flex-col items-start pb-4 mx-auto my-2 max-w-7xl sm:flex-row'>
          <div className='inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1 text-neutral-600 rounded-full bg-gray-50 sm:mr-3'>
            <CheckBadgeIcon />
          </div>
          <div className='flex-grow prose sm:text-left prose-md'>
            <p className='text-gray-500 text-xl'>Self check-in</p>
            <p className='text-gray-400'>You can check in with the doorman.</p>
          </div>
        </div>
        <div className='flex flex-col items-start pb-4 mx-auto my-2 max-w-7xl sm:flex-row'>
          <div className='inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1 text-neutral-600 rounded-full bg-gray-50 sm:mr-3'>
            <BeakerIcon />
          </div>
          <div className='flex-grow prose sm:text-left prose-md'>
            <p className='text-gray-500 text-xl'>Sparkling clean</p>
            <p className='text-gray-400'>
              10 recent guests said this place was sparkling clean.
            </p>
          </div>
        </div>
        <div className='flex flex-col items-start pb-4 mx-auto my-2 max-w-7xl sm:flex-row'>
          <div className='inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1 text-neutral-600 rounded-full bg-gray-50 sm:mr-3'>
            <UserIcon />
          </div>
          <div className='flex-grow prose sm:text-left prose-md'>
            <p className='text-gray-500 text-xl'>Atik is a Super host</p>
            <p className='text-gray-400'>
              Super hosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className='mt-4 text-gray-500'>
        <p>
          It's newly constructed 7 storied building maintaining building code by
          a locally famous architect. Enough lights and natural air are playing
          here. The place (apartment) is calm and noise free. You'll love my
          place for its lovely and bright looks comfortable stay.
        </p>
        <p>
          Bangladesh is a beauty with its six seasons and green. The people are
          hospitable and worm.It's newly constructed 7 storied building
          maintaining building code by a locally famous architect. Enough lights
          and natural air are playing here. The place (apartment) is calm and
          noise free. You'll love my place for its lovely and bright looks
          comfortable Stay.
        </p>
        <p>
          Bangladesh is a beauty with its six seasons and green. The people are
          hospitable and worm.
        </p>
      </div>
      <br />
      <div className='flex gap-3 items-center text-xl text-blue-600'>
        <p>Read more about the space</p>
        <ChevronDownIcon className='h-5 w-5' />
      </div>
      <br />
      <div>
        <p className='text-xl text-gray-900'>Reviews</p>
        <div className='flex gap-1 mb-2'>
          <StarIcon className='h4 w-4 text-green-500' />{' '}
          <span>
            <span>4.8 (43 reviews)</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default HomeDetails
