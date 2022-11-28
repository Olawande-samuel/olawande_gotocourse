import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    RedditShareButton,
    WhatsappShareButton,
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    EmailIcon,
    RedditIcon,
    WhatsappIcon,
  } from "react-share";


const Playground = () => {
  return (
    <div>
        <p>PLAYGROUND</p>
       <TwitterIcon	url="https://gotocourse.us" style={{border:"1px solid red", background:"#dddd", color:"#Fff"}} />
       <FacebookShareButton	url="https://gotocourse.us" style={{border:"1px solid red", background:"#dddd", color:"#Fff"}}>
            <FacebookIcon />
       </FacebookShareButton>
       <TwitterShareButton	url="https://gotocourse.us" style={{border:"1px solid red", background:"#dddd", color:"#Fff"}}>
            <TwitterIcon />
       </TwitterShareButton>
       <LinkedinShareButton	url="https://gotocourse.us" style={{border:"1px solid red", background:"#dddd", color:"#Fff"}}>
            <LinkedinIcon />
       </LinkedinShareButton>
       <TelegramShareButton	url="https://gotocourse.us" style={{border:"1px solid red", background:"#dddd", color:"#Fff"}}>
            <TelegramIcon />
       </TelegramShareButton>
       <EmailShareButton	url="https://gotocourse.us" style={{border:"1px solid red", background:"#dddd", color:"#Fff"}}>
            <EmailIcon />
       </EmailShareButton>
    </div>
  )
}

export default Playground