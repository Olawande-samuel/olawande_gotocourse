import Footer from "../AnotherLanding/Footer"
import Join from "../AnotherLanding/Join"
import JoinEducator from "../AnotherLanding/JoinEducator"
import Navbar from "../AnotherLanding/Navbar"
import Sell from "./Sell"
import Badge from "./Badge"
import Business from "./Business"
import Community from "./Community"
import Course from "./Course"
import Create from "./Create"
import Hero from "./Hero"
import Suite from "./Suite"
import Educator from "./Educator"
import SideBar from "../AnotherLanding/Sidebar"
import { useAuth } from "../../../contexts/Auth"


const CreatePage = () => {
    const { generalState: { loading, showSidebar }, generalState, setGeneralState } = useAuth();

    const toggleSidebar = () => {
        setGeneralState({ ...generalState, showSidebar: !showSidebar });
    };
    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />
            <SideBar showSidebar={showSidebar}  toggleSidebar={toggleSidebar}/>
            <Hero/>
            <Create/>
            <Business/>
            <Course/>
            <Suite/>
            <Badge/>
            <Sell/>
            <Join/>
            <Educator/>
            <Community/>
            <JoinEducator/>
            <Footer/> 
            
        </>
    )
}

export default CreatePage