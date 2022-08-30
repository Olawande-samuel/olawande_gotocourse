import { useState, useEffect } from "react";
import { IoMdSend, IoIosAttach, IoMdCheckmark } from "react-icons/io";
import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { useLocalStorage } from "../../../../hooks";
import { useAuth } from "../../../../contexts/Auth";

import clsx from "./styles.module.css";
import img from "../../../../images/john.png";
import { Searchbar } from "../../components";

import { useQuery, useMutation } from "@tanstack/react-query";
import { KEY } from "../../../../constants";
import { AdvancedError } from "../../../../classes";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} style={{ height: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChatComponent = ({chatType, tabs, usertype}) => {
  const [value, setValue] = useState(0);
 
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  

  const messagedata = {
    name: "John Jack",
    role: "Teacher",
    image: img,
  };

  return (
    <div className={clsx.chat_container}>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          {tabs.map((h, i) => (
            <Tab label={h.name} {...a11yProps(i)} />
          ))}
        </Tabs>
      </div>
      {chatType.map((item, index) => (
        <TabPanel value={value} index={index} style={{ height: "100%", width:"100%" }}>
          <Chat
            messagedata={messagedata}
            type={item.type}
            usertype={usertype}
          />
        </TabPanel>
      ))}
    </div>
  )
}

const Chat = ({ type, messagedata, usertype }) => {
  const { getItem } = useLocalStorage();
  const userData = getItem(KEY);
  const {
    generalState,
    setGeneralState, 
    adminFunctions: { getMessages }, 
    adminStudentFunctions: { fetch, verify, verify_pledre }, 
    adminTeacherFunctions: { fetch: TeachersFetch } 
  } = useAuth();


  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState({});
  const [loader, setLoader] = useState(false);

  const newMessages = useQuery(["repoData"], () => getMessages(userData.token));

  useEffect(() => {
    if(type !== "New Messages"){
      (async ()=>{
        if (userData) {
          if(usertype === "admin"){
            try {
              const res = type === "Others" ?  await fetch(userData?.token) : await TeachersFetch(userData?.token); 
              const { message, success, statusCode } = res;
              if (!success) throw new AdvancedError(message, statusCode);
              else {
                const { data } = res;
                setUsers(data);
               
              }
            } catch (err) {
              toast.error(err.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }finally{
              setLoader(_ => false);
            }
          } else if(usertype === "student"){
            try {
              const res = type === "Others" ?  await fetch(userData?.token) : await TeachersFetch(userData?.token); 
              const { message, success, statusCode } = res;
              if (!success) throw new AdvancedError(message, statusCode);
              else {
                const { data } = res;
                setUsers(data);
               
              }
            } catch (err) {
              toast.error(err.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }finally{
              setLoader(_ => false);
            }
          } else {
            try {
              const res = type === "Others" ?  await fetch(userData?.token) : await TeachersFetch(userData?.token); 
              const { message, success, statusCode } = res;
              if (!success) throw new AdvancedError(message, statusCode);
              else {
                const { data } = res;
                setUsers(data);
               
              }
            } catch (err) {
              toast.error(err.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }finally{
              setLoader(_ => false);
            }
          }
        }
      })()
    }
  }, []);


  function openMessage(e, message) {
    e.preventDefault();
    setMessages(message);
  }
  return (
    <div className={clsx.chat_main_container}>
      <div className={clsx.main_container__users}>
        <h2>{type}</h2>
        <Searchbar
          placeholder="Search"
          showIcon={true}
          style={{
            width: "100%",
            margin: "0px !important",
            marginBottom: 15,
            border: "1px solid #DFE0EB",
          }}
        />
        <div className={clsx.users__list}>
          {
            type === "New Messages" ?
            newMessages.data?.data?.map((message, index) => (
              <div
                className={clsx.user_box}
                onClick={(e) => openMessage(e, message)}
              >
                <div className={clsx.user_image}>
                  {/* <div className={clsx.dot}></div> */}
                  {/* <img src={messagedata.image} alt="avatar" /> */}
                  <p className={clsx.user_name}>{message.fromUser}</p>
                </div>
                <h5 className={clsx.user_role}>{message.type}</h5>
              </div>
            )) :
            users?.map((user, index) => (
              <div
                className={clsx.user_box}
                onClick={(e) => openMessage(e, user)}
              >
                <div className={clsx.user_image}>
                  {/* <div className={clsx.dot}></div> */}
                  <img src={user.profileImg} alt="avatar" style={{width:"50px", height:"50px", borderRadius:"50%" }}/>
                  <p className={clsx.user_name}>{`${user.firstName} ${user.lastName}`}</p>
                </div>
                <h5 className={clsx.user_role}>{user.userType}</h5>
              </div>
            ))
          }
        </div>
      </div>
      <ChatBox messages={messages} boxdata={messagedata} type={type} displayControl={messages} />
    </div>
  );
};

const ChatBox = ({ messages, boxdata, checked, type , displayControl}) => {
  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState("");
  const { getItem } = useLocalStorage();
  const userData = getItem(KEY);
  const [sending, setSending]= useState(false)
  const { generalState, setGeneralState, adminFunctions: { sendMessage } } = useAuth();

  function handleTextMsg(e){
    setText(e.target.value)
  }
  async function sendMsg() {
    try {
      const res =   await sendMessage(userData?.token, {toUser: messages.userId, body: "Hello from Admin"} ); 
      const { message, success, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const { data } = res;
        setMessageList([...messageList, data,]);
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }finally{
      // setLoader(_ => false);
      console.log("done")
    }


   
  }
  useEffect(() => {

    if(Object.keys(messages).length > 0 && type === "New Messages") {
        setMessageList([messages]);
    } else {
      setMessageList([])
    }
  }, [messages]);

  

  console.log({messages})
  return (
    <div className={clsx.chat_box}> 
      {
        Object.keys(messages).length <= 0 ? (
        <h2 className="text-center generic_label">No messages yet</h2>
      ) :
       (
        <>
          {checked}
          <div className={clsx.chat_box_top}>
            <div className={clsx.chat_box_top_image}>
              <img src={messages?.profileImg && messages?.profileImg } alt="avatar" style={{width:"50px", height:"50px", borderRadius:"50%" }} /> 
              <p>{messages?.fromUser ? messages?.fromUser : ( messages?.firstName ? `${messages?.firstName} ${messages?.lastName}` : "")}</p>
            </div>
            <div className={clsx.chat_box_top_meta}>
              <h3>{messages?.sender}</h3>
              <p>{messages?.type ? messages.type : messages?.userType}</p>
            </div>
          </div>
          <div className={clsx.chat_message}>
            {
              messageList?.map((m, i) => (
                <MessageBox senderdata={m} key={i} />
              ))
            }
          </div>
          <div className={clsx.chat_sender_container}>
            <div className={clsx.chat_sender}>
              <input type="text" placeholder="Enter message" onChange={handleTextMsg} value={text} />
              <span className={clsx.chat_icons}>
                <span className={clsx.send}>
                  <IoMdSend onClick={sendMsg} />
                </span>
                {/* <span className={clsx.attach}>
                  <IoIosAttach />
                </span> */}
                <span className={clsx.check}>
                  <IoMdCheckmark />
                </span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MessageBox = ({ senderdata }) => {

  return(
    <div
      className={
        senderdata.type !== "member" ? clsx.message_box : clsx.message_box_user
      }
    >
      {senderdata.type !== "member" ? (
        <>
          <div className={clsx.message_box_container}>
            <div className={clsx.message}>{senderdata.body}</div>
            <span className={clsx.admin_time}>{senderdata.createdAt}</span>
          </div>
          <div className={clsx.message_box_image}>
            {/* <img src={senderdata.img} alt="avatar" /> */}
          </div>
        </>
      ) : (
        <>
          <div className={clsx.message_box_image}>
            {/* <img src={senderdata.img} alt="avatar" /> */}
          </div>
          <div className={clsx.message_box_container}>
            <div className={clsx.message}>{senderdata.body}</div>
            <span>{senderdata.createdAt}</span>
          </div>
        </>
      )}
    </div>

  )
};

export default ChatComponent;
