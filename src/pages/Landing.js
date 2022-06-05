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
import Layout from '../components/Layout'
import Bootcamp from '../components/Bootcamp'
const Landing = () => {
  return (
    <div>
        <Layout>
        <Hero />
        <Bootcamp />
        <Services />
        <Learn />
        <Transition />
        <Becoming />
        <Career />
        <Mentors />
        <Testimonials />
        <Degree />
        <Faq />
        </Layout>
    </div>
  )
}

export default Landing