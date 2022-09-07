import React from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import End from "./End"
import { useAuth } from '../contexts/Auth'
const Layout = ({children, background}) => {
  const {generalState: { navHeight },}= useAuth()
  const height = localStorage.getItem("g2cNavHeight")
  return (
    <>
    <Navbar background={background} />
    {/* <section className="layout_main" style={{marginTop: `${+height}px`}}> */}
    <section className="layout_main" style={{marginTop: `${+height - 1}px`}}>
        {children}
    </section>
    <Footer />
    <End />
    </>
  )
}

export default Layout