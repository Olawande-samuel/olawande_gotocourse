import styled from "styled-components"
import Echo from "./Echo"
import Experts from "./Experts"
import Faq from "./Faq"
import Footer from "./Footer"
import Hassle from "./Hassle"
import Immersion from "./Immersion"
import Navbar from "./Navbar"
import Skill from "./Skill"
import Top from "./Top"

const Container = styled.div`
`

const NewDemand = () => {
    return (
        <Container>
            <Navbar/>   
            <Top/>
            <Skill/>
            <Immersion/>
            <Experts/>
            <Hassle/>
            <Echo/>
            <Faq/>
            <Footer/>

        </Container>
    )
}

export default NewDemand