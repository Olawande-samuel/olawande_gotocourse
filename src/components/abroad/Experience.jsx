import { Link } from "react-router-dom"
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
        /* background: #D8EAFF; */
        /* border: 2px solid red; */


    .experleft{
        flex: .5;
        width: 100%;
        /* border-radius: 34px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: left;
        padding: 1rem 0;
        /* border: 2px solid green; */
        background: #D8EAFF;



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
        /* border: 2px solid red; */
        text-align: center;

        img{
            max-width: 100%;
            max-height: 400px;

        }

    }
    }
}

@media (max-width: 768px) {
    .expercontent{
        height: unset;
        flex-direction: column;
    }
}

`
const Experience = () => {
    return (
        <Container>
            <div className="container">
                <div className="expercontent">
                    <div className="experleft">
                        <p className="">
                        We have helped many < br />
                         develop tech skills in  < br />
                          very short time, and< br />
                          helped them find jobs in < br />
                          the best tech companies
                        </p>

                        <Link to={`/signup`}><button>Register for free</button> </Link>
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