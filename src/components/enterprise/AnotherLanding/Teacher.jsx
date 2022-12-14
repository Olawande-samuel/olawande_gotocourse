import styled from "styled-components"
import teach from '../../../images/landing/teach.png'

const Container = styled.div`
padding: 2rem 1rem;
background: #F0F4FF;

.teachercontent{
    display: flex;
    align-items: center;
    gap: 2rem;

    .teacherleft{
        flex: .5;
    }

    .teacherright{
        display: flex; 
        flex:.5;
        flex-direction: column;

        h5{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            // line-height: 36px;
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

}

@media (max-width: 912px){
    .teachercontent{
    .teacherleft{
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
    .teachercontent{
        flex-direction: column;

        .teacherleft{
            width: 100%;
            img{
                width: 100%;
                object-fit: cover;
            }
        }

    }
}

`
const Teacher = () => {
    return (
        <Container>
            <div className="teachercontent">

                <div className="teacherleft">
                    <img src={teach} alt="" width={600} />

                </div>
                <div className="teacherright">
                    <div>
                        <h5>Enjoy secure  teacher-student  </h5>
                        <h5> chat and mail system</h5>
                    </div>
                    <p>A simple two-way interaction tool for teachers to Clear doubts, broadcast announcements, or just send some motivational messages.</p>
                </div>
            </div>
        </Container>
    )
}

export default Teacher