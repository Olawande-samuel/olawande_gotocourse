import styled from "styled-components"
import tick from '../../images/abroad/tick.svg'
import eligibilty from '../../images/abroad/eligibilty.png'


const Container = styled.section`
  background: linear-gradient(180deg, #25008D 0%, #00067B 100%);
  
`

const TopContainer = styled.div`
padding: 2rem;

  .container{
    text-align: center;
    width: 80%;
    margin: 0 auto;

    h4{
        text-align: center;
        font-weight: 700;
        font-size: 38px;
        line-height: 50px;
        color: #fff;
    }

        p{
            font-weight: 400;
            font-size: 14px;
            line-height: 28px;
            color: #fff;


         }
    .content{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 200px;
        gap: 2rem;
        padding: 3rem 0;


        .item{
            /* background: #041469; */
            background: rgb(240, 242, 255);
            box-shadow: 0px 12px 40px rgba(14, 21, 56, 0.25);
            border-radius: 40px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;


            p{
                font-weight: 800;
                font-size: 18px;
                line-height: 18px;
                color: #fff;
                padding: 1rem 0;
            }

      
    
        }
    }

   


  }

  @media (max-width: 768px) {
        padding: 2rem 0;

        .container{
            width: 100%;
            margin: unset;

            .content{
            grid-template-columns: 1fr;
            }
        }
    }

`

const BottomContainer = styled.div`
width: 100%;
font-family: 'Raleway';
color: #fff;
padding: 2rem 0;
display: flex;
flex-direction: column;
gap: 5rem;

.container{
    /* width: 80%;
    margin: 0 auto; */
    display: flex;

    .heroleft{
        /* border: 2px solid yellow; */
        flex: .5;
        height: 350px;
        text-align: center;
        img{
            max-width: 100%;
            max-height: 100%;
        }

    }

    .heroright{
        /* border: 2px solid red; */
        flex: .5;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;

    
         h1{
            font-style: normal;
            font-weight: 900;
            font-size: 40px;
            line-height: 54px;
            padding: .3rem 0;
            color:var(--theme-orange)
         }
         p{
            font-weight: 400;
            font-size: 14px;
            line-height: 28px;

         }

         .icons{
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            /* justify-content: space-between; */

            .heroicons{
                display: flex;
                align-items: center;
                gap: .5rem
            }
         }


         button {
        margin-top: 2rem;
        border: none;
        border-radius: 7px;
        background: var(--theme-orange);
        color: #fff;
        padding: 0.5rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
    }




    }

   

    
  
}

@media (min-width: 820px ) and (max-width: 1024px){
    height: unset;

    .container{

            .heroright{
                h1{
                font-size: 30px;
                line-height: 30px;
            }
        }
}
}



@media (max-width: 768px) {
        text-align: center;

        .container{
            width: 100%;
            flex-direction: column;
            gap: 2rem;

            .heroright{

                h1{
                font-size: 40px;
                line-height: 40px;
            }
        }

 


        /* &:nth-of-type(2){
        flex-direction: column;

        }  */
    }

 
    
}

`
const NewBenefit = () => {
    return (
        <Container>

            <TopContainer>
                <div className="container">


                    <h4>Benefits of Gotocourse Africa</h4>
                    <p>
                        Gotocourse Africa offers a wide range of benefits to learners across the continent. With access to world-class courses, expert instructors, and cutting-edge learning technology, you'll be empowered to reach your full potential.
                    </p>
                    <div className="content">

                        <div className="item" >
                            <p>
                                Learn <br /> from industry <br /> Experts
                            </p>

                        </div>

                        <div className="item">
                            <p>
                                Live <br /> instructor-led <br /> learning
                            </p>

                        </div>

                        <div className="item" >
                            <p>
                                One-on-one <br /> mentoring
                            </p>
                        </div>

                        <div className="item" >
                            <p>
                                Great learning <br /> Community
                            </p>
                        </div>

                        <div className="item" >
                            <p>
                                Self paced<br />  learning
                            </p>
                        </div>

                        <div className="item" >
                            <p>
                                Cohort <br />  learning
                            </p>
                        </div>

                    </div>

                </div>


            </TopContainer>
            <BottomContainer>

                <div className="container">

                    <div className="heroleft" >
                        <img src={eligibilty} alt="" />
                    </div>

                    <div className="heroright">
                        <h2>Eligibility
                        </h2>
                        <p>
                            We are looking for ambitious individuals that are
                            forward-thinking, innovative, and ready to take up
                            challenges in creating the next Big Thing.
                        </p>

                        <div className="icons">

                            <div className="heroicons">
                                <img src={tick} alt="" />
                                <span>
                                Must be an African
                                </span>

                            </div>

                            <div className="heroicons">
                                <img src={tick} alt="" />
                                <span>
                                    Must possess workable laptop and strong internet connection
                                </span>

                            </div>

                            <div className="heroicons">
                                <img src={tick} alt="" />
                                <span>
                                Must be available to attend classes
                                </span>

                            </div>

                        </div>



                    </div>




                </div>

            </BottomContainer>
        </Container>



    )
}

export default NewBenefit