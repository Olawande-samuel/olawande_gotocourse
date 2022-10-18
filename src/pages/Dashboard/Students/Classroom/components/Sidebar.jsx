import React from 'react';
import styled from 'styled-components';
import {BiArrowBack} from 'react-icons/bi';
import { Button } from '@mui/material';




import {Module} from './';
import { useNavigate } from 'react-router-dom';



const SidebarContainer = styled.div`
    background-color: rgb(236, 239, 255);
    width: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height:100%;

    position: ${({$mobile}) => $mobile && 'fixed'};
    top: ${({$mobile}) => $mobile && 0};
    left: ${({$mobile}) => $mobile && 0};
    bottom: ${({$mobile}) => $mobile && 0};

    @media screen and (max-width: 960px){
        display: ${({$mobile}) => $mobile ? 'flex' : 'none'};
    }
`;


const SidebarTop = styled.div`
    padding: 20px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    margin-bottom: 30px;
    color: #222;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.5s ease-out;

    &:hover {
        background-color: rgb(226, 231, 255)
    }

    & svg {
        margin-right: 10px;
    }
`;


const Progress = styled.progress`
    accent-color: var(--textBlue);
`;


const ProgressContainer = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & p {
        margin: 0;
        // color: var(--gray);
        font-size: 0.9rem;
    }
`;

const SidebarBody = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;


export const CustomButton = styled(Button)`
    text-transform: capitalize !important;
    font-size: 0.8rem !important;
`;




const Sidebar = ({modules, changeActive, activeMedia, isMobile}) => {
    const navigate = useNavigate()
    return (
        <SidebarContainer $mobile={isMobile}>
            <SidebarTop>
                <BiArrowBack onClick={()=>navigate(-1)} />
                Dashboard
            </SidebarTop>
            <SidebarBody>
                <CustomButton sx={{marginInline: 'auto', width: '50%'}}>
                    Refresh topics
                </CustomButton>
                <ProgressContainer>
                    <p>Progress: 75%</p>
                    <Progress value="75" max="100" />
                </ProgressContainer>
                {
                    modules.map(({title, attachments}, i) => <Module title={title} activeMedia={activeMedia} attachments={attachments} changeActive={changeActive} key={i} />)
                }
            </SidebarBody>
        </SidebarContainer>
    )
}



export default Sidebar;