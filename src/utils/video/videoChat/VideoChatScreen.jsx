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
import { Wrapper, Content, HeadBar, VideoWrapper, AddPeople, ControlItem, ControlWrapper, UserCallBlock,  } from './style'
import { Peer } from "peerjs";
import CONFIG from '../appConst'
import { KEY } from '../../../constants'
import { useLocalStorage } from '../../../hooks'

const VideoChatScreen = ()  => {
    const { socket, sendPing } = useSocket()
    const location = useLocation();
    const {getItem} = useLocalStorage()
    // const userProfile = useSelector((state) => state.user);

    const userProfile = getItem(KEY)

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
        const myVideo = document.querySelector('.client-local-stream')
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

    const videoWrapper = document.querySelector('.video-section')

    function addVideoStream(videoWrapper, stream) {
        const video = videoWrapper.querySelector('video')
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
      }
      const peers = {}
    const startWebCam = async () => {

        const myVideo = document.querySelector('.client-local-stream')
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
        myPeer.on('open', userId => {
            console.log("conntected to room with userId: ", userId)
            socket.emit('join-video-room', roomId, userId)
        })
        myPeer.on('call', call => {
            call.answer(localStream)
            const remoteVideoWrapper = document.createElement('div')
            remoteVideoWrapper.classList.add("remote-users")
            const remoteVideo = document.createElement('video')
            remoteVideoWrapper.appendChild(remoteVideo)
            videoWrapper?.append(remoteVideoWrapper)
            
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

            const remoteVideoWrapper = document.createElement('div')
            remoteVideoWrapper.classList.add("remote-users")
            const remoteVideo = document.createElement('video')
            remoteVideoWrapper.appendChild(remoteVideo)
            videoWrapper?.append(remoteVideoWrapper)


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
            <HeadBar>
                <div className="banner">
                    <img src="/assets/svg/logo.svg" alt="logo" />
                    <Link to="/">TeamKonnect</Link>
                </div>
                <div className="head-img">
                    <img src={userProfile.profileImg} alt="avatar" />
                </div>
            </HeadBar>
            <Content>
                <VideoWrapper className="video-section">
                    {/* <CallBlock>
                        <img src="https://images.unsplash.com/photo-1603112579965-e24332cc453a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="person in video call" />
                        <span>Vinay Gupta</span>
                    </CallBlock>
                    <CallBlock>
                        <img src="https://images.unsplash.com/flagged/photo-1577125543470-61d192113f10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="person in video call" />
                        <span>Vinay Gupta</span>
                    </CallBlock>
                    <CallBlock>
                        <img src="https://images.unsplash.com/photo-1595951960408-a7259baee032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2444&q=80" alt="person in video call" />
                        <span>Vinay Gupta</span>
                    </CallBlock>
                    <CallBlock>
                        <img src="https://images.unsplash.com/photo-1612000529646-f424a2aa1bff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="person in video call" />
                        <span>Vinay Gupta</span>
                    </CallBlock>
                    <UserCallBlock>
                        <img src="https://images.unsplash.com/photo-1597199204011-e6e704645213?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" alt="person in video call" />
                    </UserCallBlock> */}

                    <UserCallBlock>
                        <video className="client-local-stream" src=""></video>
                    </UserCallBlock>
                    <ControlWrapper>
                        <ControlItem>
                            <VscRecord />
                        </ControlItem>
                        <ControlItem  onClick={togggleAudio}>
                            {callSettingsState.audio ? <BsMic /> : <BsMicMute />}
                        </ControlItem>
                        <ControlItem>
                            <MdPresentToAll />
                        </ControlItem>
                        <ControlItem onClick={togggleVideo}>
                            {callSettingsState.video ? <BsCameraVideo /> : <BsCameraVideoOff />}
                        </ControlItem>
                        <ControlItem>
                            <HiOutlinePhone />
                        </ControlItem>
                    </ControlWrapper>
                    <AddPeople>
                        <IoAdd />
                        <span>Add people</span>
                    </AddPeople>
                </VideoWrapper>
            </Content>
        </Wrapper>
    )
}

export default VideoChatScreen