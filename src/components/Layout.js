import React, { useState } from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import End from "./End"
import { useAuth } from '../contexts/Auth'
import { useLocation } from 'react-router-dom'



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
        <End />
      </>
      }
    </>
  )
}

export default Layout