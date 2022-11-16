import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from 'react-icons/bs'
import { HiOutlinePhone } from 'react-icons/hi'
import {  IoAdd } from 'react-icons/io5'
import { MdPresentToAll } from 'react-icons/md'
import {  VscRecord } from 'react-icons/vsc'
import { Link, useLocation } from 'react-router-dom'
import useSocket from '../useSocket'
import { Wrapper, Content, HeadBar, VideoWrapper, AddPeople, ControlItem, ControlWrapper, UserCallBlock, UserPresentation, StreamWrapper,  } from './style'
import { MediaConnection, Peer } from "peerjs";
import CONFIG from '../appConst'
import { useLocalStorage } from '../../../hooks'
import { KEY } from '../../../constants'
import useQuery from '../useQuery'
import { Navbar } from '../../../pages/Dashboard/components/Live/LiveClass'

const VideoChatScreen = ()  => {
    const { socket, sendPing } = useSocket()
    const location = useLocation();
    const {getItem} = useLocalStorage()
    const userProfile = getItem(KEY)

    const [isPresenting, setIsPresenting] = useState(false);
    const [callSettingsState, setCallSettingsState] = useState({
        video: true,
        audio: true,
    })
    const query = useQuery();
    let roomId = query.get('room')
    let isRoomOwner = false;

    const connectionUserId = useRef(userProfile.userId)

    const connectionStateRef = useRef({
        hasJoinedPresentation: false
    })

       


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
            setUpMediaScreen()
        }
    }
    const localStream = useRef(null);
    let myCall;
    

    const togggleVideo = async () => {
        if (callSettingsState.video) {
            handleVideoToggle({video: false, audio: callSettingsState.audio})
            setCallSettingsState({...callSettingsState, video: false})
        } else {
            handleVideoToggle({video: true, audio: true})
            setCallSettingsState({...callSettingsState, video: callSettingsState.audio})
        }
    }

    const handleVideoToggle = async ({video, audio}) => {
        const enabled = localStream.current?.getVideoTracks()[0].enabled;

        if (enabled) {
            localStream.current.getVideoTracks()[0].enabled = false;
        } else {
            localStream.current.getVideoTracks()[0].enabled = true;
        }
    }

    const handleAudioToggle = async ({video, audio}) => {
        const enabled = localStream.current?.getAudioTracks()[0].enabled;

        if (enabled) {
            localStream.current.getAudioTracks()[0].enabled = false;
        } else {
            localStream.current.getAudioTracks()[0].enabled = true;
        }
    }
    
    const togggleAudio = async () => {

        if (callSettingsState.audio) {
            handleAudioToggle({video: callSettingsState.video, audio: false})
            setCallSettingsState({...callSettingsState, audio: false})
        } else {
            handleAudioToggle({video: callSettingsState.video, audio: true})
            setCallSettingsState({...callSettingsState, audio: true})
        }
    }

    const videoWrapper = document.querySelector('.video-section')

    function addVideoStream(videoWrap, stream) {
        const video = videoWrap.querySelector('video')
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
    }

    const setUpMediaScreen = () => {
        navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                echoCancellation: true,
            },
            video: true,
        }).then((stream) => {
            localStream.current = stream;
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
        console.log("is recording media")
        setIsRecording(true)
        streamRecorder.current = new MediaRecorder(presentationStream.current);

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
            console.log("stoped recording media")
        };

        streamRecorder.current.start();
    }
    function stopRecording() {
        streamRecorder.current?.stop();
    }
    const postVideoToServer = async (videoblob) => {
        const videoData = new FormData();
        videoData.append('file', videoblob);

        const res = await axios.post("https://loftywebtech.com/gotocourse/api/v1/file/upload", videoData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhOWZiNWRhMzNhMjUzZjY3N2M0ZDdmIiwiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIn0sImlhdCI6MTY2ODM3MDM4OSwiZXhwIjoxNjY4NDU2Nzg5fQ.Yc-SSARTi84NLWGqKVPwCmBsM7wTp2zy-bGvb4w8RO8"
            }
        })

        console.log(res.data)
    }

    const presentationStream = useRef(null);
    const presentationPeer = useRef(null);
    const myPeer = useRef(null);
    const presentationPeers = useRef({})

    function startCapture() {
        const presentationId = "presentation-"+ connectionUserId.current
        const presentationVideo = document.querySelector('.client-presentation-stream')
         navigator.mediaDevices.getDisplayMedia({audio: false, video: true}).then((stream) => {
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
                console.log("connected to presentation room with userId: ", userId)
                socket.emit('join-video-room', roomId, presentationId)
            })

            presentationPeer.current.on('call', call => {
                console.log("presentation caller user: ", call.peer)
                presentationPeers.current[call.peer] = call
                call.answer(presentationStream?.current)

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
            setIsPresenting(true)
            
        });

        
    }

    const [remoteUserPresentingProccessing, setRemoteUserPresentingProccessing] = useState(false)

    const peers = useRef({})
    const startWebCam = async () => {
        const myVideo  = document.querySelector('.client-local-stream')
        myVideo?.setAttribute("autoplay", "")
        myVideo?.setAttribute("playsInline", "")
        myVideo.muted = true;

        // localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true})

        myPeer.current = new Peer(userProfile.userId, {
            host: CONFIG.peerUrl,
            port: 9001,
            path: '/peer',
            secure: true
        });

        console.log("peer: ", myPeer.current)
        myPeer.current.on('open', userId => {
            console.log("connected to room with userId: ", userId)
            socket.emit('join-video-room', roomId, userId)
        })
        myPeer.current.on('call', call => {
            if (call.peer.split('-')[0] != "presentation") {
                call.answer(localStream.current)
                const videoWra = document.querySelector('.video-section')
                const remoteVideoWrapper = document.createElement('div')
                remoteVideoWrapper.classList.add("remote-users")
                const remoteVideo = document.createElement('video')
                remoteVideoWrapper.appendChild(remoteVideo)
                videoWra?.append(remoteVideoWrapper)

                console.log("caller user: ", call.peer)

                peers.current[call.peer] = call
                
                call.on('stream', userVideoStream => {
                    addVideoStream(remoteVideoWrapper, userVideoStream)
                })

                call?.on('close', () => {
                    remoteVideoWrapper.remove();
                })
            } else if (userProfile.userId != call.peer.split('-')[1]) {
                call.answer(localStream.current)
                setIsPresenting(true)
                call?.on('stream', presentationStream => {
                    console.log("recevied presentation stream: ", presentationStream)
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
            console.log("new user joined room: ", userId)
            if (userId.split('-')[0] != "presentation") {
                connectToNewUser(userId, localStream.current)
                console.log("presentation state: ", isPresenting)
                if (presentationStream.current?.getVideoTracks()[0].enabled) {
                    console.log("I am user is presenting")
                    presentationPeer.current?.call(userId, presentationStream.current);
                }
            } else if (userProfile.userId !== userId.split('-')[1]) {
                connectToUserRemotePresentation(userId)
            }
        })

        const connectToNewUser = (userId, stream) => {
            myCall = myPeer.current?.call(userId, stream)
            const videoWrap = document.querySelector('.video-section')

            const remoteVideoWrapper = document.createElement('div')
            remoteVideoWrapper.classList.add("remote-users")
            const remoteVideo = document.createElement('video')
            remoteVideoWrapper.appendChild(remoteVideo)
            videoWrap?.append(remoteVideoWrapper)


            myCall?.on('stream', userVideoStream => {
                console.log("recevied user video stream: ", userVideoStream)
                addVideoStream(remoteVideoWrapper, userVideoStream)
            })
            myCall?.on('close', () => {
                remoteVideoWrapper.remove();
            })

            peers.current[userId] = myCall
        }

        const connectToUserRemotePresentation = (presentaterUserId) => {
            const presentationId = "presentation-"+ connectionUserId.current
            console.log(`lofty presentation id:  ${presentationId}`)
            myCall = myPeer.current?.call(presentaterUserId, localStream.current)

            setIsPresenting(true)
            myCall?.on('stream', presentationStream => {
                console.log("recevied presentation stream: ", presentationStream)
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
            console.log('user disconnected: ', userId)
            if (peers.current[userId]) {
                peers.current[userId].close()
                console.log("omo peer: ", peers.current)

                // if (!presentationPeers.current[userId]) {
                //     setIsPresenting(false)
                //     peers.current[userId].close()
                // }
            }
        })

        socket.on('user-ended-presentation', (userId) => {
            if (peers.current[userId]) {
                peers.current[userId].close()
                console.log("omo peer: ", peers.current)

                if (userProfile.userId != userId.split('-')[1]) {
                    setIsPresenting(false)
                }
            }
        })
    }

    const checkPeerUsers = () => {
        console.log(presentationPeers.current)
    }

    const initRoom = () => {
        if (userProfile.userId != "") {
            chekForVideoRoom()
        }
    }

    useEffect(() => {
        initRoom()
        connectionUserId.current = userProfile.userId
    }, [userProfile.userId])
    return (
        <Wrapper>
            {/* <HeadBar>
                <div className="banner">
                    <img src="/assets/svg/logo.svg" alt="logo" />
                    <Link to="/home">TeamKonnect</Link>
                </div>
                <div className="head-img">
                    <img src={userProfile.profileImg} alt="avatar" />
                </div>
            </HeadBar> */}
            <Navbar />
            <Content>
                <VideoWrapper>
                    <div onClick={closeRecordedModal} className="recoreded-media">
                        <video ref={recordedVideoRef} src=""></video>
                    </div>
                    <UserPresentation isPresenting={isPresenting}>
                        <video className="client-presentation-stream" src="" muted={true}></video>
                    </UserPresentation>
                    <StreamWrapper isPresenting={isPresenting} className="video-section">
                    </StreamWrapper>
                       
                    <UserCallBlock>
                        <video className="client-local-stream" src="" muted={true}></video>
                    </UserCallBlock>

                    <ControlWrapper>
                        <ControlItem onClick={() => {
                            if (!isRecording) {
                                startRecording()
                            } else {
                                stopRecording()
                            }
                        }}>
                            <VscRecord />
                        </ControlItem>
                        <ControlItem onClick={togggleAudio}>
                            {callSettingsState.audio ? <BsMic /> : <BsMicMute />}
                        </ControlItem>
                        <ControlItem onClick={() => startCapture()}>
                            <MdPresentToAll />
                        </ControlItem>
                        <ControlItem onClick={togggleVideo}>
                            {callSettingsState.video ? <BsCameraVideo /> : <BsCameraVideoOff />}
                        </ControlItem>
                        <ControlItem>
                            <HiOutlinePhone />
                        </ControlItem>
                    </ControlWrapper>
                    
                </VideoWrapper>
            </Content>
        </Wrapper>
    )
}

export default VideoChatScreen