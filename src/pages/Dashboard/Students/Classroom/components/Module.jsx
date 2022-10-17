import React from 'react';
import styled from 'styled-components';
import {MdCollectionsBookmark} from 'react-icons/md';



import {Attachment} from "./";


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
`;

const ModuleAttachments = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
`



const Module = ({title, attachments}) => {
    return (
        <ModuleContainer>
            <ModuleInfo>
                <MdCollectionsBookmark /> {title}
            </ModuleInfo>
            <ModuleAttachments>
                {
                    attachments.map((a, i) => (<Attachment key={i} {...a} />))
                }
            </ModuleAttachments>
        </ModuleContainer>
    )
} 




export default Module;