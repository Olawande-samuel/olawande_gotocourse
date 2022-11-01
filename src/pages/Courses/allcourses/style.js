import styled from "styled-components"


export const Main = styled.main`
    min-height: calc(100vh - 81px);
    display: grid;
    justify-content:center;
    grid-auto-rows: 250px;



    @media screen and (min-width: 512px) {
        grid-template-columns: repeat(auto-fit, 230px);
        gap:1rem;
        justify-content:center;
    }

    @media screen and (min-width: 580px) {
        justify-content:space-evenly;
    }



`

export const CourseWrapper = styled.div`  
    width: 100%;
    text-align:center;
    cursor: pointer;

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: center;
    }

    small {
        font-size: 11px;
        padding: 0;
    }
    
    @media screen and (min-width: 580px) {
        width: min(100%, 230px);
    }

`