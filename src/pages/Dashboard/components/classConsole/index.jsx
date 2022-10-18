import { useAuth } from "../../../../contexts/Auth";

import { useState, useRef } from "react";
import {
  AiFillClockCircle,
  AiOutlinePaperClip,
  AiOutlinePlus,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiCaretDown, BiCaretRight, BiCaretUp } from "react-icons/bi";
import {
  BsPaperclip,
  BsCameraReels,
  BsCloudUpload,
  BsPlayBtn,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { RiVideoAddFill } from "react-icons/ri";
import { VscNote, VscScreenNormal } from "react-icons/vsc";

import { Logosm } from "../../../../images/components/svgs";
import style from "./style.module.css";
import "./console.css";
import { IconButton, Tooltip } from "@mui/material";

import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import {
  MdAttachFile,
  MdLibraryAdd,
  MdLocationOn,
  MdMessage,
  MdOutlineNote,
} from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { Link, useNavigate, useLocation } from "react-router-dom";
import clsx from "../styles.module.css";
import { AdvancedError } from "../../../../classes";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CLASSID, KEY } from "../../../../constants";
import { useLocalStorage } from "../../../../hooks";

const studentIcon = [
  {
    id: 1,
    icon: MdMessage,
    title: "Mail",
    link:""
  },

  {
    id: 2,
    icon: RiVideoAddFill,
    title: "Live Class",
    link:"/student/live-class"
  },
];

const iconData = [
  {
    id: 1,
    icon: MdMessage,
    title: "Mail",
    link: "/teacher/class-console/class/mail",
  },
  {
    id: 2,
    icon: MdLibraryAdd,
    title: "Creator suite",
    link: "/teacher/class-console/class/creator-suite",
  },
  {
    id: 3,
    icon: RiVideoAddFill,
    title: "Live Class",
    link: "/teacher/live-class ",
  },
  {
    id: 4,
    icon: FaUsers,
    title: "Students",
    link: "/teacher/class-console/class/classroom",
  },
];

const popIcon = [
  {
    id: 1,
    icon: BsCameraReels,
    title: "Record Camera",
  },
  {
    id: 2,
    icon: VscScreenNormal,
    title: "Record Screen",
  },
  {
    id: 3,
    icon: RiVideoAddFill,
    title: "Upload Video",
  },

  {
    id: 4,
    icon: BsCloudUpload,
    title: "Upload File/Image",
  },
  {
    id: 5,
    icon: BsPlayBtn,
    title: "Import from Creator suite",
  },
];

export const Console = ({ children }) => {
  const {
    generalState: { classConsole },
    generalState,
    setGeneralState,
  } = useAuth();
  const { pathname } = useLocation();
  const [side, setSide] = useState(false);
  const [show, setShow] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);

  const Toggle = () => setShow(!show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleModule = () => setModuleOpen(!moduleOpen);
  const moduleClose = () => setModuleOpen(false);

  const toggleSidebar = () =>
    setGeneralState({
      ...generalState,
      classConsole: { ...classConsole, sidebar: !classConsole.sidebar },
    });

  const studentpath = pathname.split("/")[1] === "student";
  const quizpath =
    pathname.split("/")[2] === "myclasses"
      ? "My Classes"
      : pathname.split("/")[2] === "liveclass"
      ? "Live Class"
      : pathname.split("/")[2];

  return (
    <div className={style.console}>
      <Sidebar Toggle={Toggle} />
      <ModalContent
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        Toggle={Toggle}
        toggleModule={toggleModule}
      />

      <ModuleModal moduleOpen={moduleOpen} moduleClose={moduleClose} />

      <main className={style.children}>
        <section className="contentheader">
          <div className="contentnav">
            <div className="content__hamburger">
              <div className="hamburger me-3 align-items-center">
                <i>
                  <AiOutlineMenu
                    style={{
                      fontSize: "24px",
                      color: "#0C2191",
                      cursor: "pointer",
                    }}
                    onClick={toggleSidebar}
                  />
                </i>
              </div>
            </div>

            <div className="contenttitle">
              <h2>Class Console</h2>
            </div>
          </div>

          {studentpath && (
            <div className="studenttitle">
              <h2>{quizpath}</h2>
            </div>
          )}
        </section>
        {children}
      </main>

      <div className={style.icon_bar}>
        {studentpath
          ? studentIcon.map(({ title, id, icon: Icon }) => (
              <Tooltip title={title} key={id}>
                <IconButton>
                  <Icon size="1.5rem" color="#0C2191" />
                </IconButton>
              </Tooltip>
            ))
          : iconData.map(({ title, id, icon: Icon, link }) => (
              <Tooltip title={title} key={id}>
                <IconButton>
                  <Link to={link} className="d-inline-flex">
                    <Icon size="1.5rem" color="#0C2191" />
                  </Link>
                </IconButton>
              </Tooltip>
            ))}
      </div>
    </div>
  );
};

export function goBack(pathname) {
  let pathArray = pathname.split("/")[1];

  switch (pathArray) {
    case "teacher":
      return "/teacher";
    case "student":
      return "/student";
    default:
      return "/admin";
  }
}

function Sidebar({ Toggle, side }) {
  const {
    generalState: { classConsole },
    generalState,
    setGeneralState,
    consoleFunctions: { fetchDomains },
  } = useAuth();

  const { pathname } = useLocation();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();
  const userdata = getItem(KEY);
  const courseId = localStorage.getItem(CLASSID);
  const studentpath = pathname.split("/")[1] === "student";

  function closeSidebar() {
    setGeneralState({
      ...generalState,
      classConsole: { ...classConsole, sidebar: !classConsole.sidebar },
    });
  }

  function goBack() {
    let pathArray = pathname.split("/")[1];

    switch (pathArray) {
      case "teacher":
        return "/teacher";
      case "student":
        return "/student";
      default:
        return "/admin";
    }
  }

  const getDomains = useQuery(["fetch domains", courseId], () =>
    fetchDomains(userdata.token, courseId)
  );

  return (
    // <article className={style.class_sidebar }>
    <>
      <article
        className={`${classConsole.sidebar ? style.open : style.close} ${
          style.class_sidebar
        }`}
      >
        <Link to="/">
          <Logosm />
        </Link>

        {!studentpath ? (
          <>
            <div className={style.course_content}>
              <p>Course content</p>
              {getDomains?.data?.data?.map((domain) => (
                <Accord {...domain} />
              ))}
            </div>
            <div className={`${style.create_content_button} ${style.white}`}>
              <button onClick={Toggle}>
                <i>
                  <AiOutlinePlus />
                </i>
                <span>New Content</span>
                <i>
                  <BsThreeDotsVertical />
                </i>
              </button>
            </div>

            <Link className="d-inline-flex" to={goBack()}>
              <button className={style.back_button} style={{width:"100%"}}>Back to Dashboard</button>
            </Link>
          </>
        ) : (
          <>
            <div className={style.course_content}>
              <div className={`${style.create_content_button} ${style.blue}`}>
                <button>
                  <Link to={"myclasses"}>
                    <span>My Classes</span>
                  </Link>
                </button>
              </div>

              <div className={`${style.create_content_button} ${style.blue}`}>
                <button>
                  <Link to={"assessments"}>
                    <span>Assessments</span>
                    <i>
                      <BsThreeDotsVertical />
                    </i>
                  </Link>
                </button>
              </div>

              <div className={`${style.create_content_button} ${style.blue}`}>
                <button>
                  <Link to={"/student/live-class"}>
                    <span>Live Classes</span>
                    {/* <i>
                      <BsThreeDotsVertical />
                    </i> */}
                  </Link>
                </button>
              </div>
            </div>
          </>
        )}
      </article>
      <div
        onClick={closeSidebar}
        className={`d-lg-none ${clsx.overlay} ${
          classConsole.sidebar ? clsx.overlayopen : clsx.overlayclose
        }`}
      ></div>
    </>
  );
}

function Accord({ name, _id, classId, description }) {
  const { getItem } = useLocalStorage();
  const userdata = getItem(KEY);
  const { consoleFunctions: { fetchContents }, } = useAuth();
  const getDomainContent = useQuery(["getDomainContent", classId], () => fetchContents(userdata.token, classId) );

   console.log({getDomainContent});
  const data = [
    {
      id: 1,
      icon: AiOutlinePaperClip,
      title: "My file",
      link: 1,
      type: "file",
    },

    {
      id: 2,
      icon: MdOutlineNote,
      title: "My Note",
      link: 2,
      type: "note",
    },

    {
      id: 3,
      icon: VscNote,
      title: "My Quiz",
      link: 3,
      type: "quiz",
    },
  ];
  const [details, showDetails] = useState(false);

  function IconType(icon) {
    switch (icon) {
      case "QUIZ":
        return <VscNote />;
      case "NOTE":
        return <MdOutlineNote />;
      case "FILE_VIDEO":
        return <AiOutlinePaperClip />;
      default:
        break;
    }
  }
  function routeType(type) {
    switch (type) {
      case "QUIZ":
        return "quiz";
      case "NOTE":
        return "note";
      case "FILE_VIDEO":
        return "file";
      default:
        break;
    }
  }
  return (
    <div className={style.content_item}>
      <div className={style.content_item_top}>
        <i>
          {details ? (
            <BiCaretDown onClick={() => showDetails(!details)} />
          ) : (
            <BiCaretRight onClick={() => showDetails(!details)} />
          )}
        </i>
        <span>{name}</span>
        <i>
          <BsThreeDotsVertical />
        </i>
      </div>

      {
        details && 
        <ul className={style.content_list}>
          {getDomainContent?.data?.data?.filter(item=> item.domain === _id).map(({ icon: Icon, title, link, id, type }) => (
            <li key={id}>
              <Link to={`${routeType(type)}`} className="d-flex justify-content-between">
                <i>{IconType(type)}</i>
                <span>{title}</span>
                <i>
                  <BsThreeDotsVertical />
                </i>
              </Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export function ModalContent({ show, handleClose, toggleModule }) {
  const [showMore, setShowMore] = useState(false);
  const [type, setType] = useState("file");
  const {getItem} = useLocalStorage();
  const classId = localStorage.getItem(CLASSID)
  const userdata = getItem(KEY)
  let ref = useRef();
  const { generalState, setGeneralState, generalState: { classConsole, }, consoleFunctions:{addContent} } = useAuth();
  const [formstate, setFormstate] = useState({
    isLocked:false,
    notifyStudents:false,
  });

  const queryClient = useQueryClient()
  const fetchDomains = useQuery(["fetch domains", classId], () => fetchDomains(userdata.token, classId))

  const addContentMutation = useMutation(([token, state])=>addContent(token, state), {
    onSuccess: (res)=>{
        queryClient.invalidateQueries('fetch domains')
        handleClose();
    },
    onError: (err)=>{
        console.error("error adding content", err )
    }
  })

  function handleChange(e) {
    setFormstate({ ...formstate, [e.target.name]: e.target.value});
  }


  function createContent() {
    if (!formstate.domainId) {
      toast.error("Please select a domain");
      throw new AdvancedError("Please select a domain", 0);
    }
    addContentMutation.mutate([userdata.token, {...formstate, classId}]) 
  }


  function handleNotifyStudent(){
    setFormstate({...formstate, notifyStudents: !formstate.notifyStudents})
  }
  function handleIsLocked(){
    setFormstate({...formstate, isLocked: !formstate.isLocked})
  }

  console.log({formstate});
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={style.modal__header}>
          <Modal.Title className={style.modal__title}>Add Content</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={style.content__form}>
            <FormControl>
              <InputLabel id="content-type-label">Content Type</InputLabel>
              <Select
                className="quizselect"
                labelId="content-type-label"
                id="content-type"
                label="Content Type"
                value={formstate.type}
                onChange={handleChange}
                name="type"
              >
                <MenuItem value="Select Content Type" defaultValue>
                  Select Content
                </MenuItem>
                <MenuItem value="FILE_VIDEO">
                  <i>
                    <MdAttachFile />
                  </i>
                  File/Videos
                </MenuItem>
                <MenuItem value="QUIZ">
                  <i>
                    <VscNote />
                  </i> 
                  Quiz
                </MenuItem>
                <MenuItem value="NOTE">
                  <i>
                    <MdOutlineNote />
                  </i>
                  Note
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Content Title"
                variant="outlined"
                placeholder="Content Title"
                onChange={handleChange}
                value={formstate.title}
                name="title"
              />
            </FormControl>

            <FormControl>
              <InputLabel id="domain-label">Domain</InputLabel>
              <Select
                labelId="domain-label"
                id="domain"
                label="Domain"
                className="myselect"
                ref={ref}
                onChange={handleChange}
                name="domainId"
                value={formstate.domainId}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

               {
                  fetchDomains?.data?.data?.map((domain) => (
                     <MenuItem value={domain._id}>{domain.name}</MenuItem>
                  ))
               }

                <button className={style.modulebtn} onClick={toggleModule}>
                  + New Module
                </button>
              </Select>

              <FormHelperText>
                A Domain is a container for similar content. e.g "Introduction",
                "Day 1" or "Domain 1"
              </FormHelperText>
            </FormControl>

            {/* accordion */}

            <div className={style}>
              <div className={style.content_item_span}>
                <span>Advance Options</span>

                <i>
                  {showMore ? (
                    <BiCaretUp onClick={() => setShowMore(!showMore)} />
                  ) : (
                    <BiCaretDown onClick={() => setShowMore(!showMore)} />
                  )}
                </i>
              </div>

              {showMore && (
                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Content Objective"
                    variant="outlined"
                    placeholder="Content Objective"
                    name="objective"
                    value={formstate.objective}
                  />
                  <FormHelperText>
                    What will your student do/learn with this content
                  </FormHelperText>

                  <div className={style.switchBorder}>
                    <FormControlLabel
                      control={<Switch  />}
                      label="Lock course content"
                      labelPlacement="top"
                      value="lock course"
                      checked={formstate.isLocked}
                      onClick={handleIsLocked}
                    />
                    <p className={style.formtext}>
                      Content is currently locked
                    </p>
                  </div>

                  <div className={style.switchBorder}>
                    <FormControlLabel
                      control={
                           <Switch 
                              onClick={handleNotifyStudent}
                              checked={formstate.notifyStudents}
                              value="notifyStudent"
                           />
                        }
                      label="Notify students on update"
                      labelPlacement="top"
                    />

                    <p className={style.formtext}>
                      Email notification would be sent to student of the new
                      course and when the course locked status changes
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button className={style.contentform__btn} onClick={createContent} disabled={addContentMutation.isLoading}>
               {
                  addContentMutation.isLoading ? <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> :
                <span>Submit</span>
               }
            </button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button variant="primary" onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export function ModuleModal({ moduleOpen, moduleClose }) {
   const {consoleFunctions:{addDomain }} = useAuth()
   const {getItem} = useLocalStorage()
   const [formstate, setFormstate] = useState({});
   const queryClient = useQueryClient()
 
   const  mutation = useMutation(([token, state])=>addDomain(token, state), {
      onSuccess: (res)=>{
         queryClient.invalidateQueries('fetch domains')
         moduleClose();
      }, 
      onError: (err)=>{
         console.error(err)
      }
   })

   const userdata = getItem(KEY)
   const classId = localStorage.getItem(CLASSID)

   function handleChange(e) {
    setFormstate({ ...formstate, [e.target.name]: e.target.value })
   }

  function createModule() {
   mutation.mutate([userdata.token, {...formstate, classId}])
  }
  
  return (
    <div>
      <Modal show={moduleOpen} onHide={moduleClose} className="modulemodal">
        <Modal.Header className="module__header">
          <p>Add Domain</p>
          <small>
            Domain are a combination of similar content e.g "Introduction", "Day
            1"
          </small>
        </Modal.Header>
        <Modal.Body>
          <div
          // className="style.smallmodalbody"
          >
            <FormControl className="textfield__gap">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Domain Name"
                variant="outlined"
                placeholder="Domain Name"
                onChange={handleChange}
                name="name"
                value={formstate.name}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Domain description"
                variant="outlined"
                placeholder="Domain Description(optional)"
                onChange={handleChange}
                name="description"
                value={formstate.description}
              />
            </FormControl>

            <div className="contentbutton">
              <button className="" onClick={createModule} disabled={mutation.isLoading}>
               {
                  mutation.isLoading ?
                   <div className="spinner-border" role="status">
                   <span className="visually-hidden">Loading...</span>
                 </div>
                 : 
                 <span>Submit</span>
               }
              </button>
            </div>

            {/* <label htmlFor="Name">Notes</label>
                            <input type="text" /> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            variant="secondary"
            className="module__cancel"
            onClick={moduleClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export function PopModalContent({ open, closeSmall }) {

  return (
    <div>
      <Modal show={open} onHide={closeSmall} className="smallmodal">
        {/* <Modal.Header closeButton className="modal__header">
                </Modal.Header> */}
        <Modal.Body>
          <div className="style.smallmodalbody">
            {popIcon.map(({ title, id, icon: Icon }) => (
              <Tooltip title={title} key={id}>
                <IconButton className="popicons">
                  <Icon size="1.5rem" color="#0C2191" />
                  <span className={style.smalltitle}>{title}</span>
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Console;
