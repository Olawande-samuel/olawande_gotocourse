import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import Footer from './AnotherLanding/Footer'
import Navbar from './AnotherLanding/Navbar'


const Layout = ({ children, background }) => {
  const { generalState: { navHeight }, } = useAuth()
  const height = localStorage.getItem("g2cNavHeight")
  const { pathname } = useLocation()

  const payment = pathname.split('/')[3] === "payment"
  return (
    <>

      <Navbar background={background} />
      <section className="layout_main" style={{ marginTop: `${+height - 1}px` }}>
        {children}
      </section>
      {!payment && <>
        <Footer />
      </>
      }
    </>
  )
}

export default Layout