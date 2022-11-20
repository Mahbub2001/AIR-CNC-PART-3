import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBookings } from '../../api/bookings'
import PrimaryButton from '../../Components/Button/PrimaryButton'
import TableRow from '../../Components/TableRow'
import { AuthContext } from '../../contexts/AuthProvider'

const MyBookings = () => {
  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const fetchBookings = () =>
    getBookings(user?.email).then(data => setBookings(data))

  useEffect(() => {
    fetchBookings()
  }, [user])

  console.log(bookings)
  return (
    <>
      {bookings && Array.isArray(bookings) && bookings.length > 0 ? (
        <div className='container mx-auto px-4 sm:px-8'>
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Location
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Price
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        From
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        To
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings &&
                      bookings.map(booking => (
                        <TableRow
                          key={booking._id}
                          booking={booking}
                          fetchBookings={fetchBookings}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='h-screen text-gray-600 gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
            You haven't booked booked any home yet.
            <Link to='/all-homes'>
              <PrimaryButton classes='px-6 py-2 text-medium font-semibold rounded-full'>
                Browse Homes
              </PrimaryButton>
            </Link>
          </div>
        </>
      )}
    </>
  )
}

export default MyBookings
