import React, { useRef, useState } from 'react'
import '../classConsole/Content.css'
import Accordion from 'react-bootstrap/Accordion';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoDocumentTextOutline, IoTimeSharp } from 'react-icons/io5';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { InputLabel, MenuItem, FormControl, Select, FormControlLabel, Switch, Button, TextField, Modal } from '@mui/material'
import { RiDeleteBinFill } from 'react-icons/ri';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../../contexts/Auth';
import { KEY } from '../../../../constants';
import { useLocalStorage } from '../../../../hooks';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import { consoleFunctions } from '../../../../contexts/functions';
import { useEffect } from 'react';
import { DocumentViewer } from './File';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

export function Preview() {

    return (
        <>
            <div className="goback">
                <Link to="/test/quiz"><AiOutlineArrowLeft /> class console</Link>
            </div>

            <div className='preview__content'>
                <div className='preview__top'>
                    <h4>Quiz</h4>
                    <p><IoIosCheckmarkCircle /> Allowable number of Submission: 1</p>
                    <p><IoDocumentTextOutline /> Number of Submissions: 0</p>
                    <p><IoTimeSharp /> Deadline: 05/10/2022, 12:54: 00</p>
                </div>

                <div className='preview__bottom'>
                    <h4>Question</h4>
                    <div >

                        {[...Array(3)].map((x, id) => (
                            < Accordion className="preview__accord" key={id}>
                                <Accordion.Item eventKey={id}>
                                    <Accordion.Header className="previewaccord__header"> Question {id + 1} </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                        ))}
                    </div>


                    <div className="previewbtn">
                        <button>Submit</button>
                        <small>Only students can submit assessments</small>
                    </div>
                </div>

            </div>

        </>
    )
}



export default function Quiz() {
    const { pathname, search } = useLocation();
    const bread = pathname?.split("/");
    const [value, setValue] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)
    
    const { consoleFunctions: { fetchQuiz, addQuiz, quizEdit }, } = useAuth();
    let path = pathname.split("/")
    const {classId} = useParams()
    let searchData = search.split("=").reverse()[0]
    const contentId = searchParams.get("content")
    const [edit, setEdit] = useState(false)
    const queryClient = useQueryClient()

    const [formData, setFormData] = useState({
        classId:"",
        contentId:"",
        title: "",
        endDate: "",
        endTime: "",
        note: "",
        timeLimit: "",
        maxAttempts: 1,
        questions: [
            {
                type: "",
                title: "",
                showAnswer: false,
                answer:"",
                grade:"",
                options: [
                    {
                        isAnswer: false,
                        title: ""
                    }
                ]

            }
        ]

    })


 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const quizAdd = useMutation(([token, data])=>addQuiz(token, data), {
        onSuccess: (res) => {
            if(res.statusCode === 1){
                toast.success(res.message)
                return
            }
            toast.error(res.message)
        },
        onError: (err) => {
            toast.error("something went wrong")

            console.error(err)
        }
    })


    const editQuiz = useMutation(([token, id, data])=>quizEdit(token, id, data), {
        onSuccess: (res) => {
            if(res.statusCode === 1){
                toast.success(res.message)
                queryClient.invalidateQueries(["quiz content"])
                return
            }
            toast.error(res.message)
        },
        onError: (err) => {
            toast.error(err.message)
            console.error(err)
        }
    })



    const getContentfromQuery = useQuery([contentId], () => fetchQuiz(userdata.token, searchData), {
        enabled: !!userdata.token,
        refetchOnWindowFocus: false,
        onSuccess: (res)=> {
            if(res.data?.length > 0){
                let deadline = res.data[res.data.length -1].endDate?.split("T")[0]
                let deadlineTime = res.data[res.data.length -1].endDate?.split("T")[1]
                setFormData({...res.data[res.data.length -1], endDate: deadline, endTime: deadlineTime.substr(0, 5)})
                setEdit(true)
            }else{
                setEdit(false)
                setFormData({
                    classId,
                    contentId:searchData,
                    title: "",
                    startDate:"",
                    endDate: "",
                    endTime: "",
                    note: "",
                    timeLimit: "",
                    maxAttempts: 1,
                    questions: [
                        {
                            type: "",
                            title: "",
                            showAnswer: false,
                            answer:"",
                            options: [
                                {
                                    isAnswer: false,
                                    title: ""
                                }
                            ]
            
                        }
                    ]
            
                })
            }
        }
    } )

    
    

    function goBack() {
        let pathArray = pathname.split("/")[1];

        switch (pathArray) {
            case "teacher":
                return "/teacher";
            case "student":
                return "/student";
            default:
                return "/admin";
        }
    }


    console.log({formData})
   


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = { ...formData }
        list.questions[index][name] = value;
        setFormData(list)
    }

    const handleRemoveClick = (id, index) => {
        const list = { ...formData }
        list.questions[id].options.splice(index, 1)
        setFormData(list)

        // const list = [...questions]
        // list.splice(index, 1);
        // setInputList(list)
    }

    const handleAddClick = (e) => {
        e.preventDefault()
        setFormData(
            {
                ...formData,
                questions: [
                    ...formData.questions,
                    {
                        type: "",
                        title: "",
                        showAnswer: false,
                        answer: "",
                        options: [
                            {
                                isAnswer: false,
                                title: ""
                            }
                        ]
                    }

                ]
            }
        )
        // setInputList([...questions, {
        //     title: ""
        // }])
    }

    const handleAddOptions = (e, id, index) => {
        e.preventDefault()
        let list = { ...formData }
        list.questions[id].options.push({
            isAnswer: false,
            title: ""
        }
        )

        setFormData(list)

        // setInputList([...questions, {
        //     title: ""
        // }])
    }



    function handleSubmit(e){
        e.preventDefault();
        edit ?
        editQuiz.mutate([userdata.token, formData._id, formData])
        :
        quizAdd.mutate([userdata.token, {...formData, classId, contentId}])

    }

    
    
    return (

        <div className=''>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ marginBottom: "2rem" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Quiz" {...a11yProps(0)} />
                        <Tab label="Result" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <main className='quiz__contentbody'>
                        {
                            getContentfromQuery.isLoading ? <div className="spinner-border text-primary">
                                <div className="visually-hidden">Loading...</div>
                            </div>

                            :

                        <form className='content__quiz' onSubmit={handleSubmit}>
                            <label htmlFor="Name">Name of Quiz</label>
                            <input type="text"
                                // placeholder='Name of Quiz' 
                                name="title"
                                id="title"
                                value={formData?.title}
                                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />

                            <label htmlFor="Name">Notes</label>
                            <input type="text"
                                // placeholder='Notes' 
                                name="note"
                                id="note"
                                value={formData?.note}
                                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                            <small>Users will see this on the page before they start quiz. Should describe the quiz</small>

                            <label htmlFor="date">Quiz deadline</label>
                            <div className="contenquiz__time">
                                <input type="date" name="endDate"
                                    value={formData?.endDate}
                                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />
                                <input type="time" placeholder='Time' name="endTime"
                                    value={formData?.endTime}
                                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />

                            </div>
                            <small>For quizzes without deadline, use a date far in the future</small>

                            <label htmlFor="timeLimit">Time Limit (mins)</label>
                            <input 
                            type="number"
                                name="timeLimit"
                                id="timeLimit"
                                value={formData?.timeLimit}
                                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />

                            <label htmlFor="entries">Number of entries</label>
                            <input type="number" id='entries'
                                name="maxAttempts"
                                value={formData?.maxAttempts}
                                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}

                            />
                            <small>How many times can a student retry quiz?</small>
                            <div className="display">
                                {
                                    formData?.questions?.map((x, id) => (
                                        <div key={id}>
                                            <Accordion key={id} >
                                                <Accordion.Item eventKey={id} className="accord__body">
                                                    <Accordion.Header className="accord__header"> Question {id + 1}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <FormControl sx={{ m: 1, width: "100%" }} >
                                                            <InputLabel id="answertype-label">Question Type</InputLabel>
                                                            <Select
                                                                value={x.type}
                                                                name="type"
                                                                displayEmpty
                                                                inputProps={{ 'aria-label': "Without label" }}
                                                                margin="dense"
                                                                onChange={e => handleInputChange(e, id)}

                                                            >
                                                                <MenuItem value="THEORY">
                                                                    Theory
                                                                </MenuItem>
                                                                <MenuItem value="MULTIPLE_CHOICE" >
                                                                    Multiple Choice
                                                                </MenuItem>
                                                                <MenuItem value="CHECKBOX" >
                                                                    Checkbox
                                                                </MenuItem>
                                                                <MenuItem value="FILE_UPLOAD">
                                                                    File Upload
                                                                </MenuItem>
                                                            </Select>

                                                            <div className="texteditor quiz__editor">  
                                                            
                                                             <ReactQuill theme="snow" value={x?.title ?? ""} 
                                                                onChange={(e)=>{
                                                                    if(formData?.questions[id]['title'] !== ""){ 
                                                                        const list = {...formData}
                                                                        list.questions[id]['title'] = e;
                                                                        setFormData(list)    
                                                                    }
                                                                }} 
                                                            />
                
                                                                

                                                                <div className='textbtn'>
                                                                    <Button
                                                                        variant="outlined"
                                                                        component="label"
                                                                        className=""
                                                                        style={{ color: "#0C2191" }}>
                                                                        Add attachment
                                                                        <input hidden accept="image/*" multiple type="file" />
                                                                    </Button>
                                                                </div>

                                                                {
                                                                    x.type === "THEORY" &&

                                                                    <div>
                                                                        <div className='content__quiz'>
                                                                            <input type="text" id='' name="answer" placeholder='Grade '
                                                                                onChange={(e)=>{
                                                                                    const list = { ...formData }
                                                                                    list.questions[id]['grade'] = Number(e.target.value);
                                                                                    setFormData(list)
                                                                               }} 
                                                                               value={x.grade}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                }
                                                                <div >
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={x.showAnswer}
                                                                                name="showAnswer"
                                                                                defaultValue=""
                                                                                onChange={e => {
                                                                                    const list = { ...formData }
                                                                                    list.questions[id]['showAnswer'] = e.target.checked;
                                                                                    setFormData(list)
                                                                                }
                                                                                }
                                                                                value="off"
                                                                            />}
                                                                        label="Add an explanantion"
                                                                    />


                                                                    {
                                                                        x.showAnswer && (
                                                                            <div className='content__quiz'>
                                                                                <input type="text" id='' name="answer" placeholder='Explain the correct Answer '
                                                                                    onChange={e => handleInputChange(e, id)} 
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }

                                                                </div>
                                                            </div>

                                                            {
                                                                ((x.type === "MULTIPLE_CHOICE") || (x.type === "checkbox")) && (
                                                                    <div className="contentquiz__checkbbox">

                                                                        <legend htmlFor="multiplechoice">Select the correct answer among the options using the checkbox</legend>


                                                                        {
                                                                            formData?.questions[id].options.map((x, index) => (
                                                                                <div className='multiplechoice' key={index}>
                                                                                    <div className='multiplechoice__input'>

                                                                                        <input
                                                                                            type="checkbox"
                                                                                            name="isAnswer"
                                                                                            onChange={e => {
                                                                                                const list = { ...formData }
                                                                                                list.questions[id].options[index]['isAnswer'] = e.target.checked;
                                                                                                setFormData(list)
                                                                                            }} />
                                                                                        <input
                                                                                            type="text"
                                                                                            name="title"
                                                                                            value={x.title}
                                                                                            onChange={e => {
                                                                                                const list = { ...formData }
                                                                                                list.questions[id].options[index]['title'] = e.target.value
                                                                                                setFormData(list)
                                                                                            }} />

                                                                                        {
                                                                                            formData?.questions[id].options.length !== 1 && <RiDeleteBinFill onClick={() => handleRemoveClick(id, index)} />

                                                                                        }
                                                                                    </div>

                                                                                    <div className='multiplechoice__addbtn'>
                                                                                        {
                                                                                            formData?.questions[id].options.length - 1 === index &&
                                                                                            <div className="prevbtn">
                                                                                                <button onClick={(e) => handleAddOptions(e, id, index)} >Add Option</button>
                                                                                            </div>


                                                                                        }
                                                                                    </div>


                                                                                </div>
                                                                            )
                                                                            )}

                                                                    </div>



                                                                )
                                                            }
                                                        </FormControl>


                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <div className="d-flex justify-content-between mt-4" style={{gap:" 1rem"}}>
                                                <div className="footerbtn2">
                                                    {
                                                        formData?.questions.length - 1 === id && <button onClick={(e) => handleAddClick(e)}>
                                                            New Question
                                                        </button>
                                                    }


                                                </div>
                                               
                                            </div>

                                        </div>
                                    ))}



                            </div>


                            <div className='footerbtn'>
                                <button disabled={quizAdd.isLoading || editQuiz.isLoading} >
                                    {
                                        quizAdd.isLoading ? 
                                        <div className="spinner-border text-white">
                                            <div className="visually-hidden">Loading...</div>
                                        </div>
                                        :
                                        <span>save</span>
                                    }
                                </button>
                            </div>



                        </form>
                        }

                        {/* <div className="prevbtn">
                            <button><Link to="preview">Preview quiz</Link></button>

                        </div> */}


                    </main>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <ResultPanel  contentId={contentId} searchData={searchData}  />
                </TabPanel>

            </Box>



        </div>

    )
}


function ResultPanel({contentId, searchData}){

    const {getItem} = useLocalStorage()
    const userdata = getItem(KEY)
    const {consoleFunctions: { fetchQuiz }, teacherConsoleFunctions: { newFetchAttemptedQuiz }} = useAuth()

    const [results, setResults] = useState([])
    const [data, setData] = useState({})

    const getContentfromQuery = useQuery([contentId], () => fetchQuiz(userdata.token, searchData), {
        enabled: userdata.token !== null,
        refetchOnWindowFocus: false,
        onSuccess: (res)=> {

            if(res.data?.length > 0){
                let deadline = res.data[res.data.length -1].endDate?.split("T")[0]
                let deadlineTime = res.data[res.data.length -1].endDate?.split("T")[1]
                setData({...res.data[res.data.length -1]})
            }else{
                setData({})
            }
        }
    } )

    

    const fetchStudentsQuizzes = useQuery(["fetchStudentsQuizes", userdata.token, data?._id], ()=> newFetchAttemptedQuiz(userdata.token, data._id), {
        onSuccess: (res)=>{
            if(res.data?.length > 0){
                setResults(res.data)
            }else {
                setResults([])
            }
        },
        onError: (err)=>console.error(err)
    })

    
    return (
        <section>
            <section className="quiz__cards_container">
                 {
                    fetchStudentsQuizzes?.isLoading ?
                    <div className="spinner-border text-primary">
                        <div className="visually-hidden">loading...</div>
                    </div>
                    :
                    (
                        results.length > 0
                        ?
                        results?.map((item, i) => (
                            <ResultCards key={i} {...item} all={item} />
                        ))
                        :
                        <p className="text-center lead">No one has attempted the quiz yet</p>
                    )

                }
            </section>
        </section>
    )
}




function ResultCards({studentId, totalScore,quizId, graded, studentName,  updatedAt, all}){
    const [open, setOpen] = useState(false)
    const [data, setData]= useState(()=>all)

    useEffect(()=>{
        if(all._id){
            setData(all)
        }
    },[])

    const queryClient = useQueryClient()
    
    const {getItem}  = useLocalStorage()
    const userdata = getItem(KEY)

    const {consoleFunctions: {deleteQuizAttempt}} = useAuth()

    const deleteMutation = useMutation(([token, quizId, attemptId])=>deleteQuizAttempt(token, quizId, attemptId), {
        onSuccess: res => {
            if(res?.statusCode === 1) {
                queryClient.invalidateQueries(["fetchStudentsQuizes"])
                toast.success(res.message)
                return
            } 
            toast.error(res?.message)
        },
        onError: err => {
            toast.error(err.message)
        }
    })



    function deleteAttempt(){
        if(window.confirm("Are you sure you want to delete this")){
            deleteMutation.mutate([userdata.token, quizId, all._id ])
        }
    }

    return (
        <div className="quiz__card">
            <p className="quiz__card_student_name fw-bolder">{studentName}</p>
            <div>
                <span className="fw-bold">Actual score: </span>
                <span>{totalScore}</span>
            </div>
            <div>
                <span className="fw-bold">Student ID: </span>
                <span>{studentId}</span>
            </div>
            <div>
                <span className="fw-bold">Graded: </span>
                <span dangerouslySetInnerHTML={{__html: graded}} />
            </div>
            {/*<div>*/}
            {/*    <span>Number of tries: </span>*/}
            {/*    <span>Actual score</span>*/}
            {/*</div>*/}
            <p>{updatedAt?.split("T")[0]} {new Date(updatedAt)?.toLocaleTimeString()}</p>

            <div className="d-flex gap-2">
                <button className="quiz__card_del_btn" onClick={deleteAttempt} disabled={deleteMutation?.isLoading}>
                    {
                        deleteMutation?.isLoading ?
                        <div className="spinner-border text-danger">
                            <div className="visually-hidden">Loading...</div>
                        </div>
                        :
                        <span>Delete</span>
                    }
                </button>
                <button className="quiz__card_open_btn" type="button" onClick={()=> setOpen(true)} >Open Answer</button>
            </div>
            <AssessQuiz open={open} setOpen={setOpen} data={data} />
        </div>
    )
}




function AssessQuiz({open, setOpen, data}){

    const style = {
		position: "absolute",
		bottom: 0,
		left: "50%",
		transform: "translateX(-50%)",
		width: "100%",
		height: "100%",
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		padding: "4rem 2rem",
		overflowY: "auto",
	};
    
    return (
        <Modal
			open={open}
			onClose={(e) => {
				setOpen((_) => false);
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={style}>
				<div>
					<AiOutlineClose
						onClick={(e) => {
							setOpen((_) => false);
						}}
						size="1.5rem"
						style={{ marginLeft: "auto", display: "block", cursor: "pointer" }}
					/>
				</div>
                <ScoreSection data={data} />
                {
                    data?.questions?.map((item, i) => (
                        <QuestionBox key={i} question={item} i={i} entryId={data._id} />
                    ))
                }
                {/* <div className="">
                    <button className="quiz__question_review--btn">Save and Submit Quiz Review</button>                     
                </div> */}
            </Box>
        </Modal>
    )
}



function ScoreSection({data}){
    const {consoleFunctions:{calculateFinalGrade}} = useAuth()
    const {getItem} = useLocalStorage()
    const userdata = getItem(KEY)
    const [total, setTotal] = useState(()=>data.totalScore)



    const mutation = useMutation(([token, id])=>calculateFinalGrade(token, id), {
        onSuccess: res => {
            
            if(res?.success){
                setTotal(res.data.totalScore)
                return
            }
            toast.error(res.message)
        },
        onError: err => {
            console.error(err)
            toast.error(err.message)
        }
    })




    function submit(e){
        e.preventDefault();
        mutation.mutate([userdata.token, data._id])
    }


    return (

        <div className="quiz__score">
            <div>
                <span style={{fontWeight: 700}}>Name: </span>
                <span>{data.studentName}</span>
            </div>
            <div className="mb-2">
                <span style={{fontWeight: 700}}>Student ID: </span>
                <span>{data.studentId}</span>
            </div>

            <form className="quiz__score_form" >
                <div className="mb-2">
                    <TextField label="Total Score"  fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} disabled={true} value={total} />
                    <small></small>
                </div>
                {/* <div className="mb-2">
                    <TextField id="outlined-basic" fullWidth label="Comment" variant="outlined" disabled={true} />                       
                </div> */}

                <button className="quiz__score_btn" onClick={submit}>
                    {
                        mutation.isLoading ? 
                        <div className="spinner-border text-white">
                            <div className="visually-hidden">Loading</div>
                        </div>
                        :
                        <span>
                            Calculate Total Score
                        </span>
                    }
                </button>
            </form>


        </div>
    )
}


function questionConverter(questionType){
    switch (questionType) {
        case "THEORY":
            return "Theory"
        case "FILE_UPLOAD":
            return "File Upload"
        case "MULTIPLE_CHOICE":
            return "Multiple Choice"
        case "CHECKBOX":
            return "Checkbox"
        default:
            break;
    }
}



function QuestionBox({question, i, entryId}){
    const {consoleFunctions: {gradeQuestion}} = useAuth()
    const [data,setData] = useState({
        questionId: question._id,
        isCorrect: "choose",
        score: 0
    })
    const {getItem} = useLocalStorage();
    const userdata = getItem(KEY)

    const queryClient = useQueryClient()

    const grade = useMutation(([token, id, data])=> gradeQuestion(token, id, data), {
        onSuccess: res => {
            if(res.success){
                toast.success(res.message)
                queryClient.invalidateQueries(["fetchStudentsQuizes"])
            }else {
                toast.error(res.message)
            }
        },
        onError: err => {
            console.error(err)
            toast.error(err.message)
        }
    })

    


    function submit(e){
        e.preventDefault();
        grade.mutate([userdata.token, entryId, data])
        // if(data.isCorrect !== "choose"){
        // }else {
        //     window.alert("Please make a selection")
        // }
    }



    return (

        <div className="quiz__question_box">
            <form>

            <div>
                <span style={{fontWeight: 700}}>Question {i + 1}: </span>
                <span>{question?.type && questionConverter(question.type) }</span>
                <div>
                    <span style={{fontWeight: 700}}>Grade: </span>
                    <span>{question?.grade}</span>
                </div>
            </div>
            <div className="my-4">
                <ReactQuill theme="snow" value={question?.title} readOnly={true} modules={{toolbar: false}} />
            </div>
            <div className='fw-bold'>Answer</div>
            {
                question.type === "THEORY" ?
                <ReactQuill theme="snow" value={question.answer} readOnly={true} modules={{toolbar: false}} />
                :
                question.type === "MULTIPLE_CHOICE" ?
                question?.options?.map( (item, i) => (
                    <div className='d-flex gap-2 align-items-center' key={i}>
                        <div className="form-group">
                            <label htmlFor={item.title} className="d-flex align-items-center">
                                <input type="radio" name={item.title} id={item.title} value={item.title} disabled={true} checked={item.selected} />
                                {" "}{item.title}
                            </label>

                        </div>
                        {
                            item.isAnswer && <small className='text-success'>Correct Option</small>
                        }
                    </div>
                ))
                :
                question.type === "FILE_UPLOAD" ?
                <FileQuiz question={question} />
                :
                ""
            }
            {/* <div>Answer 1</div>
            <div>Answer 2</div> */}
        
            <div className="quiz__question_review">
                <div className="quiz__question_review--content">
                    <form action="" className="quiz__score_form">
                        {
                            (question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOX") &&
                            <Box sx={{width: 240}} marginBottom="1rem" >
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Choose if answer is right</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.isCorrect}
                                        label="Age"
                                        onChange={(e)=>setData({...data, isCorrect: e.target.value})}
                                    >
                                        <MenuItem defaultValue="select">Select</MenuItem>
                                        <MenuItem value={true}>Correct</MenuItem>
                                        <MenuItem value={false}>Incorrect</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                        }
                        <Box marginBottom="1rem">
                            <TextField id="outlined-basic" label="Grade (%)" variant="outlined" value={data.score} onChange={(e)=>setData({...data, score: Number(e.target.value)})} />       
                        </Box>
                        {/* <Box marginBottom="1rem">
                            <TextField id="outlined-basic" label="Add a Comment" variant="outlined" />       
                        </Box> */}
                        <button className="open_review" onClick={submit}>
                            {
                                grade?.isLoading ? <span className="spinner-border text-white"><span className="visually-hidden">Loading...</span></span>
                                :
                                <span>Submit</span>
                            }
                        </button>
                        
                    </form>
                </div>

            </div> 
            </form>
            
        </div>
    )
}


function FileQuiz({question}){
    const [open, setOpen] = useState(false)
    
    function onOpen(e){
        e.preventDefault()
        setOpen(true)
    }
    return (
        <div className='d-flex gap-2 align-items-center'>
            <div className="card w-100">
                <div className="card-body">
                    <p>{question.answer}</p>
                    <div>
                        <button className='btn-plain' onClick={onOpen}>Open</button>
                    </div>
                </div>
            </div>    
            <DocModal open={open} setOpen={setOpen} file={question.answer} />
        </div>
    )
}

function DocModal({open, setOpen, file}){
    const style = {
		position: "absolute",
		bottom: 0,
		left: "50%",
		transform: "translateX(-50%)",
		width: "100%",
		height: "100vh",
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		// padding: "4rem 2rem",
		overflowY: "auto",
	};

    const [url,setURL] = useState("")
     useEffect(()=>{
        file?.toLowerCase().includes("pdf") ? setURL("https://res.cloudinary.com/gotocourse-us/images/upload/v1664205986/files/"):setURL("https://res.cloudinary.com/gotocourse-us/raw/upload/v1664205986/files/")
     },[file])
	return (
		<Modal
			open={open}
			onClose={(e) => {
				setOpen((_) => false);
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={style}>
				<div>
					<AiOutlineClose
						onClick={(e) => {
							setOpen((_) => false);
						}}
						size="1.5rem"
						style={{ marginLeft: "auto", display: "block", cursor: "pointer" }}
					/>
				</div>

                <DocumentViewer file={`${url}${file}`} />
            </Box>
        </Modal>

    )
}