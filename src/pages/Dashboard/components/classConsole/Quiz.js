import { useRef, useState } from 'react'
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


export default function Quiz() {
    const { pathname, search } = useLocation();
    const bread = pathname?.split("/");

    const [type, setType] = useState("")
    const [checked, setChecked] = useState(false)
    const [optionsNumber, setOptionsNumber] = useState(1)

    const [addNew, setAddNew] = useState(1)
    const [value, setValue] = useState(0);
    const [formstate, setFormstate] = useState({})
    const ref = useRef()
    const  {getItem } = useLocalStorage()
    const userdata = getItem(KEY)
    const { consoleFunctions: { fetchQuiz, addQuiz }, } = useAuth();

    let searchData = search.split("=").reverse()[0]


    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

   const quizAdd = useMutation(addQuiz, {
    onSuccess: (res)=>{
        console.log(res.data)
    },
    onError: (err)=>{
        console.error(err)
    }
   })

    const getContentfromQuery = useQuery(["quiz content", search], ()=>fetchQuiz(userdata.token, searchData))

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

    function submitForm(e){
        e.preventDefault();

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
                    

                    <form onSubmit={submitForm} className='content__quiz'>
                        <label htmlFor="Name">Name of Quiz</label>
                        <input type="text"
                        // placeholder='Name of Quiz' 
                        />

                        <label htmlFor="Name">Notes</label>
                        <input type="text"
                        // placeholder='Notes' 
                        />
                        <small>Users will see this on the page before they start quiz. Should describe the quiz</small>

                        <label htmlFor="date">Quiz deadline</label>
                        <div className="contenquiz__time">
                            <input type="date" />
                            <input type="time" placeholder='Time' />

                        </div>
                        <small>For quizzes without deadline, use a date far in the future</small>

                        <label htmlFor="time">Time Limit</label>
                        <input type="time" />

                        <label htmlFor="entries">Number of entries</label>
                        <input type="number" id='entries' />
                        <small>How many times can a student retry quiz?</small>



                        <div className="display">

                            {/* <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0"> */}
                            {[...Array(1)].map((x, id) => (


                                < Accordion >
                                    {
                                        [...Array(addNew)].map((x, id) => (
                                            <Accordion.Item eventKey={id} className="accord__body">
                                                <Accordion.Header className="accord__header"> Question {id + 1} </Accordion.Header>
                                                <Accordion.Body>
                                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="answertype-label">Question Type</InputLabel>
                                                        <Select
                                                            // labelId="questiontype-label"
                                                            // id="questiontype"
                                                            // label="question"
                                                            // className="myselect"
                                                            value={type}
                                                            onChange={(e) => setType(e.target.value)}
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': "Without label" }}
                                                            margin="dense"
                                                        >
                                                            <MenuItem value="theory">
                                                                Theory
                                                            </MenuItem>
                                                            <MenuItem value="multiple" >
                                                                Multiple Choice
                                                            </MenuItem>
                                                            <MenuItem value="checkbox" >
                                                                Checkbox
                                                            </MenuItem>
                                                            <MenuItem value="file">
                                                                File Upload
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <div className="texteditor quiz__editor">


                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data="<p>Hello from CKEditor 5!</p>"
                                                            onReady={editor => {
                                                                // You can store the "editor" and use when it is needed.
                                                                console.log('Editor is ready to use!', editor);
                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                console.log({ event, editor, data });
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
                                                                        checked={checked}
                                                                        onChange={(e) => setChecked(e.target.checked)}
                                                                    />}
                                                                label="Add an explanantion"
                                                            />

                                                            {
                                                                checked && (
                                                                    <div className='content__quiz'>
                                                                        <input type="text" id='' placeholder='Explain the correct Answer ' />

                                                                    </div>
                                                                )
                                                            }

                                                        </div>
                                                    </div>

                                                    {
                                                        ((type === "multiple") || (type === "checkbox")) && (
                                                            <div className="contentquiz__checkbbox">

                                                                <legend htmlFor="multiplechoice">Select the correct answer among the options using the checkbox</legend>
                                                                {
                                                                    [...Array(optionsNumber)].map((x, id) => (
                                                                        <div className='multiplechoice' key={id} data-id={id} ref={ref}>
                                                                            <input type="checkbox" id="checkbox" name="checkbox"
                                                                                value="Bike"
                                                                            />
                                                                            <input type="text" name="" id="" />
                                                                            <RiDeleteBinFill onClick={() => {
                                                                                console.log({ id });
                                                                                console.log("data", ref.current.getAttribute("data-id"));
                                                                                console.log(id === +(ref.current.getAttribute("data-id")));
                                                                            }} />

                                                                        </div>

                                                                    ))
                                                                }

                                                                <div className="prevbtn">
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault()
                                                                        setOptionsNumber(prev => prev + 1)

                                                                    }}>Add Option</button>
                                                                </div>

                                                            </div>
                                                        )
                                                    }

                                                </Accordion.Body>
                                            </Accordion.Item>

                                        ))
                                    }
                                </Accordion>

                            ))}
                        </div>




                        <div className="footerbtn">
                            <button>Save</button>
                            <button onClick={(e) => {
                                e.preventDefault()
                                setAddNew(prev => prev + 1)

                            }}>
                                New Question
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