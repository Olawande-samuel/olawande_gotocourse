import React, { createRef } from 'react';
import * as ReactDOM from 'react-dom'
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from '@mui/material';
import { Module } from './';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';




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
    padding: 0 .5rem;


    .back_button{
    margin-top: 1rem;
    padding: 12px;
    width: 50%;
    margin: auto;
    border: none;
    border-radius: 8px;
    background-color: var(--theme-orange);
    color: #fff ;
}
`;


export const CustomButton = styled(Button)`
    text-transform: capitalize !important;
    font-size: 0.8rem !important;
`;




const Sidebar = ({ modules,setContents,setPickedType,setBodyTitle,reduceContent, setActive, active, isMobile, progress, setLocked
}) => {
    const navigate = useNavigate()
    let elementRef = createRef(null)
    console.log({progress});

    const ProgressResult = useMemo(() => {
        let result = 0;
        if (reduceContent?.length === 0) return result;
        result =(Math.floor((progress.isCompleted / progress.total) * 100))
        console.log({result})
        return result
    }, [ reduceContent, progress.isCompleted, progress.length])

    return (
        <SidebarContainer $mobile={isMobile}>
            <SidebarTop onClick={() => navigate(-1)}> 
                <BiArrowBack  />
                back
            </SidebarTop>
            <SidebarBody>
                <CustomButton sx={{ marginInline: 'auto', width: '50%' }}>
                    Refresh topics
                </CustomButton>
                { reduceContent?.length > 0 &&
                <ProgressContainer>
                    <p>Progress:  {ProgressResult}%</p>
                    <Progress value={ProgressResult} max="100" />
                </ProgressContainer>
                }
                <div ref={elementRef}>
                    {
                        modules?.map((module, id) =>
                            <Module
                                title={module.name}
                                // active={active}
                                // setActive={setActive}
                                contentsData={module.contents}
                                key={id}
                                setContents={setContents}
                                setPickedType={setPickedType}
                                module={id}
                                reduceContent={reduceContent}
                                setBodyTitle={setBodyTitle}
                                setLocked={setLocked}


                            />)
                    }

                </div>

                <button className="back_button" style={{ width: "100%" }} onClick={() =>navigate('/student')}>Back to Dashboard</button>

            </SidebarBody>
        </SidebarContainer>
    )
}





export default Sidebar;