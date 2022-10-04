import { useState } from 'react'
import { AiOutlinePaperClip, AiOutlinePlus } from 'react-icons/ai'
import { BiCaretDown, BiCaretRight,BiCaretUp } from 'react-icons/bi'
import { BsPaperclip, BsThreeDotsVertical } from 'react-icons/bs'
import { RiVideoAddFill } from 'react-icons/ri'

import { Logosm } from '../../../../images/components/svgs'
import style from "./style.module.css"
import "./console.css"
import { IconButton, Tooltip } from '@mui/material'
import { FaUsers } from 'react-icons/fa'
import { MdLibraryAdd, MdMessage } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal';

const iconData = [
    {
        id: 1,
        icon: MdMessage,
        title: "Mail"
    },
    {
        id: 2,
        icon: MdLibraryAdd,
        title: "Creator suite"
    },
    {
        id: 3,
        icon: RiVideoAddFill,
        title: "Live Class"
    },
    {
        id: 4,
        icon: FaUsers,
        title: "Students"
    },
]

export const Console = ({ show, setShow, handleClose, handleShow, Toggle, children }) => {


    return (
        <div className={style.console}>

            <Sidebar
                show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleShow={handleShow}
                Toggle={Toggle}

            />
            <ModalContent
                show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleShow={handleShow}
                Toggle={Toggle}
            />

            <main className={style.children}>
                {children}
            </main>

            <div className={style.icon_bar}>

                {
                    iconData.map(({ title, id, icon: Icon }) => (
                        <Tooltip title={title} key={id}>
                            <IconButton>
                                <Icon size="1.5rem" color='#0C2191' />
                            </IconButton>
                        </Tooltip>
                    ))
                }
            </div>
        </div>
    )
}


function Sidebar({ Toggle }) {


    return (
        <article className={style.class_sidebar}>
            <Logosm />
            <div className={style.course_content}>
                <p>Course content</p>
                <Accord />
                <Accord />
                <Accord />
            </div>
            <div className={style.create_content_button}>
                <button onClick={Toggle}>
                    <i>
                        <AiOutlinePlus />
                    </i>
                    <span>New Content</span>
                    <i><BsThreeDotsVertical /></i>
                </button>
            </div>
        </article>
    )
}


function Accord() {

    const [details, showDetails] = useState(false)

    return (
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
    )
}

export function ModalContent({ show, setShow, handleClose, handleShow }) {
    const [showMore, setShowMore] = useState(false)

    console.log("modal show", { show });
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label htmlFor="">Content type</label>
                        <select name="" id="">
                            <option value="file">File/Videos</option>
                            <option value="Quiz">Quiz</option>
                            <option value="note">Note</option>
                        </select>

                        <label htmlFor="">Content Title</label>
                        <input type="text" placeholder='Content Title' />

                        <label htmlFor="">Domain</label>
                        <input type="text" placeholder='Domain' />
                        <small>A Domain is a container for similar content. e.g "Introduction", "Day 1" or "Domain 1"
                        </small>


                        {/* accordion */}

                        <div className={style.content_item}>
                            <div className={style.content_item_top}>
                                <span>Advance Options</span>

                                <i>
                                    {
                                        showMore ?
                                            <BiCaretDown onClick={() => setShowMore(!showMore)} />
                                            :
                                            <BiCaretUp onClick={() => setShowMore(!showMore)} />
                                    }
                                </i>
                            </div>

                            {
                                showMore && (
                                    <div>
                                        <label htmlFor="">Content Objective</label>
                                        <input type="text" placeholder='Content Objective' />
                                        <small>What will your student do/learn with this content</small>

                                        <span>Lock course content</span>
                                        <i><BsThreeDotsVertical /></i>
                                        <small>Content is currently locked</small>



                                        <span>Notify students on update</span>
                                        <i><BsThreeDotsVertical /></i>
                                        <small>Email notification would be sent to student of the new
                                            course and when the course locked status changes</small>
                                    </div>
                                )
                            }

                        </div>









                        <button>Submit</button>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button variant="primary" onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Console