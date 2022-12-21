import { Link } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../../../contexts/Auth"
// import Community from "./Community"
// import Course from "./Course"
import Footer from "./Footer"
import Hero from "./Hero"
import Join from "./Join"
import JoinEducator from "./JoinEducator"
import List from "./List"
import Live from "./Live"
import Navbar from "./Navbar"
// import Payment from "./Payment"
// import Picture from "./Picture"
import Review from "./Review"
import Sell from "./Sell"
import Shop from "./Shop"
import SideBar from "./Sidebar"
// import Teacher from "./Teacher"
import Tools from "./Tools"
import User from "./User"

const Container = styled.div`

`

// export const Sidebar = styled.div`
// position: fixed;
// display: flex;
// z-index: 1000;
// top:0;
// bottom:0;
// left:${props => props.showSidebar ? "0" : "-10000px"};
// width: 100%;
// height: 100vh;


// .empty{
//     height: 100%;
//     width: 20%;
// }

// ul{
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap:2rem;
//     height: 100%;
//     width: 80%;
//     list-style-type: none;
//     background:var(--theme-blue);

//     a{
//         color: #fff;
//     }

//     .first__btn{
//         color:var(--theme-blue);
//         border: 1px solid #BBBBBB;
//         border-radius: 7px;
//         padding: .5rem 1rem;
//         font-weight: 700;
//         font-size: 16px;
//         line-height: 27px;

//         a{
//             color:var(--theme-blue);      
//         }

//     }

//     .second__btn{
//         background: var(--theme-blue);;
//         border:2px solid white;
//         color: #fff;
//         padding: .5rem 1rem;
//         font-weight: 700;
//         font-size: 14px;
//         line-height: 27px;
//         border-radius: 12px;

//         a{
//             color: #fff;
//         }
//     }


// }
// `


const AnotherLanding = () => {
    const { generalState: { loading, showSidebar }, generalState, setGeneralState } = useAuth();

    const toggleSidebar = () => {
        setGeneralState({ ...generalState, showSidebar: !showSidebar });
    };
    return (
        <Container >
            <Navbar toggleSidebar={toggleSidebar} />
            <SideBar showSidebar={showSidebar}  toggleSidebar={toggleSidebar}/>
            <Hero />
            <Tools />
            <User />
            <Shop/>
            {/* <Picture/> */}
            {/* <Payment/> */}
            {/* <Teacher/> */}
            {/* <Course/> */}
            <Join />
            <Live />
            {/* <Sell /> */}
            <List />
            {/* <Create/> */}
            {/* <Community/> */}
            <Review />
            <JoinEducator />
            <Footer />

        </Container>

    )
}

export default AnotherLanding