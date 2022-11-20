import React, { useContext, useEffect, useState } from 'react'
import { imageUpload } from '../../api/imageUpload'
import { getRole, hostRequest } from '../../api/user'
import BecomeHostForm from '../../Components/Form/BecomeHostForm'
import { AuthContext } from '../../contexts/AuthProvider'

const BecomeAHost = () => {
  const { user } = useContext(AuthContext)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getRole(user?.email).then(data => {
      setRole(data)
      setLoading(false)
    })
  }, [user])
  const handleSubmit = event => {
    event.preventDefault()
    const location = event.target.location.value

    // Image Upload
    const image = event.target.image.files[0]
    // Upload ID image
    imageUpload(image)
      .then(result => {
        const hostData = {
          email: user?.email,
          location: location,
          documentImg: result.data.display_url,
          role: 'requested',
        }
        // Send request do server
        hostRequest(hostData)
          .then(data => console.log(data))
          .catch(err => console.log(err))

        setRole('requested')
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      {role ? (
        <div className='h-screen text-gray-600 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
          Request Sent, wait for admin approval
        </div>
      ) : (
        <>{!loading && <BecomeHostForm handleSubmit={handleSubmit} />}</>
      )}
    </>
  )
}

export default BecomeAHost
