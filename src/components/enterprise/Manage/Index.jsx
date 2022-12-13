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


const ManagePage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Create />
            <Business />
            <Record/>
            <Admin/>
            <Team/>
            <Mail/>
            <Success/>
            <Solution/>
            <Footer />

        </>
    )
}

export default ManagePage