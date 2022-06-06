import React from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import End from "./End"
import { useAuth } from '../contexts/Auth'
const Layout = ({children}) => {
  const {generalState: { navHeight },}= useAuth()
  return (
    <>
    <Navbar />
    <section className="layout_main" style={{marginTop: `${navHeight}px`}}>
        {children}
    </section>
    <Footer />
    <End />
    </>
  )
}

export default Layout