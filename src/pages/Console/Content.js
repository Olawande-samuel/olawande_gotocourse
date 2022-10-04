import { NavLink } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../Console/Content.css'
import { BiMessageDetail, BiVideoPlus } from 'react-icons/bi';
import { MdLibraryAdd } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { IoMdCloudDownload } from 'react-icons/io';


export default function Content() {
    return (
        <div className=''>
            <section className="contentheader">

                <div className="contenttitle">
                    <h2>Class Console</h2>

                </div>
                <div className="contentcategory">
                    <NavLink to="file" active>File</NavLink>
                    <NavLink to="file">Integration</NavLink>
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
                <div className="contentmain"></div>
                <div className="contenticon">
                    <div className="messageicon">
                    <BiMessageDetail/>
                    </div>
                    <div className="addicon">
                        <MdLibraryAdd/>
                    </div>
                    <div className="videoicon">
                        <BiVideoPlus/>
                    </div>
                    <div className="groupicon">
                        <HiUserGroup/>
                    </div>

                </div>

            </main>

            <div className="contentbutton">
                    <button className=''>Open</button>
                    <div>
                        <IoMdCloudDownload/>
                    </div>
            </div>

        </div>
    )

}