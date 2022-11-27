import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePaperClip } from "react-icons/ai";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { BsMic } from "react-icons/bs";
import styled from "styled-components";
import profile from "../../../../../images/chat.png";
import rocket from "../../../../../images/Launch rocket.png";
import logo from "../../../../../images/Quikonnet.png";
import { VscSmiley } from "react-icons/vsc";
import { IoSendSharp } from "react-icons/io5";
import { useLocalStorage } from "../../../../../hooks";
import { KEY } from "../../../../../constants";
import { useAuth } from "../../../../../contexts/Auth";
import { AdvancedError } from "../../../../../classes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Bar, BarProfile, BarText, Chat, ChatBox, ChatHeader, Closed, Contact, ContactItem, Header, ImgWrapper, InputContainer, Logo, Opened, OpenedContent, PreviewContent, Profile, Search, TabWrapper, TextContent, Top, } from "./style";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";

const LiveChat = () => {
  const { getItem } = useLocalStorage();
  const userData = getItem(KEY);
  const [showuserlist, setShowUserlist] = useState(true);
  const {
    adminFunctions: { getMessages, getUnreadMessages },
    adminStudentFunctions: { fetch },
    adminTeacherFunctions: { fetch: TeachersFetch },
    otherFunctions: { fetchTeachers, fetchAdmin },
    generalState: { chatDetail },
  } = useAuth();
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const contactId = searchParams.get("contact");
  useEffect(() => {
    // if(type !== "New Messages"){
    (async () => {
      if (userData.token) {
        try {
          const res = await getUnreadMessages(userData?.token);
          const { message, success, statusCode } = res.data;
          if (statusCode !== 1) throw new AdvancedError(message, statusCode);
          else {
            const { data } = res.data;
            setUsers(data);
          }
        } catch (err) {
          if (err.statusCode === 2)
            err.message = "Session expired. Please login again";
        } finally {
          setLoader((_) => false);
        }
      }
    })();
    // }
  }, []);

  return (
    <Chat>
      <Contact>
        <Logo>
          <img src={logo} alt="logo" />
          <span>Quikkonnet</span>
        </Logo>
        <Header>
          <Top>
            <i className="chat_hamburger">
              <AiOutlineMenu />
            </i>
            <h6 className="chat_title">Chats</h6>
          </Top>
          <Search>
            <input type="text" name="search" id="search" placeholder="Search" />
            <i className="search_icon">
              <BiSearch />
            </i>
          </Search>
        </Header>

        <ChatTabs />

        {/* Tabs go here */}
      </Contact>
      <ChatBox>
        {chatDetail?.body || contactId ? <OpenedChat /> : <ClosedChat />}
      </ChatBox>
    </Chat>
  );
};

function ContactWindow({
  profileImg,
  firstName,
  lastName,
  userType,
  user,
  all,
}) {
  const navigate = useNavigate();
  const { generalState, setGeneralState } = useAuth();

  function openMessage(e, message) {
    console.log(message)
    let userid =  message?.userId ? message?.userId : (message?.fromUser ? message?.fromUser : (message?.teacherId ? message?.teacherId : message?.adminId))
    
    e.preventDefault();
    navigate(`?contact=${userid}`);
    setGeneralState({ ...generalState, chatDetail: message });
    // setUserInfo(message);
  }
  return (
    <ContactItem onClick={(e) => openMessage(e, all)}>
      <Profile>
        <div className="chat_image_wrapper">
          {profileImg ? (
            <img src={profileImg} alt="" />
          ) : (
            <div
              style={{
                height: "50px",
                width: "50px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <BiUserCircle size="3rem" />
            </div>
          )}
        </div>
      </Profile>
      <PreviewContent>
        {user?.fullName ? (
          <div className="name">{user?.fullName}</div>
        ) : (
          <div className="name">{`${firstName ? firstName : ""} ${lastName ? lastName : ""}`}</div>
        )}
        <div className="previewText">message</div>
        <div className="time">10:20PM</div>
      </PreviewContent>
    </ContactItem>
  );
}

function OpenedChat() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getItem } = useLocalStorage();
  const userData = getItem(KEY);
  const {
    generalState: { chatDetail },
    setGeneralState,
    adminFunctions: { getMessages, sendMessage, readMessage },
  } = useAuth();


  const contactId = searchParams.get("contact");

  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState("");

  const ourMessages = useQuery(
    ["get private messages from user", contactId],
    () =>
      getMessages(
        userData.token,
        chatDetail?.userId
          ? chatDetail?.userId
          : chatDetail?.fromUser
          ? chatDetail?.fromUser
          : chatDetail?.teacherId
          ? chatDetail?.teacherId
          : chatDetail?.adminId
      ),
    {
      onSuccess: (res) => {
        if (res.data.length > 0) {
          setMessageList(res.data);
        } else {
          setMessageList([]);
        }
      },
      onError: (err) => {
        if (err.statusCode === 2)
          err.message = "Session expired. Please login again";
      },
    }
  );
  const msgMutation = useMutation(
    (data) => sendMessage(userData?.token, data),
    {
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          queryClient.invalidateQueries(["get private messages from user"]);
          setText("");
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
      onError: (err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    }
  );

  function handleChange(e) {
    setText(e.target.value);
  }

  function sendMsg(e) {
    e.preventDefault();
    if (text) {
      msgMutation.mutate({
        toUser: chatDetail.userId
          ? chatDetail.userId
          : chatDetail.teacherId
          ? chatDetail.teacherId
          : chatDetail.fromUser
          ? chatDetail.fromUser
          : chatDetail.adminId,
        body: text,
      });
    } else {
      toast.error("Enter a valid message", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  console.log("mds", ourMessages.isLoading )
  return (
    <Opened>
      <ChatHeader>
        <Profile>
          {chatDetail?.profileImg ? (
            <img src={chatDetail?.profileImg} alt="" />
          ) : (
            <p>{chatDetail?.user?.fullName.substring(0, 2)}</p>
          )}
        </Profile>
        <PreviewContent>
          <div className="name text-dark">{chatDetail?.user ? chatDetail?.fullName :  `${chatDetail?.firstName} ${chatDetail?.lastName}`}</div>
        </PreviewContent>
      </ChatHeader>

      <OpenedContent>
        <TextContent>
            {
                ourMessages.isLoading ? <div className="spinner-border text-primary">
                    <div className="visually-hidden">Loading</div>
                </div>
                :
                messageList?.map((item, i) => (
                  <ChatBar {...item} />
                ))

            }
        </TextContent>

        <InputContainer>
          <div className="input_holder">
            <i>
              <AiOutlinePaperClip size="1.2rem" />
            </i>
            <input
              type="text"
              name="msg"
              id="msg"
              placeholder=" write a message ..."
              onChange={handleChange}
              value={text}
            />
            <i>
              <VscSmiley size="1.2rem" />
            </i>
            <i>
              <BsMic size="1.2rem" />
            </i>
          </div>
          <div className="send" onClick={sendMsg}>
            <button>
              <IoSendSharp />
            </button>
          </div>
        </InputContainer>
      </OpenedContent>
    </Opened>
  );
}

function ClosedChat() {
  return (
    <Closed>
      <ImgWrapper>
        <img src={rocket} alt="" />
        <small>Click on a chat to start a conversation</small>
      </ImgWrapper>
    </Closed>
  );
}

function ChatBar({ sender, user, body, profileImg }) {
  // console.log(sender === "user")
  const { getItem } = useLocalStorage();
  const userdata = getItem(KEY);


  return (
    <>
      {user?.email !== userdata.email ? (
        <Bar sender={user?.email === userdata.email} className={sender}>
          <BarProfile sender={user?.email === userdata.email}>
            {profileImg ? (
              <img src={profile} alt="" />
            ) : (
              <p>{user?.fullName.substring(0, 2)}</p>
            )}
          </BarProfile>
          <BarText sender={user?.email === userdata.email} color="red">
            {body}
          </BarText>
        </Bar>
      ) : (
        <Bar sender={user?.email === userdata.email} className={sender}>
          <BarText sender={user?.email === userdata.email} color="purple">
            {body}
          </BarText>
          <BarProfile sender={user?.email === userdata.email}>
            <img src={userdata.profileImg} alt="" />
          </BarProfile>
        </Bar>
      )}
    </>
  );
}

function ChatTabs() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const chatSections = [<AllUsers />, <Unread />  ]

  return (
    <TabWrapper>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        // variant="scrollable"

        TabIndicatorProps={{ sx: { backgroundColor: "#fff" } }}
        sx={{
          "& button": { color: "#fff !important" },
          "& button.Mui-selected": {
            color: "#fff !important",
            fontWeight: "bold",
          },
        }}
      >
        {["All", "Unread", "Sent", "Archived"].map((h, i) => (
          <Tab
            key={i + 1}
            label={h}
            className="text-capitalize fw-bolder text-dark"
            {...a11yProps(i)}
            
          />
        ))}
      </Tabs>


            {
                chatSections?.map((item, i)=>(
                    
                    <TabPanel
                        value={value}
                        index={i}
                        style={{ height: "100%", width: "100%", paddingBottom: "1rem" }}
                        key={i}
                    >
                        {item}
                    </TabPanel>
                    


                ))
            }
    </TabWrapper>
  );
}

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
        <Box sx={{ p: 0 }} style={{ height: "100%" }}>
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

function Unread() {
    const { getItem } = useLocalStorage();
    const userData = getItem(KEY);
    const [loader, setLoader] = useState(false);
  const {
    adminFunctions: { getMessages, getUnreadMessages },
    adminStudentFunctions: { fetch },
    adminTeacherFunctions: { fetch: TeachersFetch },
    otherFunctions: { fetchTeachers, fetchAdmin },
    generalState: { chatDetail },
  } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // if(type !== "New Messages"){
    (async () => {
      if (userData.token) {
        try {
          const res = await getUnreadMessages(userData?.token);

          const { message, success, statusCode } = res.data;
          if (statusCode !== 1) throw new AdvancedError(message, statusCode);
          else {
            const { data } = res.data;

            setUsers(data);
          }
        } catch (err) {
          if (err.statusCode === 2)
            err.message = "Session expired. Please login again";
        } finally {
          setLoader((_) => false);
        }
      }
    })();
    // }
  }, []);
  return (
    <>
      {users?.map((user, i) => (
          <ContactWindow {...user} all={user} />
        ))}
    </>
  );
}

function AllUsers(){
    const { getItem } = useLocalStorage();
    const userData = getItem(KEY);
    const {id} = useParams()

    const [showuserlist, setShowUserlist]= useState(true)

    const { adminStudentFunctions: { fetch}, adminTeacherFunctions: { fetch: TeachersFetch }, otherFunctions: {fetchTeachers, fetchAdmin}, teacherFunctions: {fetchApplications} } = useAuth();
  
    console.log({id})
    // const isAdmin = userData.userType !== 'admin';
    const isStudent = userData.userType === 'student';
    const isTeacher = (userData?.userType === 'teacher' || "mentor" ) ? true : false;

    const [users, setUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const [admins, setAdmins] = useState([]);
    // const [userInfo, setUserInfo] = useState({});
    // const [loader, setLoader] = useState(false);
  
    // const allStudents = useQuery(["get all students"], () => fetch(userData?.token), {
    //     enabled: isTeacher,
    //     onSuccess: (res)=>{
    //         console.log(res)
    //     }
    // })

    // const allTeachers = useQuery(userData?.token && ["get all teachers"], () => TeachersFetch(userData?.token), {
    //     enabled: isAdmin,
    //     onSuccess: (res)=>{}
    // })
    // const allAdmins = useQuery(userData?.token && ["get all admins"], () => fetchAdmin(), {
    //     enabled: isStudent,
    //     onSuccess: (res)=>{}
    // })
    // const allStudentAdmin = useQuery(userData?.token && ["get all student admins"], () => fetchAdmin(), {
    //     enabled: isStudent,
    //     onSuccess: (res)=>{}
    // })
    // const allStudentTeacher = useQuery(userData?.token && ["get all student admins"], () => fetchAdmin(), {
    //     enabled: isStudent,
    //     onSuccess: (res)=>{}
    // })

    const courseAllStudent = useQuery(["get course applications", userData?.token], () => fetchApplications(userData?.token), {
        enabled: isTeacher,
        onSuccess: (res)=>{
            if(res.data?.length > 0){
                setStudents(res.data)
            }
        }
    })
   const allAdmins = useQuery(userData?.token && ["get all admins"], () => fetchAdmin(), {
        enabled: isStudent || isTeacher,
        onSuccess: (res)=>{
            if(res.data?.length > 0){
                setAdmins(res.data)
            }
        }
    })
   
   console.log({students})
    return (
        <>
        {
            [...admins, ...students]?.map((item,i)=>(
                <ContactWindow {...item} all={item} />

            ))
        }
        </>
    )
}

export default LiveChat;
