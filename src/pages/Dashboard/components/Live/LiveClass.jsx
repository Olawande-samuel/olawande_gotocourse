import React, {useState} from 'react'
import { Logosm } from '../../../../images/components/svgs'
import style from './style.module.css'
import "./liveclass.css"

import mainuser from "../../../../images/liveclass/mainuser.png"
import user1 from "../../../../images/liveclass/user1.png"
import user2 from "../../../../images/liveclass/user2.png"
import user3 from "../../../../images/liveclass/user3.png"
import user4 from "../../../../images/liveclass/user4.png"
import user5 from "../../../../images/liveclass/user5.png"
import user6 from "../../../../images/liveclass/user6.png"
import user7 from "../../../../images/liveclass/user7.png"
import user8 from "../../../../images/liveclass/user8.png"
import { HiDotsVertical, HiOutlineHand, HiOutlineMicrophone, HiOutlineVideoCamera } from 'react-icons/hi'
import { MdOutlineMessage, MdOutlineScreenShare } from 'react-icons/md'
import { ImPhone } from 'react-icons/im'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { FaShapes } from 'react-icons/fa'
import { Box, Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const data = [
  {
    id: 1,
    name:"presenting",
    img:mainuser
  },
  {
    id: 2,
    name:"Jenelia",
    img:user1
  },
  {
    id: 3,
    name:"Joe Carlson",
    img:user2
  },
  {
    id: 4,
    name:"Lucy Sera",
    img:user3
  },
  {
    id: 5,
    name:"Sara John",
    img:user4
  },
  {
    id: 6,
    name:"Jennifer David",
    img:user5
  },
  {
    id: 7,
    name:"Rachel Green",
    img:user6
  },
  {
    id: 8,
    name:"Carol Man",
    img:user7
  },
  {
    id: 9,
    name:"Monica Geller",
    img:user8
  }
]

const actionIcons = [
  {
    id: 1,
    icon: HiOutlineMicrophone,
    name:"Toggle microphone"
  }, 
  {
    id:2,
    icon: HiOutlineVideoCamera,
    name: "Toggle Video"
  },
  {
    id:3,
    icon: HiOutlineHand,
    name:"Raise hand"
  },
  {
    id:4,
    icon: MdOutlineScreenShare,
    name:"Share Screen"
  },
  {
    id:5,
    icon: HiDotsVertical,
    name: "Menu"
  },
  {
    id:6,
    icon: ImPhone,
    name: "Leave Meeting"
  }
]


const others = [
  {
    id:1,
    icon:AiOutlineInfoCircle,
    name:"info"
  },
  {
    id:2,
    icon:FiUsers,
    name:"users"
  },
  {
    id:3,
    icon:MdOutlineMessage,
    name:"chat"
  },
  {
    id:4,
    icon:FaShapes,
    name:"info"
  },
]


const LiveClass = () => {
  const [showInfo, setShowInfo]= useState(false)
  const [open, setOpen]= useState(false)
  const navigate = useNavigate()
  
  function handleActionClick(name){
    console.log(name)
    if(name === "Menu"){
      setOpen(!open)
    } else if(name === "Leave Meeting"){
      navigate(-1)
    }
  }

  const handleClose = () => setOpen(false);

  return (
    <section className={style.live_container}>
        <Navbar />
        <main className={style.main}>
          <div className="container-xxxl">
            {
              data.map((d, i)=>(
                <div key={d.id} className={`${d.name === "presenting" ? "presenting" :"not_presenting"} ${style.user_box}`}>
                  <img src={d.img} alt="" className='img-fluid' />
                  <span>{d.name}</span>
                </div>
              ))  
            }
            

          </div>
        </main>

      <footer className={style.footer}>
        <div className="container">
          <span>Class meeting</span>
          <div className={style.action_buttons}>
            {
              <>
               {
                actionIcons.map(({icon:Icon, name}, i)=>(
                  <i onClick={()=>handleActionClick(name)} >
                    <Icon size="1.5rem" />
                  </i>
                ))
              }
              </>
            }
          </div>
          <div className={style.info_buttons}>
            {
              others.map(({icon:Icon}, i)=>(
                <i>
                  <Icon />
                </i>
              ))
            }
            
          </div>
          <Info setOpen={setOpen} open={open} handleClose={handleClose} />
        </div>
      </footer>
    </section>
  )
}

export function Navbar({user}){
  return (
    <nav className={style.live_nav}>
      <div className="container">
        <Link to="/" className="d-inline-block">
          <Logosm />
        </Link>
        <div className={style.present_user}>
          <span className={style.present_profile}>
            <img src={mainuser} alt="" />
          </span>
          <span>Marcus is presenting</span>
        </div>
        <div className={style.live_back_button}>
          <button className={style.lb_button}>Class Console</button>
        </div>
      </div>
  </nav>
  )
}

function Info({open, setOpen}) {
  
  const modalStyle = {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translate(-50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
          <div className={style.small_other}>
            {
              others.map(({name, icon:Icon}, i)=>(
                <i>
                  <Icon size="1.5rem" />
                  <p>{name}</p>
                </i>
              ))
            }
            <>
              {
                actionIcons.filter(item => item.name === "Share Screen").map(({name, icon:Icon}, i)=>(
                    <i>
                      <Icon size="1.5rem" />
                      <p>{name}</p>
                    </i>
                  ))
              }
            </>
          </div>
      </Box>
    </Modal>
  )
}
export default LiveClass