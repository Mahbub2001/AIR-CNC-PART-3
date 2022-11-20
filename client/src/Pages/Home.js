import React, { useEffect, useState } from 'react'
import SearchForm from '../Components/Form/SearchForm'
import ExpCard from '../Components/Card/ExpCard'
import { Link } from 'react-router-dom'
import HomeCard from '../Components/Card/HomeCard'
import Spinner from '../Components/Spinner/Spinner'
import { getAllHome } from '../api/services'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allExp, setAllExp] = useState([])
  const [homes, setHomes] = useState([])

  useEffect(() => {
    setLoading(true)
    getAllHome()
      .then(data => setHomes(data))
      .catch(err => console.log(err))
    fetch('expdata.json')
      .then(res => res.json())
      .then(data => {
        setAllExp(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className='md:flex justify-center gap-10 px-6 md:px-10 lg:px-20'>
      <div className='mt-4'>
        <SearchForm />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex-1'>
          <div>
            <div className='flex justify-between px-4 mt-10'>
              <p className='text-xl font-bold'>Homes</p>
              <Link to='/all-homes'>
                <p>See All</p>
              </Link>
            </div>
            <div className='container pb-8 pt-2 mx-auto'>
              <div className='flex flex-wrap'>
                {homes.slice(0, 3).map((home, i) => (
                  <HomeCard key={i} home={home} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className='flex justify-between px-4'>
              <p className='text-xl font-bold'>Experiences</p>
              <Link to='/coming-soon'>
                <p>See All</p>
              </Link>
            </div>
            <div className='container pb-8 pt-2 mx-auto'>
              <div className='flex flex-wrap'>
                {allExp.slice(0, 4).map((exp, i) => (
                  <ExpCard key={i} exp={exp} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
