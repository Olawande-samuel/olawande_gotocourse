import styled from "styled-components"
import girl from '../../images/abroad/girl.png'

/* background-image: url(${hero}); */
const Container = styled.div`
 /* background: #EFF2FF; */
/* background-size: cover; */
/* background-repeat: no-repeat; */
width: 100%;
font-family: 'Raleway';
color: var(--theme-blue);   
padding: 2rem 0;

.container{

    .expercontent{
        display: flex;
        /* align-items: center; */
        background: #D8EAFF;
        /* border: 2px solid red; */

        .experleft{
        flex:.4;
        width: 100%;
        /* border: 2px solid red; */
        text-align: left;
        padding: 0 1rem;

        img{
            max-width: 100%;
            max-height: 400px;

        }

    }
    .experright{
        flex: .6;
        width: 100%;
        /* border-radius: 34px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: right;
        padding: 1rem 0;
        /* border: 2px solid green; */



        p{
            color: var(--theme-blue);
            font-weight: 700;
            font-size: 30px;
            line-height: 40px;
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

   
    }
}

@media (max-width: 768px) {
    .expercontent{
        height: unset;
        flex-direction: column;

        .experright{
            p{
                text-align: center;
                span{
                    display: inline;
                }

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
                        <img src={girl} alt="" />
                    </div>
                    <div className="experright">
                        <p >
                            We have helped many
                            <span className="d-block"> develop tech skills in</span>
                            <span className="d-block">very short time, and</span>
                            <span className="d-block">helped them find jobs in</span>
                            the best tech companies
                        </p>

                    </div>

                </div>

            </div>

        </Container>
    )
}

export default Experience