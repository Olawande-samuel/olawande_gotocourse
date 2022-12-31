import React from 'react'
import { Link } from 'react-router-dom'
import { Center, HomeComponent } from './landing.style'
import Navbar from './Navbar'

const NewHome = () => {
  return (
    <HomeComponent>
        <Navbar />
        <Center>
          <div className="d-flex flex-column align-items-center">
            <h1>Successful virtual schools  are</h1>
            <h1>built here and learners  start</h1>
            <h1>from here</h1>
          </div>
          <p>Gotocourse helps  to Create, manage , market and learn tech and business skills online</p>
          <div className='d-flex gap-3 mt-4'>
            {/* <a href="" className="d-inline-flex"> */}
            <Link to="/create-with-gotocourse">
              <button>I'm a creator</button>
            </Link>
            {/* </a> */}
            <Link to="/learn-with-gotocourse">
              <button>I'm a student</button>
            </Link>
          </div>
        </Center>
    </HomeComponent>
    
  )
}

export default NewHome