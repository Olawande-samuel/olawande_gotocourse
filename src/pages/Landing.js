import React, { useMemo } from 'react'
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
import Bootcamp from '../components/Bootcamp';
import Development from "../components/Development"
import Companies from '../components/Companies'
import Experienced from '../components/Experienced'
import Upcoming from '../components/Upcoming'
import NewLanding from '../components/NewLanding/NewLanding'

const Landing = ({mixpanel}) => {
  
  useMemo(() => mixpanel.track("Visited learn-with-gotocourse"), [])

  return (
    <div>
      <NewLanding />
        {/* <Layout>
        <Hero />
        <Experienced />
        <Bootcamp />
        <Learn />
        <Development />
        <Transition />
        <Services />
        <Companies />
        <Becoming />
        <Career />
        <Mentors />
        <Degree />
        <Testimonials />
        <Faq />
        <Upcoming />
        </Layout> */}
    </div>
  )
}

export default Landing