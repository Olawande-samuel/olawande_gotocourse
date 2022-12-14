import { AiOutlineCheck } from "react-icons/ai"
import styled from "styled-components"
import live from '../../../images/landing/live.png'

const Container = styled.div`
padding: 4rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .liveleft{
        flex: .6;
  
    }

    .liveright{
        flex: .4;
        display: flex; 
        flex-direction: column;
        gap: .5rem;

        h4{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 34px;
            padding: 1rem 2rem;
            // line-height: 36px;
            color: #1B1F29;
        }
        div{
            display: flex;
            align-items: center;
    
            span{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                color: #000000;
            }

        }

    }

    @media (max-width: 912px){
        .liveleft{
            width: 100%;
            height: 300px;
            img{
                width: 100%;
                height: 100%;
                // object-fit: cover;
            }
        }
    }

    @media (max-width:768px){
            flex-direction: column;

            .liveleft{
                width: 100%;
                img{
                    width: 100%;
                    object-fit: cover;
                }
            }
    }

`
const Live = () => {
    return (
        <Container>
             <div className="liveleft">
                <img src={live} alt="" width={800} />

            </div>

            <div className="liveright">
                <h4>Hold unlimited live classes</h4>
                <div>
                    <AiOutlineCheck style={{ color: "#175fff", marginRight:"1rem" }} /><span> Create live classes of any size</span>
                </div>
                <div>
                    <AiOutlineCheck style={{ color: "#175fff", marginRight:"1rem" }} /> <span> Record live classes</span>
                </div>
                <div>
                    <AiOutlineCheck style={{ color: "#175fff", marginRight:"1rem" }} /> <span> Share screen</span>

                </div>

                <div>
                    <AiOutlineCheck style={{ color: "#175fff", marginRight:"1rem" }} /> <span> create collaborative online <br /> learning experience</span>

                </div>

            </div>

           

        </Container>
    )
}

export default Live