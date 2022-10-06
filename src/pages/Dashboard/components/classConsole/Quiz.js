import { useState } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../classConsole/Content.css'
import Console from '../classConsole/index';
import Accordion from 'react-bootstrap/Accordion';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from 'react-router-dom';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoDocumentTextOutline, IoTimeSharp } from 'react-icons/io5';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { InputLabel, MenuItem, FormControl, Select, } from '@mui/material'
import { RiDeleteBinFill } from 'react-icons/ri';


export function Preview() {

    return (
        <>
            <div className="goback">
                <Link to="/"><AiOutlineArrowLeft /> class console</Link>
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
    return (
        
                <div className=''>


                    <main className='quiz__contentbody'>
                        <p className='quiz__title'>Quiz</p>

                        <form action="" className='content__quiz'>
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
                                {[...Array(3)].map((x, id) => (


                                    < Accordion >
                                        <Accordion.Item eventKey={id}>
                                            <Accordion.Header className="accord__header"> Question {id + 1} </Accordion.Header>
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

                            <div className="texteditor quiz__editor">
                                {/* <CKEditorContext context={Context}>
                                    <h2>Using the CKeditor 5 context feature in React</h2>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            plugins: [Paragraph, Bold, Italic, Essentials],
                                            toolbar: ['bold', 'italic']
                                        }}
                                        data="<p>Hello from the first editor working with the context!</p>"
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor1 is ready to use!', editor);
                                        }}
                                    />

                                </CKEditorContext> */}

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

                                <div className="textbtn">
                                    <button>Add attachment</button>
                                </div>
                            </div>


                            {/* <FormControl> */}

                            <InputLabel id="answertype-label">Answer Type</InputLabel>
                            <Select
                                labelId="answertype-label"
                                id="answertype"
                                label="Answer"
                                className="myselect"
                            // value={type}
                            // onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="Objective" >
                                    Objective
                                </MenuItem>
                                <MenuItem value="theory">
                                    Theory
                                </MenuItem>
                                <MenuItem value="file">
                                    File Upload
                                </MenuItem>
                            </Select>
                            {/* </FormControl> */}



                            {/* <div className="contentquiz__checkbbox">

                                <legend htmlFor="time">Select the correct answer among the options using the checkbox</legend>

                                <label htmlFor="vehicle1">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /> I have a bike
                                </label><br />

                                <label htmlFor="vehicle2">
                                    <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" /> I have a car
                                </label><br />


                                <label htmlFor="vehicle3">
                                    <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />I have a boat
                                </label><br />

                                <div className="textbtn">
                                    <button>Add Option</button>
                                </div>

                            </div> */}

                            <div className="contentquiz__checkbbox">

                                <legend htmlFor="multiplechoice">Select the correct answer among the options using the checkbox</legend>
                                {
                                    [...Array(3)].map((x, id) => (

                                        <>
                                            <div className='multiplechoice'>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                                <input type="text" name="" id="" />
                                                <RiDeleteBinFill />

                                            </div>
                                        </>
                                    )
                                    )
                                }



                                <div className="textbtn">
                                    <button>Add Option</button>
                                </div>

                            </div>


                            <div className="footerbtn">
                                <button>Save</button>
                                <button>New Question</button>
                            </div>




                        </form>

                        <div className="textbtn">
                            <button><Link to="preview">Preview quiz</Link></button>

                        </div>


                    </main>



                </div>

    )
}