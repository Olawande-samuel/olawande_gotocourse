import styled from "styled-components"
import Benefit from "../Benefits"
import Develop from "../Develop"
import Experience from "../Experience"
import Faq from "../Faq"
import Footer from "../Footer"
import Hero from "../Hero"
import Join from "../Join"
import StandOut from "../StandOut"
import Review from "../Review"
import What from "../What"
import Other from "../Other"
import Course from "../Course"
// import Navbar from "./Navbar"

const Container = styled.section`
  background: #EFF2FF;
  
`

const Abroad = () => {
    return (
        <Container>
            <Hero />
            <StandOut/>
            <What/>
            <Course/>
            <Experience/>
            <Develop/>
            <Other/>
            <Review/>
            {/* <Benefit/> */}
            <Join/>
            <Faq/>
            <Footer />

        </Container>

    )
}

export default Abroad



