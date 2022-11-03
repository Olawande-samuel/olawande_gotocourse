
import '../classConsole/Content.css'
import { Link, useParams } from 'react-router-dom';
import excel from '../../../../images/excel.png'
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
    const { generalState: { isMobile }, studentFunctions: { fetchCourses, fetchWishlist, fetchBootcamps: fetchMyClasses }, otherFunctions: { fetchCourses: fetchAllCourses, fetchBootcamps } } = useAuth();
    const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps());
    console.log(bootcamps?.data?.data);
    return (
        <div className=''>
            <main className='assessments'>
                {
                 bootcamps?.data?.data?.length > 0  && bootcamps?.data?.data.map((x, id) => (
                        <Link to="/student/class-console/class" key={x.bootcampId}>
                            <div className="assesstmentbox">
                                <div className="excelbox">
                                    <img src={x.bootcampImg}alt="" />
                                </div>
                                <p>{x.title} </p>

                            </div>
                        </Link>

                    ))
                }


            </main>
        </div>

    )
}