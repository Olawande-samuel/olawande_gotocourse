import styled from "styled-components"
import Different from "./Different"
import Echo from "./Echo"
import Experts from "./Experts"
import Faq from "./Faq"
import Footer from "./Footer"
import Hassle from "./Hassle"
import Navbar from "./Navbar"
import Top from "./Top"
import Weeks from "./Weeks"

const Container = styled.div`
`

const NewHeadstart = () => {
    return (
        <Container>
            <Navbar/>   
            <Top/>
            <Different/>
            <Weeks/>
            <Experts/>
            <Hassle/>
            <Echo/>
            <Faq/>
            <Footer/>

        </Container>
    )
}

export default NewHeadstart