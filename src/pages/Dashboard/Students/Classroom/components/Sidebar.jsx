import React, { createRef } from 'react';
import * as ReactDOM from 'react-dom'
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from '@mui/material';
import { Module } from './';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';




const SidebarContainer = styled.div`
    background-color: rgb(236, 239, 255);
    width: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height:100%;

    position: ${({ $mobile }) => $mobile && 'fixed'};
    top: ${({ $mobile }) => $mobile && 0};
    left: ${({ $mobile }) => $mobile && 0};
    bottom: ${({ $mobile }) => $mobile && 0};

    @media screen and (max-width: 960px){
        display: ${({ $mobile }) => $mobile ? 'flex' : 'none'};
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




const Sidebar = ({ modules, changeActive, activeMedia, isMobile, fetchData }) => {
    const navigate = useNavigate()
    let elementRef = createRef(null)
    // console.log({elementRef});
    // console.log("children", elementRef.current);
    // console.log("children", elementRef.current.children);
    const [chid, setChid] = useState([])
    // console.log({chid});

    useEffect(() => {
        if(elementRef){
            console.log("node",ReactDOM.findDOMNode(elementRef.current));
            // setChid( ReactDOM.findDOMNode(elementRef.current.children))
            
        }

    },[elementRef])

    return (
        <SidebarContainer $mobile={isMobile}>
            <SidebarTop>
                <BiArrowBack onClick={() => navigate(-1)} />
                Dashboard
            </SidebarTop>
            <SidebarBody>
                <CustomButton sx={{ marginInline: 'auto', width: '50%' }}>
                    Refresh topics
                </CustomButton>
                <ProgressContainer>
                    <p>Progress: 75%</p>
                    <Progress value="75" max="100" />
                </ProgressContainer>
                <div ref={elementRef}>
                    {
                        modules.map((module) =>
                            <Module
                                title={module.name}
                                activeMedia={activeMedia}
                                attachments={module}
                                changeActive={changeActive}
                                key={module._id}
                                fetchData={fetchData}
                            />)
                    }

                </div>
            
            </SidebarBody>
        </SidebarContainer>
    )
}





export default Sidebar;