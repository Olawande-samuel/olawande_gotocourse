import styled from "styled-components";
import hero from '../../images/dash.png'
import { Link } from "react-router-dom";

// background-image: url(${hero});
// background-size: cover;
// background-repeat: no-repeat;
// background-position: center;

const Container = styled.div`
/* height: 60vh; */
width: 100%;
font-family: 'Raleway';
color: var(--theme-blue);
margin-top: 5rem;
background: #E8EFFF;
padding: 2rem 0;
.container{
    .content{
        display: flex;
    
        .heroleft{
            /* border: 2px solid red; */
            flex: .5;
            padding: 1rem 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
    
           
    
             p{
                font-style: normal;
                font-weight: 500;
                font-size: 24px;
                padding: .3rem 0;
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
    
        .heroright{
            flex: .5;
            height: 300px;
            text-align: center;
            img{
                max-width: 100%;
                max-height: 100%;
            }
    
        }
    
    
        
    }
  
}

@media (min-width: 820px ) and (max-width: 1024px){
    height: unset;

    .container{
        .content{
            .heroleft{
                p{
                font-size: 30px;
                line-height: 30px;
            }
        }

        }
}
}



@media (max-width: 768px) {
        height: unset;
        text-align: center;

        .container{
            flex-direction: column-reverse;
            .content{
                flex-direction: column;

                .heroleft{
    
                    h1{
                    font-size: 40px;
                    line-height: 40px;
                }
            }

            }

    }
}

`

const Customise = () => {
    return (
        <Container>
            <div className="container">
                <div className="content">

                    <div className="heroright">
                        <img src={hero} alt="" />
                    </div>


                    <div className="heroleft">

                        <p>Get access to customized
                            dashboard to track Earnings,
                            Student Enrolment to class, and
                            Payment.</p>


                        <Link to={`/qualifications`}><button>Become A Teacher</button> </Link>

                    </div>
                </div>




            </div>

        </Container>
    )
}

export default Customise