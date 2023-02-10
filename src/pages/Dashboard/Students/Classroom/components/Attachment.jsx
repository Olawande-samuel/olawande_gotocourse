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
    /* background: #004DB6 !important; */
    /* color: #fff !important; */

    color:  ${({ active }) => active ? ' #0C2191 !important' : '#fff !important'};
    background:  ${({ active }) => active ? '#fff !important' : 'transparent !important'};

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
        color:  ${({ active }) => active ? ' #0C2191 ' : '#fff'};
      
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
     color:   ${props => props.$isComplete && props.status ? ' #0C2191 ' :
        props.$isComplete ? '#fff' : 'rgba(0,0,0,.2)'};

    /* ${AttachmentContainer}&:hover{
        color:   ${props => props.$isComplete ? 'var(--theme-blue)' : 'rgba(0,0,0,.2)'};
    
    } */
`

const Locked = styled(MdOutlineLock)`
     color:   ${props => props.$isComplete && props.status ? ' #0C2191 ' :
        props.$isComplete ? '#fff' : 'rgba(0,0,0,.2)'};

     /* ${AttachmentContainer}:hover{
        color:   ${props => props.$isComplete ? 'var(--theme-blue) ' : 'rgba(0,0,0,.2)'};
    
     } */
`




const Attachement = ({
    content,
    setBodyTitle,
    setPickedType,
    setContents,
    setLocked
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY);
    const contentId = searchParams.get("contentId");

    // console.log({contentId}, content.contentId);


    let icon = (type) => {
        return type === "FILE_VIDEO" ? <MdAttachFile /> : type === "NOTE" ? <MdNote /> : <MdQuiz />
    }

    const getStatus = (contentId, items, type, status) => {
        // console.log({contentId}, {items}, {type});
        if (type === "FILE_VIDEO") {
            let all = items.filter(item => item?.contentId === contentId);
            if(all?.length > 0){
                return (all?.filter(content => content?.completedBy?.includes(userdata.id))?.length === all?.length) ? <CompleteIcon $isComplete={true} status={status}/> : <CompleteIcon status={status}/>
            }
            return <CompleteIcon status={status}/>

        }

        if (type === "QUIZ") {
            let all = items.filter(item => item?.contentId === contentId);
            if(all?.length > 0){
                console.log({all}, {contentId}, (all?.filter(content => content?.attemptedBy?.includes(userdata.id))?.length === all?.length));
                return (all?.filter(content => content?.attemptedBy?.includes(userdata.id))?.length === all?.length) ? <CompleteIcon $isComplete={true} status={status}/> : <CompleteIcon status={status}/>

            }
            return <CompleteIcon status={status}/>

        }
        if(type=== "NOTE"){
            let findItem = items.find(item => item?.contentId === contentId);
            if (findItem) {
                return findItem?.completedBy?.includes(userdata.id) ? <CompleteIcon $isComplete={true} status={status} /> : <CompleteIcon status={status} />
            }
            return <CompleteIcon status={status}/>

        }

        return <CompleteIcon status={status} />
    }

    const getLockedStatus = (contentId, items, lock, status) => {
        // console.log({ contentId }, { items }, { lock });
        let findItem = items.find(item => item?.contentId === contentId);
        if (findItem) {
            return lock ? <Locked $isComplete={true} status={status} /> : <Locked status={status} />
        }
        return <Locked status={status}/>
    }

    return (
        <AttachmentContainer
            variant="outlined"
            active={(contentId === content?.contentId) ? true : false}
            onClick={() => {
                setSearchParams({
                    contentId: content.contentId
                })
                setBodyTitle(content?.title)
                setPickedType(content?.type)

                if (content?.isLocked) {
                    setLocked(true)
                    setContents([])
                    return;
                } else {
                    setLocked(false)
                    setContents(content?.items)
                    return;

                }

                // if (!content?.isLocked) {
                //     setContents(content?.items)
                //     setLocked(false)
                //     return;

                // } else {
                //     setLocked(true)
                //     setContents([])
                //     return;

                // }

            }}>


            <AttachmentInfo active={(contentId === content?.contentId) ? true : false}
            >
                {icon(content?.type)}
                <h5>{content?.title}</h5>
            </AttachmentInfo>

            <AttachmentIcon>
                {getStatus(content?.contentId, content?.items, content?.type, (contentId === content?.contentId))}
                {getLockedStatus(content?.contentId, content?.items, content?.isLocked, (contentId === content?.contentId))}

            </AttachmentIcon>

        </AttachmentContainer>

    )
}




export default Attachement;