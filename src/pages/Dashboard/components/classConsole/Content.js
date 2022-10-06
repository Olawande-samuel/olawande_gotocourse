import Console from '../classConsole/index';
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import File from './File';
import Quiz from './Quiz';
import Note from './Note';
// import Out from '../../../Out';

export default function Content() {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [moduleOpen, setModuleOpen] = useState(false);

    const Toggle = () => setShow(!show)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const OpenToggle = () => setOpen(!open)
    const closeSmall = () => setOpen(false);

    const toggleModule = () => setModuleOpen(!moduleOpen)
    const moduleClose = () => setModuleOpen(false)


    const {pathname} = useLocation()


    return (
        <>
            <Console
                show={show}
                open={open}
                moduleOpen={moduleOpen}
                setModuleOpen={setModuleOpen}
                setShow={setShow}
                closeSmall={closeSmall}
                handleClose={handleClose}
                handleShow={handleShow}
                Toggle={Toggle}
                OpenToggle={OpenToggle}
                toggleModule={toggleModule}
                moduleClose={moduleClose}
            >
                {/* <File  OpenToggle={OpenToggle}/> */}
                <Quiz/>
                {/* <Note/> */}
                {/* <Out/> */}
               

            </Console>



        </>
    )

}