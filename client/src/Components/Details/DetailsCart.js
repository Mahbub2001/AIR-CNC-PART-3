import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { differenceInCalendarDays, format } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '.././Button/PrimaryButton'

const DetailsCart = ({ homeData }) => {
  const navigate = useNavigate()
  let totalNights = differenceInCalendarDays(
    new Date(homeData.to),
    new Date(homeData.from)
  )

  let sub_total = parseFloat(homeData?.price) * totalNights
  let total = sub_total + 21 + 10

  const handleReserve = () => {
    const data = {
      homeData: homeData,
      totalNights: totalNights,
      totalPrice: total,
    }
    navigate('/checkout', { state: data })
  }

  return (
    <div className='p-4 md:w-1/2 lg:w-1/3 w-full h-full rounded shadow-lg'>
      <h1 className='text-gray-900 text-3xl title-font font-medium mb-2'>
        ${homeData.price}/ <span className='font-thin'>night</span>
      </h1>
      <div className='flex gap-1 mb-2'>
        <StarIcon className='h4 w-4 text-green-500' />{' '}
        <span>4.8 (43 reviews)</span>
      </div>

      <p>Dates</p>
      <div className='flex justify-between items-center p-2 border mt-1 mb-2'>
        <div> {format(new Date(homeData?.from), 'P')}</div>
        <div>
          <ArrowRightIcon className='h5 w-5' />
        </div>
        <div>{format(new Date(homeData?.to), 'P')}</div>
      </div>

      <div className='flex border-t border-gray-200 py-2'>
        <span className='text-gray-500'>Maximum Guest</span>
        <span className='ml-auto text-gray-900'>{homeData.total_guest}</span>
      </div>

      <div className='flex border-t border-gray-200 py-2'>
        <span className='text-gray-500'>
          ${homeData.price} x {totalNights} nights
        </span>
        <span className='ml-auto text-gray-900'>${sub_total}</span>
      </div>
      <div className='flex border-t border-gray-200 py-2'>
        <span className='text-gray-500'>Cleaning Fee</span>
        <span className='ml-auto text-gray-900'>$10</span>
      </div>
      <div className='flex border-t border-gray-200 py-2'>
        <span className='text-gray-500'>Service Fee</span>
        <span className='ml-auto text-gray-900'>$21</span>
      </div>
      <div className='flex border-t border-b mb-6 border-gray-200 py-2'>
        <span className='text-gray-900 font-bold'>Total</span>
        <span className='ml-auto text-gray-900'>${total}</span>
      </div>
      <div className='mt-6 mb-2'>
        <PrimaryButton
          handler={handleReserve}
          type='submit'
          classes='w-full px-4 py-2 tracking-wide transition-colors duration-300 transform rounded-md'
        >
          Reserve
        </PrimaryButton>
      </div>
      <p className='text-center text-gray-400 mb-6'>
        You won't be charged yet!
      </p>
    </div>
  )
}

export default DetailsCart
