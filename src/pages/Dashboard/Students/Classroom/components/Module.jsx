import React, { useState } from 'react';
import styled from 'styled-components';
import { MdCollectionsBookmark } from 'react-icons/md';
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