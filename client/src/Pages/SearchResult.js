import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getSearchResult } from '../api/services'
import SearchCard from '../Components/Card/SearchCard'
import Spinner from '../Components/Spinner/Spinner'

const SearchResult = () => {
  const [homes, setHomes] = useState([])
  const [loading, setLoading] = useState(true)
  const { state } = useLocation()
  console.log(state)
  useEffect(() => {
    getSearchResult(state?.location)
      .then(data => {
        console.log(data)
        setHomes(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [state])
  return (
    <section className='text-gray-600 body-font'>
      {loading ? (
        <div className='h-screen'>
          <Spinner />
        </div>
      ) : (
        <div className='mx-auto flex flex-wrap'>
          <div className='lg:w-1/2 mx-auto py-4 px-16 lg:h-screen lg:overflow-y-scroll'>
            <div className='py-2'>
              <small className='text-gray-400'>
                252 stays Nov 13-17 3 Guest
              </small>
              <h2 className='text-2xl font-medium text-gray-900'>
                Stay in {state?.location}
              </h2>
            </div>
            {homes &&
              homes.map(
                (home, i) => !home?.booked && <SearchCard key={i} home={home} />
              )}
          </div>
          <div className='lg:w-1/2 w-full h-screen mb-10 lg:mb-0 overflow-hidden'>
            <img
              alt='feature'
              className='object-cover object-center h-full w-full'
              src='https://i.ibb.co/RgwmMhk/clay-banks-b5-S4-Fr-Jb7y-Q-unsplash.jpg'
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default SearchResult
