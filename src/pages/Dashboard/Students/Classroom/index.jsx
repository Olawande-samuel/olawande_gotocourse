import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Breadcrumbs, IconButton, Paper } from "@mui/material";
import {MdNavigateNext, MdShare, MdMoreVert} from "react-icons/md";
import {BiCloudDownload} from "react-icons/bi";
import {FaCaretRight} from 'react-icons/fa';




import {Sidebar} from "./components";
import { CustomButton } from './components/Sidebar';
import { useEffectOnMount } from '../../../../hooks';




const ClassroomContainer = styled.div`
    width: 100%;
    height: calc(100vh - 75px);
    display: grid;
    grid-template-columns: 300px 1fr;
    margin: 0;
    margin-top: 75px;
    overflow-y: hidden;
`;

const BreadcrumbLink = styled(Link)`
    color: ${props => props.$isCurrentPage ? '#0C2191' : '#666363'};
    font-weight: 400;
    font-size: 0.9rem;
    cursor: ${(props) => props.$isCurrentPage ? 'not-allowed': 'pointer'};

    &:hover {
        color:#0C2191
    }
`;


const ClassroomMain = styled.div`
    width: min(100% - 3rem, 950px);
    margin-inline: auto;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`;


const ClassroomMainTop = styled.div`
    width: 100%;
    margin-block: 40px;
`;

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: var(--textBlue);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--white);
    box-shadow: 0px 0px 20px -5px #222;

    & h5 {
        font-weight: 300;
        font-size: 1.15rem;
    }
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;

    & svg {
        color: var(--white);
    }
`;


const ClassroomMainBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const BodyContent = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
`

const BodyInfo = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;


    & h3 {
        font-size: 1rem;
        font-weight: 300;
    }
`;


const PaperTop = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h5 {
        font-weight: 300;
        font-size: 0.9rem;
        margin: 0;
    }
`;

const PaperBody = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;


const BodyActions = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;


const Action = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
`;


const NextButton = styled(CustomButton)`
    font-size: 0.8rem !important;

    & svg {
        color: var(--textBlue);
        margin-left: 10px;
    }
`



const Classroom = () => {
    useEffectOnMount(() => {
        console.log('Student classroom is mounted');
        return () => console.log('Student classroom is unmounted')
    }, [])


    return (
        <>
        <Navbar>
            <h5>Classroom</h5>
            <NavLeft>
                <IconButton>
                    <MdShare />
                </IconButton>
                <IconButton>
                    <MdMoreVert />
                </IconButton>
            </NavLeft>
        </Navbar>
        <ClassroomContainer>
            <Sidebar />
            <ClassroomMain>
                <ClassroomMainTop>
                    <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                        <BreadcrumbLink to="/">
                            Dashboard
                        </BreadcrumbLink>
                        <BreadcrumbLink to="#">
                            Information Security Assurance
                        </BreadcrumbLink>
                        <BreadcrumbLink to="#" $isCurrentPage={true}>
                            Test
                        </BreadcrumbLink>
                    </Breadcrumbs>
                </ClassroomMainTop>
                <ClassroomMainBody>
                    <BodyInfo>
                        <h3>Introduction to Cybersecurity</h3>
                        <CustomButton>Ask tutor a question</CustomButton>
                    </BodyInfo>
                    <BodyContent>
                        <Paper variant='outlined'>
                            <PaperTop>
                                <h5>shell.svg</h5>
                                <IconButton>
                                    <MdMoreVert />
                                </IconButton>
                            </PaperTop>
                            <PaperBody>
                                <BodyActions>
                                    <IconButton>
                                        <BiCloudDownload />
                                    </IconButton>
                                    <CustomButton>Open</CustomButton>
                                </BodyActions>
                            </PaperBody>
                        </Paper>
                        <Action>
                            <NextButton variant="outlined">
                                Next Content <FaCaretRight />
                            </NextButton>
                        </Action>
                    </BodyContent>
                </ClassroomMainBody>
            </ClassroomMain>
        </ClassroomContainer>
        </>
    )
}




export default Classroom;