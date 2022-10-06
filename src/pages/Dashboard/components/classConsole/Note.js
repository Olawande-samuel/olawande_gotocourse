import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../classConsole/Content.css'
import Console from './index';
import style from "./style.module.css"
import { BiCaretDown, BiCaretRight, BiCaretUp } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlinePaperClip, } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';

import { useState } from 'react'

export default function Note() {
    const [details, showDetails] = useState(false)
    return (
                <div className=''>
                    <section className="contentheader">

                        <div className="contenttitle">
                            <h2>Class Console</h2>

                        </div>
                        <div className="contentcategory">
                            <NavLink to="file" className={({ isActive }) => isActive ? "active" : undefined}>Note</NavLink>
                            <NavLink to="integration" className={({ isActive }) => isActive ? "active" : undefined}>Integration</NavLink>
                        </div>

                        <div className="contentbreadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    EXCEL FUNCTIONS 101
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Note</Breadcrumb.Item>
                            </Breadcrumb>

                        </div>

                    </section>

                    <small className='smallnote'>Make sure you constantly save your note as you type.</small>
                    <main className='note'>
                        <h4>Hey this is a demo note heading</h4>
                        <p>This is a body text</p>
                        <span>This is a body text</span>

                        <div className="notebtn">
                            <button>Save note</button>
                        </div>



                    </main>



                </div>

           
    )
}