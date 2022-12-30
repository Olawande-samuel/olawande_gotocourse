import styled from "styled-components"
import Different from "./Different"
import Echo from "./Echo"
import Experts from "./Experts"
import Explore from "./Explore"
import Faq from "./Faq"
import Footer from "./Footer"
import Hassle from "./Hassle"
import Navbar from "./Navbar"
import Top from "./Top"

const Container = styled.div`
`

const NewPathstart = () => {
    return (
        <Container>
            <Navbar/>   
            <Top/>
            <Explore/>
            <Different/>
            <Experts/>
            <Hassle/>
            <Echo/>
            <Faq/>
            <Footer/>

        </Container>
    )
}

export default NewPathstart