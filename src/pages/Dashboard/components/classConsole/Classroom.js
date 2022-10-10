import '../classConsole/Content.css'
import { NavLink } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';





export default function Classroom() {
    return (
        <div className=''>
            <main className='suite'>
                <div className="classroom__top">
                    <h4>Classroom students</h4>
                    <p>View student details and assess each students performance.
                        Select a student to view the student's activity</p>
                </div>

                <div className="suite__form">
                    <div className="suite__input">
                        <AiOutlineSearch/>
                        <input type="search" name="" id="" placeholder='Search for videos/files' />

                    </div>

                </div>

                <div className="classroom__detail">
                    <div className="classroom__header">
                        <div>No</div>
                        <div>Name</div>
                        <div>Email</div>
                        <div>User Code</div>
                        <div>Course Completion</div>
                        <div>Assessment Scores</div>
                        <div>Upgraded Assessment</div>
                    </div>
                    {
                        [...Array(7)].map((x, id) => (
                            <div className="classroom__info">

                                <div>{id + 1}</div>
                                <div>Olufunmilayo Adekaunsi</div>
                                <div>xyz@gmail.com</div>
                                <div>214-3-44</div>
                                <div>0%</div>
                                <div>0.00%</div>
                                <div>0/0</div>
                            </div>
                        ))
                    }

                </div>







            </main>



        </div>


    )
}