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
background: linear-gradient(90deg, #FFFFFF 2.32%, rgba(239, 242, 255, 0) 94.98%);

.container{

    .contheader{
        text-align: center;
        padding: 2rem 0;
            
        h5 {
            color: #292D32;   
            font-weight: 700;
            font-size: 28px;
            padding-bottom: .7rem;
        }

        p{
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            line-height: 20px;
            font-style: italic;
            color: #292D32;   

        }
    }

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

        .experbtn{
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
}

@media (max-width: 768px) {
    .container{

        .expercontent{
            height: unset;
            flex-direction: column;
    
            .experright{
                p{
                    text-align: center;
                    font-size: 24px;
    
                    span{
                        display: inline;
                    }
    
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
                <div className="contheader">
                    <h5>Employment placement assistance</h5>
                    <p>We provide all the needed support and connection to getting high paying
                        <br /> remote jobs</p>

                </div>


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
                        <div className="experbtn">
                        <Link to={`/signup?trainee`}><button>Register for free</button> </Link>

                        </div>



                    </div>

                </div>

            </div>

        </Container>
    )
}

export default Experience