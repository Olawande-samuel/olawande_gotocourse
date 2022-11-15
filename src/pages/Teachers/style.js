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
export const ItWorks = styled.section`

    header {
        margin-bottom: 1rem;
        text-align: center;

        h4 {
            color: var(--theme-blue);

        }
        p {
            margin-bottom: 0;
            width:min(100%, 450px);
            text-align: center;
        }
    }


    .content {
        display: grid;
        grid-template-columns: 1fr;
        gap:1rem;

        @media screen and (min-width:600px){
            grid-template-columns: 30% 65%;
        }

        img {
            width: 100%;
            object-fit: cover;
        }

    }



`

export const ItWorksList = styled.div`
    .number {
        padding: 1px 4px;
        background: var(--theme-orange);
        color:#fff;
    }

    h3 {
        font-weight: 600;
        margin-bottom: .7rem;
        color: #464646;
    }
    small {
        color:#464646;
    }
`