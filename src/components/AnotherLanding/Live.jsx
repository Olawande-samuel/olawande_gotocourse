import { AiOutlineCheck } from "react-icons/ai"
import styled from "styled-components"
import live from '../../images/landing/live.png'

const Container = styled.div`
padding: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .liveright{
        flex: .5;
  
    }

    .liveleft{
        flex: .5;
        display: flex; 
        flex-direction: column;
        gap: .5rem;

        h5{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            padding: 1rem 2rem;
            // line-height: 36px;
        }
        div{
            display: flex;
            align-items: center;
    
            span{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 24px;
                color: #000000;
            }

        }

    }

    @media (max-width: 912px){
        .liveright{
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

            .liveright{
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
                <h5>Hold unlimited live classes</h5>
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

            <div className="liveright">
                <img src={live} alt="" width={600} />

            </div>

        </Container>
    )
}

export default Live