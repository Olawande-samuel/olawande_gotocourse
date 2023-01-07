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
import { useNavigate, useSearchParams } from 'react-router-dom';

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
    // background-color: ${({ active }) => active ? 'rgb(226, 231, 255)' : 'transparent !important'};
    // background-color: ${({ active }) => active ? 'red !important' : 'transparent !important'};
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



const Module = ({ title, setContents,reduceContent, moduleIndex, setPickedType, contentsData,setCompleted
    // setActive, active,
}) => {
    const [active, setActive] = useState(false)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();



    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)
    // const { consoleFunctions: { fetchStudentDomains, fetchStudentQuiz, fetchStudentFile, fetchStudentNote, markAsCompleted }, } = useAuth();


    let icon = (type) => {
        return type === "FILE_VIDEO" ? <MdAttachFile /> : type === "NOTE" ? <MdNote /> : <MdQuiz />
    }


    const getStatus = (contentId, items) => {
        // console.log({contentId}, {items});
        let findItem = items.find(item => item.contentId === contentId);
        if (findItem) {
           return  findItem?.completedBy?.includes(userdata.id) ? <CompleteIcon $isComplete={true} /> : <CompleteIcon />
        }
        return <CompleteIcon />
    }

    // console.log("data", contentsData[0]);


    return (
        <ModuleContainer  >
            <ModuleInfo>
                <MdCollectionsBookmark /> {title}
            </ModuleInfo>
            <ModuleAttachments>
                {/* {
                    attach.filter(a => a.domain === attachments._id).map((a, i) => (
                        <Attachment 
                        active={activeMedia} 
                        changeActive={changeActive}
                        fetchData={fetchData}
                        key={i} {...a} />))
                } */}

                {contentsData?.map((content, index) => (

                    <AttachmentContainer key={index} variant="outlined"
                        active={active ? true : false}
                        onClick={() => {
                            setSearchParams({
                                contentId: content.contentId
                            })
                            setActive(true)
                            setContents(content?.items)
                            setPickedType(content?.type)
                        }}>
                        <AttachmentInfo >
                            {icon(content?.type)}
                            <h5>{content?.title}</h5>
                        </AttachmentInfo>
                        {getStatus(content?.contentId, content?.items)}

                    </AttachmentContainer>

                ))}
            </ModuleAttachments>
        </ModuleContainer>
    )
}




export default Module;