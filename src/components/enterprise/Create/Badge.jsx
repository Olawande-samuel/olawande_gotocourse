import styled from "styled-components"
import course from '../../../images/create/badge.png'

const Container = styled.div`
padding: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .courseleft{
        flex: .5;
  
    }

    .courseright{
        flex: .5;
        display: flex; 
        flex-direction: column;
        gap: .5rem;

        h5{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
        }
        
    
        p{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #000000;
        }

    

    }

    @media (max-width: 912px){
        .courseleft{
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

            .courseleft{
                width: 100%;
                img{
                    width: 100%;
                    object-fit: cover;
                }
            }
        }

`
const Badge = () => {
    return (
        <Container>
            <div className="courseleft">
                <img src={course} alt="" width={600} />

            </div>

            <div className="courseright">
                <div>
                    <h5>Create  Certificate of</h5>
                    <h5>completion and Badges</h5>

                    <p>
                        We make it easy for you to create,
                        distribute digital certificates and badges.                    </p>
                </div>


            </div>



        </Container>
    )
}

export default Badge