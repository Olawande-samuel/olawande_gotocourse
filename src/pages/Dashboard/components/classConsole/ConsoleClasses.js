import styled from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom';
// import empty from '../../../../images/empty.png'
import { useAuth } from "../../../../contexts/Auth";
import { useLocalStorage } from "../../../../hooks";
import { useQuery } from "@tanstack/react-query"
import '../classConsole/Content.css'
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import Loader from '../../../../components/Loader';
import { getFullDate, KEY } from '../../../../constants';




const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
  grid-auto-rows: 350px;
  overflow: hidden;
  gap: 2.5rem;
  row-gap: 3rem;
  justify-content: center;
  padding: .7rem .5rem;



  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
    justify-content: space-evenly;
    gap: 1rem;
  }
  @media screen and (max-width:500px){
        grid-template-columns: min(100%, 280px);
        justify-content:center;
    } 
`;

export const AssessmentCard = styled.div`
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    // padding: 1rem clamp(0.625rem, 0.5179rem + 0.5357vw, 1rem);
    box-shadow: -9px 150px 60px rgba(0, 0, 0, 0.01), -5px 85px 51px rgba(0, 0, 0, 0.05), -2px 38px 38px rgba(0, 0, 0, 0.09), -1px 9px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    .img{
        width: 100%;
        height: 200px;
        // border: 2px solid green;

        img{
            width:100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .content{
        padding: .5rem 1rem;
        // border: 2px solid red;

        h6 {
            font-weight: 700;
            padding: .5rem 0;

        }
        p{
            font-size:14px;
            color: red;
   
        }

      
        button {   
            background:#0072EF;
            font-size:14px;
            border:1px solid #0072EF;
            outline:none;
            color:#fff;
            padding: .5rem;
            border-radius: 15px;
        }
   

      


    }
  
`

export function MyClass() {
    const { id } = useParams
    const { generalState: { isMobile }, studentFunctions: { fetchCourses, fetchWishlist, fetchBootcamps: fetchMyClasses }, otherFunctions: { fetchCourses: fetchAllCourses, fetchBootcamps } } = useAuth();


    return (
        <div className=''>
            <main className='questionblue'>
                <div className='question__info'>
                    <p className="question__type">Theory</p>
                    <p className="question__number">Question {id}</p>

                </div>

                <p className="question__type">Student answer:</p>

                <div className="teacher__review">
                    <p>Teacher's review</p>

                    <div className="answer__status">
                        <p>Answer Status:</p>
                        <p>Teacher's Comment</p>

                    </div>
                </div>



            </main>
        </div>

    )
}

export default function ConsoleClasses() {
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const { generalState: { isMobile }, studentFunctions: { fetchCourses, fetchWishlist, fetchBootcamps } } = useAuth();
    const { data, isSuccess, isLoading } = useQuery(["fetch my classes"], () => fetchBootcamps(userdata?.token))
    // console.log({ data });
    let navigate = useNavigate()

    let today = new Date()

    const [search, setSearch] = useState("")
    return (
        <div className=''>
            {isLoading && <Loader />}
            <main className='assessments'>
                <div className="assessments__inputcontainer">
                    <input type="text"
                        className='assessments__input'
                        placeholder="Search for a Class"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <AiOutlineSearch style={{ fontSize: "1.5rem", color: "#292D32" }} />
                </div>

                {
                    data?.data?.filter(item => item.status === "paid")?.length > 0 ?
                        <Grid>
                            {data?.data?.filter(item => (item.status === "paid") &&
                                item?.bootcampName
                                    .toLowerCase()
                                    .includes(search?.toLowerCase())

                            ).map((x, id) => (
                                <AssessmentCard key={x.bootcampId} style={{ cursor: "pointer" }} onClick={() => {
                                    navigate(`/student/class-console/class/${x.bootcampId}`, {
                                        state: {
                                            bootcamp: x
                                        }
                                    })
                                }}>
                                    <div className="img">
                                        <img src={x.bootcampImg} alt="" />
                                    </div>
                                    <div className="content">
                                        <h6>{x.bootcampName}</h6>
                                        {x?.nextPayment &&
                                            (x?.paymentStatus === "incomplete") &&
                                            <p>
                                                Next payment:{getFullDate(x?.nextPayment)}
                                            </p>}
                                            <button>Open Class</button>

                                        {/* {
                                            x?.paymentStatus === "completed" ? <button>Open Class</button> :
                                                x?.paymentStatus === "incomplete" && (new Date(x?.nextPayment) >= today) && <button>Open Class</button>} */}
                                    </div>
                                </AssessmentCard>
                            ))}

                        </Grid>
                        :
                        // <p>no items</p>


                        <div className="dashboard_empty">
                            <p>No Class Available</p>
                        </div>

                }


            </main>
        </div>

    )
}


export function ConsoleMessages() {
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const { generalState: { isMobile }, studentFunctions: { fetchCourses, fetchWishlist, fetchBootcamps } } = useAuth();
    const { data, isSuccess, isLoading } = useQuery(["fetch my classes"], () => fetchBootcamps(userdata?.token))
    // console.log({ data });
    let navigate = useNavigate()

    const [search, setSearch] = useState("")
    return (
        <div className=''>
            {isLoading && <Loader />}
            <main className='assessments'>
                <div className="assessments__inputcontainer">
                    <input type="text"
                        className='assessments__input'
                        placeholder="Search for a Class"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <AiOutlineSearch style={{ fontSize: "1.5rem", color: "#292D32" }} />
                </div>

                {
                    data?.data?.filter(item => item.status === "paid")?.length > 0 ?
                        <Grid>
                            {data?.data?.filter(item => item.status === "paid" &&
                                item?.bootcampName
                                    .toLowerCase()
                                    .includes(search?.toLowerCase())

                            ).map((x, id) => (
                                <AssessmentCard key={x.bootcampId} style={{ cursor: "pointer" }} onClick={() => {
                                    navigate(`/student/console/myclasses/${x.bootcampId}`, {
                                        state: {
                                            bootcamp: x
                                        }
                                    })
                                }}>
                                    <div className="img">
                                        <img src={x.bootcampImg} alt="" />
                                    </div>
                                    <div className="content">
                                        <h6>{x.bootcampName}</h6>

                                        <button>Open Messages</button>
                                    </div>
                                </AssessmentCard>
                            ))}

                        </Grid>
                        :
                        // <p>no items</p>


                        <div className="dashboard_empty">
                            <p>No Class Available</p>
                        </div>

                }


            </main>
        </div>

    )
}