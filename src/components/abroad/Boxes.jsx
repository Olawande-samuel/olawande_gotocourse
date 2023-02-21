import styled from "styled-components"
import friends from '../../images/abroad/friends.png'
import nv from '../../images/abroad/nv.png'
import support from '../../images/abroad/support.png'
import chart from '../../images/abroad/chart.png'

const Container = styled.div`
background: #E1E7FF;
padding: 2rem 4rem;
width: 100%;


.container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    width: 100%;

    .boxes{
        /* height: 30px; */
        /* border: 5px solid red;         */
        border-radius: 32px;
        padding: 2rem 1rem;
        position: relative;
        min-height: 350px;
        width: 100%;


        p{
            font-style: italic;
        font-weight: 600;
        font-size: 26px;
        line-height: 30px;
        }

        span{
            font-style: italic;
        font-weight: 300;
        font-size: 18px;
        line-height: 27px;
        }

        .boximg img{
            position: absolute;
            bottom: 5px;
            right:5px;
            width: 200px;
            height: 150px;
            object-fit: contain;
            /* border: 2px solid green; */
        }
    }

    .boxes:nth-of-type(1){
        background: #EDFFFB;

    }

    .boxes:nth-of-type(2){
        background: #FFF9F9;
    }

    .boxes:nth-of-type(3), .boxes:nth-of-type(4){
        grid-column: 1 / span 3;
        display: flex;
        background: #EFF2FF;

        .firstbox, .secondbox{
            flex: 5;

            img{
                max-width:100%;
                max-height: 100%;

            }
        }

        .firstbox{
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 1rem;

        }

        .secondbox{
            text-align: end;

        }
    }

    .boxes:nth-of-type(4){
        background: #FFF7F7;
    }

    
}


@media (max-width: 768px) {
    padding: 1rem;

    .container{
        grid-template-columns: 1fr;

        .boxes{
            display: flex;
            flex-direction: column;

            .boximg img{
            justify-self: end;
            position: unset;
            width: 200px;
            height: 150px;
            object-fit: contain;
            /* border: 2px solid yellow; */
            }
        }

        .boxes:nth-of-type(3),.boxes:nth-of-type(4){
            grid-column: unset;
            flex-direction: column-reverse;
        }
   
    }
}

`

export const Boxes = () => {
    return (
        <Container>
            <div className="container">
                <div className="boxes">
                    <p>Enjoy learning with a cohort at low fess</p>
                    <span>Discover an exciting way of learning with a group of other learners.</span>

                    <div className="boximg">
                        <img src={friends} alt="" />

                    </div>

                </div>

                <div className="boxes">
                    <p>Enjoy access to great teachers and unlimited access to learning resource</p>
                    <span>From industry professionals sharing their experience in tech and resources available at your fingertips, begin your learning journey here.</span>

                    <div className="boximg">
                        <img src={nv} alt="" />

                    </div>

                </div>
                <div className="boxes">
                    <div className="firstbox">
                        <p>Not your usual tech training</p>
                        <span>
                            this is very different from what yiu have seen on the internet. This provides everything you need to take up a new skill, build your CV, and get a job
                        </span>
                    </div>

                    <div className="secondbox">
                        <img src={support} alt="" />
                    </div>

                </div>

                <div className="boxes">
                    <div className="firstbox">
                        <p>Become one of the most sought after in the market</p>
                        <span>
                        Remote jobs have become highly sought after.. Africa will be lacking more than 40 million specialists with digital skills by 2030.


                        </span>
                    </div>

                    <div className="secondbox">
                        <img src={chart} alt="" />
                    </div>

                </div>

            </div>


        </Container>
    )
}