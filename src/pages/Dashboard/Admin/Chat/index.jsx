import { useState, useEffect } from "react";
import { IoMdSend, IoIosAttach, IoMdCheckmark, IoMdArrowRoundBack } from "react-icons/io";
import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { useLocalStorage } from "../../../../hooks";
import { useAuth } from "../../../../contexts/Auth";

import clsx from "./styles.module.css";
import img from "../../../../images/john.png";
import { Searchbar } from "../../components";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
        <TabPanel value={value} index={index} style={{ height: "100%", width:"100%", padding: 20 }} className={clsx.tab_wrapper}>
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
  const [showuserlist, setShowUserlist]= useState(true)
  const {
    adminFunctions: { getMessages, getUnreadMessages }, 
    adminStudentFunctions: { fetch}, 
    adminTeacherFunctions: { fetch: TeachersFetch },
    otherFunctions: {fetchTeachers, fetchAdmin} 
  } = useAuth();


  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loader, setLoader] = useState(false);

  const allMessages = useQuery(userData?.token && ["get unread messages"], () => getUnreadMessages(userData?.token), {
    onSuccess: (res)=>{}
  })

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
              if(err.statusCode === 2) err.message = "Session expired. Please login again";
              toast.error(err.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHtoasover: true,
                draggable: true,
                progress: undefined,
              });
            }finally{
              setLoader(_ => false);
            }
          } else if(usertype === "student"){
            try {
              const res = type === "Others" ?  await fetchAdmin() : await fetchTeachers(); //first should be admin
              const { message, success, statusCode } = res;
              if (!success) throw new AdvancedError(message, statusCode);
              else {
                const { data } = res;
                setUsers(data);
               
              }
            } catch (err) {
              if(err.statusCode === 2) err.message = "Session expired. Please login again";
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
              const res = type === "Others" ?  await fetchAdmin() : await TeachersFetch(userData?.token); //replace this with fetch students
              const { message, success, statusCode } = res;
              if (!success) throw new AdvancedError(message, statusCode);
              else {
                const { data } = res;
                setUsers(data);
               
              }
            } catch (err) {
              if(err.statusCode === 2) err.message = "Session expired. Please login again";
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
    setUserInfo(message);
    setShowUserlist(false)
  }
  return (
    <div className={clsx.chat_main_container}>
      {
        showuserlist &&
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
              allMessages.isSuccess && allMessages.data?.data?.data?.map((message, index) => (
              <div
                className={clsx.user_box}
                onClick={(e) => openMessage(e, message)}
                key={index}
              >
                <div className={clsx.user_image}>
                  <p className={clsx.user_name}>{message.user.email}</p>
                </div>
                <h5 className={clsx.user_role}>{message.userType}</h5>
              </div>
            )) 
            :
            users?.map((user, index) => (
              <div
                className={clsx.user_box}
                onClick={(e) => openMessage(e, user)}
                key={index}

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
      }
      {
        // for users from new messages and users from no messages
        !showuserlist &&
        <ChatBox userInfo={userInfo} boxdata={messagedata} type={type} displayControl={userInfo} setShowUserlist={setShowUserlist} />
      }
    </div>
  );
};

const ChatBox = ({ userInfo, boxdata, checked, type , displayControl, setShowUserlist}) => {
  const queryClient = useQueryClient()
  const { getItem } = useLocalStorage();
  const userData = getItem(KEY);

  const {
    adminFunctions: { getMessages, sendMessage, readMessage }, 
    adminStudentFunctions: { fetch}, 
    adminTeacherFunctions: { fetch: TeachersFetch },
    otherFunctions: {fetchTeachers} 
  } = useAuth();


  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState("");

  const ourMessages = useQuery(["get private messages from user"], () => getMessages(userData.token,  userInfo?.userId ? userInfo?.userId : (userInfo?.fromUser ? userInfo?.fromUser : (userInfo?.teacherId ? userInfo?.teacherId : userInfo?._id))), {
    onSuccess: (res)=> {
      if(res.data){
        setMessageList(res.data)
      } else {
        setMessageList([])
      }
    },
     onError: (err)=>{
      if(err.statusCode === 2) err.message = "Session expired. Please login again";
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHtoasover: true,
        draggable: true,
        progress: undefined,
      })
    }
  });
  

  function handleTextMsg(e){ 
    setText(e.target.value)
  }

  const msgMutation = useMutation((data)=>sendMessage(userData?.token, data ), {
    onSuccess: (res)=>{
      if(res.success){
        toast.success(res.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        queryClient.invalidateQueries(["get private messages from user"])
        setText("")
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    onError: (err)=>{
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  })
  const markRead = useMutation((data)=>readMessage(userData?.token, data ), {
    onSuccess: (res)=>{
      if(res.success){
        toast.success(res.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        queryClient.invalidateQueries(["get private messages from user"])
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    onError: (err)=>{
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  })

  async function sendMsg(e) {
    e.preventDefault()

    if(text){
      msgMutation.mutate({
        toUser: userInfo.userId ? userInfo.userId : (userInfo.teacherId ? userInfo.teacherId : (userInfo.fromUser ? userInfo.fromUser :userInfo._id)),
        body: text
      })
    } else{
      toast.error("Enter a valid message", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  async function markAsRead(){
    if(userInfo.fromUser){
      markRead.mutate([ userInfo.messageId ])
    }
    return
  }
  return (
    <div className={clsx.chat_box}> 
      {
        Object.keys(userInfo).length <= 0 ? (
          <>
            <h2 className="text-center generic_label">No messages yet</h2>
            <button className="btn btn-outline-primary" onClick={(e)=>{
              e.preventDefault();
              setShowUserlist(true)
            }} >Back</button>
          </>
      ) :
       (
        <>
          {checked}
          <div className={clsx.chat_box_top}>
            <div className={clsx.chat_box_top_image}>
              <i onClick={()=>setShowUserlist(true)} className="me-3"><IoMdArrowRoundBack /></i>
              {
                userInfo.profileImg &&
                <img src={userInfo?.profileImg && userInfo?.profileImg } alt="avatar" style={{width:"50px", height:"50px", borderRadius:"50%" }} /> 
              }
              <p>
              {
                userInfo?.fromUser ? 
                userInfo?.user.email : ( userInfo?.firstName ? `${userInfo?.firstName} ${userInfo?.lastName}` : "")
              }
              </p>

            </div>
            <div className={clsx.chat_box_top_meta}>
              <h3>{userInfo?.sender}</h3>
              <p>{userInfo?.type ? userInfo.type : userInfo?.userType}</p>
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
              <form className="w-100 d-flex justify-content-between align-items-center" onSubmit={sendMsg}>
                <input type="text" placeholder="Enter message" onChange={handleTextMsg} value={text} />
                <span className={clsx.chat_icons}>
                    <button className={clsx.send} type="submit" onClick={sendMsg}>
                      <IoMdSend  size="1.2rem" />
                    </button>
                  {/* <span className={clsx.attach}>
                    <IoIosAttach />
                  </span> */}
                  <span className={clsx.check}>
                    <IoMdCheckmark onClick={markAsRead} />
                  </span>
                  </span>
                </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MessageBox = ({ senderdata }) => {
  const {getItem}= useLocalStorage();
  const userdata = getItem(KEY)
  return(
    <div
      className={
        senderdata.user.email === userdata.email ? clsx.message_box : clsx.message_box_user
      }
    >
      {senderdata.user.email === userdata.email? (
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
