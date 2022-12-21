import styled from "styled-components"
import { useAuth } from "../../../contexts/Auth"
import Footer from "../AnotherLanding/Footer"
import Navbar from "../AnotherLanding/Navbar"
import SideBar from "../AnotherLanding/Sidebar"
import JoinEducator from "../Create/JoinEducator"
import Hero from "./Hero"
import Price from "./Price"

const Container = styled.div`


`

const Pricing = () => {
    const { generalState: { loading, showSidebar }, generalState, setGeneralState } = useAuth();

    const toggleSidebar = () => {
        setGeneralState({ ...generalState, showSidebar: !showSidebar });
    };
    return (
        <Container>
            <Navbar toggleSidebar={toggleSidebar} />
            <SideBar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            <Hero />
            <Price />
            <JoinEducator />
            <Footer />

        </Container>
    )
}

export default Pricing