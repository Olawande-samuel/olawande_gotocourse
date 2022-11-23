import React from 'react'
import { AiOutlineMenu, AiOutlinePaperClip } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsMic } from 'react-icons/bs'
import styled from 'styled-components'
import profile from "../../../../images/chat.png"
import { VscSmiley } from 'react-icons/vsc'
import { IoSendSharp } from 'react-icons/io5'

const Chat = styled.section`
    display: grid;
    grid-template-columns: 30% 70%;
    height: 100vh;
    font-family: "Inter", sans-serif;
    `
const Contact = styled.article`
    background-color: #2E3747;
    height: 100vh;
    overflow-y: auto;
    padding: 1.5rem;

`
const Logo = styled.div`
    display: flex;
    margin-bottom: 31px;
`
const Header = styled.div`
    margin-bottom: 26px;

`
const Top = styled.div`
    display: flex;
    align-items:center;
    gap: 1.2rem;
    color: #fff;
    margin-bottom: 1rem;


    h6 {
        margin-bottom: 0;
    }
`
const Search = styled.div`
    position: relative;
    color: #fff;

    input {
        width: 100%;
        position: relative;
        background-color: rgba(255, 255, 255, 0.0605);
        padding: .3rem;
        border-radius: 3px;
        color: #fff;
        border:.5px solid #666666;
    }
    i {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
    }


`

const ChatBox = styled.main`
    height: 100vh;
    overflow-y: auto;
    background-color:#fff;
`

const LiveChat = () => {
  return (
    <Chat>
        <Contact>
            <Logo></Logo>
            <Header>
                <Top>
                    <i className="chat_hamburger">
                        <AiOutlineMenu />
                    </i>
                    <h6 className="chat_title">Chats</h6>
                </Top>
                <Search>
                    <input type="text" name="search" id="search" placeholder='Search' />
                    <i className="search_icon">
                        <BiSearch />
                    </i>
                </Search>
            </Header>
            <ContactWindow />
            <ContactWindow />
            <ContactWindow />
            <ContactWindow />
            {/* Tabs go here */}
        </Contact>
        <ChatBox>
            <OpenedChat />
        </ChatBox>
    </Chat>
  )
}  



const ContactItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    gap:.7rem;
    padding-block: 11.5px;
    color: #838383;
`


const Profile = styled.div`
    display: flex;
    justify-content: center;
    flex: 20%;

    .chat_image_wrapper{
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
`

const PreviewContent = styled.div`
    flex: 80%;
    position: relative;
    color: #838383;
    .name {
        font-size: 1rem;
        margin-bottom: 5px;
        color: #fff;
        font-weight: 100;
        letter-spacing:1px;
    }
    .previewText {
        font-size: 14px;
    }
    .time {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 14px;

    }
`

function ContactWindow(){
    return(
        <ContactItem>
            <Profile>
                <div className="chat_image_wrapper">
                    <img src={profile} alt="" />
                </div>
            </Profile>
            <PreviewContent>
                <div className="name">Sweetie</div>
                <div className="previewText">I love you so much</div>
                <div className="time">10:20PM</div>
            </PreviewContent>
        </ContactItem>
    )
}

const Opened = styled.section`
    height: 100%;
    position:relative;
`
const ChatHeader = styled.div`
    position:absolute;
    display: flex;
    justify-content:center;
    top:0;
    left: 50%;
    transform: translateX(-50%);
`
const OpenedContent = styled.div`
    position: relative;
    height: 100%;
`
const InputContainer = styled.div`
    position: absolute;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    bottom: 10px;
    right: 1.5rem;
    left:1.5rem;
    /* padding-inline: 1.5rem; */
    
    .input_holder {
        display: flex;
        align-items:center;
        gap: .7rem;
        flex:85%;
        position: relative;
        color: var(--theme-blue);
        border: 1px solid rgba(0, 0, 0, 0.39);
        border-radius: 8px;


        input {
            padding: .4rem;
            border: none;
            outline: none;
            ::placeholder {
                color: var(--theme-blue);
            }
        }
    }

    .send {
        flex: 10%;
        button {
            padding: 5px 22px;
            color: #fff;
            background:#2E3747;
            border-radius: 10px;
            border: none;
            outline: none;
        }
    }


`

const TextContent =styled.div`
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
    height:100%;
    padding-bottom:75px;
    padding-inline:1.5rem;
`
function OpenedChat(){
    return (
        <Opened>
            <ChatHeader>
                <Profile>
                    <div className="chat_image_wrapper">
                        <img src={profile} alt="" />
                    </div>
                </Profile>
                <PreviewContent>
                    <div className="name text-dark">Jane Cooper</div>
                {/* <div className="previewText">I love you so much</div> */}
                </PreviewContent>
            </ChatHeader>

            <OpenedContent>
                <TextContent>
                    <ChatBar sender="notUser" />
                    <ChatBar sender="user" />
                </TextContent>

                <InputContainer>
                    <div className="input_holder">
                        <i><AiOutlinePaperClip size="1.2rem" /></i>
                        <input type="text" name="msg" id="msg" placeholder=" write a message ..."  />
                        <i><VscSmiley size="1.2rem" /></i>
                        <i><BsMic size="1.2rem" /></i>
                    </div>
                    <div className="send">
                        <button>
                            <IoSendSharp />
                        </button>
                    </div>
                </InputContainer>
            </OpenedContent>
        </Opened>
    )
}
function ClosedChat(){}


const Bar = styled.div`
    display: flex;
    align-items:center;
    gap: 1.5rem;
    margin-block: .7rem;
    align-self: ${props => props.sender === "user" ?  "flex-end" : "flex-start"};
`
const BarProfile = styled.div`
    height: 50px;
    width: 50px;
    order: ${props => props.sender === "user" ?  "2" : "1"};

    img {
        max-width: 100%;
    }
`
const BarText = styled.div`
    border-radius: 30px;
    padding: 0.4rem;
    max-width:400px;
    background: ${(props) => props.sender === "user" ? "#92AAFF" : "#FFCFCF"};
    color: ${(props) => props.color === "purple" ? "#fff" : "#626262"};
    order: ${props => props.sender === "user" ?  "1" : "2"};

`

function ChatBar({sender}){
    return(
            <Bar sender={sender}>
                <BarProfile sender={"user"}>
                    <img src={profile} alt="" />
                </BarProfile>
                <BarText sender={"user"} color="purple">Lorem ipsum dolor sit amet consectetur</BarText>
            </Bar>
    )
}
export default LiveChat