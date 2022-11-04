import React from 'react';
import styled from 'styled-components';
import { Paper } from '@mui/material';
import {MdAttachFile, MdNote, MdQuiz, MdOutlineLock, MdCheckCircle} from 'react-icons/md';
import { useLocalStorage } from '../../../../../hooks';
import { KEY } from '../../../../../constants';
import { useAuth } from '../../../../../contexts/Auth';




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

// classId: "633347903dbdcdac3cc97eba"
// createdAt: "2022-10-17T12:26:22.576Z"
// domain: "634d1c4c15011228d10abf31"
// isLocked: false
// notifyStudents: false
// objective: ""
// title: "pool"
// tutorId: "6336e2547a6cddc303e0fecb"
// type: "QUIZ"
// updatedAt: "2022-10-17T12:26:22.576Z"
// __v: 0
// _id: "634d49ee15011228d10b1c4f"


const Attachement = ({type, _id, isLocked, title,  domain, classId,
    // fetchData,
     isComplete, active, changeActive  }) => {
   
        const { getItem } = useLocalStorage()
        const userdata = getItem(KEY)
    
        const { consoleFunctions: { fetchStudentQuiz, fetchStudentFile, fetchStudentNote }, } = useAuth();

    let icon = React.useMemo(() => {
        return type ==="FILE_VIDEO" ? <MdAttachFile /> : type === "NOTE" ? <MdNote /> : <MdQuiz />
    }, [type])

    let statusIcon = React.useMemo(() => {
        return isLocked ? <Locked /> : <CompleteIcon $isComplete={isComplete} />
    }, [isLocked])

    

    const fetchData = async (type, info) => {
        if (type === "QUIZ") {
            const { data } = await fetchStudentQuiz(userdata.token, info)
            console.log({ data });

        }
        else if (type === "NOTE") {
            const { data } = await fetchStudentNote(userdata.token, info)
            console.log({ data });


        } else {
            const { data } = await fetchStudentFile(userdata.token, info)
            console.log({ data });

        }
    }

    return (
        <AttachmentContainer variant="outlined" $active={active === title ? true : false} onClick={e => {
            // changeActive(title)
            fetchData(type, _id) 
        }
    }>
            <AttachmentInfo>
                {icon}
                <h5>{title}</h5>
            </AttachmentInfo>
            {statusIcon}
        </AttachmentContainer>
    )
}




export default Attachement;