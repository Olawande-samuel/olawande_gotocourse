import React from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import End from "./End"
import { useAuth } from '../contexts/AuthContext'
const Layout = ({children}) => {
  const {generalState: { navHeight },}= useAuth()
  return (
    <>
    <Navbar />
    <section className="layout_main" style={{marginTop: `${navHeight + 1}px`}}>
        {children}
    </section>
    <Footer />
    <End />
    </>
  )
}

export default Layout