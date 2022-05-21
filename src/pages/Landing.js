import React from 'react'
import Becoming from '../components/Becoming'
import Career from '../components/Career'
import Learn from '../components/Learn'
import Navbar from '../components/Navbar'
import Serivces from '../components/Serivces'
import Testimonials from '../components/Testimonials'
import Transition from '../components/Transition'

const Landing = () => {
  return (
    <div>
        <Navbar />
        <Serivces />
        <Learn />
        <Transition />
        <Becoming />
        <Career />
        <Testimonials />
    </div>
  )
}

export default Landing