import {useState} from 'react'
import { AiFillClockCircle, AiOutlinePaperClip, AiOutlinePlus } from 'react-icons/ai'
import {BsThreeDotsVertical } from 'react-icons/bs'



import style from "./style.module.css"
import "./console.css"
import { FaCalendarAlt, } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'




export function LiveClass(){
    return(
        <div className={style.live_class}>

            <header>
                <h4>Live class</h4>
                <p>Click on the button below to schedule a live class</p>
                <p>You can only join an ongoing schedule</p>
            </header>

            <div className={style.live_schedule}>
                <button>Schedule a live class</button>
                <button>Refresh list</button>
            </div>

            <div className={style.currently_live}>
                <p>Scheduled Classes (2)</p>

                <div className={style.live_list}>
                    <CurrentLive />
                </div>
            </div>
        </div>
    )
}

export function CurrentLive(){
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
                <button className={style.live_card__button}>Live Class</button>
            </div>
        </div>
    )
}