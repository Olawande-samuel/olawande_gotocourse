import React from 'react';
import styled from 'styled-components';
import {MdCollectionsBookmark} from 'react-icons/md';



import {Attachment} from "./";
import { useLocalStorage } from '../../../../../hooks';
import { KEY } from '../../../../../constants';
import { useAuth } from '../../../../../contexts/Auth';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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



const Module = ({title, attachments, changeActive, activeMedia, fetchData }) => {
   

    const [attach, setAttach] =useState([])
    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)
    const { consoleFunctions: { fetchStudentContents }, } = useAuth();

    const fetchContents = useQuery(["fetch content", attachments.classId], () => fetchStudentContents(userdata.token, attachments.classId), {
        onSuccess: (res) => {
            console.log({res})
            setAttach(res.data)

        }
    })
    console.log({attachments}); // module info
    // console.log({attach});

  

    return (
        <ModuleContainer  >
            <ModuleInfo>
                <MdCollectionsBookmark /> {title}
            </ModuleInfo>
            <ModuleAttachments>
                {
                    attach.map((a, i) => (<Attachment active={activeMedia} changeActive={changeActive}  
                        fetchData={fetchData}
                         key={i} {...a} />))
                }
            </ModuleAttachments>
        </ModuleContainer>
    )
} 




export default Module;