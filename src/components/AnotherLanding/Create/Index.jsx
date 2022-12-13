import Footer from "../Footer"
import Join from "../Join"
import JoinEducator from "../JoinEducator"
import Navbar from "../Navbar"
import Sell from "../Sell"
import Business from "./Business"
import Community from "./Community"
import Course from "./Course"
import Create from "./Create"
import Hero from "./Hero"


const CreatePage = () => {
    return (
        <>
            <Navbar />
            <Hero/>
            <Create/>
            <Business/>
            <Course/>
            <Join/>
            <Sell/>
            <Community/>
            <JoinEducator/>
            <Footer/> 
            
        </>
    )
}

export default CreatePage