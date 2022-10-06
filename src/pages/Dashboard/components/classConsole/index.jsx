
import { useState } from 'react'
import { AiFillClockCircle, AiOutlinePaperClip, AiOutlinePlus } from 'react-icons/ai'
import { BiCaretDown, BiCaretRight, BiCaretUp } from 'react-icons/bi'
import { BsPaperclip, BsCameraReels, BsCloudUpload, BsPlayBtn, BsThreeDotsVertical } from 'react-icons/bs'
import { RiVideoAddFill } from 'react-icons/ri'
import { VscNote, VscScreenNormal } from 'react-icons/vsc'

import { Logosm } from '../../../../images/components/svgs'
import style from "./style.module.css"
import "./console.css"
import { IconButton, Tooltip } from '@mui/material'

import { FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { MdAttachFile, MdLibraryAdd, MdLocationOn, MdMessage, MdOutlineNote } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal';
import { TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select, FormControlLabel, Switch } from '@mui/material'

import { Link } from 'react-router-dom'

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

const popIcon = [
    {
        id: 1,
        icon: BsCameraReels,
        title: "Record Camera"
    },
    {
        id: 2,
        icon: VscScreenNormal,
        title: "Record Screen"
    },
    {
        id: 3,
        icon: RiVideoAddFill,
        title: "Upload Video"
    },

    {
        id: 4,
        icon: BsCloudUpload,
        title: "Upload File/Image"
    },
    {
        id: 5,
        icon: BsPlayBtn,
        title: "Import from Creator suite"
    },
]



export const Console = ({ open, show, closeSmall, setShow, handleClose, handleShow, Toggle, moduleOpen, setModuleOpen, toggleModule, moduleClose, children }) => {


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
                toggleModule={toggleModule}
            />

            <PopModalContent open={open} closeSmall={closeSmall} />
            <ModuleModal moduleOpen={moduleOpen} moduleClose={moduleClose} />

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

    const data = [
        {
            id: 1,
            icon: AiOutlinePaperClip,
            title:"My file",
            link:1,
            type: "file",
        },

        {
            id: 2,
            icon: MdOutlineNote,
            title:"My Note",
            link:2,
            type: "note",

        }, 
         
        {
            id: 3,
            icon: VscNote,
            title:"My Quiz",
            link:3,
            type: "quiz",

        }
    ]
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
                        {
                            
                            data.map(({icon:Icon, title, link, id, type})=>(
                                <li key={id}>
                                    <Link to={`/test/${type}`}>
                                        <i><Icon /></i>
                                        <span>{title}</span> 
                                        {/* <i><BsThreeDotsVertical /></i> */}
                                    </Link>
                                </li>

                            ))
                        }
                    </ul>
                )
            }

        </div>
    )
}

export function ModalContent({ show, handleClose, toggleModule }) {
    const [showMore, setShowMore] = useState(false)
    const [type, setType] = useState("file")

    console.log("modal show", { show });
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className={style.modal__header}>
                    <Modal.Title className={style.modal__title}>Add Content</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className={style.content__form}>
                        <FormControl >

                            <InputLabel id="content-type-label">Content Type</InputLabel>
                            <Select
                                className='quizselect'
                                labelId="content-type-label"
                                id="content-type"
                                label="Content Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}>
                                <MenuItem value="file">
                                    <i><MdAttachFile /></i>
                                    File/Videos
                                </MenuItem>
                                <MenuItem value="Quiz">
                                    <i><VscNote /></i>
                                    Quiz
                                </MenuItem>
                                <MenuItem value="note">
                                    <i><MdOutlineNote /></i>
                                    Note
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <TextField fullWidth id="outlined-basic" label="Content Title" variant="outlined" placeholder='Content Title' />

                        </FormControl>

                        <FormControl>

                            <InputLabel id="domain-label">Domain</InputLabel>
                            <Select
                                labelId="domain-label"
                                id="domain"
                                label="Domain"
                                className="myselect"
                            // value={type}
                            // onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="test">
                                    Test
                                </MenuItem>

                                <button className={style.modulebtn} onClick={toggleModule}>+ New Module</button>

                            </Select>

                            <FormHelperText>A Domain is a container for similar content. e.g "Introduction", "Day 1" or "Domain 1"
                            </FormHelperText>
                        </FormControl>

                        {/* accordion */}

                        <div className={style}>
                            <div className={style.content_item_span}>
                                <span>Advance Options</span>

                                <i>
                                    {
                                        showMore ?
                                            <BiCaretUp onClick={() => setShowMore(!showMore)} />
                                            :
                                            <BiCaretDown onClick={() => setShowMore(!showMore)} />
                                    }
                                </i>
                            </div>

                            {
                                showMore && (
                                    <div>

                                        <TextField fullWidth id="outlined-basic" label="Content Objective" variant="outlined" placeholder='Content Objective' />
                                        <FormHelperText>What will your student do/learn with this content</FormHelperText>

                                        <div className={style.switchBorder}>

                                            <FormControlLabel control={
                                                <Switch defaultChecked />}
                                                label="Lock course content"
                                                labelPlacement="top"
                                            />
                                            <p className={style.formtext}>Content is currently locked</p>
                                        </div>

                                        <div className={style.switchBorder}>
                                            <FormControlLabel control={
                                                <Switch defaultChecked />}
                                                label="Notify students on update"
                                                labelPlacement="top"
                                            />

                                            <p className={style.formtext}>Email notification would be sent to student of the new
                                                course and when the course locked status changes</p>

                                        </div>


                                    </div>
                                )
                            }

                        </div>



                        <button className={style.contentform__btn}>Submit</button>

                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button variant="primary" onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer> */}
            </Modal>
        </div >
    )
}

export function ModuleModal({ moduleOpen, moduleClose }) {

    console.log("small modal show", { moduleOpen });
    console.log("small close show", { moduleClose });
    return (
        <div>
            <Modal show={moduleOpen} onHide={moduleClose}
                className="modulemodal"
            >
                <Modal.Header
                    className="module__header"
                >
                    <p>Add Domain</p>
                    <small>Domain are a combination of similar content e.g "Introduction", "Day 1"</small>
                </Modal.Header>
                <Modal.Body>
                    <div
                    // className="style.smallmodalbody"
                    >

                        <FormControl className='textfield__gap'>
                            <TextField fullWidth id="outlined-basic" label="Domain Name" variant="outlined" placeholder='Domain Name' />

                            <TextField fullWidth id="outlined-basic" label="Domain description" variant="outlined" placeholder='Domain Description(optional)' />

                        </FormControl>

                        <div className="contentbutton">
                            <button className=''>Submit</button>
                        </div>

                        {/* <label htmlFor="Name">Notes</label>
                            <input type="text" /> */}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" className="module__cancel">
                        Cancel
                    </button>

                </Modal.Footer>

            </Modal>
        </div>
    )
}


export function PopModalContent({ open, closeSmall }) {

    console.log("small modal show", { open });
    console.log("small close show", { closeSmall });
    return (
        <div>
            <Modal show={open} onHide={closeSmall} className="smallmodal">
                {/* <Modal.Header closeButton className="modal__header">
                </Modal.Header> */}
                <Modal.Body>
                    <div className="style.smallmodalbody">

                        {
                            popIcon.map(({ title, id, icon: Icon }) => (
                                <Tooltip title={title} key={id}>
                                    <IconButton className='popicons'>
                                        <Icon size="1.5rem" color='#0C2191' />
                                        <span className={style.smalltitle}>{title}</span>
                                    </IconButton>
                                </Tooltip>
                            ))
                        }
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}


export default Console