import '../classConsole/Content.css'
import { NavLink, Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react'
import processed from '../../../../images/processed.png'
import {
    BsDownload,
    BsMic,
    BsMicMute,
    BsPauseCircle,
    BsRecordCircle,
    BsThreeDotsVertical,
  } from "react-icons/bs";
  import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
  import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from "react-router-dom";
import { IconButton, Menu, MenuItem, Modal, Tooltip } from '@mui/material';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { BiStopCircle, BiTrash, BiVideoRecording } from 'react-icons/bi';
import { MdPresentToAll } from 'react-icons/md';
import { UploadFormContent } from './components/upload';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdvancedError } from '../../../../classes';
import { useLocalStorage } from '../../../../hooks';
import { CLASSID, getFullDate, getTime, KEY } from '../../../../constants';
import { useAuth } from '../../../../contexts/Auth';
import { ViewModal } from './File';

import { useReactMediaRecorder } from "react-media-recorder";
import { useRef } from 'react';
import { useEffect } from 'react';
import { border } from '@mui/system';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { BsPlay } from "react-icons/bs";
import { Accord } from '.';
import UploadWidget from './components/UploadWidget';

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
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}


export function Processed() {
    const {getItem} = useLocalStorage()
    const {teacherConsoleFunctions: {fetchSuiteFiles}} = useAuth()


    const userdata = getItem(KEY)
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)

    const files = useQuery(["fetch suite files", userdata?.token], ()=>fetchSuiteFiles(userdata?.token), {
        onSuccess: (res)=> {
            console.log(res)
            res.data.length > 0 && setData(res.data)
        },
        onError: (err)=> {
            console.error(err);
        }
    })


    function openPreview(e, type){
        e.preventDefault()
        setOpen(true)
    }

    return (
        <div className="suite__boxcontainer">
            {
                data?.map((x, id) => (
                    <SuiteBox x={x} id={id} />

                ))
            }
        </div>
    )
}

function SuiteBox({x, id}){
    const [open, setOpen] = useState(false)
    const [addToClassroom, setAddToClassroom] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const openAnchor = Boolean(anchorEl);

    
    const {getItem}= useLocalStorage()
    const {teacherConsoleFunctions: {deleteCreatorItem}} = useAuth();

    const userdata = getItem(KEY)
    function openPreview(e, type){
        e.preventDefault()
        setOpen(true)
    }
    const queryClient = useQueryClient();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
      
    const handleClose = () => {
        setAnchorEl(null);
    }

    const mutation = useMutation(([usertoken, data])=> deleteCreatorItem(usertoken, data), {
        onSuccess: (res)=>{
            console.log(res)
            queryClient.invalidateQueries("fetch suite files")
        },
        onError: (err)=>console.error(err)
    })

    function handleDelete(e, data){
        if (window.confirm("Delete File?")) {
            mutation.mutate([userdata.token, data])    
        }
    }

    
      
    return (
        <div className="suite__box" key={id}>
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
                        
                            <MenuItem onClick={(e)=>handleDelete(e, x._id)} key={id}>
                                <i><BiTrash /></i>
                                <span className="ms-3">Delete</span>
                            </MenuItem>
                        
                    }
                </Menu>

            </div>
            <div className="suite__img">
                <img src={processed} alt="" />
            </div>
            <p className='suite__title'>{x.originalName}</p>
            <span>{x.type}</span>
            <span>Status: Processed</span>
            <span>{x.updatedAt ? getFullDate(x.updatedAt) : ""}</span>
            {/* <p className='suite__title'>created in: IT AUDIT</p> */}
            <div className="suite__btn">
                <button onClick={()=>setAddToClassroom(true)}>Add to classroom</button>
                <button onClick={(e)=>openPreview(e, x.type)}>Preview</button>
            </div>
            <AddtoClassRoom open={addToClassroom} setOpen={setAddToClassroom} name={x.name} originalName={x.originalName} />
            <ViewModal open={open} setOpen={setOpen} file={`${process.env.REACT_APP_VIDEOURL}${x.name}`} creator={true} type={x.type} />
        </div>
    )
}
export function Pending() {
    return (
        <div className="suite__boxcontainer">
            {/* {
                [...Array(4)].map((x, id) => (
                    <div className="suite__box">
                        <p className='suite__title'>recording-1661271168971</p>
                        <p className='suite__p'>8/23/2022, 5:12:49 PM</p>
                        <button className='blue__button'>Process recording</button>

                    </div>

                ))
            } */}
        </div>
    )
}

export default function Suite() {
    const [value, setValue] = useState(0);

    const content = [
        {
            id: 1,
            title: "Upload file/image",
            icon: HiOutlineCloudUpload,
            type: "file"
        },
        {
            id: 2,
            title: "Upload video",
            icon: HiOutlineCloudUpload,
            type: "file"
        },
        {
            id: 3,
            title: "Video Record",
            icon: BiVideoRecording,
            type: "video"
        },
        {
            id: 4,
            title: "Screen Record",
            icon: MdPresentToAll,
            type: "screen"
        },
    ]
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className=''>
            <main className='suite'>
                <div className="suite__top">
                    <div className="suite__blue">
                        <h4>Creator suite files</h4>
                        <p>Files uploaded to creator suite or created within the creator suite can be reused across multiple course content Teachers would only see files in the current course i.e EXCEL FUNCTIONS 101</p>

                    </div>
                    <div className="suite__orange">
                        <p>To import video from creator suite to content (or topic), open the content, click on the add new button, and import from creator suite</p>
                    </div>

                </div>

                <div className="suite__form">
                <div className="suite__input">
                        <AiOutlineSearch/>
                        <input type="search" name="" id="" placeholder='Search for videos/files' />

                    </div>
                    <select name="" id="">
                        <option value="">Filter</option>
                        <option value="file">Files/image</option>
                        <option value="video">Video</option>
                    </select>

                    <CreatorMenu content={content} />

                </div>


                 <Box sx={{ width: '100%' }}>
                <Box >
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Processed" {...a11yProps(0)} />
                        <Tab label="Pending" {...a11yProps(1)} />
                    </Tabs>
                </Box>
               


                <TabPanel value={value} index={0}>
                    <Processed/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Pending/>
                </TabPanel>

            </Box>



            </main>



        </div>


    )
}

function CreatorMenu({ id, content }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isVideoOpen, setIsVideoOpen] = useState(false)
    const [isScreenOpen, setIsScreenOpen] = useState(false)
    const [fileUrl, setFileUrl] = useState("")
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    }

    const handleOpen=(e, type)=>{
        console.log(type)
        setAnchorEl(null);
        if(type === "file"){
            setIsOpen(true)
        } else if(type === "video"){
            setIsVideoOpen(true)
        } else {
            setIsScreenOpen(true)
        }
    }
    return (
      <div>
        <button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          create new +
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
            {
                content.map(({title, id, icon:Icon, type}) =>(
                    <MenuItem onClick={(e)=>handleOpen(e, type)} key={id}>
                        <i><Icon /></i>
                        <span className="ms-3">{title}</span>
                    </MenuItem>
                ))
            }
        </Menu>
        <UploadWidget fileUrl={fileUrl} setFileUrl={setFileUrl}/>

        {/* <UploadForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            uploadType="content"
        /> */}

        <UploadVideoRecording
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            uploadType="content"
        />
        <UploadScreenRecording
            isScreenOpen={isScreenOpen}
            setIsScreenOpen={setIsScreenOpen}
            uploadType="content"
        />
      </div>
    )
  }

const UploadForm = ({isOpen, setIsOpen, setPreviewImage, uploadType }) => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient()

    const {adminFunctions: {uploadFile}, teacherConsoleFunctions: {addFile}} = useAuth();
    const {getItem} = useLocalStorage();
    const value = getItem(KEY);
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const contentId = searchParams.get("content")


    const {classId} = useParams()

    // async function uploadFileHandler(e){
    //     try{
    //         setLoading(true)
    //         const formdata = new FormData();
    //         formdata.append('file', file, file.name);
    //         const res = await uploadFile(formdata, value?.token);
    //         setLoading(false)

    //         const {success, message, statusCode} = res;
    //         if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
    //         else {

    //             const {data} = res;
    //             createFileContent(data.fileId)
    //             setIsOpen(false)
    //             setData(_ => data.name);
    //             toast.success(message)
    //         }
    //     }catch(err){
    //         console.error(err.statusCode)
    //         setLoading(false)
    //         toast.error(err.message)
    //         if(err.statusCode === 2){
    //             localStorage.clear()
    //             // navigate("/")
    //         }
    //     }

    // }

    async function uploadFileHandler(e){
        setLoading(true)
        const formdata = new FormData();
        formdata.append('file', file, file.name);
        var ajax = new XMLHttpRequest();

        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", `${process.env.REACT_APP_BASEURL}/file/upload`);
        ajax.setRequestHeader("Authorization",  "Bearer " + value.token); 
        ajax.send(formdata);
    }

    function progressHandler(event) {
        console.log({event})
        var percent = (event.loaded / event.total) * 100;
        console.log(percent)
        setProgress(Math.round(percent) + "% uploaded... please wait")
        // _("progressBar").value = Math.round(percent);
        // _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
    }
      
    function completeHandler(event) {
        setLoading(false)
        let { data,message } = JSON.parse(event.target.response)
        toast.success(message)
        createFileContent(data.fileId)
        setIsOpen(false)
        setData(_ => data.name);
        setProgress(0)
    }
      
    function errorHandler(event) {
        setLoading(false)
        console.error(event)
        toast.error(event.message)
        
    }
    
    function abortHandler(event) {
        setLoading(false)
    }
    const mutation = useMutation(([token, data])=>addFile(token, data), {
        onSuccess: (res)=> {
            console.log(res)
            setData(null)
            setFile(null)
            setImageUrl(null)
            queryClient.invalidateQueries("fetch suite files")
        },
        onError: (err)=> console.error(err)
    })

    // create content after upload

    function createFileContent(file){
        if(uploadType === "content"){
            // call file upload function
            mutation.mutate([value?.token, {
                classId,
                fileId:file,
            }])
        }
    }

    async function copy(_source){
        await window.navigator.clipboard.writeText(_source);
        toast.success("Copied successfully",{
            position:"top-right",
            autoClose: 5000,
            hideProgressBar: false,
            newestOnTop:false,
            closeOnClick: true,
            rtl:false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true
        })
    }

    function triggerUpload(e){
        e.stopPropagation();
        let input = document.getElementById("uploadFile");
        input.click();
    }

    function changeHandler(e){
        const {files} = e.target;
        if(files?.length !== 0){
            setFile(_ => files[0]);

            setImageUrl(_ => {
                return URL.createObjectURL(files[0]);
            })
            setPreviewImage(URL.createObjectURL(files[0]))
        }
    }

    return(
        isOpen && 
        (
            <UploadFormContent
            setIsOpen={setIsOpen}
            data={data}
            triggerUpload={triggerUpload}
            changeHandler={changeHandler}
            file={file}
            imageUrl={imageUrl}
            loading={loading}
            copy={copy}
            uploadFileHandler={uploadFileHandler}
            progress={progress}
            />
        )
    )
}
export const UploadVideoRecording = ({isVideoOpen, setIsVideoOpen, setPreviewImage, uploadType, fileCreate }) => {
    const style = {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        height: "100%",
        // overflowY:"scroll",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "10px",
        boxShadow: 24,
        p: 6,
        padding: "4rem 2rem .3rem 2rem",
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient()

    const {adminFunctions: {uploadFile}, teacherConsoleFunctions: {addFile}} = useAuth();
    const {getItem} = useLocalStorage();
    const value = getItem(KEY);
    
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState("")

    const [videoData, setVideoData] = useState(null)
    const [previewData, setPreviewData] = useState(null)
    const [progress, setProgress] = useState(0)
    const videoRef = useRef()
    
    const { status, startRecording, stopRecording, muteAudio, unMuteAudio, pauseRecording, resumeRecording, mediaBlobUrl, previewStream, clearBlobUrl } = useReactMediaRecorder({ video: true, onStop: (blobUrl, blob) => {setVideoData(blob)
            setPreviewData(blobUrl)
        },
        onStart: ()=>{
            setPreviewData(null)
        }
    });

    const {classId} = useParams()

    useEffect(() => {
      if(videoRef.current && previewStream){
        videoRef.current.srcObject = previewStream
      }
    
      return () => {
        
      }
    }, [previewStream])
    

    // useEffect(()=>{
    //     if(previewRef && mediaBlobUrl){
    //         previewRef.current.src = mediaBlobUrl;
    //     }

    // }, [mediaBlobUrl])

    
    async function uploadFileHandler(e){
        if(!fileName){
            toast.error('Please provide a file name')
            return
        }
        setLoading(true)
        const formdata = new FormData();
        formdata.append('file', videoData, fileName);
        var ajax = new XMLHttpRequest();

        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", `${process.env.REACT_APP_BASEURL}/file/upload`);
        ajax.setRequestHeader("Authorization",  "Bearer " + value.token); 
        ajax.send(formdata);
    }

    function progressHandler(event) {
        console.log({event})
        var percent = (event.loaded / event.total) * 100;
        console.log(percent)
        setProgress(Math.round(percent) + "% uploaded... please wait")
        // _("progressBar").value = Math.round(percent);
        // _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
    }
      
    function completeHandler(event) {
        setLoading(false)
        let { data,message } = JSON.parse(event.target.response)
        toast.success(message)
        createFileContent(data.fileId)
        setIsVideoOpen(false)
        setProgress(0)
    }
      
    function errorHandler(event) {
        setLoading(false)
        console.error(event)
        toast.error(event.message)
        
    }
    
    function abortHandler(event) {
        setLoading(false)
    }

    const mutation = useMutation(([token, data])=>addFile(token, data), {
        onSuccess: (res)=> {
            console.log(res)
            queryClient.invalidateQueries("fetch suite files")
        },
        onError: (err)=> console.error(err)
    })

    // create content after upload

    function createFileContent(file){
        if(uploadType === "content"){
            // call file upload function
            mutation.mutate([value?.token, {
                classId,
                fileId:file,
            }])
        }
    }

    // download recording

    const downloadRecording = () => {
        if(!fileName){
            toast.error("Please provide a file name")
            return
        }
        const pathName = `${fileName}.mp4`;   
        try {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // for IE
          window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName);
        } else {
          // for Chrome
          const link = document.createElement("a");
          link.href = mediaBlobUrl;
          link.download = pathName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        } catch (err) {
          console.error(err);
        }
     };

    

    const [muted, setMuted] = useState(false)
    const [recordingStatus, setRecordingStatus] = useState(false)
    
    function handleMute(e){
        e.preventDefault()
        setMuted(true)
        muteAudio()
    }


    function handleUnmute(e){
        e.preventDefault()
        setMuted(false)
        // console.log(unMuteAudio)
        unMuteAudio()

    }

    function handlePauseRecording() {
        pauseRecording()
        setRecordingStatus(false)
    }
    function handleResumeRecording(){
        resumeRecording();
        setRecordingStatus(true)
    }
    return(
        <Modal
          open={isVideoOpen}
          onClose={(e) => {
            clearBlobUrl()
            setPreviewData(null)
            setIsVideoOpen((_) => false);
            
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={style}>
          
            {
                (loading || mutation.isLoading) ? <di className="d-flex flex-column align-items-center">
                <div className="spinner-border text-primary">
                    <div className="visually-hidden">Loading...</div>
                </div>
                <small className="d-block">Upload in progress. Do not close this page </small>
                <small className="d-block">{progress}</small>
                </di>
                :
              <div className='position-relative h-100'>
                <small className="mb-2">Video Record</small>
                <i style={{position:"absolute", right:"10px", top:"5px", cursor:"pointer"}}><AiOutlineClose size="1.5rem" onClick={()=>setIsVideoOpen(false)} /></i>

                <div className="mb-3">
                <span className="text-muted">Stream Status:</span>
                  <span className="fw-bold text-uppercase" style={{color:"var(--theme-blue)"}}>{status}</span>
                </div>
                <div style={{overflowY:"auto", maxHeight:"100%", paddingBottom: "2rem", paddingLeft:".5rem"}}>
                    {
                        
                        !previewData && <video ref={videoRef} style={{width: "100%", height:"100%"}}  autoPlay controls />
                    }

                    {
                        previewData &&
                        <>
                            
                            <div className="my-3 d-flex align-items-center justify-content-between">
                                <div className="my-3" style={{width:"min(100%, 450px)"}}> 
                                    <input type="text" name="title" id="title " className="form-control"  style={{outline:"1.5px solid var(--theme-blue)"}} placeholder='Enter file name' value={fileName} onChange={(e)=>setFileName(e.target.value)} onBlur={()=>console.log("blurred")} onFocus={()=>console.log("focused")} />
                                </div>
                                <button 
                                    className="button py-2 px-4"
                                    onClick={(e)=>{
                                    e.preventDefault();
                                    clearBlobUrl()
                                    setPreviewData(null)
                                }}>Clear</button>
                            </div>
                            <video src={previewData} controls autoPlay style={{width: "100%", height:"100%", aspectRatio:"3/1"}}  /> 
                            
                        </>
                    }

                </div>
                

                  <div className="d-flex justify-content-center position-fixed video_controls" style={{bottom:5, width:"100%", gap:"1rem"}}>
                    {
                        (status === "stopped" ||status === "idle")&&
                        <TooltipIcon
                            title="start recording"
                            handleClick={startRecording}
                            icon={BsRecordCircle}
                            mutation={null}
                        />
                        // <button className="rounded-pill border-0" style={{background:"#eee", color: "#fff", padding:".7rem"}} onClick={startRecording}>
                        //     <i><BsRecordCircle color='red' size="1.5rem" /></i>
                        // </button>

                    }
                    {
                        status === "recording" &&
                        <>
                            <TooltipIcon
                                title="stop recording"
                                handleClick={stopRecording}
                                icon={BiStopCircle}
                                mutation={null}
                            />
                            
                            <TooltipIcon
                                title="pause recording"
                                handleClick={handlePauseRecording}
                                icon={BsPauseCircle}
                                mutation={mutation}
                            />

                            {
                                muted ? 
                                <TooltipIcon
                                    title="unmute"
                                    handleClick={handleUnmute}
                                    icon={BsMicMute}
                                    mutation={null}
                                />
                                
                                :
                                <TooltipIcon
                                    title="mute mic"
                                    handleClick={handleMute}
                                    icon={BsMic}
                                    mutation={null}
                                />
                            }
                        </>
                    }
                    {
                        status === "stopped" &&

                        <TooltipIcon
                            title="Upload"
                            handleClick={uploadFileHandler}
                            icon={IoCloudUploadOutline}
                            mutation={mutation}
                        />
                        // <button className="rounded-pill border-0" style={{background:"var(--theme-orange)", color: "#fff", padding:".7rem"}} onClick={uploadFileHandler}>
                        //     {
                        //         mutation.isLoading ? 
                        //         <div className="spinner-border text-white">
                        //             <div className="visually-hidden">Loading...</div>
                        //         </div>
                        //         :
                        //         <span><i><IoCloudUploadOutline size="1.5rem"  /></i></span>
                            
                        //     }
                        // </button>
                    }
                    {status === "paused" &&  
                        <TooltipIcon
                            title="resume recording"
                            handleClick={handleResumeRecording}
                            icon={BsPlay}
                            mutation={mutation}        
                        />
                    }

                    {
                        status === "stopped" &&
                        <TooltipIcon
                            title="Download"
                            handleClick={downloadRecording}
                            icon={BsDownload}
                            mutation={mutation}
                        />
                        // <button className="rounded-pill border-0" style={{color:"var(--theme-orange)", padding:".7rem"}} onClick={downloadRecording}>
                        //     {
                        //         mutation.isLoading ? 
                        //         <div className="spinner-border text-white">
                        //             <div className="visually-hidden">Loading...</div>
                        //         </div>
                        //         :
                        //         <span><i><BsDownload size="1.5rem"  /></i></span>
                            
                        //     }
                        // </button>
                    }
                  </div>
              </div>
            }
           
          </Box>
          </Modal>
    )
}
export const UploadScreenRecording = ({isScreenOpen, setIsScreenOpen, setPreviewImage, uploadType, fileCreate }) => {
    const style = {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        height: "100%",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "10px",
        boxShadow: 24,
        p: 6,
        padding: "4rem 2rem .3rem 2rem",
    };
    const queryClient = useQueryClient()
    const [searchParams, setSearchParams] = useSearchParams();

    const {adminFunctions: {uploadFile}, teacherConsoleFunctions: {addFile}, consoleFunctions: {addFile: addMainFile}} = useAuth();
    const {getItem} = useLocalStorage();
    const value = getItem(KEY);
    
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState("")

    const [videoData, setVideoData] = useState(null)
    const [previewData, setPreviewData] = useState(null)
    const contentId = searchParams.get("content")
    const [muted, setMuted] = useState(false)
    const [recordingStatus, setRecordingStatus] = useState(false)
    const [progress, setProgress] = useState(0)

    const { status, startRecording, stopRecording, mediaBlobUrl, pauseRecording, resumeRecording, clearBlobUrl, muteAudio, unMuteAudio } = useReactMediaRecorder({ screen: true, audio: true, onStop: (blobUrl, blob) => {setVideoData(blob)
        setPreviewData(blobUrl)
    },
    onStart: ()=>{
        setPreviewData(null)
    } 
});
    const {classId} = useParams()

    async function uploadFileHandler(e){

        if(!fileName){
            toast.error("please provide a file name")
            return
        }
        setLoading(true)
        const formdata = new FormData();
        formdata.append('file', videoData, fileName);
        var ajax = new XMLHttpRequest();

        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", `${process.env.REACT_APP_BASEURL}/file/upload`);
        ajax.setRequestHeader("Authorization",  "Bearer " + value.token); 
        ajax.send(formdata);
    }

    function progressHandler(event) {
        console.log({event})
        var percent = (event.loaded / event.total) * 100;
        console.log(percent)
        setProgress(Math.round(percent) + "% uploaded... please wait")
    }
      
    function completeHandler(event) {
        setLoading(false)
        let { data,message } = JSON.parse(event.target.response)
        toast.success(message)
        createFileContent(data.fileId)
        setIsScreenOpen(false)
        setProgress(0)
    }
      
    function errorHandler(event) {
        setLoading(false)
        console.error(event)
        toast.error(event.message)
        
    }
    
    function abortHandler(event) {
        setLoading(false)
    }

    const mutation = useMutation(([token, data])=>addFile(token, data), {
        onSuccess: (res)=> {
            console.log(res)
            
            queryClient.invalidateQueries("fetch suite files")
        },
        onError: (err)=> console.error(err)
    })

    const addMainFileMutation = useMutation(([token, data])=>addMainFile(token, data), {
        onSuccess: (res)=> {
            console.log(res)
            
            queryClient.invalidateQueries("file content")
        },
        onError: (err)=> console.error(err)
    })

    // create content after upload

    function createFileContent(file){
        if(uploadType === "content"){
            // call file upload function
            if(fileCreate) {
                addMainFileMutation.mutate([value?.token, {
                    classId,
                    contentId,
                    fileName:file,
                    title:fileName
                }])
            } else {
                mutation.mutate([value?.token, {
                    classId,
                    fileId:file,
                }])
            }
        }
    }

    const downloadRecording = () => {
        if(!fileName){
            toast.error("Please provide a file name")
            return
        }
        const pathName = `${fileName}.mp4`;
        try {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // for IE
          window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName);
        } else {
          // for Chrome
          const link = document.createElement("a");
          link.href = mediaBlobUrl;
          link.download = pathName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        } catch (err) {
          console.error(err);
        }
     };



    function handleMute(e){
        e.preventDefault()
        setMuted(true)
        muteAudio()
    }


    function handleUnmute(e){
        e.preventDefault()
        setMuted(false)
        // console.log(unMuteAudio)
        unMuteAudio()

    }

    function handlePauseRecording() {
        pauseRecording()
        setRecordingStatus(false)
    }
    function handleResumeRecording(){
        resumeRecording();
        setRecordingStatus(true)
    }


    return(
        <Modal
          open={isScreenOpen}
          onClose={(e) => {
            setIsScreenOpen((_) => false);
            setPreviewData(null)
            clearBlobUrl()
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={style}>
          {
                (loading || mutation.isLoading) ? <di className="d-flex flex-column align-items-center">
                <div className="spinner-border text-primary">
                    <div className="visually-hidden">Loading...</div>
                </div>
                <small className="d-block">Upload in progress. Do not close this page </small>
                <small className="d-block">{progress}</small>
                </di>
                :
              <div className='position-relative'>
                <small className="mb-3">Screen Record</small>
                <div className="mb-3">
                <span className="text-muted">Stream Status:</span>
                  <span className="fw-bold text-uppercase" style={{color:"var(--theme-blue)"}}>{status}</span>
                </div>
                    <i style={{position:"absolute", right:"10px", top:"5px", cursor:"pointer"}}><AiOutlineClose size="1.5rem" onClick={()=>setIsScreenOpen(false)} /></i>
                    
                    {
                        previewData &&
                        <>
                            <div className="my-3 d-flex align-items-center justify-content-between">
                                <div className="my-3" style={{width:"min(100%, 450px)"}}> 
                                    <input type="text" name="title" id="title " className="form-control"  style={{outline:"1.5px solid var(--theme-blue)"}} placeholder='Enter file name' value={fileName} onChange={(e)=>setFileName(e.target.value)} onBlur={()=>console.log("blurred")} onFocus={()=>console.log("focused")} />
                                </div>
                                <button 
                                    className="button py-2 px-4"
                                    onClick={(e)=>{
                                    e.preventDefault();
                                    clearBlobUrl()
                                    setPreviewData(null)
                                }}>Clear</button>
                            </div>
                            <video src={previewData} controls autoPlay style={{width: "100%", height:"100%", aspectRatio:"3/1"}}  /> 
                            
                        </>
                    }
                  <div className="d-flex justify-content-center position-fixed video_controls" style={{bottom:5, width:"100%", gap:"1rem"}}>
                    {
                        (status === "stopped" ||status === "idle")&&
                        <TooltipIcon
                            title="Record"
                            handleClick={startRecording}
                            icon={BsRecordCircle}
                            mutation={mutation}
                        />

                    }
                    {
                        status === "recording" &&
                        <>
                            <button className="rounded-pill border-0" style={{background:"var(--theme-orange)", color: "#fff", padding:".7rem"}} onClick={stopRecording}>
                                <i><BiStopCircle size="1.5rem" /></i>
                            </button>
                           
                            <TooltipIcon
                                title="pause recording"
                                handleClick={handlePauseRecording}
                                icon={BsPauseCircle}
                                mutation={mutation}
                            />

                            {
                                muted ? 
                                <TooltipIcon
                                    title="unmute"
                                    handleClick={handleUnmute}
                                    icon={BsMicMute}
                                    mutation={null}
                                />
                                
                                :
                                <TooltipIcon
                                    title="mute mic"
                                    handleClick={handleMute}
                                    icon={BsMic}
                                    mutation={null}
                                />
                            }
                        </>
                    }

                    {status === "paused" &&  
                    
                        <TooltipIcon
                            title="resume recording"
                            handleClick={handleResumeRecording}
                            icon={BsPlay}
                            mutation={mutation}        
                        />
                    }
                    {
                        status === "stopped" &&
                        <TooltipIcon
                        title="upload"
                        handleClick={uploadFileHandler}
                        icon={IoCloudUploadOutline}
                        mutation={mutation}
                        />
                    }
                    {
                        status === "stopped" &&
                        <TooltipIcon
                        title="download"
                        handleClick={downloadRecording}
                        icon={BsDownload}
                        mutation={mutation}
                        
                        />
                    }
                        
                  </div>
              </div>
        }
        </Box>
        </Modal>
    )
}

function TooltipIcon({title, handleClick, icon:Icon, mutation}){
    return(
        <Tooltip title={title}>
            <IconButton className="rounded-pill border-0" style={{color:"var(--theme-orange)", padding:".7rem"}} onClick={handleClick}>
                {
                    mutation?.isLoading ? 
                    <div className="spinner-border text-white">
                        <div className="visually-hidden">Loading...</div>
                    </div>
                    :
                    <span><i><Icon size="1.5rem"  /></i></span>
                
                }
            </IconButton>
        </Tooltip>
)
}
function AddtoClassRoom({open,setOpen, name, originalName}){
    const style = {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        height: "80%",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "10px",
        boxShadow: 24,
        overflowY:"scroll",
        p: 6,
        padding: "4rem 2rem",
      };
      const {getItem} = useLocalStorage()
      const courseId = localStorage.getItem(CLASSID);
      const userdata = getItem(KEY);
      const { consoleFunctions: { fetchDomains } } = useAuth();
      const getDomains = useQuery(["fetch domains", courseId], () =>
      fetchDomains(userdata.token, courseId)
    );
      return (
        <Modal
          open={open}
          onClose={(e) => {
            setOpen((_) => false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={style}>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h6>Add to content</h6>
                <div className="d-flex flex-column justify-content-around" style={{gap:"1.5rem"}}>
                    {getDomains?.data?.data?.map((domain) => (
                        <Accord {...domain} creator={true} contentName={name} originalName={originalName} setOpen={setOpen} />
                    ))}
                </div>

                </div>
            </div>
          </Box>
          </Modal>
    )
}