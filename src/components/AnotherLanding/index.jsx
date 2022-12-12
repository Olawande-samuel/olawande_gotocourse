import styled from "styled-components"
import Community from "./Community"
import Course from "./Course"
import Create from "./Create"
import Footer from "./Footer"
import Hero from "./Hero"
import Join from "./Join"
import JoinEducator from "./JoinEducator"
import List from "./List"
import Live from "./Live"
import Navbar from "./Navbar"
import Payment from "./Payment"
import Picture from "./Picture"
import Review from "./Review"
import Sell from "./Sell"
import Teacher from "./Teacher"
import Tools from "./Tools"
import User from "./User"

const Container = styled.div`

`


const AnotherLanding =() => {
    return (
        <Container>
            <Navbar/>
            <Hero/>
            <Tools/>
            <User/>
            {/* <Picture/> */}
            {/* <Payment/> */}
            <Live/>
            {/* <Teacher/> */}
            {/* <Course/> */}
            <Join/>
            <Sell/>
            <List/>
            {/* <Create/> */}
            {/* <Community/> */}
            <Review/>
            <JoinEducator/>
            <Footer/>

        </Container>

    )
}

export default AnotherLanding