import styled from "styled-components"
import { useAuth } from "../../../contexts/Auth"
import Navbar from "./Navbar"
import SideBar from "../AnotherLanding/Sidebar"
import Courses from "./Courses"
// import Community from "./Community"
// import Course from "./Course"
// import Footer from "./Footer"
import Hero from "./Hero"
import Why from "./Why"
import Review from "./Review"
import Faq from "./Faq"
import Footer from "./Footer"


const Container = styled.div`

`


const Creator = () => {
    const { generalState: { loading, showSidebar }, generalState, setGeneralState } = useAuth();

    const toggleSidebar = () => {
        setGeneralState({ ...generalState, showSidebar: !showSidebar });
    };
    return (
        <Container >
            <Navbar toggleSidebar={toggleSidebar} />
            {/* <SideBar showSidebar={showSidebar}  toggleSidebar={toggleSidebar}/> */}
            <Hero />
            <Why/>
            <Courses/> 
            <Review />
            <Faq/>
            <Footer/>
           

        </Container>

    )
}

export default Creator