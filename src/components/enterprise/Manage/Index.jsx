import Footer from "../AnotherLanding/Footer"
import Navbar from "../AnotherLanding/Navbar"
import Team from "./Team"
import Business from "./Business"
import Create from "./Create"
import Hero from "./Hero"
import Mail from "./Mail"
import Record from "./Record"
import Admin from "./Admin"
import Success from "./Success"
import Solution from "./Solution"
import SideBar from "../AnotherLanding/Sidebar"
import { useAuth } from "../../../contexts/Auth"
import Testimonial from "./Testimonial"


const ManagePage = () => {
    const { generalState: { loading, showSidebar }, generalState, setGeneralState } = useAuth();

    const toggleSidebar = () => {
        setGeneralState({ ...generalState, showSidebar: !showSidebar });
    };
    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />
            <SideBar showSidebar={showSidebar}  toggleSidebar={toggleSidebar}/>
            <Hero />
            <Create />
            <Business />
            <Record/>
            <Admin/>
            <Team/>
            <Mail/>
            <Success/>
            <Solution/>
            <Testimonial/>
            <Footer />

        </>
    )
}

export default ManagePage