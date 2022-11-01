import React from 'react';
import styled from 'styled-components';
import { Paper } from '@mui/material';
import {MdAttachFile, MdNote, MdQuiz, MdOutlineLock, MdCheckCircle} from 'react-icons/md';




const AttachmentContainer = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: ${({$active}) => $active ? 'rgb(226, 231, 255)' : 'transparent !important' };
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


const Attachement = ({type, isLocked, title, isComplete, active, changeActive}) => {
    let icon = React.useMemo(() => {
        return type ==='video' ? <MdAttachFile /> : type === 'note' ? <MdNote /> : <MdQuiz />
    }, [type])

    let statusIcon = React.useMemo(() => {
        return isLocked ? <Locked /> : <CompleteIcon $isComplete={isComplete} />
    }, [isLocked])

    return (
        <AttachmentContainer variant="outlined" $active={active === title ? true : false} onClick={e => changeActive(title)}>
            <AttachmentInfo>
                {icon}
                <h5>{title}</h5>
            </AttachmentInfo>
            {statusIcon}
        </AttachmentContainer>
    )
}




export default Attachement;