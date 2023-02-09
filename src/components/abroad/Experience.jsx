import styled from "styled-components"
import girl from '../../images/abroad/girl.png'

/* background-image: url(${hero}); */
const Container = styled.div`
 background: #EFF2FF;
/* background-size: cover; */
/* background-repeat: no-repeat; */
width: 100%;
font-family: 'Raleway';
color: var(--theme-blue);   
padding: 2rem;

.container{

    .expercontent{
        display: flex;
        align-items: center;
        height: 300px;
        /* border: 2px solid red; */


    .experleft{
        flex: .5;
        width: 100%;
        /* height: 100%; */
        background: #D8EAFF;
        border-radius: 34px;
        text-align: center;
        padding: 1rem 0;



        p{
            color: var(--theme-blue);
            font-weight: 700;
            font-size: 34px;
            line-height: 50px;
        }

        button {
        margin-top: 2rem;
        border: 2px solid white;
        border-radius: 7px;
        background: var(--theme-blue);
        color: #fff;
        padding: 0.5rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
    }
    }

    .experright{
        flex:.5;
        width: 100%;
        height: 100%;
        img{
            max-width: 100%;
            max-height: 100%;

        }

    }
    }
}

`
const Experience = () => {
    return (
        <Container>
            <div className="container">
                <div className="expercontent">
                    <div className="experleft">
                        <p>
                            Gain real experience and< br />
                            skill to improve your < br />
                            career prospects.
                        </p>

                        <button>Enroll Now</button>
                    </div>
                    <div className="experright">
                        <img src={girl} alt="" />
                    </div>
                </div>

            </div>

        </Container>
    )
}

export default Experience