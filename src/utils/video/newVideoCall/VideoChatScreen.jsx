import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from 'react-icons/bs'
import { HiDotsVertical, HiOutlineHand, HiOutlinePhone } from 'react-icons/hi'
import { IoAdd } from 'react-icons/io5'
import { MdOutlineMessage, MdPresentToAll } from 'react-icons/md'
import { VscRecord } from 'react-icons/vsc'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import useSelfQuery from '../useQuery'
import useSocket from '../useSocket'
import { Wrapper, Content, HeadBar, VideoWrapper, AddPeople, ControlItem, ControlWrapper, UserCallBlock, UserPresentation, StreamWrapper, ScreenShare, UserHeader, SearchBox, HandList, HandUser, UserListWrapper, UserList, } from './style'
import { MediaConnection, Peer } from "peerjs";
import CONFIG from '../appConst'
import { KEY } from '../../../constants'
import { useLocalStorage } from '../../../hooks'
import { Navbar } from '../../../pages/Dashboard/components/Live/LiveClass'
import { BiMessageDetail } from 'react-icons/bi'
import { Box, Modal, TextField, Button, Typography } from '@mui/material/';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { FaShapes } from 'react-icons/fa'

import sharing from "../../../images/degree.png"
import { width } from '@mui/system'
import { toast, ToastContainer } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuth } from '../../../contexts/Auth'
import useRecordUpload from "./hook/upload.jsx"
import zIndex from '@mui/material/styles/zIndex'
import Loader from '../../../components/Loader'

const style = {
    position: 'absolute',
    // top: '50%',
    top: "50px",
    // left: '50%',
    right: 0,
    bottom: "50px",
    // transform: 'translate(-50%, -50%)',
    width: "min(100% - .2rem, 400px)",
    height: "min(100vh - 81px, 500px)",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: "hidden",
    padding: "clamp(0.625rem, 0.2321rem + 1.9643vw, 2rem)",
};

const VideoChatScreen = () => {
    const HandKey = "gotocourse_hand_raised_users"
    const MsgKey = "gotocourse_in_app_chat"
    const { socket, sendPing } = useSocket()
    const location = useLocation();
    const { getItem } = useLocalStorage()
    const userProfile = getItem(KEY);
    const [open, setOpen] = useState(false);
    const [openToolBox, setOpenToolBox] = useState(false);
    const [openUserBox, setOpenUserBox] = useState(false);
    const [handRaiseList, setHandRaiseList] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [openUploadStatus, setOpenUploadStatus] = useState(false);
    const [handRaised, setHandRaised] = useState(false);

    const {classId} = useParams()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([])
    const [isPresenting, setIsPresenting] = useState(false);
    const [presentingUser, setPresentingUser] = useState(false);
    const [callSettingsState, setCallSettingsState] = useState({
        video: true,
        audio: true,
    })

    const [isPermitted, setIsPermitted] = useState(false)


    const navigate = useNavigate()
    const query = useSelfQuery();
    let roomId = query.get('room')
    let isRoomOwner = false;

    const {alert, loading, postVideoToServer, progress } = useRecordUpload(userProfile?.token, classId)

    const connectionUserId = useRef(userProfile.userId)

    const connectionStateRef = useRef({
        hasJoinedPresentation: false
    })

    let data = sessionStorage.getItem(HandKey);

    useEffect(()=>{
        if(data){
            setHandRaiseList(JSON.parse(data))
        }

    }, [data])

   
    const chekForVideoRoom = async () => {
        if (location?.state?.owner) {
            isRoomOwner = true
            setUpMediaScreen()
            return;
        }

        const res = await axios.get(`${CONFIG.socketUrl}/v1/room/video/${roomId}`)
        if (res.data.data.userId === userProfile.userId) {
            isRoomOwner = true
            setUpMediaScreen()

        } else {
            isRoomOwner = false
            setUpMediaScreen("audioOff")
        }
    }
    const localStream = useRef(null);
    let myCall;


    const togggleVideo = async () => {
        if (callSettingsState.video) {
            handleVideoToggle({ video: false, audio: callSettingsState.audio })
            setCallSettingsState({ ...callSettingsState, video: false })
        } else {
            handleVideoToggle({ video: true, audio: true })
            setCallSettingsState({ ...callSettingsState, video: !callSettingsState.video })
        }
    }

    const handleVideoToggle = async ({ video, audio, stream }) => {
        const enabled = localStream.current?.getVideoTracks()[0].enabled;
        if (enabled) {
            localStream.current.getVideoTracks()[0].enabled = false;
        } else {
            localStream.current.getVideoTracks()[0].enabled = true;
        }
    }

    const handleAudioToggle = async ({ video, audio }) => {
        const enabled = localStream.current?.getAudioTracks()[0].enabled;

        if (enabled) {
            localStream.current.getAudioTracks()[0].enabled = false;
        } else {
            localStream.current.getAudioTracks()[0].enabled = true;
        }
    }

    const togggleAudio = async () => {

        if (callSettingsState.audio) {
            handleAudioToggle({ video: callSettingsState.video, audio: false })
            setCallSettingsState({ ...callSettingsState, audio: false })
        } else {
            handleAudioToggle({ video: callSettingsState.video, audio: true })
            setCallSettingsState({ ...callSettingsState, audio: true })
        }
    }

    let videoWrapper

    useEffect(() => {
        videoWrapper = document.querySelector('.video-section');
        
    }, [])

    function addVideoStream(videoWrapper, stream) {

        const video = videoWrapper.querySelector('video')
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
    }
   
        /*
        needs a socket connection that handles remote audio and video toggling.
        
            on emit, 
            1. get userId, 
            2. check if it matches the roomOwner id
            3. if it doesn't, get localStream.current.audioandvideoTracks
            4. set them to false
            5. disable mic and video toggling buttons
        */ 

    
    const setUpMediaScreen = () => {
        navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                echoCancellation: true,
            },
            video: true,
        }).then((stream) => {
            localStream.current = stream;
            // handleAudioToggle({ video: callSettingsState.video, audio: false })
            // setCallSettingsState({ ...callSettingsState, audio: false })
            handleAudioToggle({ video: false, audio: false })
            handleVideoToggle({ video: false, audio: false })
            setCallSettingsState({ ...callSettingsState, audio: false, video: false })
            startWebCam()
        });
    }

    const streamRecorder = useRef();
    const recordedVideoRef = useRef();
    const [showRecordedMedia, setShowRecordedMedia] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    const closeRecordedModal = (e) => {
        if (e.target !== recordedVideoRef.current) {
            recordedVideoRef.current.parentNode.style.display = "none"
        }
    }



    function startRecording() {
        if(isPresenting){
            setIsRecording(true)
            
            streamRecorder.current = new MediaRecorder(presentationStream.current, {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
                mimeType: "video/webm;codecs=VP8",
              });
    
            const chunks = [];
            streamRecorder.current.ondataavailable = e => chunks.push(e.data);
            streamRecorder.current.onstop = e => {
                setIsRecording(false)
                const completeBlob = new Blob(chunks, { type: chunks[0].type });
                recordedVideoRef.current.parentNode.style.display = "flex"
                recordedVideoRef.current.src = URL.createObjectURL(completeBlob);
                recordedVideoRef.current.load();
                recordedVideoRef.current.play()
    
                postVideoToServer(completeBlob)
            };
    
            streamRecorder.current.start();
        }else {
            toast.error("Screen share must be turned on before recording")
        }
    }



    function stopRecording() {
        streamRecorder.current?.stop();
    }
    
    


    const presentationStream = useRef(null);
    const presentationPeer = useRef(null);
    const myPeer = useRef(null);
    const presentationPeers = useRef({})

    // FOR SCREEN SHARE
    function startCapture() {
        const presentationId = "presentation-" + connectionUserId.current

        const presentationVideo = document.querySelector('.client-presentation-stream')
        navigator.mediaDevices.getDisplayMedia({ audio: false, video: true }).then((stream) => {
            presentationStream.current = stream

            presentationVideo?.setAttribute("autoplay", "")
            presentationVideo?.setAttribute("playsInline", "")
            presentationVideo.muted = true;
            presentationVideo.srcObject = presentationStream.current
            presentationVideo.addEventListener('loadedmetadata', () => {
                presentationVideo.play()
            })
            presentationPeer.current = new Peer(presentationId, {
                host: CONFIG.peerUrl,
                port: 9001,
                path: '/peer',
                secure: true
            });


            presentationPeer.current.on('open', userId => {
                
                socket.emit('join-video-room', roomId, presentationId)
            })

            presentationPeer.current.on('call', call => {
                presentationPeers.current[call.peer] = call
                call.answer(presentationStream.current)

                call.on('stream', userVideoStream => {
                    console.log("remote presentation viewer sent sream: ", userVideoStream)
                })

                call?.on('close', () => {
                    console.log("connection closed")
                    // remoteVideoWrapper.remove();
                })
            })

            presentationStream.current.getTracks()[0].onended = () => {
                setIsPresenting(false)
                presentationPeer.current?.disconnect()
                socket.emit('client-presentation-ended', roomId, presentationId)
                // socket.emit('join-video-room', roomId, presentationId)
            }
            setPresentingUser(connectionUserId.current)
            setIsPresenting(true)

        });


    }

    const [remoteUserPresentingProccessing, setRemoteUserPresentingProccessing] = useState(false)

    const peers = useRef({})

    const startWebCam = async () => {
        const myVideo = document.querySelector('.client-local-stream')
        myVideo?.setAttribute("autoplay", "")
        myVideo?.setAttribute("playsInline", "")
        myVideo.muted = true;

        // localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true})

        myPeer.current = new Peer(userProfile.userId, {
            host: CONFIG.peerUrl,
            port: 9001,
            path: '/peer',
            secure: true,
            debug: 1
        });


        console.log({myPeer})
        myPeer.current.on('open', userId => {
            socket.emit('join-video-room', roomId, userId)
            console.log("user joined room") ;
        })
        myPeer.current.on('connect', conn => {
            console.log({conn}) ;
        })

        myPeer.current.on('call', call => {
            if (call.peer.split('-')[0] !== "presentation") {

                call.answer(localStream.current)
                const remoteVideoWrapper = document.createElement('div')
                remoteVideoWrapper.classList.add("remote-users")
                const remoteVideo = document.createElement('video')
                remoteVideoWrapper.appendChild(remoteVideo)
                videoWrapper?.append(remoteVideoWrapper)


                peers.current[call.peer] = call

                console.log("user length", peers.current)            
                console.log("user length", Object.keys(peers.current).length)
                call.on('stream', userVideoStream => {
                    addVideoStream(remoteVideoWrapper, userVideoStream)
                })

                call?.on('close', () => {
                    remoteVideoWrapper.remove();
                })
            } else if (userProfile.userId !== call.peer.split('-')[1]) {
                call.answer(localStream.current)
                setIsPresenting(true)
                call?.on('stream', presentationStream => {
                    const presentationVideo = document.querySelector('.client-presentation-stream')
                    presentationVideo?.setAttribute("autoplay", "")
                    presentationVideo?.setAttribute("playsInline", "")
                    presentationVideo.muted = true;
                    presentationVideo.srcObject = presentationStream
                    presentationVideo.addEventListener('loadedmetadata', () => {
                        presentationVideo.play()
                    })
                    setRemoteUserPresentingProccessing(false)
                })
                peers.current[call.peer] = myCall
                call?.on('close', () => {
                    setIsPresenting(false)
                })
            }
        })

        myVideo.srcObject = localStream.current
        myVideo.addEventListener('loadedmetadata', () => {
            myVideo.play()
        })

        socket.on('new-user-join-video-room', (userId) => {
            console.log(`new ${userId} joined room`) 

            console.log("peer length 1", peers.current)
            console.log("user length 2", Object.keys(peers.current).length)

            if (userId.split('-')[0] !== "presentation") {
                connectToNewUser(userId, localStream.current)
                if (presentationStream.current?.getVideoTracks()[0].enabled) {
                    presentationPeer.current?.call(userId, presentationStream.current);
                }
            } else if (userProfile.userId !== userId.split('-')[1]) {
                connectToUserRemotePresentation(userId)
            }
        })

        const connectToNewUser = (userId, stream) => {
            myCall = myPeer.current?.call(userId, stream)
            // const videoWrapper = document.querySelector('.video-section')

            const remoteVideoWrapper = document.createElement('div')
            remoteVideoWrapper.classList.add("remote-users")
            const remoteVideo = document.createElement('video')
            remoteVideoWrapper.appendChild(remoteVideo)
            videoWrapper.append(remoteVideoWrapper)


            myCall.on('stream', userVideoStream => {
                addVideoStream(remoteVideoWrapper, userVideoStream)
            })
            myCall.on('close', () => {
                remoteVideoWrapper.remove();
            })

            peers.current[userId] = myCall
        }

        const connectToUserRemotePresentation = (presentaterUserId) => {
            const presentationId = "presentation-" + connectionUserId.current
            myCall = myPeer.current?.call(presentaterUserId, localStream.current)

            setIsPresenting(true)
            myCall?.on('stream', presentationStream => {
                const presentationVideo = document.querySelector('.client-presentation-stream')
                presentationVideo?.setAttribute("autoplay", "")
                presentationVideo?.setAttribute("playsInline", "")
                presentationVideo.muted = true;
                presentationVideo.srcObject = presentationStream
                presentationVideo.addEventListener('loadedmetadata', () => {
                    presentationVideo.play()
                })
                setRemoteUserPresentingProccessing(false)
            })
            peers.current[presentaterUserId] = myCall
            myCall?.on('close', () => {
                setIsPresenting(false)
            })
        }

        socket.on('user-disconnected', userId => {
            console.log(`user ${userId} disconnected out`)
            if (peers.current[userId]) {
                console.log('user disconnected in')
                peers.current[userId].close()

                // if (!presentationPeers.current[userId]) {
                //     setIsPresenting(false)
                //     peers.current[userId].close()
                // }
            }
        })

        socket.on('user-ended-presentation', (userId) => {
            if (peers.current[userId]) {
                peers.current[userId].close()

                if (userProfile.userId !== userId.split('-')[1]) {
                    setIsPresenting(false)
                }
            }
        })

        socket.on('incoming-message', userData => {
            console.log("incoming-message", userData)
            if (userData) {
                setMessages([...messages, userData])
                let previousMessages = sessionStorage.getItem(MsgKey)
                if(previousMessages){
                    let prevArray = JSON.parse(previousMessages);
                    sessionStorage.setItem(MsgKey, JSON.stringify([...prevArray, userData]))
                }else {
                    sessionStorage.setItem(MsgKey, JSON.stringify([userData]))
                }
                // messages.push(userData)

            }
        })
        socket.on('incoming-raising-hand', userData => {
            console.log("incoming socket", userData)
            sessionStorage.setItem(HandKey, JSON.stringify([...handRaiseList,  userData]));
            toast.info(`${userData.name} raised their hand`)
            // window.alert("someone raised their hand")
        })
        socket.on('incoming-unraising-hand', userData => {

            console.log("incoming socket", userData)
            let currentList = sessionStorage.getItem(HandKey)
            let newList = currentList.filter(item => item.name !== `${userData.firstName} ${userData.lastName}`)

            sessionStorage.setItem(HandKey, JSON.stringify(newList));
        })

       

    }

    // useEffect(()=>{
    //     console.log("myPeer", myPeer)

    // },[myPeer.current])



    const checkPeerUsers = () => {
        console.log(presentationPeers.current)
    }

    const initRoom = () => {
        if (userProfile.userId !== "") {
            chekForVideoRoom()
        }else {
            navigate("/login")
        }
        // ask you to log in
    }

    useEffect(() => {
        // if(isPermitted){
            initRoom()
            connectionUserId.current = userProfile.userId    
        // }

    }, [userProfile.userId])
    
    

    // end call
    function endCall() {
        if(localStream.current.getTracks().length > 0){
            localStream.current.getTracks().forEach((track) => {
                track.stop();
            })
            navigate(-1)
        }else {
            navigate("/learn-with-gotocourse")
        }
       
    }


    //  Messaging

    // TODO: Extract to separate component

    const toggleMessage = () => {
        setOpen(!open)
    }
    const toggleUser = () => {
        setOpenUserBox(!open) 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!value) return;
        let userData = {
            value,
            name: `${userProfile.firstName} ${userProfile.lastName}`,
            mine:true,
        }

        setMessages([
            ...messages,
            {
                value,
                name: `${userProfile.firstName} ${userProfile.lastName}`,
                mine:true,
            }
        ])
        toast.info(`You: ${userProfile.firstName} ${userProfile.lastName} - ${value}`)
        socket.emit('client-message', roomId, {
            value,
            name: `${userProfile.firstName} ${userProfile.lastName}`,

        })
        let previousMessages = sessionStorage.getItem(MsgKey)
        if(previousMessages){
            let prevArray = JSON.parse(previousMessages);
            sessionStorage.setItem(MsgKey, JSON.stringify([...prevArray, userData]))
        }else {
            sessionStorage.setItem(MsgKey, JSON.stringify([userData]))
        }
        

        setValue("")
    };


    const others = [
        {
          id:1,
          icon:AiOutlineInfoCircle,
          name:"info"
        },
        {
          id:2,
          icon:FiUsers,
          name:"users",
          handleClick: toggleUser,

        },
        {
          id:3,
          icon:MdOutlineMessage,
          name:"chat",
          handleClick: toggleMessage,
        },
        {
          id:4,
          icon:FaShapes,
          name:"info"
        },
      ]



    function raiseHand(){
        setHandRaised(true)

        socket.emit('client-raise-hand', roomId, {
            name: `${userProfile.firstName} ${userProfile.lastName}`,
            img: userProfile.profileImg,
            id: userProfile.userId
        })
        toast.info("You raised your hand")
        if(handRaiseList !== null){
            sessionStorage.setItem(HandKey, JSON.stringify([...handRaiseList,  {
                    name: `${userProfile.firstName} ${userProfile.lastName}`,
                    img: userProfile.profileImg    
                }
            ]));
        }else {
            sessionStorage.setItem(HandKey, JSON.stringify([{
                    name: `${userProfile.firstName} ${userProfile.lastName}`,
                    img: userProfile.profileImg    
                }
            ]));

        }

    }
 
    /**
     * for the hand raise feature
     * integrate it with the people icon popup
     * add hand raise notification to stream box
     * 
     * add 'lower hand' permission to roomOwner
     */

    function unRaiseHand(){
        setHandRaised(false)
        socket.emit('client-unraise-hand', roomId,{
            name: `${userProfile.firstName} ${userProfile.lastName}`,
            img: userProfile.profileImg,
            id: userProfile.userId
        })
        
        let handStore = sessionStorage.getItem(HandKey)
        let currentList = JSON.parse(handStore)
        let newList = currentList.filter(item => item.name !== `${userProfile.firstName} ${userProfile.lastName}`)

        sessionStorage.setItem(HandKey, JSON.stringify(newList));
        
    }

    const chatMessages = useMemo(()=>{
        let allMsgs = sessionStorage.getItem(MsgKey)
        let data
        if(allMsgs){
            data = JSON.parse(allMsgs)
        }
        console.log({data})
         return data
    },[messages])
   

    console.log({chatMessages})
    useEffect(() => {        
        if(peers.current){
            console.log("user length", Object.keys(peers.current).length)
            setUserCount(Object.keys(peers.current).length)

        }
    }, [peers.current])

    // if(!isPermitted){
    //     return <Wrapper> <Loader /> </Wrapper>
    // }

    return (
        <Wrapper>
            <ToastContainer
                position="bottom-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
            {/* <HeadBar>
                <div className="banner">
                    <img src="/assets/svg/logo.svg" alt="logo" />
                    <Link to="/home">TeamKonnect</Link>
                </div>
                <div className="head-img">
                    <img src={userProfile.profileImg} alt="avatar" />
                </div>
            </HeadBar> */}
            <Navbar user={userProfile} isPresenting={isPresenting} />
            <Content>
                <VideoWrapper isPresenting={isPresenting}>
                    <div onClick={closeRecordedModal} className="recoreded-media">
                        <video ref={recordedVideoRef} src=""></video>
                    </div>
                    <UserPresentation isPresenting={isPresenting}>
                        <video className="client-presentation-stream" src="" muted={true}></video>
                    </UserPresentation>
                    <StreamWrapper isPresenting={isPresenting} className="video-section">

                        <UserCallBlock showText={localStream.current?.getVideoTracks()[0].enabled}>
                            <video className="client-local-stream" src="" muted={true}></video>
                            <p>{userProfile.firstName} {userProfile.lastName}</p>
                        </UserCallBlock>
                    </StreamWrapper>
                    {
                        (isPresenting && presentingUser === userProfile.userId) && 
                    <SreenSharePlaceholder />
                    }

                    <ControlWrapper>
                        <span className="d-none d-sm-block">Class meeting</span>
                        <div className="controls">
                            <ControlItem onClick={() => {
                                if (!isRecording) {
                                    startRecording()
                                } else {
                                    stopRecording()
                                }
                            }} isOn={!isRecording}
                            className="d-sm-flex d-none"
                            >
                                <VscRecord size="1.5rem" />
                            </ControlItem>

                            <ControlItem isOn={true} className="d-flex d-sm-none" onClick={()=>setOpenToolBox(true)}>
                                <HiDotsVertical size="1.5rem" />
                            </ControlItem>
                            <ControlItem isOn={true} onClick={ handRaised ? unRaiseHand : raiseHand}>
                                <HiOutlineHand size="1.5rem" />
                            </ControlItem>
                            <ControlItem onClick={togggleAudio} isOn={callSettingsState.audio}>
                                {callSettingsState.audio ? <BsMic size="1.5rem" /> : <BsMicMute size="1.5rem" />}
                            </ControlItem>
                            <ControlItem onClick={() => startCapture()} isOn={true} className="d-sm-flex d-none" > 
                                <MdPresentToAll size="1.5rem" />
                            </ControlItem>
                            <ControlItem onClick={togggleVideo} isOn={callSettingsState.video}>
                                {callSettingsState.video ? <BsCameraVideo size="1.5rem" /> : <BsCameraVideoOff size="1.5rem" />}
                            </ControlItem>
                            {/* <ControlItem onClick={toggleMessage} isOn={false}>
                                <BiMessageDetail size="1.5rem" />
                            </ControlItem> */}
                            <ControlItem onClick={endCall}>
                                <HiOutlinePhone size="1.5rem" />
                            </ControlItem>

                            <Info
                                open={openToolBox}
                                setOpen={setOpenToolBox}
                                others={others}
                                isRecording={isRecording}
                                startRecording={startRecording}
                                stopRecording={stopRecording}
                                startCapture={startCapture}
                            />
                            <Users
                                open={openUserBox}
                                setOpen={setOpenUserBox}
                                profileData={userProfile}
                            />

                        </div>
                        <div className="controls right_controls d-sm-flex d-none">
                            {
                                others.map(({icon:Icon, handleClick}, i)=>(
                                    <i>
                                    <Icon onClick={handleClick} />
                                    </i>
                                ))
                            }
                        </div>
                    </ControlWrapper>
                    {/* <AddPeople>
                        <IoAdd />
                        <span>Add people</span>
                    </AddPeople> */}
                </VideoWrapper>
            </Content>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="message"
            >
                <Box sx={style}
                >
                    <header style={{marginBottom:"0"}}>
                        Live-Chat
                    </header>
                    <div className="boxtop">
                        {chatMessages?.length > 0 && chatMessages?.map(x => (
                            <div className={`message ${x.mine &&"mine"}`}> 
                                <p style={{color: "#0C2191", marginBottom:".5rem"}}>{x.name}</p>
                                <span> {x.value}</span>   
                            </div>

                        ))} 

                    </div>
                    <div className="boxbottom">
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={value} placeholder='Message' onChange={(event) => setValue(event.target.value)} />
                            <button>Send</button>
                        </form>

                    </div>
                </Box>
            </Modal>
            <UploadStatus open={loading} setOpen={setOpenUploadStatus} progress={progress} />
        </Wrapper>
    )

}


function SreenSharePlaceholder(){
    return(
        <ScreenShare>
            <div>
                <img src={sharing} alt="" />
                <p className="text-center">You are presenting your screen</p>
            </div>
        </ScreenShare>
    )
}

function Info({open, setOpen, others, isRecording,startRecording, stopRecording, startCapture }) {
  
    const modalStyle = {
      position: 'absolute',
      bottom: '15%',
      left: '50%',
      transform: 'translate(-50%)',
      width: "min(100% - .2rem, 300px)",
      backgroundColor: '#000',
      border: '2px solid #eee',
      boxShadow: 24,
      color:"#fff",
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
            <div className="popup_action">
              {
                others.map(({name, icon:Icon, handleClick}, i)=>(
                  <i  onClick={handleClick} key={i}>
                    <Icon size="1.5rem" />
                    <p>{name}</p>
                  </i>
                ))
              }
              <>
              <div className='d-flex flex-column' 
                onClick={() => {
                    if (!isRecording) {
                        startRecording()
                    } else {
                        stopRecording()
                    }
                }} 
                isOn={!isRecording}>
                    <VscRecord size="1.5rem" />
                    <p>Record</p>
                </div>
                <div className='d-flex flex-column' onClick={() => startCapture()} isOn={true}>
                    <MdPresentToAll size="1.5rem" />
                    <p>Share Screen</p>

                </div>
              </>
            </div>
        </Box>
      </Modal>
    )
  }
function Users({open, setOpen, profileData }) {
  
    const modalStyle = {
        position: 'absolute',
        top: "50px",
        right: 0,
        bottom: "15%",
        width: "min(100% - .2rem, 400px)",
        height: "min(100vh - 81px, 500px)",
        bgcolor: 'background.paper',
        backgroundColor: '#fff',
        border: '2px solid #eee',
        boxShadow: 24,
        color:"#fff",
        p: 2,
        overflowY:"auto"
    }
    const HandKey = "gotocourse_hand_raised_users"  
    const session = sessionStorage.getItem(HandKey)
    
    
    const [handRaiseList, setHandRaiseList]= useState([])
    
    useEffect(() => {
        const sessionData = JSON.parse(session)

        if(sessionData){
            setHandRaiseList(sessionData)   

        }
    }, [session])

    

    return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
            <UserHeader>People</UserHeader>
            <SearchBox>
                <label htmlFor="search" className="visually-hidden">Search User</label>
                <input type="search" name="Search user" id="search" placeholder='Search user...' />
            </SearchBox>

            <HandList>
                <p className="head">Hand Raised</p>
                {
                    handRaiseList?.map((item, i)=>(
                        <HandUser key={i}>
                            <img src={item.img} alt="" />
                            <p>{item.name}</p>
                            <HiOutlineHand size="1.2rem" />
                        </HandUser>
                    ))
                }
            </HandList>
            <UserListWrapper>
                <p className="head">All Users</p>
                <UserList>
                    {/* <HandUser>
                        <img src={profileData.profileImg} alt="" />
                        <p>Goodness and Mercy</p>
                    </HandUser> */}
                </UserList>
            </UserListWrapper>
            
        </Box>
      </Modal>
    )
  }
function UploadStatus({open, setOpen, progress }) {
  
    const modalStyle = {
        position: 'absolute',
        top: "50px",
        left: "50%",
        bottom: "15%",
        width: "100%",
        height: "min(100vh - 81px, 600px)",
        bgcolor: 'background.paper',
        backgroundColor: '#fff',
        border: '2px solid #eee',
        boxShadow: 24,
        color:"#fff",
        p: 2,
        transform: "translateX(-50%)",
        display: "grid",
        placeItems:"center",
        zIndex:"9000"

    }
    const HandKey = "gotocourse_hand_raised_users"  
    const session = sessionStorage.getItem(HandKey)
    
    
    const [handRaiseList, setHandRaiseList]= useState([])
    
    useEffect(() => {
        const sessionData = JSON.parse(session)

        setHandRaiseList(sessionData)   
    }, [session])

    return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
            <UserHeader>Recorded class upload in progress</UserHeader>
            <p className="text-dark">Do not close this modal</p>
            <div className="spinner-border text-primary">
                <span className="visually-hidden">Search User</span>
            </div>
            <span className='text-dark'>{progress}</span>
        </Box>
      </Modal>
    )
  }


  function SuperWrapper(){
    const { getItem } = useLocalStorage()
    const userProfile = getItem(KEY);
    const {classId} = useParams()
    const navigate = useNavigate()

    const[isPermitted, setIsPermitted]= useState(false)
    const {generalState, setGeneralState, studentFunctions:{fetchBootcamps}, teacherFunctions:{fetchBootcamps: fetchTeacherBootcamps}} = useAuth()

    useEffect(() => {

        if(userProfile?.isAdmin){
            console.log("isAdmin")
            setIsPermitted(true)
        }

    },[userProfile?.isAdmin])



    const fetchStudentApplications = useQuery(["fetchStudentApplications", userProfile.token], ()=>fetchBootcamps(userProfile.token), {
        enabled: userProfile.userType === "student",
        onSuccess: (res)=> {
            if(res.statusCode === 1){
                const findMyClasss = res.data.find(item => item.bootcampId === classId)
                console.log({findMyClasss})
                if(findMyClasss.bootcampId && (findMyClasss.status === "paid" || findMyClasss.paymentStatus === "complete")){
                    setIsPermitted(true)
                    return
                }
                navigate("/learn-with-gotocourse")
            }
        },
        onError: (res)=> {
            console.error(res)
        },
    })


    const fetchTeacherApplications = useQuery(["fetchTeacherApplications", userProfile.token], ()=>fetchTeacherBootcamps(userProfile.token), {
        enabled: userProfile.userType === "teacher", 
        onSuccess: (res)=> {
            if(res.statusCode === 1){
                const findMyClasss = res.data.find(item => item.bootcampId === classId)
                if(findMyClasss.bootcampId){
                    // turn off loading state
                    // show status
                    setIsPermitted(true)
                    // initRoom()
                    // connectionUserId.current = userProfile.userId  
                    return
                }
                navigate("/learn-with-gotocourse")
            }
        },
        onError: (res)=> {
            console.error(res)
        },
        }
    )



    if(!isPermitted){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    }



    return (
        <VideoChatScreen />
    )


}

export default SuperWrapper