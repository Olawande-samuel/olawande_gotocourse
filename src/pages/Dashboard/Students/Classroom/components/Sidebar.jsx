import React from 'react';
import styled from 'styled-components';
import {BiArrowBack} from 'react-icons/bi';
import { Button } from '@mui/material';




import {Module} from './';
import { useNavigate } from 'react-router-dom';



const SidebarContainer = styled.div`
    background-color: rgb(236, 239, 255);
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height:100%;
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


let modules = [
    {
        title: 'Cybersecurity',
        attachments: [
            {
                type: 'video',
                isLocked: false,
                title: 'Test 2',
                isComplete: true
            }
        ]
    },
    {
        title: 'Benefits of Cybersecurity',
        attachments: [
            {
                type: 'quiz',
                isLocked: false,
                title: 'Hey',
                isComplete: false
            },
            {
                type: 'video',
                isLocked: false,
                title: 'Poll',
                isComplete: false
            },
        ]
    },
    {
        title: 'Origin of the web',
        attachments: [
            {
                type: 'video',
                isLocked: false,
                title: 'Bootcamp',
                isComplete: true
            },
            {
                type: 'quiz',
                isLocked: false,
                title: 'my quiz',
                isComplete: true
            },
            {
                type: 'video',
                isLocked: false,
                title: 'My video content',
                isComplete: true
            },
            {
                type: 'note',
                isLocked: true,
                title: 'new note',
                isComplete: true
            },
            {
                type: 'note',
                isLocked: false,
                title: 'new note',
                isComplete: true
            },
        ]
    },
    {
        title: 'Unsafe Practices',
        attachments: [
            {
                type: 'video',
                isLocked: true,
                title: 'Hello',
                isComplete: false
            },
            {
                type: 'quiz',
                isLocked: false,
                title: 'Bllnbl',
                isComplete: false
            },
        ]
    },
    {
        title: "Conclusion",
        attachments: []
    }
]


const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <SidebarContainer>
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
                    modules.map(({title, attachments}, i) => <Module title={title} attachments={attachments} key={i} />)
                }
            </SidebarBody>
        </SidebarContainer>
    )
}



export default Sidebar;