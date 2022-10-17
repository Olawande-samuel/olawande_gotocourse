
import '../classConsole/Content.css'
import { Link, useParams } from 'react-router-dom';
import excel from '../../../../images/excel.png'

export function MyClass() {
    const { id } = useParams
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
    return (
        <div className=''>
            <main className='assessments'>
                {
                    [...Array(4)].map((x, id) => (
                        <Link to="/student/class-console/class">
                            <div className="assesstmentbox">
                                <div className="excelbox">
                                    <img src={excel} alt="" />
                                </div>
                                <p>EXCEL FUNCTIONS 101 </p>

                            </div>
                        </Link>

                    ))
                }


            </main>
        </div>

    )
}