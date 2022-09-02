import styled from "styled-components"
import serena from '../../images/celebs/serena.jpg'
import vector from '../../images/celebs/Vector.png'
import img1 from '../../images/celebs/Rectangle606.png'
import img2 from '../../images/celebs/Rectangle607.png'
import img3 from '../../images/celebs/Rectangle608.png'
import img4 from '../../images/celebs/Rectangle598.png'
import mk from '../../images/celebs/mk.png'
import transparent from '../../images/celebs/stepup.png'
import Layout from "../../components/Layout"


const MainContainer = styled.div`
background: #191046;
min-height: 200vh;
color: #FFFFFF;
font-family: 'Inter';
font-style: normal;
font-weight: 400;


h1, h2, h3, h4, h5, h6{
    margin:0;
    padding: 0;

}

`
const  Hero = styled.section`
background: linear-gradient(180.9deg, #191046 18.68%, rgba(16, 51, 70, 0.95) 97.29%);
width:100%;
padding-bottom: 2rem;

.breadwrapper{
    padding: .5rem 0;
    .breadcrumb-item.active{
        color: #F75C4E !important;
    }
}

`
const Top = styled.section`
// background: linear-gradient(180.9deg, #191046 18.68%, rgba(16, 51, 70, 0.95) 97.29%);
width:100%;
display: grid;
grid-template-columns: 1fr 2fr;
gap: 3rem;

.img{
    // border: 2px solid red;

    .bigimage{
        width: 30rem;
        height: 30rem;
        border-radius: 10px;

    }


    .stat{
        padding:2rem 0.2rem;

        .num{
            max-width: 30%;
            display: flex;
            // border: 2px solid green;
            justify-content: space-between;

        }

        .light{
            max-width: 75%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // border: 2px solid red;

            .book{
                font-weight: 600;
                font-size: 25px;
            }

            .bolt{
                span{
                    font-size: 12px;

                }

            }

        }

    }
}

.content{
    // border: 2px solid yellow;

    h1{
        font-size: 2rem;
        font-weight: 900;
        line-height: 58px;
    }
    
    h4{
        font-weight: 900;
        font-size: 2rem;
        line-height: 36px;
    }

    p{
        margin-top: 2rem;
        font-size: 14px;
        line-height: 29px;
    }

    .socials{
        display: flex;
        gap: 1rem;
        align-items: center;
        a{    
            color:#FFFFFF;
            font-weight: 400;
            font-size: 12px;
            line-height: 24px;
            text-decoration-line: underline;
        }
    }
}


@media (max-width: 912px){
    grid-template-columns: 1fr;
    width:100%;
 


    .img{
       width: 100%;
       height: 60vh;
       display: flex;
       flex-direction:column;

        .bigimage{
            max-width: 100%;
            height: 100%;
            align-self:center;
            object-fit:contain;
        }

        .stat{
            height: 20vh;

            .num, .light{
                max-width: 100%;
            }
        }
    }

    .content{
        margin-top: 4rem;

        h1, h4{
            text-align: center;
        }

    }

}



`

const Content = styled.section`
margin-top: 4rem;
background: linear-gradient(255.48deg, #F75C4E 10.25%, #FF958B 101.26%);
border-radius: 21.5944px;
width: 100%;
display: flex;
padding: 3rem;
// border: 2px solid yellow;


@media (max-width: 912px){
    flex-direction: column;
   gap: 3rem;

}

`

const ImageBox = styled.div`
flex: .5;
display: flex;
flex-wrap: wrap;
gap: 2rem 2rem;


.img{
    flex-shrink:0;
    width: 10rem;
    height: 10rem;

    img{
        border-radius: 21.875px;
        width: 100%;
        height: 100%;
    }

}


@media (max-width: 912px){
    gap: 2rem;
    justify-content: center;

}
`

const TextBox = styled.div`
    flex: .5;
    display: flex;
    flex-direction: column;

    h4{
        font-weight: 900;
        font-size: 1.5rem;
        line-height: 53px;
    }

    p{
        font-weight: 700;
        font-size: 1rem;
        line-height: 25px;
    }

    button{
        width: 300px;
        align-self: flex-end;
        padding: 1rem;
        outline: none;
        border:  none;
        background: #0C2191;
        border-radius: 10px;
        color: #FFFFFF;
    }


    @media (max-width: 1024px){
      justify-content: center;
    }

    @media (max-width: 912px){
        gap: 1rem;

        h4{
           
            font-size: 1.5rem;
            line-height: 30px;
            text-align: center;
        }
    }
`

const Review = styled.section`
margin-top: 4rem;
width: 100%;


h4{
    text-align: center;
    font-weight: 900;
    font-size: 1.5rem;
    line-height: 53px;
}

.box{
    display: flex;
    width: 100%;
   justify-content: space-between;


    .card{
        flex:.3;
        height: 20rem;
        background: #2F80ED;
        border-radius: 24.551px;
        color: #fff;
        padding: 2rem;
        font-size: 1.2rem;

        span{
            font-weight: 400;
            line-height: 20px;
            padding: 1rem 0;

        }

        p{
            font-weight: 700;
            line-height: 35px;

        }

    }
}

@media (max-width: 912px){
    .box{
        flex-direction: column;
        gap: 3rem;

    }

}

`

const Others = styled.section`
margin: 4rem auto 0;
width: 80%;


h4{
    text-align: center;
    font-weight: 900;
    font-size: 1.5rem;
    line-height: 53px;
}

.box{
    display: flex;
    width: 100%;
   justify-content: space-between;
   
   
   .card{
       flex:.3;
       height: 30rem;
       color: #fff;
       background: #322574;
       border: none;
       outline: none;

        .img{
            height: 285px;
            img{
                width: 100%;
                height: 100%
            }

        }

        .info{
            height: 30%;
            padding: 1rem .5rem;
    
            p{
                font-weight: 600;
                font-size: 20px;
                line-height: 33px;

            }

            span{
                font-weight: 400;
                line-height: 24px;
                font-size: 12px

            }

            .cost{
                display: flex;
                padding: 1rem 0;
                align-items: center;
                justify-content: space-between;
            }
        }


    }
}


@media (max-width: 912px){
    .box{
        flex-direction: column;
        gap: 3rem;

    }

}

`

const Image = styled.section`
margin-top: 4rem;
width: 100%;
height: 65vh;
background-image: url(${transparent});
background-size: cover;
background-position: top;
background-repeat: no-repeat;
position: relative;

.overlay{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    background: rgba(12, 33, 145, 0.67); 
}


.text{
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    text-align: center;
    // border 2px solid red;
    max-width: 25%;


    h4{
        text-align: center;
        font-weight: 900;
        font-size: 1.5rem;
        line-height: 40px;
        color: #fff;
        // border 2px solid red;
    }

    button{
        margin: 1rem 0;
        width: 150px;
        outline: none;
        border: none;
        padding: 1rem;
        color: #fff;
        background: #F75C4E;

    }

  
    

}

@media (max-width: 912px){
    .text{
     max-width: 50%;
    }
 
 }


`

export default function CelebProfile() {
    return (
        <Layout>
            <MainContainer >

            <Hero>
            <div className="container">
                    <div className="breadwrapper">
                        <nav arial-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">Mentor Lounge</li>
                                <li className="breadcrumb-item">Mentors</li>
                                <li className="breadcrumb-item active">Serena Williams</li>
                            </ol>
                        </nav>
                    </div>
                    
                    <Top>
                        <div className="img">
                            <img className="bigimage" src={serena} alt="" />

                            <div className="stat">

                                <div className="num">
                                    <span>5.0</span>
                                    <span>423 followers</span>

                                </div>

                                <div className="light">
                                    <span className="book">Book Session</span>

                                    <div className="bolt">
                                        <img src={vector} alt="" width="20" height="20" />
                                        <span>24Hrs</span>

                                    </div>


                                </div>

                            </div>
                        </div>

                        <div className="content">

                            <h1>About</h1>
                            <h4>Serena Williams</h4>
                            <p>
                                Serena Williams, (born September 26, 1981, Saginaw, Michigan,
                                U.S.), American tennis player who revolutionized women’s tennis with her powerful style of play and who won more Grand Slam singles titles (23) than any other woman or man during the open era.
                                <br />
                                <br />
                                Serena Williams
                                Williams grew up in Compton, California. The family included her parents—Oracene Price, a nurse, and Richard Williams, who founded a security service—and Venus Williams, her older sister.
                                <br />
                                <br />
                                While both parents encouraged Serena and Venus Williams to play tennis, it was Richard Williams who largely taught them the sport, taking the two girls to the public courts in the area. He was known as a strict coach, and the sisters spent long hours practicing. In 1991 the family moved to Florida so that Serena and Venus Williams could attend a tennis academy.
                            </p>

                            <div className="socials">
                                <a href="">website</a>
                                <a href="">LinkedIn</a>
                                <a href="">facebook</a>
                                <a href="">Reddit</a>
                            </div>

                        </div>

                    </Top>
                    </div>
                </Hero>
                <div style={{background: "#191046"}}>
                    <div className="container">
                        <Content>
                            <ImageBox>
                                <div className="img">
                                    <img src={mk} alt="" />
                                </div>
                                <div className="img">
                                    <img src={serena} alt="" />
                                </div>
                                <div className="img">
                                    <img src={img4} alt="" />
                                </div>
                                <div className="img">
                                    <img src={img1} alt="" />
                                </div>
                                <div className="img">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="img">
                                    <img src={img3} alt="" />
                                </div>

                            </ImageBox>
                            <TextBox>
                                <h4>Find your Gotocourse match</h4>
                                <p>Access our mentoring lounge to book a
                                    session with any of our celebrity mentors</p>
                                <button>
                                    Get tailored search
                                </button>

                            </TextBox>

                        </Content>
                    </div>
                </div>
                <div style={{background: "#191046"}}>
                    <div className="container">
                        <Review>
                            <h4>Reviews</h4>
                            <div className="box">
                                <div className="card">
                                    <p>Monday</p>
                                    <span>A Week Ago</span>
                                    <p>Thank Amandler for the amazing video</p>
                                </div>
                                <div className="card">
                                    <p>Monday</p>
                                    <span>A Week Ago</span>
                                    <p>Thank Amandler for the amazing video</p>

                                </div>
                                <div className="card">
                                    <p>Monday</p>
                                    <span>A Week Ago</span>
                                    <p>Thank Amandler for the amazing video</p>

                                </div>

                            </div>


                        </Review>
                    </div>
                </div>
                <div style={{background: "#191046"}}>
                    <div className="container">
                        <Others>
                            <h4>You might also like</h4>
                            <div className="box">
                                <div className="card">
                                    <div className="img">
                                        <img src={img1} alt="" />
                                    </div>
                                    <div className="info">
                                        <p>Remi Diaro</p>
                                        <span>Productivity and Capacity Management</span>
                                        <div className="cost">
                                            <span>$200</span>
                                            <div className="bolt">
                                                <img src={vector} alt="" width="20" height="20" />
                                                <span>24Hrs</span>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="card">
                                    <div className="img">
                                        <img src={img2} alt="" />
                                    </div>
                                    <div className="info">
                                        <p>Remi Diaro</p>
                                        <span>Productivity and Capacity Management</span>
                                        <div className="cost">
                                            <span>$200</span>
                                            <div className="bolt">
                                                <img src={vector} alt="" width="20" height="20" />
                                                <span>24Hrs</span>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="card">
                                    <div className="img">
                                        <img src={img3} alt="" />
                                    </div>
                                    <div className="info">
                                        <p>Remi Diaro</p>
                                        <span>Productivity and Capacity Management</span>
                                        <div className="cost">
                                            <span>$200</span>
                                            <div className="bolt">
                                                <img src={vector} alt="" width="20" height="20" />
                                                <span>24Hrs</span>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>


                        </Others>
                    </div>
                </div>

                <Image>
                    <div className="overlay" />
                    <div className="text">
                        <h4>Want to step up your career in Tech?</h4>
                        <button>
                            Book a  Mentor
                        </button>
                    </div>
                </Image>

            </MainContainer>
        </Layout>
    )
}

