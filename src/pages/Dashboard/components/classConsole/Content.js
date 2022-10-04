import { NavLink } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../classConsole/Content.css'
import { IoMdCloudDownload } from 'react-icons/io';
import Console from '../classConsole/index';
import ModalContent from './index'
import { useState } from 'react'

export default function Content() {
    const [show, setShow] = useState(false);
    const Toggle = () => setShow(!show)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Console
                show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleShow={handleShow}
                Toggle={Toggle}
            >
                <div className=''>
                    <section className="contentheader">

                        <div className="contenttitle">
                            <h2>Class Console</h2>

                        </div>
                        <div className="contentcategory">
                            <NavLink to="file" className={({ isActive }) => isActive ? "active" : undefined}>File</NavLink>
                            <NavLink to="integration" className={({ isActive }) => isActive ? "active" : undefined}>Integration</NavLink>
                        </div>

                        <div className="contentbreadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    EXCEL FUNCTIONS 101
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>CREAT COLUMN</Breadcrumb.Item>
                            </Breadcrumb>

                        </div>

                    </section>

                    <section className="contenttop">
                        <div className="contentbutton">
                            <button className=''>Refresh</button>
                            <button className=''>Add New +</button>
                        </div>

                    </section>

                    <main className='contentbody'>


                    </main>

                    <div className="contentbutton">
                        <button className=''>Open</button>
                        <div>
                            <IoMdCloudDownload />
                        </div>
                    </div>

                </div>

            </Console>
             


        </>
    )

}