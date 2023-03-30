import { useState } from "react";
import {
  AiFillClockCircle
} from "react-icons/ai";
import startImg from "../../../../images/liveclass/startlive.png";

import { Box, Modal, Skeleton, Switch } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoInfiniteOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AdvancedError } from "../../../../classes";
import { KEY } from "../../../../constants";
import { useAuth } from "../../../../contexts/Auth";
import { useLocalStorage } from "../../../../hooks";
import CONFIG from "../../../../utils/video/appConst";
import { MenuOptionsPopup } from "./components";
import "./console.css";
import style from "./style.module.css";
import CryptoJS from "crypto-js";

export function LiveClassInfo({ type }) {
  
  const {classId} = useParams()
  const [open, setOpen] = useState(false);
  const { generalState, consoleFunctions:{fetchLiveSchedule}, setGeneralState } = useAuth();
  const { scheduledClasses } = generalState;
  const {getItem} = useLocalStorage();
  const userdata = getItem(KEY)

  const [schedule, setSchedule] = useState([])
  const queryClient = useQueryClient()


  const fetchSchedule = useQuery(["fetch live schedule", userdata?.token],()=>fetchLiveSchedule(userdata.token, classId), {
    
    onSuccess: res => {
      console.log({res})
      if(res.success){

        // TODO: check if student / teacher
        
        setSchedule(res.data)
        return
      }

    },
    onError: err => {
      toast.error("Error fetching schedule")
      console.log(err)
    }
  })



  function refresh(e){
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["fetch live schedule"]}) 
  }

  console.log({userdata})

  return (
    <div className={style.live_class}>
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
      <header>
        <h4>Live class</h4>
        {userdata?.userType !== "student" && (
          <p>Click on the button below to schedule a live class</p>
        )}
        <p>You can only join an ongoing schedule</p>
      </header>

      <div className={style.live_schedule}>
        {userdata?.userType !== "student" && (
          <button onClick={() => setOpen(true)}>Schedule a live class</button>
        )}
        <button onClick={refresh}>Refresh list</button>
      </div>

      <div className={style.currently_live}>
        <p>Scheduled Classes ({schedule?.length})</p>

        <div className={style.live_list}>
          {
          
          fetchSchedule?.isLoading ? 
            <>
            <Skeleton sx={{marginBottom: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8}} animation="wave"  variant="rectangular" width={"min(240px, 300px)"} height={320} />
            <Skeleton sx={{marginBottom: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8}} animation="wave"  variant="rectangular" width={"min(240px, 300px)"} height={320} />
            <Skeleton sx={{marginBottom: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8}} animation="wave"  variant="rectangular" width={"min(240px, 300px)"} height={320} />
            </>
            :
            schedule?.map((item, id) => (
              <CurrentLive {...item} key={item._id} setOpen={setOpen} />
            ))
          
          }

        </div>
      </div>
      <ScheduleClass open={open} setOpen={setOpen} editDataArray={schedule} />
    </div>
  );
}

export function CurrentLive({ setOpen, roomName, status, startDate, startTime, endDate, endTime, userId, createdAt, _id }) {

  const contextMenu = [
    {
      id: 1,
      title:"Edit",
      iconImg: FiEdit,
      event: handleEdit
    },
    {
      id: 2,
      title:"Delete",
      iconImg: BiTrash,
      event: handleDelete
    },
  ]
  const {updateItem, getItem}= useLocalStorage()
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);
  const {teacherConsoleFunctions: {deleteLiveSchedule}} = useAuth()
  const userdata = getItem(KEY)
  const queryClient = useQueryClient();
  const random = "FVFCAAUYI6"
  const {classId} = useParams()


  function handleEdit(){
    navigate(`?edit=${_id}`)
    setOpen(true)
  }


  const deleteLive = useMutation(([token, id, data])=>deleteLiveSchedule(token, id, data), {
    onSuccess: res=> {
      queryClient.invalidateQueries({ queryKey: ["fetch live schedule"]}) 

    },
    onError: err => console.error(err)
  })

  function handleDelete(){
    console.log(userdata.token)
    if(window.confirm("Delete this item ?")){
      deleteLive.mutate([userdata.token, _id, {}])
    }
  }



  function gotoLiveClass(e){
    e.preventDefault()

    updateItem("gotocourse-roomid", _id);  
    updateItem("gotocourse-room-creator", userId);  

    let today  = new Date().getTime();
    let startingDate = new Date(startDate).getTime();


    let id = encryptData(userdata?.id)
    let token = encryptData(userdata.token)

    if(today >= startingDate){
      // window.open(`http://localhost:3000/live/${classId}?token=${id}&user=${token}`, '_blank')
        window.open(`https://www.meetifix.com/live/${classId}?token=${id}&user=${token}`, '_blank')
    }else {
      window.alert(`Class starts on ${startDate}`)
    }
  }

  function encryptData(data){
    const result = CryptoJS.AES.encrypt(JSON.stringify({data}), random).toString()
    return result

  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("date created ", new Date(createdAt).getTimezoneOffset())
  console.log("date scheduled ",new Date(startDate).getTimezoneOffset())
  

  return (
    <div className={style.live_card}>
       {userdata?.userType !== "student" &&
        <MenuOptionsPopup handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl} openAnchor={openAnchor} data={contextMenu} id={_id} schedule={true} />
       }
      <h6>{roomName}</h6>
      <div className={style.live_card_schedule}>
        <div>
          <i>
            <FaCalendarAlt />
          </i>
          <span>{new Intl.DateTimeFormat('en-US').format(new Date(startDate))}</span>
          {/* <span>{new Date(startDate).toLocaleDateString()}</span> */}
        </div>
        <div>
          <i>
            <AiFillClockCircle />
          </i>
          <span>
            {/* {startTime ? startTime : "Now"} - {endTime ? endTime : <IoInfiniteOutline />} UTC{ new Date().getTimezoneOffset()/10} */}
            {startTime ? startTime : "Now"} - {endTime ? endTime : <IoInfiniteOutline />} CST
            {/* {startTime ? new Date(startTime).toLocaleTimeString() : "Now"} - {endTime ? new Date(endTime).toLocaleTimeString() : <IoInfiniteOutline />} */}
          </span>
        </div>
        <div>
          <i>
            <MdLocationOn />
          </i>
          <span>Integrated live class</span>
        </div>
      </div>
      <div className={style.live_card_footer}>
        <button
          className={style.live_card__button}
          type="button"
          onClick={gotoLiveClass}
        >
          Live Class
        </button>
      </div>
    </div>
  );
}

export function ScheduleClass({ open, setOpen , editDataArray}) {
  const [inputType, setInputType] = useState({
    startDate: false,
    endDate: false,
    endTime: false,
    startTime: false,
  });

  const [userId, setUserId] = useState("")

  const modalStyle = {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translate(-50%)",
    width: "min(100% - 2rem, 600px)",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const queryClient = useQueryClient()

  const {classId} = useParams()
  const {getItem}= useLocalStorage()
  const user = getItem(KEY)
  const { generalState, setGeneralState, teacherFunctions: {fetchLiveClasses}, teacherConsoleFunctions: {editLiveSchedule} } = useAuth();
  const [formstate, setFormstate] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit")


  useEffect(() => {
      if (user?.token) {
        if(user.isAdmin){
          setUserId(user.id)
        } else {
          setUserId(user.userId)
        }
      }
    }, [user.token])
  
   

  function handleChange(e) {
    setFormstate({ ...formstate, [e.target.name]: e.target.value });
  }


  // TODO: Add schedule edit endpoint

  const editMutation = useMutation(([token, id, data])=>editLiveSchedule(token, id, data), {
    onSuccess: res => {
      queryClient.invalidateQueries("fetch live schedule")
      setFormstate({})
      handleClose();
    },
    onError: err=>{
      console.error(err.message)
    }
  })

  async function handleSubmit(e) {
    e.preventDefault();

    if ( !formstate.roomName || !formstate.startDate || !formstate.startTime  ) {
      toast.error("All fields are required");

      throw new AdvancedError("All fields are required", 0);
    }
    
    try {
      setLoading(true)


      if(edit){
        editMutation.mutate([user.token, formstate._id, formstate ]) 
        return
      }

      const res =  await axios.post(`${CONFIG.socketUrl}v1/room/video/init`, {    
        ...formstate,  
          userId: userId,
          classId
      })

      res.data.success && toast.success("Schedule created successfully")
      
      localStorage.setItem("video-room", res.data.data._id)
      
      queryClient.invalidateQueries("fetch live schedule")
      
      setGeneralState({
        ...generalState,
        scheduledClasses: [...generalState.scheduledClasses, {...formstate, roomid: res.data.data._id}],
      });
  
      setFormstate({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
      });

      handleClose();
      
    } catch (error) {
      console.error(error)

      toast.error(error.message)

    } finally {
      setLoading(false)
    }
  }



  function handleClose(){
    edit && navigate(-1)
    setOpen(false)
  }


  useEffect(() => {
    
    if(edit){
      let editData = editDataArray?.find(item => item._id === edit)
      if(editData?._id){
        setFormstate(editData)
      }
    }
  }, [edit, editDataArray])

  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <form className={style.class_schedule} onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="roomName" className="form-label generic_label">
              Title
            </label>
            <input
              type="text"
              name="roomName"
              id="roomName"
              className="form-control"
              onChange={handleChange}
              value={formstate.roomName}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="schedule" className="form-label generic_label">
              What time will you (or your teachers) be available for live class?
            </label>

            <div className="row">
              <div className="col-sm-6 pe-2 mb-3">
                <input
                  type={inputType.startDate ? "date" : "text"}
                  className="form-control"
                  name="startDate"
                  id="startDate"
                  onFocus={() =>
                    setInputType({ ...inputType, startDate: true })
                  }
                  onBlur={() =>
                    setInputType({ ...inputType, startDate: false })
                  }
                  placeholder="Start Date"
                  onChange={handleChange}
                  value={formstate?.startDate}
                />
              </div>
              <div className="col-sm-6 ps-2 mb-3">
                <input
                  type={inputType.startTime ? "time" : "text"}
                  name="startTime"
                  id="startTime"
                  className="form-control"
                  onFocus={() => setInputType({ ...inputType, startTime: true })}
                  onBlur={() => setInputType({ ...inputType, startTime: false })}
                  placeholder="Start Time (CST)"
                  onChange={handleChange}
                  value={formstate?.startTime}
                />
              </div>
              <div className="col-sm-6 pe-2 mb-3">
                <input
                  type={inputType.endDate ? "date" : "text"}
                  className="form-control"
                  name="endDate"
                  id="endDate"
                  onFocus={() => setInputType({ ...inputType, endDate: true })}
                  onBlur={() => setInputType({ ...inputType, endDate: false })}
                  placeholder="End Date"
                  onChange={handleChange}
                  value={formstate?.endDate}
                />
              </div>
              <div className="col-sm-6 ps-2 mb-3">
                <input
                  type={inputType.endTime ? "time" : "text"}
                  name="endTime"
                  id="endTime"
                  className="form-control"
                  onFocus={() => setInputType({ ...inputType, endTime: true })}
                  onBlur={() => setInputType({ ...inputType, endTime: false })}
                  placeholder="End Time (CST)"
                  onChange={handleChange}
                  value={formstate?.endTime}
                />
              </div>
            </div>
            <div className="form-group my-3">
              <label htmlFor="integrated" className="form-label generic_label">
                Select a live class platform
              </label>
              <input
                type="text"
                name="integrated"
                id="integrated"
                className="form-control"
                value="Integrated live class"
                disabled
                onChange={handleChange}
              />
            </div>
            
            <button type="submit" disabled={loading}>{
              (editMutation.isLoading || loading) ? <div className="spinner-border text-white">
                <div className="visually-hidden">Loading...</div>
              </div>
              :
              <>
              {
                edit ? <span>Edit</span>:
                <span>Create</span>
              }
              </>
            }</button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export function Intermission() {
    const navigate = useNavigate();
    const location = useLocation();
    const student = location.pathname.split("/")[1] === "student";
    const {generalState, setGeneralState} = useAuth()
    const {getItem}= useLocalStorage()
    const {classId} = useParams()
    const userdata = getItem(KEY)
  
    const roomid = getItem("gotocourse-roomid")
    const creator = getItem("gotocourse-room-creator")


    function joinLiveClass(){
      
        navigate(`/class/${classId}/live/stream?room=${roomid}`, {
            state: {
          
                roomId: roomid,
                owner: userdata.userId === creator ? true: false
            }
        })  
        // navigate("/teacher/live-class/live")  
    }
  return (
    <section className={style.intermission}>
      {/* <nav className={style.intermission_nav}>
        {!student && (
          <button>
            <span>Record</span>
            <i>
              <BsRecordCircle />
            </i>
          </button>
        )}

        <button onClick={() => navigate(-1)}>Class Console</button>
      </nav> */}
      <main className={style.intermission_main}>
        <img src={startImg} alt="" />
        <div className="d-flex flex-column">
          <button onClick={joinLiveClass}>
            Join
          </button>
          <small>Having issues joining?</small>
        </div>
        {!student && (
          <div className={style.intermission_switch}>
            <Switch />
            <span>Notify students about live class starting</span>
          </div>
        )}
      </main>
    </section>
  );
}


