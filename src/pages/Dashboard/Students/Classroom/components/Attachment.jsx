import React, { useState } from 'react';
import styled from 'styled-components';
import { Paper } from '@mui/material';
import { MdAttachFile, MdNote, MdQuiz, MdOutlineLock, MdCheckCircle } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { KEY } from '../../../../../constants';
import { useLocalStorage } from '../../../../../hooks';




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


       &:hover{
        color: #004DB6!important;
        background: #fff !important;

    }
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

    &:hover{
 
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

    ${AttachmentContainer}&:hover{
        color:   ${props => props.$isComplete ? 'var(--theme-blue)' : 'rgba(0,0,0,.2)'};
    
     }
`

const Locked = styled(MdOutlineLock)`
     color:   ${props => props.$isComplete ? '#fff' : 'rgba(0,0,0,.2)'};

     ${AttachmentContainer}:hover{
        color:   ${props => props.$isComplete ? 'var(--theme-blue) ' : 'rgba(0,0,0,.2)'};
    
     }
`




const Attachement = ({
    content,
    setBodyTitle, 
    setPickedType,
    setContents,
    setLocked
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [active, setActive] = useState(false)

    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)

    let icon = (type) => {
        return type === "FILE_VIDEO" ? <MdAttachFile /> : type === "NOTE" ? <MdNote /> : <MdQuiz />
    }

    const getStatus = (contentId, items, type) => {
        // console.log({contentId}, {items}, {type});
        if (type === "FILE_VIDEO") {
            let all = items.filter(item => item?.contentId === contentId);
            return (all?.filter(content => content?.completedBy?.includes(userdata.id))?.length === all?.length) ? <CompleteIcon $isComplete={true} /> : <CompleteIcon />

        }

        if (type === "QUIZ") {
            let all = items.filter(item => item?.contentId === contentId);
            return (all?.filter(content => content?.attemptedBy?.includes(userdata.id))?.length === all?.length) ? <CompleteIcon $isComplete={true} /> : <CompleteIcon />
        }

        let findItem = items.find(item => item.contentId === contentId);
        if (findItem) {
            return findItem?.completedBy?.includes(userdata.id) ? <CompleteIcon $isComplete={true} /> : <CompleteIcon />
        }
        return <CompleteIcon />
    }

    const getLockedStatus = (contentId, items, lock) => {
        // console.log({ contentId }, { items }, { lock });
        let findItem = items.find(item => item.contentId === contentId);
        if (findItem) {
            return lock ? <Locked $isComplete={true} /> : <Locked />
        }
        return <Locked />
    }

    return (
        <AttachmentContainer 
            variant="outlined"
            active={active ? true : false}
            onClick={() => {
                setSearchParams({
                    contentId: content.contentId
                })
                setActive(true)
                setBodyTitle(content?.title)
                setPickedType(content?.type)

                if (!content?.isLocked) {
                    setContents(content?.items)
                    setLocked(false)
                    return;

                } else {
                    setLocked(true)
                    setContents([])
                    return;

                }

            }}>


            <AttachmentInfo >
                {icon(content?.type)}
                <h5>{content?.title}</h5>
            </AttachmentInfo>

            <AttachmentIcon>
                {getStatus(content?.contentId, content?.items, content?.type)}
                {getLockedStatus(content?.contentId, content?.items, content?.isLocked)}

            </AttachmentIcon>

        </AttachmentContainer>

    )
}




export default Attachement;