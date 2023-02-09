import styled from "styled-components"
import Benefit from "../Benefits"
import Develop from "../Develop"
import Experience from "../Experience"
import Footer from "../Footer"
import Hero from "../Hero"
import Join from "../Join"
import What from "../What"
// import Navbar from "./Navbar"

const Container = styled.section`
    
`

const Abroad = () => {
    return (
        <Container>
            <Hero />
            <Benefit/>
            <What/>
            <Develop/>
            <Experience/>
            <Join/>
            <Footer />

        </Container>

    )
}

export default Abroad



