import '../classConsole/Content.css'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
import Modal from "react-bootstrap/Modal";
import { useState } from 'react';
import '../classConsole/Content.css'
import { useNavigate } from 'react-router-dom';
import { MdAttachFile, MdOutlineNote } from 'react-icons/md';
import { VscNote } from 'react-icons/vsc';
import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from '../../../../hooks';
import { KEY } from '../../../../constants';
import { useAuth } from "../../../../contexts/Auth";


const PopModal = ({ show, handleClose }) => {
    const navigate = useNavigate()
    return (
        <>
            <Modal show={show} onHide={handleClose} className="classroom__modal">
                <Modal.Header closeButton >
                    <Modal.Title className={``}>
                        <div className='classroom__modalnav'>
                            <AiOutlineArrowLeft />
                            Student activity
                        </div>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='classroom__modalheader'>
                        <h3>Olufunmilayo Adekaunsi Class Activity</h3>
                        <p>Content student has opened</p>
                    </div>

                    <div className='classroom__modalcontent'>

                        <div className='classroom__modalitem'>
                            <p> <MdOutlineNote />new note</p>
                            <span>Objective: Learn how to create a note</span>
                            <span>Last opened on 10/2/2022.4:27:13 PM</span>
                        </div>

                        <div className='classroom__modalitem'>
                            <p><MdAttachFile /> My video content</p>
                            <span>Objective</span>
                            <span>Last opened on 10/2/2022.4:27:13 PM</span>
                        </div>

                        <div className='classroom__modalitem'>
                            <p> <VscNote />my quiz</p>
                            <span>Objective:</span>
                            <span>Last opened on 10/2/2022.4:27:13 PM</span>
                        </div>

                        <div className='classroom__modalitem'>
                            <p> <MdOutlineNote />new note</p>
                            <span>Objective: Learn how to create a note</span>
                            <span>Last opened on 10/2/2022.4:27:13 PM</span>
                        </div>

                        <div className='classroom__modalitem'>
                            <p><MdAttachFile /> My video content</p>
                            <span>Objective</span>
                            <span>Last opened on 10/2/2022.4:27:13 PM</span>
                        </div>

                        <div className='classroom__modalitem'>
                            <p> <VscNote />my quiz</p>
                            <span>Objective:</span>
                            <span>Last opened on 10/2/2022.4:27:13 PM</span>
                        </div>

                    </div>



                </Modal.Body>
                <Modal.Footer className='classroom__modalfooter'>
                    <div>
                        Assessment score: 60
                    </div>

                </Modal.Footer>
            </Modal>
        </>
    )
}



export default function Classroom() {
    const [show, setShow] = useState(false)
    const Toggle = () => setShow(!show)
    const handleClose = () => setShow(false)

    const {getItem} = useLocalStorage()
    const userdata = getItem(KEY)
    const [studentList, setStudentList] = useState([])
    const {teacherFunctions: {fetchApplications} } = useAuth()
    const fetchStudents = useQuery(["studentsFetch", userdata.token], ()=>fetchApplications(userdata.token), {
        onSuccess: (res)=> console.log({res}),
        onError: (err)=> console.error(err)
    })
    
    
    return (
        <div className=''>
            <PopModal show={show} handleClose={handleClose} />

            <main className='suite'>
                <div className="classroom__top">
                    <h4>Classroom students</h4>
                    <p>View student details and assess each students performance.
                        Select a student to view the student's activity</p>
                </div>

                <div className="suite__form">
                    <div className="suite__input">
                        <AiOutlineSearch />
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
                            <div className="classroom__info" onClick={Toggle}>

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