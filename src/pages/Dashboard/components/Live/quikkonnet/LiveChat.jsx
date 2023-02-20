import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePaperClip } from "react-icons/ai";
import { BiArrowBack, BiGroup, BiSearch, BiUserCircle } from "react-icons/bi";
import { BsThreeDotsVertical, BsArrowLeftCircle, BsMic } from "react-icons/bs";
import { IconButton, Tab, Tabs, Tooltip, Box, FormControl, FormControlLabel, Menu, MenuItem, Modal, Switch, TextField } from "@mui/material"
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
import { toast, ToastContainer } from "react-toastify";
import {
	Bar,
	BarProfile,
	BarText,
	Chat,
	ChatBox,
	ChatHeader,
	Closed,
	Contact,
	ContactItem,
	Header,
	ImgWrapper,
	InputContainer,
	Logo,
	Opened,
	OpenedContent,
	PreviewContent,
	Profile,
	Search,
	TabWrapper,
	TextContent,
	Top,
} from "./style";
import {
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";

import PropTypes from "prop-types";
import { useIntercom } from "react-use-intercom";
import { Link } from "react-router-dom";
import { CreateGroup } from "./group";

const LiveChat = () => {
	const { getItem } = useLocalStorage();
	const userData = getItem(KEY);
	const {
		adminFunctions: { getUnreadMessages },
		generalState: { chatDetail, searchValue, showMainChat },
		setGeneralState,
	} = useAuth();
	const [users, setUsers] = useState([]);
	const [searchParams] = useSearchParams();
	const contactId = searchParams.get("contact");
	const { shutdown } = useIntercom();
	const { pathname } = useLocation();
	const [open, setOpen] = useState(false);
	const {id} = useParams()

	useEffect(() => {
		shutdown();
	});

	function openCreateGroup() {
		setOpen(true);
	}

	useEffect(() => {
		// if(type !== "New Messages"){
		(async () => {
			if (userData.token) {
				try {
					const res = await getUnreadMessages(userData?.token);
					const { message, statusCode } = res.data;
					if (statusCode !== 1) throw new AdvancedError(message, statusCode);
					else {
						const { data } = res.data;
						setUsers(data);
					}
				} catch (err) {
					if (err.statusCode === 2)
						err.message = "Session expired. Please login again";
				}
			}
		})();
		// }
	}, []);

	function goBack() {
		let pathArray = pathname.split("/")[1];

		switch (pathArray) {
			case "teacher":
				return "/teacher/class-console/class/" + id;
			case "student":
				return "/student/class-console/class/" + id;
			default:
				return "/admin";
		}
	}

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Chat md={false}>
				<Contact>
					<div className="d-flex justify-content-between contact_logo_wrapper flex-wrap">
						<Logo>
							<img src={logo} alt="logo" />
							<span>Quickonnet</span>
						</Logo>
						<Tooltip title="Go to dashboard">
							<IconButton>
								<Link to={goBack()} className="d-inline-flex">
									<BsArrowLeftCircle size="1.5rem" color="#fff" />
								</Link>
							</IconButton>
						</Tooltip>
					</div>
					{/* <div className="back">
           <div onClick={()=>{
              navigate("/learn-on-gotocourse")
            }}>
              <i><BiArrowBack style={{fontSize:"1rem"}} color="#ffffff" /></i>
            </div>
          </div> */}
					<Header>
						<Top>
							<i className="chat_hamburger">
								<AiOutlineMenu />
							</i>
							<h6 className="chat_title">Chats</h6>
							{
								userData.userType !== "student" &&
								<button onClick={openCreateGroup}>Create group</button>
							}
						</Top>

						<Search>
							<input
								type="search"
								name="search"
								id="search"
								placeholder="Search"
								onChange={(e) =>
									setGeneralState((prev) => {
										return {
											...prev,
											searchValue: e.target.value,
										};
									})
								}
								value={searchValue}
							/>
							<i className="search_icon">
								<BiSearch />
							</i>
						</Search>
					</Header>

					<ChatTabs />
				</Contact>
				<ChatBox>
					{Object.keys(chatDetail).length > 0 ? <OpenedChat /> : <ClosedChat />}
				</ChatBox>
			</Chat>
			<Chat md={true}>
				{!showMainChat ? (
					<Contact>
						<Logo>
							<img src={logo} alt="logo" />
							<span>Quickonnet</span>
						</Logo>
						<Header>
							<Top>
								<i className="chat_hamburger">
									<AiOutlineMenu />
								</i>
								<h6 className="chat_title">Chats</h6>
							</Top>

							<Search>
								<input
									type="search"
									name="search"
									id="search"
									placeholder="Search"
									onChange={(e) =>
										setGeneralState((prev) => {
											return {
												...prev,
												searchValue: e.target.value,
											};
										})
									}
									value={searchValue}
								/>
								<i className="search_icon">
									<BiSearch />
								</i>
							</Search>
						</Header>

						<ChatTabs />
					</Contact>
				) : (
					<ChatBox>
						{Object.keys(chatDetail).length > 0 ? (
							<OpenedChat />
						) : (
							<ClosedChat />
						)}
					</ChatBox>
				)}
				<CreateGroup open={open} setOpen={setOpen} />
			</Chat>
		</>
	);
};

function ChatTabs() {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const chatSections = [<AllUsers />, <Unread />];

	return (
		<TabWrapper>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
				variant="scrollable"
				TabIndicatorProps={{ sx: { backgroundColor: "#fff" } }}
				sx={{
					"& button": { color: "#fff !important" },
					"& button.Mui-selected": {
						color: "#fff !important",
						fontWeight: "bold",
					},
				}}
			>
				{["All", "Unread"].map((h, i) => (
					<Tab
						key={i + 1}
						label={h}
						className="text-capitalize fw-bolder text-dark"
						{...a11yProps(i)}
					/>
				))}
			</Tabs>

			{chatSections?.map((item, i) => (
				<TabPanel
					value={value}
					index={i}
					style={{ height: "100%", width: "100%", paddingBottom: "1rem" }}
					key={i}
				>
					{item}
				</TabPanel>
			))}
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
	const {
		adminFunctions: { getUnreadMessages },
		generalState: { searchValue },
	} = useAuth();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		// if(type !== "New Messages"){
		(async () => {
			if (userData.token) {
				try {
					const res = await getUnreadMessages(userData?.token);
					const { message, statusCode } = res.data;
					if (statusCode !== 1) throw new AdvancedError(message, statusCode);
					else {
						const { data } = res.data;
						setUsers(data);
					}
				} catch (err) {
					if (err.statusCode === 2)
						err.message = "Session expired. Please login again";
				}
			}
		})();
		// }
	}, []);

	return (
		<>
			{users
				?.filter((item) => item?.user.fullName?.includes(searchValue))
				.map((user, i) => (
					<ContactWindow {...user} all={user} />
				))}
		</>
	);
}

function AllUsers() {
	const { getItem } = useLocalStorage();
	const userData = getItem(KEY);
	const { id } = useParams();

	const {
		otherFunctions: { fetchAdmin },
		teacherFunctions: { fetchMyStudents },
		studentFunctions: { getMyTeachers },
		generalState: { searchValue },
		commonFunctions: {fetchMyGroups}
	} = useAuth();

	// const isAdmin = userData.userType !== 'admin';
	const isStudent = userData.userType === "student";
	const isTeacher = userData?.userType === "teacher" || "mentor" ? true : false;

	const [teachers, setTeachers] = useState([]);
	const [students, setStudents] = useState([]);
	const [admins, setAdmins] = useState([]);
	const [groups, setGroups] = useState([]);
	// const [userInfo, setUserInfo] = useState({});
	// const [loader, setLoader] = useState(false);

	const { data: studentData } = useQuery(
		["teacher students", userData.token],
		() => fetchMyStudents(userData.token),
		{
			enabled: userData?.userType === "teacher",
			onSuccess: (res) => {
				if (res.data?.length > 0) {
					setStudents(res.data);
				}
			},
			onError: (err) => console.error(err),
		}
	);

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
	// const allStudentTeacher = useQuery(["get my teachers", userData?.token], () => fetchBootcamps(userData?.token), {
	//   enabled: userData?.userType !== "teacher",
	//   onSuccess: (res)=>{
	//     if(res.success){
	//       let teachers = new Set()
	//       res.data.forEach(student => {
	//         if(student.tutorId){
	//           teachers.add(student)
	//         }
	//       })
	//       let teacherArray = Array.from(teachers)
	//       console.log({teacherArray})
	//       setTeachers(teacherArray)
	//     }
	//   },
	//   onError: (err) => console.error(err)
	// })

	// const courseAllStudent = useQuery(["get course applications", userData?.token], () => fetchApplications(userData?.token), {
	//     enabled: isTeacher,
	//     onSuccess: (res)=>{
	//         if(res.data?.length > 0){
	//             setStudents(res.data)
	//         }
	//     }
	// })

	const allAdmins = useQuery(
		userData?.token && ["get all admins"],
		() => fetchAdmin(),
		{
			enabled: isStudent || isTeacher,
			onSuccess: (res) => {
				if (res.data?.length > 0) {
					let admin = res.data;
					// let admin = res.data.filter(admin=> admin.firstName === "Admiralty")
					setAdmins(admin);
				}
			},
		}
	);


	const allStudentTeacher = useQuery(["get my teachers", userData?.token], () => getMyTeachers(userData?.token, id), {
	  enabled: userData?.userType === "student",
	  onSuccess: (res)=>{
		  console.log(res)
	    if(res.statusCode === 1){
	      setTeachers(res.data)
	    }
	  },
	  onError: (err) => console.error(err)
	})

	const allGroups = useQuery(["get all student admins", userData?.token], () => fetchMyGroups(userData?.token), {
	    onSuccess: (res)=>{
			console.log({res})
			if (res.data?.length > 0) {
				let data = res.data;
				// let admin = res.data.filter(admin=> admin.firstName === "Admiralty")
				setGroups(data);
			}
		},
		onError: (err)=>{
			console.error(err);
		}

	})

	return (
		<>
			{[...admins, ...students, ...groups, ...teachers]
				?.filter(
					(item) =>
						item.firstName?.includes(searchValue) ||
						item.lastName?.includes(searchValue) ||
						item.name?.includes(searchValue) ||
						item.tutorName?.includes(searchValue) ||
						item.title?.includes(searchValue)
				)
				.map((item, i) => (
					<ContactWindow {...item} all={item} />
				))}
		</>
	);
}

function ContactWindow({
	profileImg,
	firstName,
	lastName,
	userType,
	user,
	all,
	name,
	tutorName,
	title
}) {
	const navigate = useNavigate();
	const { generalState, setGeneralState } = useAuth();

	function openMessage(e, message) {
		let userid = message?.userId
			? message?.userId
			: message?.fromUser
				? message?.fromUser
				: message?.teacherId
					? message?.teacherId
					: message.tutorId 
						? message.tutorId 
						: message?.adminId
							? message?.adminId
							: message?.studentId;

		e.preventDefault();
		navigate(`?contact=${userid}`);
		setGeneralState({
			...generalState,
			chatDetail: message,
			showMainChat: true,
		});
		// setUserInfo(message);
	}
	return (
		<ContactItem onClick={(e) => openMessage(e, all)}>
			<Profile>
				<div className="chat_image_wrapper">
					{profileImg ? (
						<img src={profileImg} alt="" />
					) : (
						title ?
						<div
							style={{
								height: "50px",
								width: "50px",
								display: "grid",
								placeItems: "center",
								color: "#FFF",
							}}
						>
							<BiGroup size="3rem" />
						</div>

						:
						<div
							style={{
								height: "50px",
								width: "50px",
								display: "grid",
								placeItems: "center",
								color: "#FFF",
							}}
						>
							<BiUserCircle size="3rem" />
						</div>
					)}
				</div>
			</Profile>
			<PreviewContent>
				{name ? (
					<div className="name">{name}</div>
				) : user?.fullName ? (
					<div className="name">{user.fullName}</div>
				) : tutorName ? (
					<div className="name">{tutorName}</div>
				) : title ? 
					<div classNmae="name">{title}</div>
				:
				(
					<div className="name">{`${firstName ? firstName : ""} ${
						lastName ? lastName : ""
					}`}</div>
				)}
				<div className="previewText">message</div>
				{/* <div className="time">10:20PM</div> */}
			</PreviewContent>
		</ContactItem>
	);
}

function OpenedChat() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const { getItem } = useLocalStorage();
	const userData = getItem(KEY);
	const {
		generalState: { chatDetail, showMainChat },
		generalState,
		adminFunctions: { getMessages, sendMessage },
		commonFunctions:{getGroupMessages, sendGroupMessage},
		setGeneralState,
	} = useAuth();

	const contactId = searchParams.get("contact");

	const [messageList, setMessageList] = useState([]);
	const [text, setText] = useState("");

	const ourMessages = useQuery(
		["get private messages from user", contactId],
		() => getMessages(userData.token, contactId),
		{
			onSuccess: (res) => {
				if (res.data?.length > 0) {
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

	const GroupMessages = useQuery([`get group messages ${chatDetail?.groupId}`], ()=>getGroupMessages(userData.token, chatDetail?.groupId),{
		enabled: chatDetail?.groupId !== "" || chatDetail?.groupId !== null,
		onSuccess: (res) => {
			console.log("fetched group messages")
			if (res.data?.length > 0) {
				setMessageList(res.data);
			} else {
				setMessageList([]);
			}
		},
		onError: (err) => {
			if (err.statusCode === 2)
				err.message = "Session expired. Please login again";
		},
	})

	const msgMutation = useMutation(
		(data) => sendMessage(userData?.token, data),
		{
			onSuccess: (res) => {
				if (res.success) {
					queryClient.invalidateQueries(["get private messages from user"]);
					setText("");
				} else {
					toast.error(res.message);
				}
			},
			onError: (err) => {
				toast.error(err.message);
			},
		}
	);
	const groupMsgMutation = useMutation(
		([token, id, data]) => sendGroupMessage(token, id, data),
		{
			onSuccess: (res) => {
				if (res.success) {
					queryClient.invalidateQueries([`get group messages ${chatDetail?.groupId}`]);
					setText("");
				} else {
					toast.error(res.message);
				}
			},
			onError: (err) => {
				toast.error(err.message);
			},
		}
	);

	function handleChange(e) {
		setText(e.target.value);
	}

	function sendMsg(e) {
		e.preventDefault();
		if (text) {
			if(chatDetail?.groupId){
				groupMsgMutation.mutate([userData?.token, chatDetail?.groupId,  {body: text} ])

			}else {
				msgMutation.mutate({
					toUser: chatDetail.userId
						? chatDetail.userId
						: chatDetail.teacherId
						? chatDetail.teacherId
						: chatDetail.tutorId 
						? chatDetail.tutorId 
						: chatDetail.fromUser
						? chatDetail.fromUser
						: chatDetail.adminId
						? chatDetail.adminId
						: chatDetail.studentId,
					body: text,
				});
			}
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


	return (
		<Opened>
			<div className="back">
				<div
					onClick={() =>
						setGeneralState({ ...generalState, showMainChat: false })
					}
				>
					<i>
						<BiArrowBack size="1.1rem" color="#2e3747" />
					</i>
				</div>
			</div>
			<ChatHeader>
				<Profile>
					{chatDetail?.profileImg ? (
						<img src={chatDetail?.profileImg} alt="" />
					) : (
						<p>
							{chatDetail?.user?.fullName
								? chatDetail?.user?.fullName.substring(0, 2)
								:chatDetail?.name ?  chatDetail?.name?.substring(0, 2)
								:
								chatDetail?.title?.substring(0, 2)
								
							}
						</p>
					)}
				</Profile>
				<PreviewContent>
					<div className="name text-dark">
						{
							chatDetail?.name
							? chatDetail.name
							: chatDetail?.user
							? chatDetail?.fullName
							: chatDetail?.title ? chatDetail.title :`${chatDetail?.firstName} ${chatDetail?.lastName}`
						}
					</div>
				</PreviewContent>
				{/* <GroupContextMenu /> */}
			</ChatHeader>

			<OpenedContent>
				<TextContent>
					{ourMessages.isLoading || GroupMessages?.isLoading ? (
						<div className="spinner-border text-primary">
							<div className="visually-hidden">Loading</div>
						</div>
					) : (
						messageList?.map((item, i) => <ChatBar {...item} />)
					)}
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




export function GroupContextMenu({ x, id, handleClick, data=[], openAnchor, anchorEl, setAnchorEl}){
    

    const handleClose = () => {
        setAnchorEl(null);
    }



    return (
        <div className="suite__dots">
            <BsThreeDotsVertical
                id="basic-button"
                aria-controls={openAnchor ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openAnchor ? 'true' : undefined}
                onClick={handleClick}
            />
            <Menu
			id="basic-menu"
			anchorEl={anchorEl}
			open={openAnchor}
			onClose={handleClose}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
			>
                    
				{
					data?.map(({title}) =>(
						<MenuItem key={id}>
							<span className="ms-3">{title}</span>
						</MenuItem>
					))
					
				}

            </Menu>
        </div>
    )
}



export default LiveChat;
