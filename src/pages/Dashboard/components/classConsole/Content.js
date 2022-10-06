import Console from '../classConsole/index';
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import File from './File';
import Quiz from './Quiz';
import Note from './Note';
// import Out from '../../../Out';

export default function Content({type}) {
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


    const location = useLocation()
    const params = useParams()

    console.log({params})
    console.log(location)


    function showType(params) {
        switch (params.id) {
            case "1":
                return <File />    
            case "2":
                return <Note />
                
            break;
            case "3":
                return <Quiz />    
            default:
                return <File />
        }    
    }

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
              
              <File  OpenToggle={OpenToggle}/>  

            </Console>


        </>
    )

}

export function QuizComponent(){
    return (
        <Console>
            <Quiz />
        </Console>
    )
}
export function FileComponent(){
    return (
        <Console>
            <File />
        </Console>
    )
}
export function NoteComponent(){
    return (
        <Console>
            <Note />
        </Console>
    )
}