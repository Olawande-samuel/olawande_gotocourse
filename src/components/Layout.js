import React from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import End from "./End"
const Layout = ({children}) => {
  return (
    <>
    <Navbar />
        {children}
    <Footer />
    <End />
    </>
  )
}

export default Layout