import styled from "styled-components"
// import Benefit from "../Benefits"
import Develop from "../Develop"
import Experience from "../Experience"
import Faq from "../Faq"
import Footer from "../Footer"
import Hero from "../Hero"
import Join from "../Join"
// import StandOut from "../StandOut"
import Review from "../Review"
// import What from "../What"
// import Other from "../Other"
// import Course from "../Course"
// import { Boxes } from "../Boxes"
import { SecondBox } from "../SecondBox"
import { Become } from "../Become"
// import { Build } from "../Build"
import Classes from "../CouseCard"
import { NewBox } from "../NewBox"
// import Navbar from "./Navbar"

const Container = styled.section`
  /* background: #EFF2FF; */
  background: linear-gradient(90deg, #FFFFFF 2.32%, rgba(239, 242, 255, 0) 94.98%);

  
`

const Abroad = () => {
    return (
        <Container>
            <Hero />
            <Become/>
            <Classes/>
            <Experience/>
            {/* <SecondBox/> */}
            <NewBox/>

            {/* <StandOut/> */}
            {/* <Boxes/> */}
            {/* <What/> */}
            {/* <Course/> */}
            {/* <Build/> */}
            {/* <Develop/> */}
            {/* <Benefit/> */}
            {/* <Other/> */}
            {/* <Review/> */}
            <Faq/>
            <Join/>
            <Footer />

        </Container>

    )
}

export default Abroad



