import Console from '../classConsole/index';
import { useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom';
import File from './File';
import Quiz from './Quiz';
import Note from './Note';
// import Out from '../../../Out';

export default function Content({type}) {
   

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
            <Console>
                <Outlet />
            </Console>


        </>
    )

}

export function QuizComponent(){
    return (
        <Quiz />
    )
}

export function FileComponent(){
    return (    
        <File />
    )
}

export function NoteComponent(){
    return (
        <Note />
    )
}