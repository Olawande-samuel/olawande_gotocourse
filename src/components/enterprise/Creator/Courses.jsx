// import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import img1 from '../../../images/creator/one.png'
import img2 from '../../../images/creator/two.png'
import img3 from '../../../images/creator/three.png'
import img4 from '../../../images/creator/one.png'
import img5 from '../../../images/creator/two.png'
import img6 from '../../../images/creator/three.png'

const Container = styled.div`
background: rgba(214, 220, 255, 0.3);
padding: 4rem 1rem;

h4{
    text-align: center;
}

`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 300px), 300px));    
    grid-auto-rows: 400px;
    overflow: hidden;
    gap: 1.5rem;
    justify-content: space-around;
    padding: .7rem .5rem;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
    justify-content: space-evenly;
    gap: 1rem;
  }




  @media screen and (max-width:500px){
        grid-template-columns: min(100%, 280px);
        justify-content:center;
    } 
`
const Card = styled.div`
    border: .5px solid #eee;
    border-radius: 4px;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: -10px 159px 64px rgba(0, 0, 0, 0.01), -6px 89px 54px rgba(0, 0, 0, 0.05), -3px 40px 40px rgba(0, 0, 0, 0.09), -1px 10px 22px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    /* transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.1)
    } */

    img {
        height: 150px;
        flex: 40%;
        max-width:100%;
    }
    .up_content {
        flex: 60%;
        display:flex;
        flex-direction: column;
        padding: 1rem;
        // border: 2px solid green;
        position: relative;
        gap: 2rem;


        .cta{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }


    h5 {
        font-weight: 700;
    }

    p{
        font-weight: 500;
        font-size: 13.6101px;
        line-height: 16px;
    }

    button{
        border:2px solid white;
        background: #000F62;
        color: #fff;
        padding: .5rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
        a{
            color: #fff; 
        }
    }

}
`
const data =[ {
    img:img1,
    head:"Strategy Execution for Public Leadership",
    text: "Join Harvard Kennedy School faculty and former Pentagon Chief of Staff Eric",
    price: "$2000",
    time: "2 weeks "
},
{
    img:img2,
    head:"Strategy Execution for Public Leadership",
    text: "Join Harvard Kennedy School faculty and former Pentagon Chief of Staff Eric",
    price: "$2000",
    time: "2 weeks "
},
{
    img:img3,
    head:"Strategy Execution for Public Leadership",
    text: "Join Harvard Kennedy School faculty and former Pentagon Chief of Staff Eric",
    price: "$2000",
    time: "2 weeks "
},
{
    img:img4,
    head:"Strategy Execution for Public Leadership",
    text: "Join Harvard Kennedy School faculty and former Pentagon Chief of Staff Eric",
    price: "$2000",
    time: "2 weeks "
},
{
    img:img5,
    head:"Strategy Execution for Public Leadership",
    text: "Join Harvard Kennedy School faculty and former Pentagon Chief of Staff Eric",
    price: "$2000",
    time: "2 weeks "
},
{
    img:img6,
    head:"Strategy Execution for Public Leadership",
    text: "Join Harvard Kennedy School faculty and former Pentagon Chief of Staff Eric",
    price: "$2000",
    time: "2 weeks "
},
]

const Courses = () => {
    return (
        <Container>
            <div className="container">

            <h4>Courses</h4>

                <Grid>

                    {data.map((x, id) => (


                        <Card>
                            <img src={x.img} alt="" />

                            <div className="up_content">

                                <div>
                                    <h5>{x.head}</h5>
                                    <p>{x.text}</p>
                                </div>

                                {/* <small dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} /> */}
                                <div className="cta">
                                    <span>{x.price}</span>
                                    <span>{x.time}</span>
                                </div>

                            </div>

                            <button>Register</button>


                        </Card>
                    ))
                    }
                </Grid>
            </div>


        </Container>

    )
}

export default Courses