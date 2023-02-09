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
    }
}
    

`
const What = () => {
    return (
        <Container>
            <div className="container">
                <div className="content">
                    <h4>What you will learn</h4>
                    <p>
                        TRINT mentors are experienced practitioners who work at the world's most innovative <br />
                        companies. They're experts in their field, making sure you're mastering the most up-to- <br />
                        date and practical skills companies around the world need.
                    </p>

                </div>

            </div>
        </Container>
    )
}

export default What