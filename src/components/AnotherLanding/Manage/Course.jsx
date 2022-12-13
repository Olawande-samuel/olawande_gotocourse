import styled from "styled-components"
import course from '../../../images/landing/course.png'

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
const Course = () => {
    return (
        <Container>
              <div className="courseleft">
                <img src={course} alt="" width={600} />

            </div>

            <div className="courseright">
                <h5>Course materials on the go!</h5>
                <div>
                    <p>
                        Get access to the same course materials that you would with a normal classroom setting,. Learners have have access to the assignment page and all study materials (e.g., notes, documents, photos, and videos) uploaded and saved on Class console. Attendees have unlimited access to study material on any device, anytime and anywhere hence, they are able to maximize their learning with the provided study material after every class and any time they need it.
                    </p>
                </div>


            </div>

          

        </Container>
    )
}

export default Course