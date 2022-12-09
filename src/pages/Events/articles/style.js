import styled from "styled-components";


export const Header = styled.header`
    display: flex;
    justify-content: center;

    h4 {
        font-weight: 700;
        text-align: center;
        width:min(100%, 500px)
    }

`

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;


    div {
        border-radius:  20px;
        width:min(100%, 800px);
        margin-inline: auto;
        height: 360px;
        display: flex;
        justify-content: center;
    }
    img {
        max-width:100%;
        height:auto;
        border-radius: 20px;
        object-fit: contain;
    }

`

export const DateAndAction = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:min(100%, 800px);
    margin-inline: auto;
    margin-top: 1.5rem;
    padding-inline: 1rem;
    
    > span:first-child {
        font-size: 12px;
        font-weight: 600;
        color: #464646;
        display:flex;
        justify-content: space-between;
        align-items: center;
        gap: .7rem;
    }

    > span:last-child {
        padding: 8px 10px;
        background-color: var(--theme-blue);
        color: #fff;
        border-radius: 8px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.4rem;
    }

`

export const Content = styled.section`
    p {
        margin-bottom: 1rem;
        margin-top:3rem;
        color: #86868B;
        width:min(100%, 800px);
        margin-inline: auto;

    }
`
export const MoreLikeThis = styled.section`
    margin-block: 2rem;

    header {
        display:flex;
        justify-content: center;
        margin-bottom: 1rem;

        h4 {
            font-weight: 700;
            text-align:center;
            margin-bottom: 0;
        }
    }


    article {
        width: 100%;
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(289px, 100%), 1fr));
        gap: 3rem;
    }



`