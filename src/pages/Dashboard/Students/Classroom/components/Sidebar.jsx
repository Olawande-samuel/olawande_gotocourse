import React from 'react';
import styled from 'styled-components';
import { Module } from './';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Button, IconButton } from "@mui/material";
import { Logosm } from '../../../../../images/components/svgs';




const SidebarContainer = styled.div`
    /* background-color: rgb(236, 239, 255); */
    background-color: var(--theme-blue);
    width:  ${({ $mobile }) => $mobile ? "250px" : "100%"};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height:100vh;
    position: ${({ $mobile }) => $mobile && 'fixed'};
    top: ${({ $mobile }) => $mobile && 0};
    left: ${({ $mobile }) => $mobile && 0};
    bottom: ${({ $mobile }) => $mobile && 0};
    /* border: 2px solid green; */ 

    @media screen and (max-width: 960px){
        display: ${({ $mobile }) => $mobile ? 'flex' : 'none'};
        
    }
`;




const SidebarBody = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: .5rem;
    color: #fff ;
    
.side__nav{
    height: 15%;
    /* border: 2px solid purple; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
            a{
                color: #fff; 
                /* padding: px 20px; */
  
            }
        
}

.newmiddle{
    height: 85%;
    overflow-y: auto;
    /* border: 2px solid green; */

    &::-webkit-scrollbar{
        // display: none
        width: 5px;
        &-thumb{
            background:  #fff;
            width: 5px;
    
    
        }

}

    .bodytop{
        /* height: 20%; */
        /* border: 2px solid white; */


    }

    .bodymiddle{
        /* height: 60%; */
        /* overflow-y: auto; */
        padding-bottom: 1rem;
        /* border: 2px solid yellow; */

        /* &::-webkit-scrollbar{
         display: none 
        width: .2rem;
        &-thumb{
            background:  var(--theme-blue);
            width: .3rem;
    
    
        } */
    }

    }


    .bodybottom{
        /* height: 10%; */
        /* border: 2px solid purple; */
        display: flex;
        align-items: center;

        .back_button{
        margin-top: 1rem;
        padding: 12px;
        width: 50%;
        margin: auto;
        border: none;
        border-radius: 8px;
        background-color: var(--theme-orange);
        color: #fff ;
        }

    }
`;



const Progress = styled.progress`
    accent-color: var(--theme-orange);
    /* accent-color: var(--textBlue); */
`;


const ProgressContainer = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & p {
        margin: 0;
        // color: var(--gray);
        font-size: 0.9rem;
        color: #fff;
    }
`;


export const CustomButton = styled(Button)`
    text-transform: capitalize !important;
    font-size: 0.8rem !important;

`;









const Sidebar = ({ setShowMobile, modules, setContents, setPickedType, setBodyTitle, reduceContent, setActive, active, isMobile, progress, setLocked
}) => {
    const navigate = useNavigate()

    const ProgressResult = useMemo(() => {
        let result = 0;
        if (reduceContent?.length === 0) return result;
        result = (Math.floor((progress.isCompleted / progress.total) * 100))
        return result
    }, [reduceContent, progress.isCompleted, progress.length])

    return (
        <SidebarContainer $mobile={isMobile}>
            <SidebarBody>
                <div className='side__nav'>
                        <Link to="/">
                            <Logosm />
                        </Link>

                        <Link to={`/student/console/myclasses`} style={{fontSize: "18px"}}>Classroom</Link>

                </div>
                <div className='newmiddle'>
                    <div className="bodytop">

                        {reduceContent?.length > 0 &&
                            <ProgressContainer>
                                <p>Progress:  {ProgressResult}%</p>
                                <Progress value={ProgressResult} max="100" />
                            </ProgressContainer>
                        }

                    </div>

                    <div className='bodymiddle'>
                        {
                            modules?.sort((a, b) => a.order - b.order).map((module, id) =>
                                <Module
                                    title={module.name}
                                    // active={active}
                                    // setActive={setActive}
                                    contentsData={module.contents}
                                    key={id}
                                    setContents={setContents}
                                    setPickedType={setPickedType}
                                    module={id}
                                    reduceContent={reduceContent}
                                    setBodyTitle={setBodyTitle}
                                    setLocked={setLocked}


                                />)
                        }

                    </div>
                    <div className="bodybottom">
                        <button className="back_button" style={{ width: "100%" }} onClick={() => navigate('/student/console/myclasses')}>Back to Console</button>

                    </div>

                </div>


            </SidebarBody>
        </SidebarContainer>
    )
}





export default Sidebar;