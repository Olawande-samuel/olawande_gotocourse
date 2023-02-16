import styled from "styled-components"
import personalize from '../../images/abroad/personalize.svg'
import access from '../../images/abroad/access.svg'
import fees from '../../images/abroad/fees.svg'
import cert from '../../images/abroad/cert.svg'
import online from '../../images/abroad/online.svg'
import people from '../../images/abroad/people.svg'

const Container = styled.div`
  background: #DEEDFF;  
  padding: 2rem 0;

  .container{
    h4{
        text-align: center;
        font-weight: 700;
        font-size: 32px;
        line-height: 48px;
        color: #000F62;
    }
    .content{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        padding: 3rem 0;
        /* border: 3px solid green; */
        /* justify-content: center; */


        .item{
            text-align: center;
            /* border: 2px solid red; */

            img{
                width: 30px;
                height: 30px;
            }
            p{
                font-weight: 400;
                font-size: 21px;
                line-height: 36px;
                color: var(--theme-blue);
            }

           
    
        }


        @media (max-width:768px) {
            grid-template-columns: 1fr;
 
        }
    }


  }

`
const StandOut = () => {
    return (
        <Container>
            <div className="container">
                <h4>What makes us stand out?</h4>
                <div className="content">

                    <div className="item">
                        <img src={online} alt="" />
                        <p>
                        100% online
                        </p>

                    </div>

                    <div className="item">
                        <img src={cert} alt="" />
                        <p>
                        Low fees

                        </p>
                        

                    </div>

                    <div className="item">
                        <img src={people} alt="" />
                        <p>
                        Cohort live learning
                        </p>
                        
                    </div>

                    <div className="item">
                        <img src={fees} alt="" />
                        <p>
                        Unlimited Access
                        </p>
                        
                    </div>

                    <div className="item">
                        <img src={access} alt="" />
                        <p>
                        Completion Certificate
                        </p>
                        
                    </div>

                  

                </div>

            </div>


        </Container>

    )
}

export default StandOut