import { useAuth } from "../../../../contexts/Auth";

import { useState, useRef, useEffect } from "react";
import {
  AiFillClockCircle,
  AiOutlinePaperClip,
  AiOutlinePlus,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiCaretDown, BiCaretRight, BiCaretUp, BiLockAlt } from "react-icons/bi";
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

import { FaCalendarAlt, FaPlus, FaUsers } from "react-icons/fa";
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
  FormHelperText,
  FormControl,
  Select,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { Link, useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import clsx from "../styles.module.css";
import { AdvancedError } from "../../../../classes";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CLASSID, KEY } from "../../../../constants";
import { useLocalStorage } from "../../../../hooks";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import File from "./File"
import Quiz from "./Quiz"
import Note from "./Note"

import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import styled from "styled-components";

const popIcon = [
  {
    id: 1,
    icon: BsCameraReels,
    title: "Record Camera",
    type: "video"
  },
  {
    id: 2,
    icon: VscScreenNormal,
    title: "Record Screen",
    type: "screen"
  },
  {
    id: 3,
    icon: RiVideoAddFill,
    title: "Upload Video",
    type: "file"
  },

  {
    id: 4,
    icon: BsCloudUpload,
    title: "Upload File/Image",
    type: "file"
  },
  {
    id: 5,
    icon: BsPlayBtn,
    title: "Import from Creator suite",
    type: ""
  },
];

export const Console = ({ children }) => {

  const { pathname } = useLocation();
  const [path, setPath]= useState("")

  // console.log(pathname.includes("teacher"))

  useEffect(()=>{
    if(pathname.includes("teacher")){
      setPath("teacher")
    } else {
      setPath("admin")
      
    }
  },[])

  const {classId} = useParams()

  const studentIcon = [
  {
    id: 1,
    icon: MdMessage,
    title: "Mail",
    link: "/student/console/class-console/class/mail"
  },

  {
    id: 2,
    icon: RiVideoAddFill,
    title: "Live Class",
    link:  `/student/console/myclasses/class/${classId}/live-class`
  },
];

const iconData = [
  {
    id: 1,
    icon: MdMessage,
    title: "Mail",
    link: `/${path}/class-console/class/${classId}/mail`,
  },
  {
    id: 2,
    icon: MdLibraryAdd,
    title: "Creator suite",
    link: `/${path}/class-console/class/${classId}/creator-suite`,
  },
  {
    id: 3,
    icon: RiVideoAddFill,
    title: "Live Class",
    link: `/${path}/class-console/class/${classId}/live-class`,
  },
  {
    id: 4,
    icon: FaUsers,
    title: "Students",
    link: `/${path}/class-console/class/${classId}/classroom`,
  },
];
  const { generalState: { classConsole }, generalState, setGeneralState, } = useAuth();

  const [side, setSide] = useState(false);
  const [show, setShow] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);

  // EDIT DATA

  const [editData, setEditData] = useState({});
  const [editModuleData, setEditModuleData] = useState({});
  
  const Toggle = (edit, data) => {
    setShow(!show)
    if(edit){
      setEditData(data)
    }
  };

  console.log({editModuleData})


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleModule = (edit, data) => {
    setModuleOpen(!moduleOpen)
    if(edit){
      setEditModuleData(data)
    }
  };
  const moduleClose = () => setModuleOpen(false);

  const toggleSidebar = () =>
    setGeneralState({
      ...generalState,
      classConsole: { ...classConsole, sidebar: !classConsole.sidebar },
    });




    const studentAssessMent =  pathname.includes("/student/console/myclasses") || pathname.includes("/student/console/assessments");
    // console.log({studentAssessMent});

  const studentpath = pathname.split("/")[1] === "student";
  const quizpath =
    pathname.split("/")[2] === "myclasses"
      ? "My Classes"
      : pathname.split("/")[2] === "liveclass"
        ? "Live Class"
        : pathname.split("/")[2];

  return (
    <div className={style.console}>
      <Sidebar 
        Toggle={Toggle} 
        toggleModule={toggleModule} 
      />
      <ModalContent
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        editData={editData}
        toggleModule={toggleModule}
      />

      <ModuleModal moduleOpen={moduleOpen} moduleClose={moduleClose} editModule={editModuleData} />

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

          {!studentAssessMent && studentpath && (
            <div className="studenttitle">
              <h2>{quizpath}</h2>
            </div>
          )}
        </section>
        {children}
      </main>

      <div className={`${style.icon_bar} ${studentAssessMent && style.none}`}>
        {
                studentpath 
          ? studentIcon.map(({ title, id, icon: Icon, link }) => (
            <Tooltip title={title} key={id}>
              <IconButton>
                <Link to={link} className="d-inline-flex">
                  <Icon size="1.5rem" color="#0C2191" />
                </Link>
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

const SidebarDiv = styled.div``




function Sidebar({ Toggle, side, toggleModule }) {
  const {
    generalState: { classConsole },
    generalState,
    setGeneralState,
    consoleFunctions: { fetchDomains },
  } = useAuth();

  // const {classId} = useParams()
  const [domainData, setDomainData] = useState([])
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

  const getDomains = useQuery(["fetch domains", courseId], () => fetchDomains(userdata.token, courseId), {
    onSuccess: res => {
      if(res.success){
        setDomainData(res.data)
      }
    }
  } );

  // useEffect(()=>{
  //   if(getDomains?.data?.data?.length > 0){
  //     console.log(getDomains.data.data[0])
  //   }
  // }, [getDomains?.data?.data])

  function onDragEnd(result){
    console.log({result})

    const {destination, source, draggableId} = result;

    if(!destination){
      return
    }
    
    if(destination.index === source.index){
      return
    }
    
    // get domains state
    console.log({domainData})
    let newData = domainData
    let movedItem = domainData.find(item => item._id === draggableId)
    newData.splice(source.index, 1)
    newData.splice(destination.index, 0, movedItem)
    console.log({newData})
    setDomainData(newData)

  }



  return (
    // <article className={style.class_sidebar }>
    <DragDropContext
      onDragEnd={onDragEnd}

    >
          <>
        <article
          className={`${classConsole.sidebar ? style.open : style.close} ${style.class_sidebar
            }`}
        >
          <Link to="/">
            <Logosm />
          </Link>

          {!studentpath ? (
            <>
              <Droppable droppableId={courseId}>
                {
                  (provided)=> (
                    <div
                      className={style.course_content} 
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <p>Course content</p>
                      {getDomains?.data?.data?.map((domain, index) => (
                        <Accord {...domain} index={index} key={domain._id} all={domain} openEditContentModal={Toggle} toggleModule={toggleModule} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )
                }
              </Droppable>
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
                <button className={style.back_button} style={{ width: "100%" }}>Back to Dashboard</button>
              </Link>
            </>
          ) : (
            <>
              <div className={style.course_content}>
                <p>Course content</p>
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
                      {/* <i>
                        <BsThreeDotsVertical />
                      </i> */}
                    </Link>
                  </button>
                </div>

                <div className={`${style.create_content_button} ${style.orange}`}>
                  <button onClick={() =>navigate("/student")}>
                      <span>Back to Dashboard</span>
                  </button>
                </div>

                {/* <div className={`${style.create_content_button} ${style.blue}`}>
                  <button>
                    <Link to={`/student/console/myclasses/class/${classId}/live-class`}>
                      <span>Live Classes</span>
                    
                    </Link>
                  </button>
                </div> */}
              </div>
            </>
          )}
        </article>
        <div
          onClick={closeSidebar}
          className={`d-lg-none ${clsx.overlay} ${classConsole.sidebar ? clsx.overlayopen : clsx.overlayclose
            }`}
        ></div>
      </>
    </DragDropContext>
  );
}

const AccordDiv = styled.div` `


export function Accord ({ name, _id, classId, description, creator,contentName, originalName, setOpen, index, all, openEditContentModal, toggleModule }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const userdata = getItem(KEY);
  const { consoleFunctions: { fetchContents, addFile }, } = useAuth();
  const getDomainContent = useQuery(["getDomainContent", classId], () => fetchContents(userdata.token, classId));
  const queryClient = useQueryClient()
  
  useEffect(() => {
    if (getDomainContent?.data?.data?.length > 0) {
      console.log(getDomainContent.data.data[0])
    }
  }, [getDomainContent?.data?.data])

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
  const domain = [
    // {
    //   id: 1,
    //   title: "Edit domain",
    // },
    {
      id: 2,
      title: "Add Content",
    },
    {
      id: 3,
      title: "Lock all content",
    },
    {
      id: 4,
      title: "Delete Domain",
    },

  ]

  function handleContentNavigation(...args) {
    navigate(`/teacher/class-console/class/${args[3]}?content=${args[0]}`)
    // setSearchParams({ "content": args[0] })
  }
  // ADD CONTENT FROM CREATOR SUITE
  const mutation = useMutation(([token, data])=>addFile(token, data), {
    onSuccess: (res)=> {
        console.log(res)
        setOpen(false)
        queryClient.invalidateQueries("file content")
    },
    onError: (err)=> console.error(err)
})

// create content after upload

function addSuiteContentToClass(id, contentName, originalName){
        // call file upload function
        mutation.mutate([userdata?.token, {
            classId,
            contentId: id,
            fileName:contentName,
            title:originalName
        }])
}


const contentid = searchParams.get("content")

  return (
    <Draggable draggableId={_id} index={index}>
      {
        (provided)=> (

          <div className={style.content_item} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}


          >
            <div className={style.content_item_top}>
              <i>
                {details ? (
                  <BiCaretDown onClick={() => showDetails(!details)} />
                ) : (
                  <BiCaretRight onClick={() => showDetails(!details)} />
                )}
              </i>
              <span>{name}</span>
              <AccordMenu type="domain" id={_id} domain={all} toggleModule={toggleModule} />

            </div>

            {
              details &&
              (
                // creator suite delete
                  creator ? 
                      mutation.isLoading  ?

                      <div className="spinner-border text-white">
                        <div className="visually-hidden">Loading...</div>
                      </div>
                      :
                      <ul className={style.content_list}>
                        {getDomainContent?.data?.data?.filter(item => item.domain === _id).filter(item=> item.type === "FILE_VIDEO").map(({ icon: Icon, title, link, _id, type, domain, classId }) => (
                          <li key={_id} className="d-flex position-relative" style={{cursor:"pointer"}}>
                            <i>{IconType(type)}</i>
                            <span>{title}</span>
                            <AccordMenu type="content" id={_id} />
                          
                              <i style={{position: "absolute", right: "10px", top: "50%", transform:"translateY(-50%)", zIndex:"200"}} onClick={() => addSuiteContentToClass(_id, contentName, originalName, classId)}>
                                <FaPlus size="1.5rem" color="#fff" />
                              </i>                  
                          </li>
                        ))}
                      </ul>
                    
                  :
                  <ul className={style.content_list}>
                    {getDomainContent?.data?.data?.filter(item => item.domain === _id).map((item) => (
                      <li key={item._id} onClick={() => handleContentNavigation(item._id, item.type, item.domain, item.classId)} className={`d-flex justify-content-between ${item._id === contentid ? "activeClass" : ""}`} style={{cursor:"pointer"}}>
                        <i>{IconType(item.type)}</i>
                        <span>{item.title}</span>
                        <div className="d-flex gap-3 align-items-center">
                          {item.isLocked && <BiLockAlt />}
                          <AccordMenu type="content" content={item} id={item._id} domain={item.domain} classId={item.classId} locked={item.isLocked} openEditContentModal={openEditContentModal} />
                        </div>
                        
                      </li>
                    ))}
                  </ul>
              )
            }
          </div>
        )
      }
    </Draggable>
  );
}

function AccordMenu({ id, type, classId, locked, domain, content, openEditContentModal, toggleModule}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const {getItem} = useLocalStorage()
  const userdata = getItem(KEY)
  const navigate = useNavigate()
  const queryClient = useQueryClient();
	const [searchParams, setSearchParams] = useSearchParams();

  const {teacherConsoleFunctions: {deleteDomain, deleteContent}, consoleFunctions:{updateDomain, updateContent}} = useAuth();

  const contentdelete = useMutation(([token, id])=>deleteContent(token, id), {
    onSuccess: (res)=>{
      navigate(`/teacher/class-console/class/${classId}`)
      queryClient.invalidateQueries("fetch domains")
    },
    onError: (err)=>{
      console.error(err)
    }
  })
  const domaindelete = useMutation(([token, id])=>deleteDomain(token, id), {
    onSuccess: (res)=>{

      queryClient.invalidateQueries("getDomainContent")
    },
    onError: (err)=>{
      console.error(err)
    }
  })

  const domainUpdate = useMutation(([token, data, id])=>updateDomain(token, data, id), {
    onSuccess: (res)=>{

      queryClient.invalidateQueries("getDomainContent")
    },
    onError: (err)=>{
      console.error(err)
    }
  })

  const contentUpdate = useMutation(([token, data, id])=>updateContent(token, data, id), {
    onSuccess: (res)=>{
      queryClient.invalidateQueries("getDomainContent")
    },
    onError: (err)=>{
      console.error(err)
    }
  })

  function deleteCnt(e){
      e.preventDefault()
      if(type === "domain"){
        console.log({id})
        domaindelete.mutate([userdata.token, id])
      } else if(type === "content"){
        contentdelete.mutate([userdata.token, id])
      }
  }
  

  function handleLockToggle(status){
    console.log({type})
    let wantsTolock = status === "lock"
    if(type === "domain"){
      if(wantsTolock){
        // lock
        let domainData = domain
        domainData.isLocked = true
        console.log(domainData)
        domainUpdate.mutate([userdata.token, domainData, id])
        return
      }
      // unlock
      let domainData = domain
        domainData.isLocked = false
        console.log(domainData)
        domainUpdate.mutate([userdata.token, domainData, id])

    }else {
      if(wantsTolock){
        // lock
        let contentData = content
        contentData.isLocked = true
        contentData.domainId = contentData.domain
        contentUpdate.mutate([userdata.token, contentData, id])
        return
      }
      // unlock
      let contentData = content
        contentData.isLocked = false
        contentData.domainId = contentData.domain
        contentUpdate.mutate([userdata.token, contentData, id])
    }
  }



  function editContent(){
    // setParams
    console.log("clicked")
    if(type === "domain"){
      toggleModule("edit", domain)
    }else {
      openEditContentModal("edit", content)
    }
    // open content modal and prefill content
  }

 

  return (
    <div style={{marginLeft:"auto"}}>
      <i
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical />
      </i>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component="div" onClick={editContent}>Edit content</MenuItem>
       {
        locked ? 
        <MenuItem onClick={()=>handleLockToggle("unlock")}>Unlock content</MenuItem>
        :
        <MenuItem onClick={()=>handleLockToggle("lock")}>Lock content</MenuItem>
      } 
        <MenuItem onClick={deleteCnt}>Delete content</MenuItem>
      </Menu>
    </div>
  )
}

export function ModalContent({ show, handleClose, toggleModule, editData  }) {

  const [showMore, setShowMore] = useState(false);
  const [type, setType] = useState("file");
  const { getItem } = useLocalStorage();
  const classId = localStorage.getItem(CLASSID)
  const userdata = getItem(KEY)
  let ref = useRef();
  const { generalState, setGeneralState, generalState: { classConsole, }, consoleFunctions: { addContent, updateContent } } = useAuth();
  const [formstate, setFormstate] = useState({
    isLocked: false,
    notifyStudents: false,
  });

  const queryClient = useQueryClient()
  const fetchDomains = useQuery(["fetch domains", classId], () => fetchDomains(userdata.token, classId))

  const addContentMutation = useMutation(([token, state]) => addContent(token, state), {
    onSuccess: (res) => {
      queryClient.invalidateQueries('fetch domains')
      handleClose();
    },
    onError: (err) => {
      console.error("error adding content", err)
    }
  })
  const editContentMutation = useMutation(([token, data, id])=>updateContent(token, data, id), {
    onSuccess: (res)=>{
      queryClient.invalidateQueries("getDomainContent")
      handleClose()
    },
    onError: (err)=>{
      console.error(err)
    }
  })

  function handleChange(e) {
    setFormstate({ ...formstate, [e.target.name]: e.target.value });
  }


  function createContent() {
    if (!formstate.domainId) {
      toast.error("Please select a domain");
      throw new AdvancedError("Please select a domain", 0);
    }
    addContentMutation.mutate([userdata.token, { ...formstate, classId }])
  }


  function editContent(){
    editContentMutation.mutate([userdata.token, { ...formstate, classId, domainId: formstate.domain}, editData._id])
  }

  function handleNotifyStudent() {
    setFormstate({ ...formstate, notifyStudents: !formstate.notifyStudents })
  }
  function handleIsLocked() {
    setFormstate({ ...formstate, isLocked: !formstate.isLocked })
  }



  useEffect(()=>{
    if(editData?._id){
      setFormstate(editData)
    }
  },[editData?._id])



  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={style.modal__header}>
          <Modal.Title className={style.modal__title}>{ editData?._id ? "Edit Content" : "Add Content"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={style.content__form}>

            {
              !editData?._id && 
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
                  disabled={editData?._id}
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
            }

            <FormControl>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Content Title"
                variant="outlined"
                placeholder="Content Title"
                onChange={handleChange}
                value={formstate.title || ""}
                name="title"
              />
            </FormControl>
            {
              !editData?._id &&
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
                  disabled={editData?._id}
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
            }

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
                      control={<Switch />}
                      label="Lock course content"
                      labelPlacement="top"
                      value="lock course"
                      checked={formstate.isLocked}
                      onClick={handleIsLocked}
                    />
                    <p className={style.formtext}>
                      Content is currently {formstate.isLocked ? "locked" : "unlocked"}
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

          {  
              editData?._id ? 
            <button className={style.contentform__btn} onClick={editContent} disabled={addContentMutation.isLoading}>
              {
                editContentMutation.isLoading ? <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> :
                  
                  
                  <span>Save Edit</span>
                  
              }
            </button>
            :
            <button className={style.contentform__btn} onClick={createContent} disabled={addContentMutation.isLoading}>
              {
                addContentMutation.isLoading ? <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> :
                  <span>Submit</span>
                  
              }
            </button>
          }
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

export function ModuleModal({ moduleOpen, moduleClose, editModule }) {
  const { consoleFunctions: { addDomain,updateDomain } } = useAuth()
  const { getItem } = useLocalStorage()
  const [formstate, setFormstate] = useState({});
  const queryClient = useQueryClient()

  const mutation = useMutation(([token, state]) => addDomain(token, state), {
    onSuccess: (res) => {
      queryClient.invalidateQueries('fetch domains')
      moduleClose();
    },
    onError: (err) => {
      toast.error(err.message)
      console.error(err)
    }
  })


  const domainUpdate = useMutation(([token, data, id])=>updateDomain(token, data, id), {
    onSuccess: (res)=>{
      queryClient.invalidateQueries("getDomainContent")
      moduleClose();

    },
    onError: (err)=>{
      toast.error(err.message)
      console.error(err)
    }
  })

  const userdata = getItem(KEY)
  const classId = localStorage.getItem(CLASSID)

  function handleChange(e) {
    setFormstate({ ...formstate, [e.target.name]: e.target.value })
  }

  function createModule() {
    mutation.mutate([userdata.token, { ...formstate, classId }])
  }


  function EditModule(){
    domainUpdate.mutate([userdata.token, formstate, formstate._id])
  }

  useEffect(()=>{

    if(editModule?._id){
      setFormstate(editModule)
    }

  },[editModule?._id])

  return (
    <div>
      <Modal show={moduleOpen} onHide={moduleClose} className="modulemodal">
        <Modal.Header className="module__header">
          <p>{editModule?._id ? "Edit Domain" : "Add Domain"}</p>
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
              {
                editModule?._id ? 

                <button className="" onClick={EditModule} disabled={mutation.isLoading}>
                  {
                    domainUpdate.isLoading ?
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      :
                      <span>Submit Edit</span>
                  }
                </button>
                :
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
              }
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

export function PopModalContent({ open, closeSmall, openUpload, setScreenOpen, setVideoOpen }) {
  function handleClick(type) {
    console.log(type)
    if (type === "file") {
      closeSmall()
      openUpload(true)
    }else if(type === "video"){
      closeSmall()
      setVideoOpen(true)
    } else if(type === "screen"){
      closeSmall()
      setScreenOpen(true)
    }

  }

  return (
    <div>
      <Modal show={open} onHide={closeSmall} className="smallmodal">
        {/* <Modal.Header closeButton className="modal__header">
                </Modal.Header> */}
        <Modal.Body>
          <div className="style.smallmodalbody" >
            {popIcon.map(({ title, id, type, icon: Icon }) => (
              <Tooltip title={title} key={id} onClick={() => handleClick(type)}>
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

export function MainContainer() {
  const { consoleFunctions: { fetchContents }, } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  const { getItem } = useLocalStorage();
  const userdata = getItem(KEY);
  const navigate = useNavigate();
  const { classId } = useParams()

  const getDomainContent = useQuery(["getDomainContent", classId], () => fetchContents(userdata.token, classId));
  const [data, setData] = useState({})
  const contentid = searchParams.get("content")

  useEffect(() => {
    if (getDomainContent?.data?.data?.length > 0) {
      if (contentid) {
        let content = getDomainContent.data.data.find(item => item._id === contentid);
        setData(content)
      } else {
        console.log(getDomainContent.data.data[0])
        navigate(`?content=${getDomainContent.data.data[0]._id}`)
        setData(getDomainContent.data.data[0])
      }
    }

  }, [getDomainContent?.data?.data, contentid])

  console.log({ data })
  switch (data.type) {
    case "FILE_VIDEO":
      return <File />;
    case "QUIZ":
      return <Quiz />;
    case "NOTE":
      return <Note />;
    default:
      return;
  }

}

export default Console;
