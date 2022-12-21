import { Link } from "react-router-dom"
import styled from "styled-components"

export const Side = styled.div`
position: fixed;
display: flex;
z-index: 1000;
top:0;
bottom:0;
left:${props => props.showSidebar ? "0" : "-10000px"};
width: 100%;
height: 100vh;


.empty{
    height: 100%;
    width: 20%;
}

ul{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:2rem;
    height: 100%;
    width: 80%;
    list-style-type: none;
    background:var(--theme-blue);

    a{
        color: #fff;
    }

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
`

const SideBar = ({showSidebar, toggleSidebar}) => {
    return (
        <Side showSidebar={showSidebar}>
        <ul>

            <li><Link to={`/create`}>Create</Link></li>
            <li><Link to={`/manage`}>Manage</Link></li>
            <li><Link to={`/learn-with-gotocourse`}>Learn with Gotocourse</Link></li>
            <li><Link to={`/pricing`}>Pricing</Link></li>
            <li>
                <button className="first__btn"><Link to={`/enterprise-login`}>Sign in</Link> </button>
            </li>

            <li>
                <button className="second__btn"><Link to={`/enterprise-signup`}>Register for free</Link></button>
            </li>
        </ul>

        <div className="empty" onClick={toggleSidebar}></div>

    </Side>
    )
}

export default SideBar