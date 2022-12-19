import styled from "styled-components"
import Footer from "../AnotherLanding/Footer"
import Navbar from "../AnotherLanding/Navbar"
import JoinEducator from "../Create/JoinEducator"
import Hero from "./Hero"
import Price from "./Price"

const Container = styled.div`


`

const Pricing = () => {
    return (
        <Container>
            <Navbar/>
            <Hero/>
            <Price/>
            <JoinEducator/>
            <Footer/>

        </Container>
    )
}

export default Pricing