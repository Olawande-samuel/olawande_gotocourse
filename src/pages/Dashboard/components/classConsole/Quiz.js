import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../classConsole/Content.css'
import Console from '../classConsole/index';
import style from "./style.module.css"
import { BiCaretDown, BiCaretRight, BiCaretUp } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiFillClockCircle, AiOutlinePaperClip, AiOutlinePlus } from 'react-icons/ai'

import { useState } from 'react'

export default function Quiz() {
    const [details, showDetails] = useState(false)
    return (
        <div>

            <Console
            >
                <div className=''>
                    <section className="contentheader">

                        <div className="contenttitle">
                            <h2>Class Console</h2>

                        </div>

                        <div className="contentbreadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    EXCEL FUNCTIONS 101
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
                            </Breadcrumb>

                        </div>

                    </section>


                    <main className='quiz__contentbody'>
                        <form action="" className='content__quiz'>
                            <label htmlFor="Name">Name of Quiz</label>
                            <input type="text" placeholder='Name of Quiz' />

                            <label htmlFor="Name">Notes</label>
                            <input type="text" placeholder='Name of Quiz' />
                            <small>Users will see this on the page before they start quiz. Should describe the quiz</small>

                            <div className="time">
                                <label htmlFor="date">Date</label>
                                <input type="date" />

                                <label htmlFor="time">Time</label>
                                <input type="time" />

                            </div>
                            <small>For quizzes without deadline, use a date far in the future</small>

                            <label htmlFor="time">Time Limit</label>
                            <input type="time" />

                            <label htmlFor="time">Number of entries</label>
                            <input type="number" />
                            <small>How many times can a student retry quiz?</small>

                        </form>

                        <div className="display">
                            <div className={style.content_item}>
                                <div className={style.content_item_top}>
                                    <i>
                                        {
                                            details ?
                                                <BiCaretDown onClick={() => showDetails(!details)} />
                                                :
                                                <BiCaretRight onClick={() => showDetails(!details)} />
                                        }
                                    </i>
                                    <span>Test</span>
                                    <i><BsThreeDotsVertical /></i>
                                </div>

                                {
                                    details && (
                                        <ul className={style.content_list}>
                                            <li>
                                                <i><AiOutlinePaperClip /></i>
                                                <span>Creating columns</span>
                                                <i><BsThreeDotsVertical /></i>
                                            </li>
                                            <li>
                                                <i><AiOutlinePaperClip /></i>
                                                <span>Creating columns</span>
                                                <i><BsThreeDotsVertical /></i>
                                            </li>
                                            <li>
                                                <i><AiOutlinePaperClip /></i>
                                                <span>Creating columns</span>
                                                <i><BsThreeDotsVertical /></i>
                                            </li>
                                        </ul>
                                    )
                                }

                            </div>
                        </div>


                    </main>



                </div>

            </Console>
        </div>
    )
}