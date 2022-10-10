import '../classConsole/Content.css'
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react'
import processed from '../../../../images/processed.png'
import {
    BsThreeDotsVertical,
  } from "react-icons/bs";
  import { AiOutlineSearch } from 'react-icons/ai';


export function Processed() {
    return (
        <div className="suite__boxcontainer">
            {
                [...Array(4)].map((x, id) => (
                    <div className="suite__box">
                        <div className="suite__dots">
                        <i><BsThreeDotsVertical /></i>

                        </div>
                        <div className="suite__img">
                            <img src={processed} alt="" />
                        </div>
                        <p className='suite__title'>EXCEL CLASS. webm</p>
                        <span>Video/mp4</span>
                        <span>8/23/2022, 5:12:49 PM</span>
                        <p className='suite__title'>created in: IT AUDIT</p>
                        <div className="suite__btn">
                            <button>Add to classroom </button>
                            <button>Preview </button>

                        </div>

                    </div>

                ))
            }
        </div>
    )
}

export function Pending() {
    return (
        <div className="suite__boxcontainer">
            {
                [...Array(4)].map((x, id) => (
                    <div className="suite__box">
                        <p className='suite__title'>recording-1661271168971</p>
                        <p className='suite__p'>8/23/2022, 5:12:49 PM</p>
                        <button className='blue__button'>Process recording</button>

                    </div>

                ))
            }
        </div>
    )
}

export default function Suite() {
    return (
        <div className=''>
            <main className='suite'>
                <div className="suite__top">
                    <div className="suite__blue">
                        <h4>Creator suite files</h4>
                        <p>Files uploaded to creator suite or created within the creator suite can be reused across multiple course content Teachers would only see files in the current course i.e EXCEL FUNCTIONS 101</p>

                    </div>
                    <div className="suite__orange">
                        <p>To import video from creator suite to content (or topic), open the content, click on the add new button, and import from creator suite</p>
                    </div>

                </div>

                <div className="suite__form">
                <div className="suite__input">
                        <AiOutlineSearch/>
                        <input type="search" name="" id="" placeholder='Search for videos/files' />

                    </div>
                    <select name="" id="">
                        <option value="">Filter</option>
                        <option value="file">Files/image</option>
                        <option value="video">Video</option>
                    </select>

                    <button>Create new +</button>

                </div>

                <div className="suite__nav">
                    <NavLink to={`processed`} className={({ isActive }) => (isActive ? "suite__navactive" : undefined)}>Processed

                    </NavLink>
                    <NavLink to={"pending"} className={({ isActive }) => (isActive ? "suite__navactive" : undefined)}>Pending</NavLink>
                </div>

                <Outlet />



            </main>



        </div>


    )
}