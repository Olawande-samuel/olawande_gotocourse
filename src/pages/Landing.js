import React from 'react'
import Becoming from '../components/Becoming'
import Career from '../components/Career'
import Degree from '../components/Degree'
import End from '../components/End'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Learn from '../components/Learn'
import Navbar from '../components/Navbar'
import Serivces from '../components/Serivces'
import Testimonials from '../components/Testimonials'
import Transition from '../components/Transition'

const Landing = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Serivces />
        <Learn />
        <Transition />
        <Becoming />
        <Career />
        <Testimonials />
        <Degree />
        <Faq />
        <Footer />
        <End />
    </div>
  )
}

export default Landing