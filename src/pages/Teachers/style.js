import styled from "styled-components"

export const Hero = styled.section`
    display: flex;
    flex-direction:column;
    justify-content:center;
    position: relative;
    background: #E4E9FF;
    color: var(--theme-blue)


    h1 {
        font-weight: 700;
        text-align:center;
        width:min(100%, 450px);
    }

    p {
        margin-bottom: 1.4rem;
        font-weight: 300;
        width:min(100%, 350px);
    }

    button {
        color: var(--theme-orange);
        padding:10px 24px;
        color:#fff;
        border-radius:4px;
        text-transform:capitalize;
    }


    .img_wrapper {
        width: min(100% - .5rem, 700px);
        margin: auto;
        margin-bottom: -30px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -30px;
        img {
            width: 100%
        }
    }
`