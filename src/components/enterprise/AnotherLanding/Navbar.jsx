import styled from "styled-components"
import { Badge } from "@mui/material"
import { AiOutlineMenu } from "react-icons/ai"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import LogoutButton from "./LogoutButton"
import { Logosm } from "../../../images/components/svgs";
import { motion } from "framer-motion";
import { useAuth } from "../../../contexts/Auth";
import { useLocalStorage } from "../../../hooks";
import { KEY } from "../../../constants";
import { FaRegUser } from "react-icons/fa";

const Container = styled.div`
color: #0C1825;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
padding: .5rem 1rem;
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
    font-family: 'Raleway';
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

            a{
                color:var(--theme-blue);      
            }

        }

        .second__btn{
            background: var(--theme-blue);;
            border:2px solid white;
            color: #fff;
            padding: .5rem 1rem;
            font-weight: 700;
            font-size: 14px;
            line-height: 27px;
            border-radius: 12px;

            a{
                color: #fff;
            }
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
    const { setGeneralState } = useAuth();
    const { getItem } = useLocalStorage();

    const value = getItem(KEY);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Container className="container">
            <div className="navbarlogo">
                <Link to={`/`}>
                    <Logosm color="var(--theme-blue)" />
                </Link>
            </div>

            <ul>
                <div className="firstitems">
                    <li><Link to={`/create`}>Create</Link></li>
                    <li><Link to={`/manage`}>Manage</Link></li>
                    <li><Link to={`/goto`}>Learn with Gotocourse</Link></li>
                    <li><Link to={`/pricing`}>Pricing</Link></li>
                </div>

                <div className="seconditems">
                    {value?.token ? (
                        <>
                            <li className="me-3 nav_link">
                                <motion.span
                                    style={{
                                        cursor: "pointer", color: "#0C2191"
                                    }}
                                    whileHover={{
                                        textShadow: "0px 0px 8px rgb(255, 255, 255)",
                                    }}
                                    transition={{ duration: 0.1 }}
                                    onClick={() => {
                                        localStorage.clear();

                                        navigate("/enterprise-login")
                                    }}
                                >
                                    Logout
                                </motion.span>
                            </li>
                            <Link
                                to={`${value.userType === "admin"
                                    ? "/admin"
                                    : value.userType === "student"
                                        ? "/student"
                                        : "/teacher"
                                    }`}
                            >
                                <motion.div
                                    whileHover={{
                                        textShadow: "0px 0px 8px rgb(255, 255, 255)"
                                    }}
                                    className="d-flex align-items-center nav_link"
                                    style={{ color: "#0C2191", fontSize: "16px" }}
                                >
                                    <i
                                        className="d-flex align-items-center justify-content-center me-2"
                                        style={{ color: "#0C2191" }}
                                    >
                                        <FaRegUser />
                                    </i>
                                    <span>{value.firstName}</span>
                                </motion.div>
                            </Link>
                        </>
                    ) :
                        (<>
                            <li>
                                <button className="first__btn"><Link to={`/enterprise-login`}>Sign in</Link> </button>
                            </li>

                            <li>
                                <button className="second__btn"><Link to={`/enterprise-signup`}>Register for free</Link></button>
                            </li>
                        </>
                        )}


                </div>
            </ul>

            <div className="hamburger align-items-center">
                <i>
                    <AiOutlineMenu style={{ fontSize: "24px", color: "var(--theme-blue)", cursor: "pointer" }} onClick={toggleSidebar} />
                </i>
            </div>
        </Container>

    )
}

export default Navbar