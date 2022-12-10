import styled from "styled-components"
import { Badge } from "@mui/material"
import { AiOutlineMenu } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"
// import LogoutButton from "./LogoutButton"
import { Logosm } from "../../images/components/svgs";

const Container = styled.div`
background: #0b8aaa;
color: #fff;
display: flex;
align-items: center;
justify-content: space-between;
font-family: 'Inter';
width: 100%;
padding: .5rem 2rem;

.navbarlogo{
    flex: .3;
}


ul{
    flex:.7;
    list-style-type: none;
    display: none;
    align-items: center;
    justify-content: space-between;

    .items{
        display: flex;
        align-items: center;
        justify-content: space-between; 
        gap: 2rem;

        .first__btn{
            background: transparent;
            border:2px solid white;
            border-radius: 7px;
            color: #fff;
            padding: .5rem 1rem;
            font-weight: 700;
            font-size: 18px;
            line-height: 27px;

        }

        .second__btn{
            background: #fff;
            border:2px solid white;
            color: #0C2191;
            padding: .5rem 1rem;
            font-weight: 700;
            font-size: 18px;
            line-height: 27px;

        }
    }

}

@media (min-width: 612px){
    ul{
        display: flex;
    }

    .hamburger{
        display:none;
    }
}

@media (max-width: 912px){

    ul{
        .items{
            gap: 1rem;
        }
    }

}

`

const Navbar = ({ toggleSidebar }) => {
    return (
        <Container>
            <div className="navbarlogo">
                <Logosm />
            </div>

            <ul>
                <div className="items">
                    <li>Create</li>
                    <li>Learn</li>
                    <li>Hire</li>

                </div>

                <div className="items">
                    <li>
                        Price
                    </li>

                    <li>
                        <button className="first__btn">Sign in</button>
                    </li>

                    <li>
                        <button className="second__btn">Start for free</button>
                    </li>

                </div>
            </ul>

            <div className="hamburger align-items-center">
                <i>
                    <AiOutlineMenu style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }} onClick={toggleSidebar} />
                </i>
            </div>
        </Container>

    )
}

export default Navbar