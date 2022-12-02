import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    position: relative;
    height: 100%;
    overflow: hidden;
`;

export const  HeadBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    padding: 0px 8%;
    top: 0px;
    left: 0px;
    width: 100%;
    background-color: #f7f5fa;

    .banner {
        display: flex;
        align-items: center;

        img {
            width: 30px;
            margin-right: 15px;
        }

        a {
            font-size: 17px;
            color: ${props => props.theme.primaryColor};
            font-weight: 600;
        }
    }

    .head-img {
        width: 30px;
        height: 30px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0px 0px 5px 7px rgba(0, 0, 0, 0.05);

        img {
            display: block;
            min-width: 100%;
            min-height: 100%;
            position: absolute;
        }
    }
`;


export const Content = styled.div`
    width: 100%;
    height: calc(100% - 90px);
    flex: 1;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
`;

export const VideoWrapper = styled.div`
    /* display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end; */
    width: 100%;
    gap: 10px;
    background:#000;
    height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0px auto;
    padding: 10px 10px 88px 10px;
    display: grid;
    grid-template-columns: ${props => props.isPresenting ? '65% 30%' : '1fr'};

    /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));     */
    /* grid-auto-rows: 250px; */
    gap: 1rem;
    /* overflow-y: scroll; */
    margin-inline: auto;
    height: 100%;

    @media screen and (max-width: 800px){
        grid-template-columns: 1fr
    };

    
    .recoreded-media {
        display: none;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0px;
        left: 0px;
        ::before {
            content: "";
            background: #0006;
            display: block;
            width: 100%;
            height: 100%;
            z-index: 33;
        }

        video {
            width: 200px;
            height: 200px;
            position: absolute;
            z-index: 9999;
        }
    }
    

    @media screen and (min-width: 880px) {
        flex-direction: row;
        justify-content: flex-end;
    }

    .remote-users {
        background: #000;
        flex: 1;
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
        position: relative;
        overflow: hidden;

        img {
            min-height: 100%;
            min-width: 100%;
            object-fit: contain;
        }

        span {
            position: absolute;
            bottom: 20px;
            left: 20px;
            font-size: 13px;
            color: #09132C;
            background-color: #fff6;
            padding: 8px 10px;
            border-radius: 4px;
            backdrop-filter: blur(3px);
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 1px solid #484848;

        }
    }
`;


export const StreamWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    /* height: ${props => props.isPresenting ? '180px' : '100%'}; */
    /* flex: 1; */
    border-radius: 10px;
    gap: 10px;
    background:#000;
    position: relative;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
    grid-auto-rows: 200px;
    gap: .3rem;

    

    @media screen and (min-width: 880px) {
        flex-direction: row;
        /* width: ${props => props.isPresenting ? '240px' : '100%'}; */
        height: 100%;
    }

    /* video {
        flex: 1;
        height: 50%;
    } */


    .remote-users {
        background: #000;
        flex: 1;
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
        border: 1px solid #484848;
        position: relative;
        overflow: hidden;

        img {
            min-height: 100%;
            min-width: 100%;
            object-fit: contain;
        }

        span {
            position: absolute;
            bottom: 20px;
            left: 20px;
            font-size: 13px;
            color: #09132C;
            background-color: #fff6;
            padding: 8px 10px;
            border-radius: 4px;
            backdrop-filter: blur(3px);
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 1px solid #484848;

        }
    }
`;

export const CallBlock = styled.div`
    /* flex: 1; */
    width: 50%;
    height: 50%;
    position: relative;

    img {
        min-height: 100%;
        min-width: 100%;
        object-fit: contain;
    }

    span {
        position: absolute;
        bottom: 20px;
        left: 20px;
        font-size: 13px;
        color: #09132C;
        background-color: #fff6;
        padding: 8px 10px;
        border-radius: 4px;
        backdrop-filter: blur(3px);
    }
`;

export const UserCallBlock = styled.div`
    /* width: 130px;
    height: 80px;
    position: absolute;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 10px -2px #ccc;
    right: 20px;
    bottom: 20px;
    z-index: 999; */
    height:100%;
    position: relative;
    top: 0;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        border: 1px solid #484848;

    }

    p{
        position:absolute;
        top: ${props => props.showText ? "unset": "50%"};
        left: ${props => props.showText ? 0: "50%"};
        bottom: ${props => props.showText ? "0": "0"};
        transform: ${props => props.showText ? "unset": "translate(-50%, -50%)"};
        color:white;
    }

    @media screen and (min-width: 880px) {
        flex-direction: row;
        bottom: 20px;
    }
`;


export const UserPresentation = styled.div`
    display: ${props => props.isPresenting ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    width: 100%;
    /* height: auto; */
    flex: 1;
    background-color: #000;

    border-radius: 10px;
    overflow: hidden;
    z-index: 999;
    position: relative;

    video {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    @media screen and (min-width: 880px) {
        height: calc(100% - 1px);
    }
`;

export const AddPeople = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 9px 10px;
    border-radius: 8px;
    position: absolute;
    top: 20px;
    right: 20px;
    box-shadow: 0px 0px 20px -5px #ccc;

    span {
        color: #09132C;
        font-size: 13px;
    }
    svg {
        color: #09132C;
        font-size: 18px;
        margin-right: 4px;
    }
`;

export const ControlWrapper = styled.div`
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    gap: 20px;
    position: absolute;
    bottom: 20px;
    width: 100%;
    z-index: 9999;
    color: #fff;
    padding-inline: .5rem;

    .controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        .popup_action {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
    .controls.right_controls{
        margin-left:auto;
    }
`;
export const ControlItem = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #535353;
    background: ${props => props.isOn ? "#535353" : "red"};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;

    :first-child {
        color: #F24E1E;
    }
    :last-child {
        width: 60px;
        height: 40px;
        border-radius: 40px;
        color: #fff;
        background-color: #FF3459;
        
        svg {
            rotate: 135deg;
        }
    }
`;

export const ScreenShare = styled.div`
    width: 100%;
    height: 100%;
    /* border: 3px solid red; */
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 9000;
    background: #000;
    display: grid;
    place-items: center;
    color:#fff;
    
`