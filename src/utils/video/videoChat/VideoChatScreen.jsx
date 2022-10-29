import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from 'react-icons/bs'
import { HiOutlinePhone } from 'react-icons/hi'
import {  IoAdd } from 'react-icons/io5'
import { MdPresentToAll } from 'react-icons/md'
import {  VscRecord } from 'react-icons/vsc'
// import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import useQuery from '../useQuery'
import useSocket from '../useSocket'
import { Wrapper, Content, HeadBar, VideoWrapper, AddPeople, ControlItem, ControlWrapper, UserCallBlock, MainWrapper,  } from './style'
import { Peer } from "peerjs";
import CONFIG from '../appConst'
import { KEY } from '../../../constants'
import { useLocalStorage } from '../../../hooks'
import { Navbar } from '../../../pages/Dashboard/components/Live/LiveClass'

const VideoChatScreen = ()  => {
    const { socket, sendPing } = useSocket()
    const location = useLocation();
    const {getItem} = useLocalStorage()
    // const userProfile = useSelector((state) => state.user);

    const userProfile = getItem(KEY)
    const videoRef = useRef(null)
    const videoGridRef = useRef(null)
    const [callSettingsState, setCallSettingsState] = useState({
        video: true,
        audio: true,
    })
    const query = useQuery();
    let roomId = query.get('room')
    
    let isRoomOwner = false;

    const chekForVideoRoom = async () => {
        if (location?.state?.owner) {
            isRoomOwner = true
            startWebCam()
            return;
        }

        const res = await axios.get(`${CONFIG.socketUrl}/v1/room/video/${roomId}`)
        if (res.data.data.userId === userProfile.userId) {
            isRoomOwner = true

            startWebCam()
            
        } else {
            isRoomOwner = false
            startWebCam()
        }
    }

    let localStream = null;

    const togggleVideo = async () => {

        // localStream?.getVideoTracks().forEach((track) => {
        //     localStream?.removeTrack(track)
        // })
        if (callSettingsState.video) {
            setVideoToggle({video: false, audio: callSettingsState.audio})
            setCallSettingsState({...callSettingsState, video: false})
        } else {
            setVideoToggle({video: true, audio: true})
            setCallSettingsState({...callSettingsState, video: callSettingsState.audio})
        }
    }

    const setVideoToggle = async ({video, audio}) => {
        // const myVideo = document.querySelector('.client-local-stream')
        const myVideo = videoRef.current
        // localStream = await navigator.mediaDevices.getUserMedia({ video: video, audio: audio})
        myVideo?.setAttribute("autoplay", "")
        myVideo?.setAttribute("playsInline", "")

        myVideo.srcObject = localStream
        myVideo.addEventListener('loadedmetadata', () => {
            myVideo.play()
        })
    }
    
    const togggleAudio = async () => {
        if (callSettingsState.audio) {
            setVideoToggle({video: callSettingsState.video, audio: false})
            setCallSettingsState({...callSettingsState, audio: false})
        } else {
            setVideoToggle({video: callSettingsState.video, audio: true})
            setCallSettingsState({...callSettingsState, audio: true})
        }
    }

    // const videoWrapper = document.querySelector('.video-section')
    const videoWrapper = videoGridRef.current

    // console.log("firstomo", videoWrapper)

    function addVideoStream(rvideoWrapper, stream) {
        console.log({rvideoWrapper});

        const video = rvideoWrapper.querySelector('video')
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
    }
    
    const peers = {}
    
    const startWebCam = async () => {

        // const myVideo = document.querySelector('.client-local-stream')
        const myVideo = videoRef.current
        myVideo?.setAttribute("autoplay", "")
        myVideo?.setAttribute("playsInline", "")
        myVideo.muted = true;

        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true})


        let myPeer = new Peer(userProfile.userId, {
            host: CONFIG.peerUrl,
            port: 9001,
            path: '/peer',
            secure: true,
        });

        console.log("peer: ", myPeer)
        console.log("omo lofty")
        // console.log("omo", videoWrapper)

        myPeer.on('open', userId => {
            console.log("conntected to room with userId: ", userId)
            socket.emit('join-video-room', roomId, userId)
        })

        myPeer.on('call', call => {
            // const videoWrapper = document.querySelector('.video-section')
            call.answer(localStream)
            const remoteVideoWrapper = document.createElement('div')
            remoteVideoWrapper.classList.add("remote-users")
            const remoteVideo = document.createElement('video')
            remoteVideoWrapper.appendChild(remoteVideo)
            videoWrapper?.append(remoteVideoWrapper)
            

            console.log("on call", videoWrapper)
            console.log("on call remote", remoteVideoWrapper)

            call.on('stream', userVideoStream => {
                addVideoStream(remoteVideoWrapper, userVideoStream)
            })
        })

        myVideo.srcObject = localStream
        myVideo.addEventListener('loadedmetadata', () => {
            myVideo.play()
        })

        socket.on('new-user-join-video-room', (userId) => {
            console.log("new user joined room: ", userId)
            connectToNewUser(userId, localStream)
        })

        const connectToNewUser = (userId, stream) => {
            const call = myPeer.call(userId, stream)

            
            // const videoWrapper = document.querySelector('.video-section')
            console.log("1", videoWrapper)

            const remoteVideoWrapper = document.createElement('div')
            remoteVideoWrapper.classList.add("remote-users")
            const remoteVideo = document.createElement('video')
            remoteVideoWrapper.appendChild(remoteVideo)
            videoWrapper?.append(remoteVideoWrapper)

            console.log({remoteVideoWrapper})

            call.on('stream', userVideoStream => {
                console.log("recevied user video stream: ", userVideoStream)
                addVideoStream(remoteVideoWrapper, userVideoStream)
            })
            call.on('close', () => {
                remoteVideoWrapper.remove();
            })

            peers[userId] = call
        }

        socket.on('user-disconected', userId => {
            console.log('user disconnected: ', userId)
            if (peers[userId]) {
                peers[userId].close()
            }
        })
    }

    const initRoom = () => {
        if (userProfile.userId !== "") {
            chekForVideoRoom()
        }
    }

    useEffect(() => {
        initRoom()
    }, [userProfile.userId])
    return (
        <Wrapper>
            {/* <HeadBar> */}
               <Navbar />
            {/* </HeadBar> */}
            <Content>
                <VideoWrapper className="video-section" ref={videoGridRef}>
                    <video ref={videoRef} className="client-local-stream" src=""></video>
                    <ControlWrapper>
                        <ControlItem>
                            <VscRecord size="1.5rem" />
                        </ControlItem>
                        <ControlItem  onClick={togggleAudio}>
                            {callSettingsState.audio ? <BsMic size="1.5rem" /> : <BsMicMute size="1.5rem" />}
                        </ControlItem>
                        <ControlItem>
                            <MdPresentToAll size="1.5rem" />
                        </ControlItem>
                        <ControlItem onClick={togggleVideo}>
                            {callSettingsState.video ? <BsCameraVideo size="1.5rem" /> : <BsCameraVideoOff size="1.5rem" />}
                        </ControlItem>
                        <ControlItem>
                            <HiOutlinePhone size="1.5rem" />
                        </ControlItem>
                    </ControlWrapper>        
                        {/* <AddPeople>
                            <IoAdd />
                            <span>Add people</span>
                        </AddPeople> */}


                    
                </VideoWrapper>
            </Content>
        </Wrapper>
    )
}

export default VideoChatScreen