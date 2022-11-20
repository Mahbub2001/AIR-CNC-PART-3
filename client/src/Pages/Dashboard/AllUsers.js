import React, { useEffect, useState } from 'react'
import { getAllUsers, makeHost } from '../../api/user'
import SmallSpinner from '../../Components/Spinner/SmallSpinner'

const AllUsers = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers()
  }, [])
  const handleRequest = user => {
    makeHost(user).then(data => {
      console.log(data)
      getUsers()
    })
  }
  const getUsers = () => {
    setLoading(true)
    getAllUsers().then(data => {
      setUsers(data)
      setLoading(false)
    })
  }
  return (
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
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Role
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
                {users &&
                  users.map((user, i) => (
                    <tr key={i}>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {user.email}
                        </p>
                      </td>

                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {user?.role ? user.role : 'User'}
                        </p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        {user?.role && user.role === 'requested' && (
                          <span
                            onClick={() => handleRequest(user)}
                            className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                          >
                            <span
                              aria-hidden='true'
                              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                            ></span>
                            <span className='relative'>
                              {loading ? <SmallSpinner /> : ' Approve Request'}
                            </span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllUsers
