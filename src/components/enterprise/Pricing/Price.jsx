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
    // width: 100%;


    .reviewdiv{
        flex: .25;       
        background: #F2F8FF;
        border: 1px solid #A0B0FF;
        border-radius: 20px;
        padding: 1rem;
        position: relative;
        min-height: 50rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        ul{
            list-style-type: none;
            margin:0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: .5rem;

            li{
                color: var(--theme-blue);
                display: flex;
                gap: .5rem;
                font-weight: 500;
                font-size: 16px;
                font-family: 'Raleway';

                div:nth-of-type(1){
                    flex: .1;
                }

                div:nth-of-type(2){
                    flex: .9;
                }

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



@media (max-width:768px){
    .reviewcontent{
        flex-direction: column;

        .reviewdiv{
            min-height: 45rem;
            padding: 2rem .5rem;

        }
    }

   
}


@media (max-width:1024px){
    .reviewcontent{

        .reviewdiv{
            min-height: 55rem;
            padding: 2rem .5rem;

        }
    }

   
}

// @media (max-width: 912px){
//     .reviewcontent{
//         display: grid;
//         grid-template-columns: repeat( 2, 1fr);
//     }
// }
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
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Unlimited Students</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>1 Course</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>1 Admin</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Email & Chat to build Class</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Integrated Payment Processing</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div> Content Creation Studio</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Affiliate Marketing</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Assessment (Quizzes)</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Landing Page</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>3% Transaction Fee on Bookings</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Email Support</div>
                            </li>
                        </ul>


                        <div className="btncontainer">
                            <Link to={`/enterprise-signup`}><button className="whitebtn">Get started</button></Link>
                        </div>


                    </div>

                    <div className="reviewdiv">
                        <p>Basic Plan</p>
                        <p><span>$59 </span>per month</p>


                        <ul>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Unlimited Students</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Integrated Payment Processing</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Content Creation Studio</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Affiliate Marketing</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Assessment (Quizzes)</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Custom Landing Page</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>3% Transaction Fee on Bookings</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Class Recording</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>In-Built Live Class</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>YouTube Integration</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Student Records Management</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>2 Admin</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Email Customer Support</div>
                            </li>
                        </ul>


                        <div className="btncontainer">
                            <Link to={`/enterprise-signup`}><button>Get started</button></Link>
                        </div>


                    </div>

                    <div className="reviewdiv">
                        <p>Premium Plan</p>
                        <p><span>$99 </span>per month</p>


                        <ul>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Everything in Basic Plan</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Custom Domain</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>24/7 Customer Support (phone call & email)</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Unlimited Number of Admin</div>
                            </li>

                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Welcome call with Specialist</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>3% Transaction Fee on Bookings</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Dedicated Account Officer</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Remove GotoCourse Branding</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Webinars & Events</div>
                            </li>

                        </ul>


                        <div className="btncontainer">
                            <Link to={`/enterprise-signup`}><button className="whitebtn">Get started</button></Link>
                        </div>


                    </div>

                    <div className="reviewdiv">
                        <p>Enterprise Plan</p>
                        <p><span>$399 </span>per month</p>


                        <ul>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div> Everything in Premium Plan Incusive</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Admin Center/(Assign Roles & Permission)</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Dedicated Account Success Officer</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Youtube Integration</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div> 3% Transaction Fee on Bookings</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Advanced Analytics</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Priority Support</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Advanced Landing Page Customization</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Completion Certificates & Digital Badges</div>
                            </li>
                            <li>
                                <div><AiFillCheckCircle /></div>
                                <div>Business Advicing</div>
                            </li>
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