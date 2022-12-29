import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdCollectionsBookmark } from 'react-icons/md';
import { Paper } from '@mui/material';
import { MdAttachFile, MdNote, MdQuiz, MdOutlineLock, MdCheckCircle } from 'react-icons/md';
import { Attachment } from "./";
import { useLocalStorage } from '../../../../../hooks';
import { KEY } from '../../../../../constants';
import { useAuth } from '../../../../../contexts/Auth';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const ModuleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
`;

const ModuleInfo = styled.div`
    border-bottom: 1px solid rgba(0,0,0,.12);
    width: 100%;
    padding: 20px;
    color: #222;
`;

const ModuleAttachments = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
`
const AttachmentContainer = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: ${({ active }) => active ? 'rgb(226, 231, 255)' : 'transparent !important'};
    border-radius: 10px !important;
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;
`;


const AttachmentInfo = styled.div`
    display: flex;
    align-items: center;

    & > svg {
        color: var(--textBlue);
    }

    & h5 {
        font-weight: 300;
        font-size: 0.85rem;
        margin: 0;
        margin-left: 10px;
    }
`;


const CompleteIcon = styled(MdCheckCircle)`
    color: ${props => props.$isComplete ? 'var(--textBlue)' : 'rgba(0,0,0,.2)'}
`

const Locked = styled(MdOutlineLock)`
    color: rgba(0,0,0,.2);
`



const Module = ({ title, setContents, moduleIndex, setPickedType, contentsData,
    // setActive, active,
}) => {
    const [active, setActive] = useState(false)
    const navigate = useNavigate()


    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)
    const { consoleFunctions: { fetchStudentDomains, fetchStudentQuiz, fetchStudentFile, fetchStudentNote, markAsCompleted }, } = useAuth();


    let icon = (type) => {
        return type === "FILE_VIDEO" ? <MdAttachFile /> : type === "NOTE" ? <MdNote /> : <MdQuiz />
    }


    let statusIcon = (marked) => marked ? <CompleteIcon $isComplete={marked} /> : <CompleteIcon />



    console.log("data", contentsData[0]);


    return (
        <ModuleContainer  >
            <ModuleInfo>
                <MdCollectionsBookmark /> {title}
            </ModuleInfo>
            <ModuleAttachments>
                {/* {
                    attach.filter(a => a.domain === attachments._id).map((a, i) => (<Attachment active={activeMedia} changeActive={changeActive}
                        fetchData={fetchData}
                        key={i} {...a} />))
                } */}

                {contentsData?.map((content, index) => (

                    <AttachmentContainer key={index} variant="outlined"
                        active={active ? true : false}
                        onClick={() => {
                           navigate(`/student/class-console/class/:id?contentId=${content.contentId}`) 
                            // navigate(`/student/console/class-console/class/${args[3]}?content=${args[0]}`)
                            setActive(true)
                            setContents(content?.items)
                            setPickedType(content?.type)
                        }}>
                        <AttachmentInfo >
                            {icon(content?.type)}
                            <h5>{content?.title}</h5>
                        </AttachmentInfo>
                        {statusIcon(false)}
                    </AttachmentContainer>

                ))}
            </ModuleAttachments>
        </ModuleContainer>
    )
}




export default Module;