import React from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import End from "./End"
import { useAuth } from '../contexts/Auth'
const Layout = ({children}) => {
  const {generalState: { navHeight },}= useAuth()
  const height = localStorage.getItem("g2cNavHeight")
  return (
    <>
    <Navbar />
    <section className="layout_main" style={{marginTop: `${+height + 2.5}px`}}>
        {children}
    </section>
    <Footer />
    <End />
    </>
  )
}

export default Layout