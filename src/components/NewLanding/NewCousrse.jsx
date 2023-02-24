import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { gotoclass } from "../../constants";
import { useAuth } from "../../contexts/Auth";

const Container = styled.div`
  background: #F3F9FF;  
  padding: 3rem 0;

  .container{

      .headercontent{
        text-align: center;
        padding-bottom: 2.5rem 0;

        h4{
            font-family: 'Raleway';
            color: #000;
            font-size: 30px;
        }

        p{

            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 20px;
            color: #131313;
        }

    }


    .content{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(300px, 400px), 400px));
        grid-auto-rows: minmax(min-content, 300px);
        overflow: hidden;
        gap: 2.5rem;
        justify-content: center;

    }
  }


  @media screen and (max-width: 1250px) {

    .container{
        .content{
            grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
            justify-content: space-evenly;
            gap: 1rem;

        }
    }
  }
  @media screen and (max-width:500px){
    .container{
        .content{
            grid-template-columns: min(100%, 280px);
            justify-content:center;
            
        }
    }
    } 


`

const Card = styled.div`
background: #DEF2FF;
border-radius: 8px;
padding:1rem 2rem;
/* border: 2px solid red; */
height: 100%;

.middle{
    /* height: 50%; */
    /* border: 2px solid blue; */
    padding: .5rem 0;


    h2{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 28px;
        color: #131313;
    }
}

.bottom{
    height: 50%;
    /* border: 2px solid black; */

    p{
        font-size: 16px;
  
    }

    .salary{
        font-weight: 700;
        color: #131313;
    }

  
    button {
        border: none;
        border-radius: 7px;
        background: var(--theme-blue);
        color: #fff;
        padding: 0.5rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
    }

}
`
const NewCourse = () => {
    const { otherFunctions: { fetchBootcamps }, } = useAuth();
    const [shorts, setShorts] = useState([])

    let navigate = useNavigate()

    useQuery(["fetch classes"], () => fetchBootcamps(), {
        notifyOnChangeProps: ["category", "isFetching"],

        onSuccess: (res) => {
            if (res.data.length > 0) {
                const first = res.data?.length > 0 ? res.data?.filter(item => item.category ==="TRAIN2 WORKABROAD" && item.isActive && item.startDate ==="2023-03-06T00:00:00.000Z" && item.subCategory === "IN_DEMAND") : [];
                // const second = res.data?.length > 0 ? res.data?.filter(item => item.startDate === "2023-03-06T00:00:00.000Z" && item.isActive && item.subCategory === "IN_DEMAND") : [];
                const third = res.data?.length > 0 ? res.data?.filter(item => item.category ==="TRAIN2 WORKABROAD"  && item.isActive && item.startDate !=="2023-03-06T00:00:00.000Z" && item.subCategory === "IN_DEMAND").sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];
                const all = [...first, ...third];
                setShorts(all)
            }
        }
    })
    return (
        <Container>
            <div className="container">

                <div className="headercontent">
                    <h4>Choose an In-demand career</h4>
                    <p>Build job relevant skills by learning from experts from world-class <br />
                        companies and universities. Finish program within 2 months to 6 months</p>

                </div>


                <div className="content">
                    {shorts.slice(0,8).map((item, i) => (
                        // ({ title, bootcampImg, category, duration, price, packages, bootcampId, description, startDate }) => {
                        <Card key={i}>

                            <div className="middle">
                                <h2>{item.title}</h2>
                            </div>

                            <div className="bottom">

                                <p className="salary">
                                    Average Salary: <span>{ }</span>
                                </p>

                                <p>{item.duration}</p>

                                <button onClick={() => gotoclass(item.title, item.category, item.bootcampId, navigate)}>Learn More</button>

                            </div>
                        </Card>

                    ))}

                </div>

            </div>

        </Container>
    )
}

export default NewCourse