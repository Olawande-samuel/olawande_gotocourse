import { useState } from "react";
import {
  AiFillClockCircle,
  AiOutlinePaperClip,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsRecordCircle, BsThreeDotsVertical } from "react-icons/bs";
import startImg from "../../../../images/liveclass/startlive.png";

import style from "./style.module.css";
import "./console.css";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Box, Modal, Switch } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/Auth";
import { AdvancedError } from "../../../../classes";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import CONFIG from "../../../../utils/video/appConst";
import { useLocalStorage } from "../../../../hooks";
import { KEY } from "../../../../constants";

export function LiveClassInfo({ type }) {
  const [open, setOpen] = useState(false);
  const { generalState, setGeneralState } = useAuth();

  const { scheduledClasses } = generalState;

  console.log(scheduledClasses);
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
        {type !== "student" && (
          <p>Click on the button below to schedule a live class</p>
        )}
        <p>You can only join an ongoing schedule</p>
      </header>

      <div className={style.live_schedule}>
        {type !== "student" && (
          <button onClick={() => setOpen(true)}>Schedule a live class</button>
        )}
        <button>Refresh list</button>
      </div>

      <div className={style.currently_live}>
        <p>Scheduled Classes ({scheduledClasses.length})</p>

        <div className={style.live_list}>
          {scheduledClasses.map((item, id) => (
            <CurrentLive {...item} key={id} />
          ))}
        </div>
      </div>
      <ScheduleClass open={open} setOpen={setOpen} />
    </div>
  );
}

export function CurrentLive({ title, startDate, startTime, endDate, endTime, roomid }) {
  const {updateItem}= useLocalStorage()
  const navigate = useNavigate();

  function gotoLiveClass(e){
    e.preventDefault()

    updateItem("gotocourse-roomid", roomid);  
    navigate("connect")
  }

  return (
    <div className={style.live_card}>
      <h6>{title}</h6>
      <div className={style.live_card_schedule}>
        <div>
          <i>
            <FaCalendarAlt />
          </i>
          <span>{startDate}</span>
        </div>
        <div>
          <i>
            <AiFillClockCircle />
          </i>
          <span>
            {startTime} - {endTime} GMT+0100 (West Africa Standard Time)
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

export function ScheduleClass({ open, setOpen }) {
  const [inputType, setInputType] = useState({
    startDate: false,
    endDate: false,
    endTime: false,
    startTime: false,
  });

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

  const {getItem}= useLocalStorage()
  const user = getItem(KEY)
  const { generalState, setGeneralState } = useAuth();
  const [formstate, setFormstate] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  function handleChange(e) {
    setFormstate({ ...formstate, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if ( !formstate.title || !formstate.startDate || !formstate.startTime || !formstate.endTime ) {
      toast.error("All fields are required");
      throw new AdvancedError("All fields are required", 0);
    }
    
    
    const res = await axios.post(`${CONFIG.socketUrl}/v1/room/video/init`, {    
        roomName: "myroom",
        userId: user.userId
    })
    
    console.log(res.data.data)

    res.data.success && toast.success("Schedule created successfully")

    localStorage.setItem("video-room", res.data.data._id)

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
    setOpen(false);
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <form className={style.class_schedule} onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="title" className="form-label generic_label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={handleChange}
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
                  placeholder="Start Time"
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
                  placeholder="End Time"
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
            <button type="submit">Create</button>
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
  
    console.log(student);
  
    const roomid = getItem("gotocourse-roomid")
    function joinLiveClass(){
        navigate(`/video-chat?room=${roomid}`, {
            state: {
                roomId: roomid,
                owner: true
            }
        })  
    }
  return (
    <section className={style.intermission}>
      <nav className={style.intermission_nav}>
        {!student && (
          <button>
            <span>Record</span>
            <i>
              <BsRecordCircle />
            </i>
          </button>
        )}

        <button onClick={() => navigate(-1)}>Class Console</button>
      </nav>
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
