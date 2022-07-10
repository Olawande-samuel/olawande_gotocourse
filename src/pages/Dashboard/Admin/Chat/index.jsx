import {useState} from "react";
import { IoMdSend, IoIosAttach, IoMdCheckmark } from "react-icons/io";


import clsx from "./styles.module.css";
import img from "../../../../images/john.png";
import { Searchbar } from "../../components";




const ChatComponent = () => {
    const [tabs, setTabs] = useState([
        {
            active: true,
            name: "Admin",
        },
        {
            active: false,
            name: "Teacher",
        },
        {
            active: false,
            name: "Mentor",
        },
        {
            active: false,
            name: "Community",
        },
    ])

    function switchTabHandler(e, i) {
        setTabs(old => {
            let copy = [...old];
            copy.map((c, j) => {
                if (j === i){
                    c.active = true;
                }else {
                    c.active = false;
                }
                return c;
            })
            return copy;
        })
    }


    const messages = [
        {
            sender: 'admin',
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            time: "8:21 PM",
            img: img
        },
        {
            sender: 'user',
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            time: "8:22 PM",
            img: img
        },
        {
            sender: 'admin',
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            time: "8:23 PM",
            img: img
        },
        {
            sender: 'user',
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            time: "8:23 PM",
            img: img
        },
        {
            sender: 'user',
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            time: "8:25 PM",
            img: img
        },
        {
            sender: 'admin',
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            time: "8:30 PM",
            img: img
        },
        {
            sender: 'user',
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            time: "8:21 PM",
            img: img
        },
    ]

    const messagedata = {
        name: "John Jack",
        role: "Teacher",
        image: img
    }


    return (
        <div className={clsx.chat_container}>
            <div className={clsx.chat__top}>
                {
                    tabs.map((h, i) => (<span key={i} id={`tab-${i}`}  onClick={(e) => switchTabHandler(e, i)} className={`${h.active && clsx.active}`}>{h.name}</span>))
                }
            </div>
            <div className={clsx.chat_main_container}>
                <div className={clsx.main_container__users}>
                    <h2>Cybersecurity</h2>
                    <Searchbar placeholder="Search" showIcon={true} style={{width: "100%", margin: "0px !important", marginBottom: 15, border: "1px solid #DFE0EB"}} />
                    <div className={clsx.users__list}>
                        <div className={clsx.user_box}>
                            <div className={clsx.user_image}>
                                <div className={clsx.dot}></div>
                                <img src={messagedata.image} alt="avatar" />
                                <p className={clsx.user_name}>{messagedata.name}</p>
                            </div>
                            <h5 className={clsx.user_role}>{messagedata.role}</h5>
                        </div>

                    </div>
                </div>
                <ChatBox messages={messages} boxdata={messagedata} />
            </div>
        </div>
    )
}







const ChatBox = ({messages, boxdata}) => {
    return (
        <div className={clsx.chat_box}>
            <div className={clsx.chat_box_top}>
                <div className={clsx.chat_box_top_image}>
                    <img src={boxdata.image} alt="avatar" />
                </div>
                <div className={clsx.chat_box_top_meta}>
                    <h3>{boxdata.name}</h3>
                    <p>{boxdata.role}</p>
                </div>
            </div>
            <div className={clsx.chat_message}>
                {
                    messages.map((m, i) => (
                        <MessageBox senderdata={m} key={i} />
                    ))
                }
            </div>
            <div className={clsx.chat_sender_container}>
                <div className={clsx.chat_sender}>
                    <input type="text" placeholder="Enter message" />
                    <span className={clsx.chat_icons}>
                        <span className={clsx.send}>
                            <IoMdSend />
                        </span>
                        <span className={clsx.attach}>
                            <IoIosAttach />
                        </span>
                        <span className={clsx.check}>
                            <IoMdCheckmark />
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}




const MessageBox = ({senderdata}) => (
    <div className={senderdata.sender === 'admin' ? clsx.message_box : clsx.message_box_user}>
        {
            senderdata.sender === 'admin' ?  (
                <>
                    <div className={clsx.message_box_container}>
                        <div className={clsx.message}>
                            {senderdata.content}
                        </div>
                        <span className={clsx.admin_time}>{senderdata.time}</span>
                    </div>
                    <div className={clsx.message_box_image}>
                        <img src={senderdata.img} alt="avatar" />
                    </div>
                </>
            ) : (
                <>
                    <div className={clsx.message_box_image}>
                        <img src={senderdata.img} alt="avatar" />
                    </div>
                    <div className={clsx.message_box_container}>
                        <div className={clsx.message}>
                            {senderdata.content}
                        </div>
                        <span>{senderdata.time}</span>
                    </div>
                </>
            )
        }
    </div>
)

export default ChatComponent;