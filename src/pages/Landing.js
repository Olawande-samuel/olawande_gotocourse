import React from 'react'
import Becoming from '../components/Becoming'
import Career from '../components/Career'
import Degree from '../components/Degree'
import End from '../components/End'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Learn from '../components/Learn'
import Mentors from '../components/Mentors'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import Transition from '../components/Transition'
import Join from "../components/Join"
import Classroom from '../components/Classroom'
const Landing = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Services />
        <Learn />
        <Transition />
        <Becoming />
        {/* <Classroom /> */}
        <Career />
        <Mentors />
        <Testimonials />
        <Degree />
        <Faq />
        <Footer />
        <End />
    </div>
  )
}

export default Landing