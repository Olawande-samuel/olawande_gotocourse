import axios from "axios"
import { useNavigate } from "react-router-dom"
import CONFIG from "./appConst"
import VideoChatScreen from "./videoChat/VideoChatScreen"



export function CreateRoom(){
    const navigate = useNavigate()
    
    
    const createVideoRoom = async (e) => {
        e.preventDefault()
    
        const res = await axios.post(`${CONFIG.socketUrl}/v1/room/video/init`, {
            
            roomName: "myroom",
            userId: "634019e805a8970a001da07b"
            
        })
        console.log(res.data.data)
        localStorage.setItem("video-room", res.data.data._id)
    
        return navigate(`/video-chat?room=${res.data.data._id}`, {
            state: {
                roomId: res.data.data._id,
                owner: true
            }
        })
    }

    return (
        <button onClick={createVideoRoom}>Create</button>
    )
}

export function VideDiv(){
    return (

        <div style={{height:"100vh"}}>
            <VideoChatScreen />
        </div>
    )
}