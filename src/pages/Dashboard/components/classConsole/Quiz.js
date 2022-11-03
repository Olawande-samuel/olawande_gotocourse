import React, { useRef, useState } from 'react'
import '../classConsole/Content.css'
import Accordion from 'react-bootstrap/Accordion';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoDocumentTextOutline, IoTimeSharp } from 'react-icons/io5';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { InputLabel, MenuItem, FormControl, Select, FormControlLabel, Switch, Button } from '@mui/material'
import { RiDeleteBinFill } from 'react-icons/ri';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../contexts/Auth';
import { KEY } from '../../../../constants';
import { useLocalStorage } from '../../../../hooks';

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
                    <Typography>{children}</Typography>
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
                            < Accordion className="preview__accord">
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



// const Child = ({ onChildSubmit, childIndex }) => {
//     const [value, setValue] = useState({
//         type: "",
//         checked: false,
//         answer: "",
//         title: ""
//     })

//     const submitForm = (e) => {
//         e.preventDefault()
//         onChildSubmit(childIndex, value)

//     }

//     const [inputList, setInputList] = useState([{
//         title: "",
//     }])

//     const handleInputChange = (e, index) => {
//         const { name, value } = e.target;
//         const list = [...inputList];
//         list[index][name] = value;
//         setInputList(list)
//     }

//     const handleRemoveClick = index => {
//         const list = [...inputList]
//         list.splice(index, 1);
//         setInputList(list)
//     }

//     const handleAddClick = () => {
//         setInputList([...inputList, {
//             title: ""
//         }])
//     }


//     console.log({ inputList });




//     return (
//         <>
//             <Accordion >
//                 <Accordion.Item eventKey={childIndex} className="accord__body">
//                     <Accordion.Header className="accord__header"> Question {childIndex + 1}</Accordion.Header>
//                     <Accordion.Body>
//                         <FormControl sx={{ m: 1, minWidth: 120 }} >
//                             <InputLabel id="answertype-label">Question Type</InputLabel>
//                             <Select
//                                 // labelId="questiontype-label"
//                                 // id="questiontype"
//                                 // label="question"
//                                 // className="myselect"
//                                 value={value.type}
//                                 name="type"
//                                 onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
//                                 displayEmpty
//                                 inputProps={{ 'aria-label': "Without label" }}
//                                 margin="dense"
//                             >
//                                 <MenuItem value="theory">
//                                     Theory
//                                 </MenuItem>
//                                 <MenuItem value="multiple" >
//                                     Multiple Choice
//                                 </MenuItem>
//                                 <MenuItem value="checkbox" >
//                                     Checkbox
//                                 </MenuItem>
//                                 <MenuItem value="file">
//                                     File Upload
//                                 </MenuItem>
//                             </Select>

//                             <div className="texteditor quiz__editor">                                                        <CKEditor
//                                 editor={ClassicEditor}
//                                 data="<p>Hello from CKEditor 5!</p>"
//                                 onReady={editor => {
//                                     // You can store the "editor" and use when it is needed.
//                                     console.log('Editor is ready to use!', editor);
//                                 }}
//                                 onChange={(event, editor) => {
//                                     const data = editor.getData();
//                                     console.log({ event, editor, data });
//                                     setValue({
//                                         ...value,
//                                         title: data
//                                     })

//                                 }}
//                                 onBlur={(event, editor) => {
//                                     console.log('Blur.', editor);
//                                 }}
//                                 onFocus={(event, editor) => {
//                                     console.log('Focus.', editor);
//                                 }}
//                             />

//                                 <div className='textbtn'>
//                                     <Button
//                                         variant="outlined"
//                                         component="label"
//                                         className=""
//                                         style={{ color: "#0C2191" }}>
//                                         Add attachment
//                                         <input hidden accept="image/*" multiple type="file" />
//                                     </Button>
//                                 </div>

//                                 <div >
//                                     <FormControlLabel
//                                         control={
//                                             <Switch
//                                                 checked={value.checked}
//                                                 name="checked"
//                                                 onChange={(e) => setValue({ ...value, [e.target.name]: e.target.checked })}
//                                             />}
//                                         label="Add an explanantion"
//                                     />

//                                     {
//                                         value.checked && (
//                                             <div className='content__quiz'>
//                                                 <input type="text" id='' name="answer" placeholder='Explain the correct Answer ' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.checked })} />
//                                             </div>
//                                         )
//                                     }

//                                 </div>
//                             </div>

//                             {
//                                 ((value.type === "multiple") || (value.type === "checkbox")) && (
//                                     <div className="contentquiz__checkbbox">

//                                         <legend htmlFor="multiplechoice">Select the correct answer among the options using the checkbox</legend>


//                                         {
//                                             inputList.map((x, id) => (
//                                                 <div className='multiplechoice'>
//                                                     <div className='multiplechoice__input'>

//                                                         <input
//                                                             type="checkbox"
//                                                             // value={value.isAnswer}
//                                                             name="isAnswer"
//                                                             onChange={e => handleInputChange(e, id)} />
//                                                         <input
//                                                             type="text"
//                                                             name="title"
//                                                             value={x.title}
//                                                             onChange={e => handleInputChange(e, id)} />

//                                                         {
//                                                             inputList.length !== 1 && <RiDeleteBinFill onClick={() => handleRemoveClick(id)} />

//                                                         }
//                                                     </div>

//                                                     <div className='multiplechoice__addbtn'>
//                                                         {
//                                                             inputList.length - 1 === id &&
//                                                             <div className="prevbtn">
//                                                                 <button onClick={handleAddClick} >Add Option</button>
//                                                             </div>


//                                                         }
//                                                     </div>


//                                                 </div>
//                                             )
//                                             )}

//                                     </div>



//                                 )
//                             }
//                             <div className="footerbtn">
//                                 <button onClick={submitForm}>Save</button>
//                             </div>


//                         </FormControl>


//                     </Accordion.Body>
//                 </Accordion.Item>
//             </Accordion>
//         </>
//     )
// }


export default function Quiz() {
    const { pathname, search } = useLocation();
    const bread = pathname?.split("/");
    const [value, setValue] = useState(0);

    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)

    const { consoleFunctions: { fetchQuiz, addQuiz }, } = useAuth();
    let path = pathname.split("/")
    let classId = path[path.length -1]
    let searchData = search.split("=").reverse()[0]

    useEffect(()=>{
        setFormData({...formData, classId, contentId: searchData})
    },[classId, searchData])
 
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
            console.log(res.data)
        },
        onError: (err) => {
            console.error(err)
        }
    })

    const getContentfromQuery = useQuery(["quiz content", search, searchData], () => fetchQuiz(userdata.token, searchData), {
        onSuccess: (res)=> {
            console.log("successful query")
            console.log(res)
            if(res.data.length > 0){
                setFormData({...res.data[0]})
            }
        }
    } )

    console.log({getContentfromQuery})

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
                options: [
                    {
                        isAnswer: false,
                        title: ""
                    }
                ]

            }
        ]

    })


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = { ...formData }
        list.questions[index][name] = value;
        console.log(list);
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
                        multiple: [
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


    console.log({ formData });

    function handleSubmit(e){
        e.preventDefault();
        quizAdd.mutate([userdata.token, formData])

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

                <div className="contentbreadcrumb">
                    <nav arial-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={goBack(pathname)} style={{ color: "var(--theme-blue", textTransform: "uppercase" }}>
                                    Dashboard
                                </Link>
                            </li>
                            {bread
                                .filter((item) => item !== "")
                                .map((item, idx) => (
                                    <li className="breadcrumb-item text-uppercase" key={idx}>
                                        <Link
                                            style={{ color: "var(--theme-blue" }}
                                            to={`${bread.slice(0, idx + 2).join("/")}`}
                                        >
                                            {item.split("-").join(" ")}
                                        </Link>
                                    </li>
                                ))}
                        </ol>
                    </nav>
                </div>

                <TabPanel value={value} index={0}>

                    <main className='quiz__contentbody'>

                        <form className='content__quiz' onSubmit={handleSubmit}>
                            <label htmlFor="Name">Name of Quiz</label>
                            <input type="text"
                                // placeholder='Name of Quiz' 
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />

                            <label htmlFor="Name">Notes</label>
                            <input type="text"
                                // placeholder='Notes' 
                                name="note"
                                id="note"
                                value={formData.note}
                                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                            <small>Users will see this on the page before they start quiz. Should describe the quiz</small>

                            <label htmlFor="date">Quiz deadline</label>
                            <div className="contenquiz__time">
                                <input type="date" name="endDate"
                                    value={formData.endDate}
                                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />
                                <input type="time" placeholder='Time' name="endTime"
                                    value={formData.endTime}
                                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />

                            </div>
                            <small>For quizzes without deadline, use a date far in the future</small>

                            <label htmlFor="timeLimit">Time Limit</label>
                            <input 
                            type="number"
                                name="timeLimit"
                                id="timeLimit"
                                value={formData.timeLimit}
                                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />

                            <label htmlFor="entries">Number of entries</label>
                            <input type="number" id='entries'
                                name="maxAttempts"
                                value={formData.maxAttempts}
                                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}

                            />
                            <small>How many times can a student retry quiz?</small>
                            <div className="display">
                                {
                                    formData?.questions?.map((x, id) => (
                                        <>
                                            <Accordion >
                                                <Accordion.Item eventKey={id} className="accord__body">
                                                    <Accordion.Header className="accord__header"> Question {id + 1}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <FormControl sx={{ m: 1, width: "100%" }} >
                                                            <InputLabel id="answertype-label">Question Type</InputLabel>
                                                            <Select
                                                                // labelId="questiontype-label"
                                                                // id="questiontype"
                                                                // label="question"
                                                                // className="myselect"
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
                                                                <MenuItem value="checkbox" >
                                                                    Checkbox
                                                                </MenuItem>
                                                                <MenuItem value="file">
                                                                    File Upload
                                                                </MenuItem>
                                                            </Select>

                                                            <div className="texteditor quiz__editor">                                                        <CKEditor
                                                                editor={ClassicEditor}
                                                                data=""
                                                                onReady={editor => {
                                                                    // You can store the "editor" and use when it is needed.
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    console.log({ event, editor, data });
                                                                    const list = { ...formData }
                                                                    list.questions[id]['title'] = data;
                                                                    console.log(list);
                                                                    setFormData(list)
                                                                    // handleInputChange(event, id)

                                                                }}
                                                                onBlur={(event, editor) => {
                                                                    console.log('Blur.', editor);
                                                                }}
                                                                onFocus={(event, editor) => {
                                                                    console.log('Focus.', editor);
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

                                                                <div >
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={x.showAnswer}
                                                                                name="showAnswer"
                                                                                // onChange={(e) => setValue({ ...value, [e.target.name]: e.target.checked })}
                                                                                onChange={e => {
                                                                                    const list = { ...formData }
                                                                                    list.questions[id]['showAnswer'] = e.target.checked;
                                                                                    console.log(list);
                                                                                    setFormData(list)
                                                                                }
                                                                                }
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
                                                                            formData.questions[id].options.map((x, index) => (
                                                                                <div className='multiplechoice'>
                                                                                    <div className='multiplechoice__input'>

                                                                                        <input
                                                                                            type="checkbox"
                                                                                            // value={value.isAnswer}
                                                                                            name="isAnswer"
                                                                                            onChange={e => {
                                                                                                const list = { ...formData }
                                                                                                list.questions[id].options[index]['isAnswer'] = e.target.checked;
                                                                                                console.log(list);
                                                                                                setFormData(list)
                                                                                            }} />
                                                                                        <input
                                                                                            type="text"
                                                                                            name="title"
                                                                                            value={x.title}
                                                                                            onChange={e => {
                                                                                                const list = { ...formData }
                                                                                                list.questions[id].options[index]['title'] = e.target.value
                                                                                                console.log(list);
                                                                                                setFormData(list)
                                                                                            }} />

                                                                                        {
                                                                                            formData.questions[id].options.length !== 1 && <RiDeleteBinFill onClick={() => handleRemoveClick(id, index)} />

                                                                                        }
                                                                                    </div>

                                                                                    <div className='multiplechoice__addbtn'>
                                                                                        {
                                                                                            formData.questions[id].options.length - 1 === index &&
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
                                                            {/* <div className="footerbtn">
                                                                <button onClick={submitForm}>Save</button>
                                                            </div> */}


                                                        </FormControl>


                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <div className="footerbtn2">

                                                {
                                                    formData.questions.length - 1 === id && <button onClick={(e) => handleAddClick(e)}>
                                                        New Question
                                                    </button>
                                                }

                                            </div>

                                        </>
                                    ))}



                            </div>


                            <div className='footerbtn'>
                                <button >
                                    save
                                </button>
                            </div>




                        </form>

                        <div className="prevbtn">
                            <button><Link to="preview">Preview quiz</Link></button>

                        </div>


                    </main>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    Result
                </TabPanel>

            </Box>



        </div>

    )
}