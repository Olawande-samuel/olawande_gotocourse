
import '../classConsole/Content.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
// import empty from '../../../../images/empty.png'
import { useAuth } from "../../../../contexts/Auth";
import { useLocalStorage } from "../../../../hooks";
import { useQuery } from "@tanstack/react-query"

const KEY = 'gotocourse-userdata';

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
    const { data, isSuccess } = useQuery(["fetch my classes"], () => fetchBootcamps(userdata?.token))
    console.log({ data });
    let navigate = useNavigate()
    return (
        <div className=''>
            <main className='assessments'>
                {
                    data?.data?.filter(item => item.paymentStatus === "complete" || item.paymentStatus === "paid")?.length > 0 ?
                        data?.data?.filter(item => item.paymentStatus === "complete" || item.paymentStatus === "paid").map((x, id) => (
                            <div className="assesstmentbox" key={x.bootcampId} style={{ cursor: "pointer" }} onClick={() => {
                                navigate(`/student/class-console/class/${x.bootcampId}`, {
                                    state: {
                                        bootcamp: x
                                    }
                                })
                            }}>
                                <div className="excelbox">
                                    {/* <img src={`${process.env.REACT_APP_IMAGEURL}${x.bootcampImg}`} alt="" /> */}
                                    <img src={`${x.bootcampImg}`} alt="" />
                                </div>
                                <p>{x.bootcampName} </p>
                            </div>
                        ))
                        :
                        // <p>no items</p>
                        

                    <div className="empty">
                        <p>No Class Available</p>
                    </div>

                }


            </main>
        </div>

    )
}