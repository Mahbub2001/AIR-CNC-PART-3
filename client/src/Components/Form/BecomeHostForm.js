import React from 'react'

const BecomeHostForm = ({ handleSubmit }) => {
  return (
    <>
      <div className='flex justify-center mt-6'>
        <div className='w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50'>
          <form
            onSubmit={handleSubmit}
            className='space-y-6 ng-untouched ng-pristine ng-valid'
          >
            <div className='space-y-1 text-sm'>
              <label htmlFor='location' className='block text-gray-600'>
                Location
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                name='location'
                id='location'
                type='text'
                placeholder='Location'
                required
              />
            </div>

            <p>Upload ID Document</p>

            <div className='flex space-x-4 items-center'>
              <label
                htmlFor='image'
                className='p-3 text-center rounded-md cursor-pointer text-gray-500 font-bold border  border-green-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 hover:border-white hover:text-white'
              >
                <input
                  type='file'
                  name='image'
                  id='image'
                  accept='image/*'
                  hidden
                />
              </label>
            </div>

            <div>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox' required />
                <span className='block ml-2 text-xs font-medium text-gray-700 cursor-pointer'>
                  Agree to Privacy Policy
                </span>
              </label>
            </div>

            <button
              type='submit'
              className='block w-full p-3 text-center font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-r from-emerald-500 to-lime-500 hover:bg-gray-200 hover:text-gray-700 focus:shadow-outline focus:outline-none'
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default BecomeHostForm
