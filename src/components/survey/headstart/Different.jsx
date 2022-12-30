import styled from "styled-components"
import phone from '../svg/phone.svg'
import access from '../svg/access.svg'
import fees from '../svg/fees.svg'
import certificate from '../svg/certificate.svg'
import tv from '../svg/tv.svg'


const Container = styled.div`
padding:  2rem 0;


h4{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 47px;
    color: #000000;
}

.hasslecontent{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 2rem 0;

    .hassleitem{
        flex: .25;
        display: flex;
        flex-direction: column;
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

@media (max-width: 768px){
    .hasslecontent{
        flex-direction: column;
    }
}

`
const Different = () => {
    return (
        <Container>
            <h4>What makes us different</h4>
            <div className="hasslecontent">
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
                <div className="hassleitem">
                <img src={certificate} alt="" />

                    <p>Completion Certificate</p>
                
                </div>
                <div className="hassleitem">
                <img src={tv} alt="" />

                    <p>Cohort live learning</p>
                
                </div>
            </div>

        </Container>
    )
}

export default Different