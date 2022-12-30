import styled from "styled-components"
import phone from '../svg/phone.svg'
import access from '../svg/access.svg'
import fees from '../svg/fees.svg'
import certificate from '../svg/certificate.svg'
import tv from '../svg/tv.svg'
import text from '../svg/text.png'


const Container = styled.div`
padding:  2rem 0;
background: #F5EEFF;

h4{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    color: #000000;
}

.hasslecontent{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    width: 100%;

   .difmiddle{
    display: flex;
    flex-direction: column;
    min-height: 40vh;
    // border: 2px solid red;
    position: relative;
  
        button {
            position: absolute;
            left: 50%;
            bottom:0;
            transform: translateX(-50%);
            border: none;
            border-radius: 24px;
            background: #2A32C5;
            color: #fff;
            padding: 0.5rem 1rem;
            font-weight: 700;
            font-size: 14px;
            line-height: 27px;
            a {
                color: #fff;
            }
        }
   }

   .divright{
    img{
        width: 100%;
        max-height: 300px;
    }
   }

       
        .hassleitem{
            display: flex;
            align-items: center;
            gap: 1rem;

            img{
                width: 30px;
                height: 30px;
            }

            p{
                font-weight: 800;
            }
        }



    }


}

@media (max-width: 768px){
    .hasslecontent{
        grid-template-columns: 1fr;

        .difmiddle{
            button{
                margin-top: 1rem;
                position: unset;
                left: unset;
                transform: unset;


    
            }

        }
    }
}

`
const Different = () => {
    return (
        <Container>
            <div className="hasslecontent container">

                <div className="difleft">
                    <div className="hassleitem">
                        <img src={phone} alt="" />
                        <p>100% online</p>

                    </div>
                    <div className="hassleitem">
                        <img src={access} alt="" />

                        <p>Unlimited Access</p>

                    </div>
                    <div className="hassleitem">
                        <img src={fees} alt="" />

                        <p>Low fees</p>

                    </div>

                </div>

                <div className="difmiddle">

                    <div className="hassleitem">
                        <img src={certificate} alt="" />

                        <p>Completion Certificate</p>

                    </div>

                    <div className="hassleitem">
                        <img src={tv} alt="" />

                        <p>Cohort live learning</p>

                    </div>

                    <button>Start my application</button>

                </div>

                <div className="divright">
                    <img src={text} alt="" />
                </div>
            </div>

        </Container>
    )
}

export default Different