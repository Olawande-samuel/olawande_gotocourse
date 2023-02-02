import React, { useMemo } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useIntercom } from 'react-use-intercom'
import { useAuth } from '../../contexts/Auth'
import { Center, HomeComponent } from './landing.style'
import Navbar from './Navbar'
import SideBar from './Sidebar'

const NewHome = ({mixpanel}) => {
  const { generalState: { showLandingSidebar }, generalState, setGeneralState } = useAuth();

  const toggleSidebar = () => {
      setGeneralState({ ...generalState, showLandingSidebar: !showLandingSidebar });
  };

  const location = useLocation()

  
  useMemo(() => mixpanel.track("new landing page visit", {"location": location.pathname}), [])

  const { shutdown } = useIntercom(); 

  useEffect(()=>{
    shutdown()
  })

  return (
    <HomeComponent>
        <Navbar toggleSidebar={toggleSidebar} />
        <SideBar showSidebar={showLandingSidebar}  toggleSidebar={toggleSidebar}/>
        <Center>
          <div className="d-flex flex-column align-items-center">
            <h1>Build your virtual school here</h1>
            <h1>and learners start</h1>
            <h1>from here</h1>
          </div>
          <p>Gotocourse helps  to create, manage, market and learn tech and business skills online</p>
          <div className='d-flex gap-3 mt-4'>
            {/* <a href="" className="d-inline-flex"> */}
            <Link to="/create-with-gotocourse">
              <button>I'm a school administator</button>
            </Link>
            {/* </a> */}
            <Link to="/learn-with-gotocourse">
              <button>I'm a Learner</button>
            </Link>
          </div>
        </Center>
    </HomeComponent>
    
  )
}

export default NewHome