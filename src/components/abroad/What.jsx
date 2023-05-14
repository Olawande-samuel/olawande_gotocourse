import styled from "styled-components"

const Container = styled.div`
padding: 4rem 0;
width: 100%;
background: #EFF2FF;

.container{


    .content{
        /* width: 70%; */

        h4{
            font-weight: 700;
            font-size: 38px;
            line-height: 48px;
            color: #101213;
        }

        p{
            font-weight: 400;
            color: #101213;
            font-size: 16px;
        }
    }
}
    

`
const What = () => {
    return (
        <Container>
            <div className="container">
                <div className="content">
                    <h4>Learn World Class Skills on Gotocourse</h4>
                    <p>
                    The Train to Work Abroad is tailored in the direction of equipping individuals to work abroad 
                    and live the lives of their dreams. With our comprehensive training facilitated by world-class  
                     Tech experts and professionals, you can rest assured that this program is for you.
                    </p>

                </div>

            </div>
        </Container>
    )
}

export default What