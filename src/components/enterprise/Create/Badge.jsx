import styled from "styled-components"
import course from '../../../images/create/badge.png'

const Container = styled.div`
padding: 5rem 1rem;
background: #F0F4FF;


.contentcontainer{
    display: flex;
    align-items: center;
    gap: 3rem;
    
    .courseleft{
        flex: .5;
        img{
            width: 100%;
            height: 100%;
            // object-fit: cover;
        }
    }

    .courseright{
        flex: .5;
        display: flex; 
        flex-direction: column;
        gap: .5rem;

        h4{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 30px;
            color: #000;
            line-height: 22px;

        }
        
    
        p{
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

        .contentcontainer {
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
    
    }

    @media (max-width:768px){
        .contentcontainer{
            flex-direction: column;

            .courseleft{
                width: 100%;
                img{
                    width: 100%;
                    object-fit: cover;
                }
            }

        }
    }

`
const Badge = () => {
    return (
        <Container>
            <div className="contentcontainer container">

            <div className="courseleft">
                <img src={course} alt="" width={600} />

            </div>

            <div className="courseright">
                <div>
                    <div>
                        <h4>Create  Certificate of</h4>
                        <h4>completion and Badges</h4>

                    </div>

                </div>
                <p>
                    We make it easy for you to create, <br />
                    distribute digital certificates and badges.
                </p>

            </div>
            </div>



        </Container>
    )
}

export default Badge