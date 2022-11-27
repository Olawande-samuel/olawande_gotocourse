import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    TwitterIcon
  } from "react-share";


const Playground = () => {
  return (
    <div>
        <p>PLAYGROUND</p>
       <TwitterShareButton style={{border:"1px solid red", background:"#dddd", color:"#Fff"}}>
       <TwitterIcon size={32} round={true} />
       </TwitterShareButton>
    </div>
  )
}

export default Playground