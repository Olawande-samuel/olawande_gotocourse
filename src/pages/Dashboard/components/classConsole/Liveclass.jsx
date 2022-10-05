import {useState} from 'react'
import { AiFillClockCircle, AiOutlinePaperClip, AiOutlinePlus } from 'react-icons/ai'
import {BsRecordCircle, BsThreeDotsVertical } from 'react-icons/bs'
import startImg from "../../../../images/liveclass/startlive.png"


import style from "./style.module.css"
import "./console.css"
import { FaCalendarAlt, } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { Box, Modal, Switch } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'




export function LiveClassInfo({type}){
    const [open, setOpen]= useState(false)

    return(

        <div className={style.live_class}>

            <header>
                <h4>Live class</h4>
               {type !== "student" && <p>Click on the button below to schedule a live class</p>}
                <p>You can only join an ongoing schedule</p>
            </header>

            <div className={style.live_schedule}>
                { type !== "student" && <button onClick={()=>setOpen(true)}>Schedule a live class</button>}
                <button>Refresh list</button>
            </div>

            <div className={style.currently_live}>
                <p>Scheduled Classes (2)</p>

                <div className={style.live_list}>
                    <CurrentLive />
                    <CurrentLive />
                </div>
            </div>
            <ScheduleClass open={open} setOpen={setOpen} />
        </div>
    )
}

export function CurrentLive(){
    const navigate = useNavigate()
    return (
        <div className={style.live_card}>
            <h6>Excel mastery</h6>
            <div className={style.live_card_schedule}>
                <div>
                    <i><FaCalendarAlt /></i>
                    <span>Tue Oct 04 2022</span>
                </div>
                <div>
                    <i><AiFillClockCircle /></i>
                    <span>21:10:00 - 12:10:00 GMT+0100 (West Africa Standard Time)</span>
                </div>
                <div>
                    <i><MdLocationOn /></i>
                    <span>Integrated live class</span>
                </div>
            </div>
            <div className={style.live_card_footer}>
                <button className={style.live_card__button} onClick={()=>navigate("connect")}>Live Class</button>
            </div>
        </div>
    )
}


export function ScheduleClass({open, setOpen}){

    const [inputType, setInputType]= useState(false)
    const modalStyle = {
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translate(-50%)',
        width: "min(100% - 2rem, 600px)",
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    return (
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
            <div className={style.class_schedule}>
                <div className="form-group my-3">
                    <label htmlFor="title" className="form-label generic_label">Title</label>
                    <input type="text" name="title" id="title" className="form-control" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="schedule" className="form-label generic_label">What time will you (or your teachers) be available for live class?</label>

                    <div className="row">
                        <div className="col-sm-6 pe-2 mb-3">
                            <input type={inputType ?  "date" : "text" } className='form-control' name="startDate" id="startDate"  onFocus={()=>setInputType(true)} onBlur={()=>setInputType(false)} placeholder="Start Date" />
                        </div>
                        <div className="col-sm-6 ps-2 mb-3">
                            <input type={inputType ?  "time" : "text" } name="endTime" id="endTime" className='form-control'  onFocus={()=>setInputType(true)} onBlur={()=>setInputType(false)} placeholder="Start Time"  />                   
                        </div>
                        <div className="col-sm-6 pe-2 mb-3">
                            <input type={inputType ?  "date" : "text" } className='form-control' name="endDate" id="endDate"  onFocus={()=>setInputType(true)} onBlur={()=>setInputType(false)} placeholder="End Date" />
                        </div>
                        <div className="col-sm-6 ps-2 mb-3">
                            <input type={inputType ?  "time" : "text" } name="endTime" id="endTime" className='form-control'  onFocus={()=>setInputType(true)} onBlur={()=>setInputType(false)}  placeholder="End Time" />
                        </div>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="title" className="form-label generic_label">Select a live class platform</label>
                        <input type="text" name="title" id="title" className="form-control" value="Integrated live class" disabled />
                    </div>
                    <button>Create</button>
                </div>
            </div>
        </Box>
        </Modal>
    )
}


export function Intermission(){
    const navigate = useNavigate()
    return(
        <section className={style.intermission}>
            <nav className={style.intermission_nav}>
                <button>    
                    <span>
                        Record
                    </span>
                    <i><BsRecordCircle /></i>
                </button>
                
                <button onClick={()=>navigate(-1)}>Class Console</button>
            </nav>
            <main className={style.intermission_main}>
                <img src={startImg} alt="" />
                <div className='d-flex flex-column'>
                    <button onClick={()=>navigate("/teacher/live-class/live")}>Join</button>
                    <small>Having issues joining?</small>
                </div>
                <div className={style.intermission_switch}>
                    <Switch />
                    <span>Notify students about live class starting</span>
                </div>
            </main>
        </section>
    )
}