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
import { Boxes } from "../Boxes"
import { SecondBox } from "../SecondBox"
import { Become } from "../Become"
import { Build } from "../Build"
// import Navbar from "./Navbar"

const Container = styled.section`
  background: #EFF2FF;
  
`

const Abroad = () => {
    return (
        <Container>
            <Hero />
            {/* <StandOut/> */}
            <Boxes/>
            <SecondBox/>
            <Become/>
            {/* <What/> */}
            <Course/>
            <Build/>
            <Experience/>
            <Develop/>
            {/* <Benefit/> */}
            {/* <Other/> */}
            <Review/>
            {/* <Join/> */}
            <Faq/>
            <Footer />

        </Container>

    )
}

export default Abroad



