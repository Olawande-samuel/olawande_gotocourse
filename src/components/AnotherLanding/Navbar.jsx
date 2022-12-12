import styled from "styled-components"
import { Badge } from "@mui/material"
import { AiOutlineMenu } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"
// import LogoutButton from "./LogoutButton"
import { Logosm } from "../../images/components/svgs";

const Container = styled.div`
color: #0C1825;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
padding: .5rem 2rem;
gap: 1rem;

.navbarlogo{
    flex: .2;
    // border: 2px solid yellow;

}


ul{
    // border: 2px solid red;
    flex:.8;
    list-style-type: none;
    display: none;
    align-items: center;
    justify-content: space-evenly;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    padding-left: unset;
    margin-bottom: unset;

    .firstitems{
        flex: .7;
        display: flex;
        align-items: center;
        justify-content: space-evenly;        
        // border: 2px solid green;

       
    }

    .seconditems{
        flex: .3;
        display: flex;
        justify-content:flex-end;
        gap: 1rem;
        // border: 2px solid purple;

        .first__btn{
            color:var(--theme-blue);
            border: 1px solid #BBBBBB;
            border-radius: 7px;
            padding: .5rem 1rem;
            font-weight: 700;
            font-size: 16px;
            line-height: 27px;

        }

        .second__btn{
            background: var(--theme-blue);;
            border:2px solid white;
            color: #fff;
            padding: .5rem 1rem;
            font-weight: 700;
            font-size: 14px;
            line-height: 27px;

        }
    }

}

@media (min-width: 780px){
    ul{
        display: flex;
    }

    .hamburger{
        display:none;
    }
}

@media (max-width: 1024px){

    ul{
        .firstitems{
            flex: .6;
        }

        .seconditems{
            flex: .4;
        }
    }

}

@media (max-width: 912px){

    ul{
        .firstitems{
            flex: .6;
        }

        .seconditems{
            gap: unset;
            flex: .4;
        }
    }

}

`

const Navbar = ({ toggleSidebar }) => {
    return (
        <Container>
            <div className="navbarlogo">
                <Logosm color="var(--theme-blue)"/>
            </div>

            <ul>
                <div className="firstitems">
                    <li><Link to={`/`}>Create</Link></li>
                    <li><Link to={`/`}>Manage</Link></li>
                    <li><Link to={`/`}>Learn with Gotocourse</Link></li>
                    <li><Link to={`/`}>Pricing</Link></li>
                </div>

                <div className="seconditems">
                      <li>
                        <button className="first__btn">Sign in</button>
                    </li>

                    <li>
                        <button className="second__btn">Register for free</button>
                    </li>

                </div>
            </ul>

            <div className="hamburger align-items-center">
                <i>
                    <AiOutlineMenu style={{ fontSize: "24px", color:"var(--theme-blue)", cursor: "pointer" }} onClick={toggleSidebar} />
                </i>
            </div>
        </Container>

    )
}

export default Navbar