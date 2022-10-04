import {useState} from 'react'
import { AiFillClockCircle, AiOutlinePaperClip, AiOutlinePlus } from 'react-icons/ai'
import { BiCaretDown, BiCaretRight } from 'react-icons/bi'
import { BsPaperclip, BsThreeDotsVertical } from 'react-icons/bs'
import { RiVideoAddFill } from 'react-icons/ri'

import { Logosm } from '../../../../images/components/svgs'
import style from "./style.module.css"
import "./console.css"
import { IconButton, Tooltip } from '@mui/material'
import { FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { MdLibraryAdd, MdLocationOn, MdMessage } from 'react-icons/md'

const iconData = [
    {
        id: 1,
        icon: MdMessage,
        title:"Mail"
    },
    {
        id: 2,
        icon: MdLibraryAdd,
        title:"Creator suite"
    },
    {
        id: 3,
        icon: RiVideoAddFill,
        title:"Live Class"
    },
    {
        id: 4,
        icon: FaUsers,
        title:"Students"
    },
]

const Console = ({children}) => {
  return (
    <div className={style.console}>
        <Sidebar />
        <main className={style.children}>
            {children}

        </main>
        <div className={style.icon_bar}>
                    
            {
                iconData.map(({title, id, icon:Icon })=>(
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


function Sidebar(){
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
                <button> 
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


function Accord(){

    const [details, showDetails] = useState(false)

    return(
        <div className={style.content_item}>
            <div className={style.content_item_top}>
                <i>
                    {
                        details ? 
                        <BiCaretDown onClick={()=>showDetails(!details)}/>
                        :
                        <BiCaretRight onClick={()=>showDetails(!details)}/>
                    }
                </i>
                <span>Test</span>
                <i><BsThreeDotsVertical /></i>
            </div>

            {
                details && (
                    <ul className={style.content_list}>
                        <li>
                            <i><AiOutlinePaperClip /></i>
                            <span>Creating columns</span>
                            <i><BsThreeDotsVertical /></i>
                        </li>
                        <li>
                            <i><AiOutlinePaperClip /></i>
                            <span>Creating columns</span>
                            <i><BsThreeDotsVertical /></i>
                        </li>
                        <li>
                            <i><AiOutlinePaperClip /></i>
                            <span>Creating columns</span>
                            <i><BsThreeDotsVertical /></i>
                        </li>
                    </ul>
                )
            }

        </div>
    )
}



export default Console