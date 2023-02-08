import React, { useState } from 'react';
import styled from 'styled-components';
import { MdCollectionsBookmark } from 'react-icons/md';
import { Paper } from '@mui/material';
import {MdOutlineLock, MdCheckCircle } from 'react-icons/md';
import { Attachment } from "./";
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';

const ModuleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    background: #004DB6;
    border-radius: 10px;

    /* &:hover{
        color: #004DB6;
        background: #fff;
 
    } */
`;

const ModuleInfo = styled.div`
    /* border: 2px solid green; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    /* border-bottom: 1px solid rgba(0,0,0,.12); */
    width: 100%;
    padding: 20px;
    /* color: #222; */
    color: #fff;

    /* &:hover{
        color: #004DB6; 
    } */
   
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
    // border: 2px solid red !important;
    width: 100%;
    border: 1px solid #fff !important;
    background: #004DB6 !important;
    color: #fff !important;

    /* color:  ${({ active }) => active ? 'var(--theme-blue)' : '#fff'}; */
    /* background:  ${({ active }) => active ? '#fff' : 'transparent !important'}; */

    border-radius: 10px !important;
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;
`;


const AttachmentInfo = styled.div`
    flex:.8;
    display: flex;
    align-items: center;
    // border: 2px solid green !important;

    & > svg {
        color: #fff;
    }

    & h5 {
        font-weight: 300;
        font-size: 0.85rem;
        margin: 0;
        margin-left: 10px;
    }
`;

const AttachmentIcon = styled.div`
flex:.2;
display: flex;
align-items: center;
justify-content: space-between;
// border: 2px solid yellow !important;


`


const CompleteIcon = styled(MdCheckCircle)`
    color: ${props => props.$isComplete ? '#fff' : 'rgba(0,0,0,.2)'};
`

const Locked = styled(MdOutlineLock)`
    color:   ${props => props.$isComplete ? '#fff' : 'rgba(0,0,0,.2)'};
`



const Module = ({ title, setContents, setBodyTitle, setPickedType, contentsData, setLocked
    // setActive, active,
}) => {
    const [details, showDetails] = useState(false)




    return (
        <ModuleContainer  >
            <ModuleInfo onClick={() => showDetails(!details)}>
                <MdCollectionsBookmark /> {title}

                <i>
                    {details ? (
                        <BiCaretUp />
                    ) : (
                        <BiCaretDown />
                    )}
                </i>


            </ModuleInfo>

            {details &&
                <ModuleAttachments>

                    {contentsData?.map((content, index) => (

                        // <AttachmentContainer key={index} variant="outlined"
                        //     active={active ? true : false}
                        //     onClick={() => {
                        //         setSearchParams({
                        //             contentId: content.contentId
                        //         })
                        //         setActive(true)
                        //         setBodyTitle(content?.title)
                        //         setPickedType(content?.type)

                        //         if (!content?.isLocked) {
                        //             setContents(content?.items)
                        //             setLocked(false)
                        //             return;

                        //         } else {
                        //             setLocked(true)
                        //             setContents([])
                        //             return;

                        //         }

                        //     }}>


                        //     <AttachmentInfo >
                        //         {icon(content?.type)}
                        //         <h5>{content?.title}</h5>
                        //     </AttachmentInfo>

                        //     <AttachmentIcon>
                        //         {getStatus(content?.contentId, content?.items, content?.type)}
                        //         {getLockedStatus(content?.contentId, content?.items, content?.isLocked)}

                        //     </AttachmentIcon>

                        // </AttachmentContainer>
                        <Attachment
                            key={index}
                            content={content}
                            setBodyTitle={setBodyTitle}
                            setPickedType={setPickedType}
                            setContents={setContents}
                            setLocked={setLocked}
                        />

                    ))}
                </ModuleAttachments>
            }
        </ModuleContainer>
    )
}




export default Module;