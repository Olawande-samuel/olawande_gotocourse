import '../classConsole/Content.css'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
import Modal from "react-bootstrap/Modal";
import { useState } from 'react';
import '../classConsole/Content.css'
import { useNavigate, useParams } from 'react-router-dom';
import { MdAttachFile, MdOutlineNote } from 'react-icons/md';
import { VscNote } from 'react-icons/vsc';
import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from '../../../../hooks';
import { KEY } from '../../../../constants';
import { useAuth } from "../../../../contexts/Auth";


const PopModal = ({ show, handleClose, data }) => {

    
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
                        <h3>{data.studentName}</h3>
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
    const handleClose = () => setShow(false)
    const [data, setData]= useState({})
    const {getItem} = useLocalStorage()
    const userdata = getItem(KEY)
    const [studentList, setStudentList] = useState([])
    const {teacherFunctions: {fetchBootcampApplications, fetchCourseStudents} } = useAuth()
    
    const {classId} = useParams()
    
    
    
    const Toggle = (item) => {
        setData(item)
        setShow(!show)
    }

    console.log({classId})
    // const fetchStudents = useQuery(["studentsFetch", userdata.token], ()=>fetchApplications(userdata.token), {
    const fetchStudents = useQuery(["studentsFetch", userdata.token], ()=> fetchBootcampApplications(userdata.token, classId), {
        onSuccess: (res)=> {
            console.log({res})
            if(res.statusCode === 1){
                setStudentList(res.data)
            }
        
        },
        onError: (err)=> console.error(err)
    })
    
    const studentData = [

        {
            name:"Richmond Tyson",
            email:"richieTy@gmail.com",
            code:"212-33-34"
        },
        {
            name:"Alysson Bach",
            email:"bachAlysson92@gmail.com",
            code:"212-83-34"
        },
        {
            name:"Ahmed Mahmoud",
            email:"moudya@gmail.com",
            code:"212-42-45"
        },
        {
            name:"Hope Sterling",
            email:"s_hope@gmail.com",
            code:"212-61-74"
        },
    ]
    

    function downloadCsv(data){
        const blob = new Blob([data], { type: "text/csv" })
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'Students_list.csv');
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(href);       
      } 
    
    
    
      function exportCsv (e){
        e.preventDefault()
      
        let headers = ['Name,11 Student ID, Content Completed, Assessment Score, Ungraded Assessment']
    
        let usersCsv = fetchStudents?.data?.data?.reduce((acc, item) => {
          const {studentName, studentId, contentCompleted ,accessmentScore ,ungradedAccessment } = item
          acc.push([studentName, studentId, contentCompleted ,accessmentScore ,ungradedAccessment].join(','))
          return acc
        }, [])
      
        let csvData = [...headers, ...usersCsv].join('\n')
    
        downloadCsv(csvData)
        
      }


    return (
        <div className=''>
            <PopModal show={show} handleClose={handleClose} data={data}  />

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
                    <button onClick={exportCsv}>Download csv</button>

                </div>

                <div className="classroom__detail">
                    <div className="classroom__header">
                        <div>No</div>
                        <div>Name</div>
                        {/* <div>Email</div> */}
                        <div>User Code</div>
                        <div>Course Completion</div>
                        <div>Assessment Scores</div>
                        <div>Ungraded Assessments</div>
                    </div>
                    {
                        studentList?.map((x, id) => (
                            <div className="classroom__info" onClick={()=>Toggle(x)}>

                                <div>{id + 1}</div>
                                <div>{x.studentName}</div>
                                {/* <div>{x.email}</div> */}
                                <div>{x.studentId}</div>
                                <div>{x.contentCompleted}</div>
                                <div>{x.accessmentScore}</div>
                                <div>{x.ungradedAccessment}</div>
                            </div>
                        ))
                    }

                </div>







            </main>



        </div>


    )
}