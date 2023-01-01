import styled from "styled-components";
import left from "../../images/landing/left.png";
import right from "../../images/landing/right.png";



export const HomeComponent = styled.section`
    height: 100vh;
    width: 100%;
    background-color: #fff;
    position: relative;
    background: url(${left}), url(${right});
    background-repeat: no-repeat;
    background-position: left, right;
    background-position-y: bottom;
    background-size: 13rem, 22rem;
    color: var(--theme-blue);


    @media screen and (max-width: 657px){
        background:#fff;
    }


`


export const Center = styled.section`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    padding-top: 4rem;
    height: 100%;
    padding-inline:0.8rem;

  
    h1 {
        color: var(--theme-blue);
        font-size: clamp(1.875rem, 1.5179rem + 1.7857vw, 3.125rem);
        font-weight:800;
        text-align: center;

    }


    p{
        text-align:center;
    }
    button {
        padding: 0.5rem 1.2rem;
        border-radius: 14px;
        border: 1px solid var(--theme-blue);
        background-color: #fff;
        color: var(--theme-blue);

    }

`