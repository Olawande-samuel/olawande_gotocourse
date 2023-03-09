import styled from "styled-components"
import NewBenefit from "../NewBenefit"
import AfricaFooter from "../AfricaFooter"
import MainHero from "../MainHero"
import Train from "../Train"
import { TrainCompanies } from "../../NewCompanies"
import { TrainCategory } from "../../NewLanding/Tabs"
import Comment from "../Comment"
// import Navbar from "./Navbar"

const Container = styled.section`
  /* background: #EFF2FF; */
  background: linear-gradient(90deg, #FFFFFF 2.32%, rgba(239, 242, 255, 0) 94.98%);

  
`

const Africa = () => {
    return (
        <Container>
            <MainHero />
            <TrainCategory/>
            <NewBenefit/>
            <Comment/>
            <TrainCompanies/>
            <Train/>
            <AfricaFooter />

        </Container>

    )
}

export default Africa



