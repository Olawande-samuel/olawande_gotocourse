import styled from "styled-components"
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from "react-router-dom"

const Container = styled.div`
background-repeat: no-repeat;
background-size: cover;
padding: 2rem 1rem;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;

.reviewhead h4{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    // font-size: clamp(2.1rem, 2.1429rem + .5357vw, 2.5rem);
    // line-height: 54px;
    color: var(--theme-blue);
}

.reviewhead p{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    // font-weight: 700;
    // font-size: 26px;
    // font-size: clamp(2.1rem, 2.1429rem + .5357vw, 2.5rem);
    // line-height: 54px;
    color: var(--theme-blue);

   
}

.reviewcontent{
    display: flex;
    gap: 1rem;


    .reviewdiv{
        flex: .25;       
        background: #F2F8FF;
        border: 1px solid #A0B0FF;
        border-radius: 20px;
        padding: 1rem;
        position: relative;
        min-height: 40rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        ul{
            list-style-type: none;
            margin:0;
            padding: 0;
            // display: flex;
            // flex-direction: column;
            // gap: .5rem;

            li{
                color: var(--theme-blue);
            }
        }


        p:nth-of-type(1){
            font-weight: 800;
 
        }

        p{
            color: var(--theme-blue);

            span{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 800;
                font-size: 64px;
                line-height: 136.9%;
            }
        }

        .btncontainer{
            position: absolute;
            left: 0;
            bottom: 10px;
            right: 0;
            text-align: center;

            button{   
                width: 150px;
                border:2px solid white;
                border-radius: 20px;
                background: var( --theme-blue);
                color: #fff;
                padding: .5rem 1rem;
                font-weight: 700;
                font-size: 14px;
                line-height: 27px;
                a{
                    color: #fff; 
                }
    
            }

            .whitebtn{
                width: 150px;
                border:1px solid var( --theme-blue);
                border-radius: 20px;
                background: #fff;
                color: var( --theme-blue);;
                padding: .5rem 1rem;
                font-weight: 700;
                font-size: 14px;
                line-height: 27px;
                a{
                    color: var( --theme-blue);                
                }
            }
        }

    }
    
}

@media (max-width: 912px){
    .reviewcontent{
        // flex-direction: column;

        .reviewdiv{
            min-height: 30rem;
            // padding: 2rem .5rem;
            padding: 2rem .5rem;

        }
    }
}

@media (max-width:768px){
    .reviewcontent{
        flex-direction: column;

        .reviewdiv{
            min-height: 45rem;
            padding: 2rem .5rem;

        }
    }

   
}


.
`
const Price = () => {
    return (
        <Container>
            <div className="container">

                <div className="reviewhead">
                    <h4>Pricing that adjusts as your business grows</h4>
                    <p>We offer a price that is right for you, no matter who you are</p>
                </div>

                <div className="reviewcontent">

                    <div className="reviewdiv">
                        <p>Free</p>
                        <p><span>$0 </span>per month</p>


                        <ul>
                            <li><AiFillCheckCircle /> Unlimited Students</li>
                            <li><AiFillCheckCircle /> 1 Course</li>
                            <li><AiFillCheckCircle /> 1 Admin</li>
                            <li><AiFillCheckCircle /> Email & Chat to build Class</li>
                            <li><AiFillCheckCircle /> Integrated Payment Processing</li>
                            <li><AiFillCheckCircle /> Content Creation Studio</li>
                            <li><AiFillCheckCircle /> Affiliate Marketing</li>
                            <li><AiFillCheckCircle /> Assessment (Quizzes)</li>
                            <li><AiFillCheckCircle /> Landing Page</li>
                            <li><AiFillCheckCircle /> 3% Transaction Fee on Bookings</li>
                            <li><AiFillCheckCircle /> Email Support</li>
                        </ul>


                        <div className="btncontainer">
                            <Link to={`/enterprise-signup`}><button className="whitebtn">Get started</button></Link>
                        </div>


                    </div>

                    <div className="reviewdiv">
                        <p>Basic Plan</p>
                        <p><span>$59 </span>per month</p>


                        <ul>
                            <li><AiFillCheckCircle /> Unlimited Students</li>                 
                            <li><AiFillCheckCircle /> Integrated Payment Processing</li>
                            <li><AiFillCheckCircle /> Content Creation Studio</li>
                            <li><AiFillCheckCircle /> Affiliate Marketing</li>
                            <li><AiFillCheckCircle /> Assessment (Quizzes)</li>
                            <li><AiFillCheckCircle /> Custom Landing Page</li>
                            <li><AiFillCheckCircle /> 3% Transaction Fee on Bookings</li>
                            <li><AiFillCheckCircle /> Class Recording</li>
                            <li><AiFillCheckCircle />In-Built Live Class</li>
                            <li><AiFillCheckCircle />YouTube Integration</li>
                            <li><AiFillCheckCircle />Student Records Management</li>
                            <li><AiFillCheckCircle /> 2 Admin</li>
                            <li><AiFillCheckCircle /> Email Customer Support</li>
                        </ul>


                        <div className="btncontainer">
                            <Link to={`/enterprise-signup`}><button>Get started</button></Link>
                        </div>


                    </div>

                    <div className="reviewdiv">
                        <p>Premium Plan</p>
                        <p><span>$99 </span>per month</p>


                        <ul>
                            <li><AiFillCheckCircle /> Everything in Basic Plan</li>
                            <li><AiFillCheckCircle />Custom Domain</li>
                            <li><AiFillCheckCircle />24/7 Customer Support (phone call & email)</li>
                            <li><AiFillCheckCircle /> Unlimited Number of Admin</li>
                            <li><AiFillCheckCircle /> Welcome call with Specialist</li>
                            <li><AiFillCheckCircle /> 3% Transaction Fee on Bookings</li>
                            <li><AiFillCheckCircle /> Dedicated Account Officer</li>
                            <li><AiFillCheckCircle /> Remove GotoCourse Branding</li>
                            <li><AiFillCheckCircle /> Webinars & Events</li>
                           
                        </ul>


                        <div className="btncontainer">
                            <Link to={`/enterprise-signup`}><button className="whitebtn">Get started</button></Link>
                        </div>


                    </div>

                    <div className="reviewdiv">
                        <p>Enterprise Plan</p>
                        <p><span>$399 </span>per month</p>


                        <ul>
                            <li><AiFillCheckCircle />Everything in Premium Plan Incusive</li>
                            <li><AiFillCheckCircle />Admin Center/(Assign Roles & Permission)</li>
                            <li><AiFillCheckCircle /> Dedicated Account Success Officer </li>
                            <li><AiFillCheckCircle /> Youtube Integration</li>
                            <li><AiFillCheckCircle /> 3% Transaction Fee on Bookings</li>
                            <li><AiFillCheckCircle /> Advanced Analytics</li>
                            <li><AiFillCheckCircle /> Priority Support</li>
                            <li><AiFillCheckCircle />Advanced Landing Page Customization</li>
                            <li><AiFillCheckCircle /> Completion Certificates & Digital Badges</li>
                            <li><AiFillCheckCircle /> Business Advicing</li>
                        </ul> 


                        <div className="btncontainer">
                            <Link to={`/enterprise-signup`}><button>Get started</button></Link>
                        </div>


                    </div>


                </div>
            </div>



        </Container>
    )
}

export default Price