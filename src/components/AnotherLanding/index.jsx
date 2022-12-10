import styled from "styled-components"
import Community from "./Community"
import Course from "./Course"
import Create from "./Create"
import Footer from "./Footer"
import Hero from "./Hero"
import Join from "./Join"
import JoinEducator from "./JoinEducator"
import Live from "./Live"
import Navbar from "./Navbar"
import Payment from "./Payment"
import Picture from "./Picture"
import Review from "./Review"
import Teacher from "./Teacher"
import User from "./User"

const Container = styled.div`

`


const AnotherLanding =() => {
    return (
        <Container>
            <Navbar/>
            <Hero/>
            <User/>
            <Picture/>
            <Payment/>
            <Create/>
            <Live/>
            <Teacher/>
            <Course/>
            <Join/>
            <Community/>
            <Review/>
            <JoinEducator/>
            <Footer/>

        </Container>

    )
}

export default AnotherLanding