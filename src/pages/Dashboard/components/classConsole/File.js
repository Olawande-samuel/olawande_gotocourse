
import '../classConsole/Content.css'
import { IoMdCloudDownload } from 'react-icons/io';
import { PopModalContent } from '.';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from "react-router-dom";
import UploadForm from './components/upload';
import { useAuth } from '../../../../contexts/Auth';
import { useLocalStorage } from '../../../../hooks';
import { KEY } from '../../../../constants';
import { useQuery } from '@tanstack/react-query';
import { IconButton, Modal, stepContentClasses, Tooltip } from '@mui/material';
import { UploadScreenRecording, UploadVideoRecording } from './Suite';


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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function File() {
    const { pathname, search } = useLocation();
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [openUpload, setOpenUpload]= useState(false)
    const [screenOpen, setScreenOpen]= useState(false)
    const [videoOpen, setVideoOpen]= useState(false)
    const [fileData, setFileData]= useState([])
    const {consoleFunctions: {fetchFile}} = useAuth()
    const {getItem} = useLocalStorage()
    
    const bread = pathname?.split("/");
    let path = pathname.split("/")
    let classId = path[path.length -1]
    let searchData = search.split("=").reverse()[0]
    
    const userdata = getItem(KEY)
    
    const OpenToggle = () => setOpen(!open)
    const closeSmall = () => setOpen(false);
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const getFiles = useQuery(["file content", search, searchData], () => fetchFile(userdata.token, searchData), {
        onSuccess: (res)=> {
         
            if(res.data?.length > 0){
                setFileData(res.data)
            }
            
        }
    } )
    return (
        <>
            <div className=''>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ marginBottom: "2rem"}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="File" {...a11yProps(0)} />
                            <Tab label="Integration" {...a11yProps(1)} />
                        </Tabs>
                    </Box>


                        <div className="contentbreadcrumb">
                            <nav arial-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={goBack(pathname)} style={{ color: "var(--theme-blue", textTransform: "uppercase" }}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    {bread
                                        .filter((item) => item !== "")
                                        .map((item, idx) => (
                                            <li className="breadcrumb-item text-uppercase" key={idx}>
                                                <Link
                                                    style={{ color: "var(--theme-blue" }}
                                                    to={`${bread.slice(0, idx + 2).join("/")}`}
                                                >
                                                    {item.split("-").join(" ")}
                                                </Link>
                                            </li>
                                        ))}
                                </ol>
                            </nav>
                        </div>
                   

                    <TabPanel value={value} index={0}>
                        <section className="contenttop">
                            <div className="contentbutton">
                                <button className=''>Refresh</button>
                                <button className='' onClick={OpenToggle}>Add New +</button>
                            </div>

                        </section>

                        <main className='contentbody'>
                            {
                                fileData?.map(item=>(
                                    <FileCard {...item} key={item._id} />

                                ))
                            }
                        </main>

                        {/* <div className="contentbutton">
                            <button className=''>Open</button>
                            <div>
                                <IoMdCloudDownload />
                            </div>
                        </div> */}
                        <UploadForm isOpen={openUpload} setIsOpen={setOpenUpload} uploadType="content"  />
                        
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        Integration
                    </TabPanel>

                </Box>




            </div>
            <PopModalContent open={open} closeSmall={closeSmall} openUpload={setOpenUpload} setVideoOpen={setVideoOpen} setScreenOpen={setScreenOpen} />
        </>

    )
}




function FileCard({title, fileName, contentId}){
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState("")

    function openContent(){
        setOpen(true)
        setContent(fileName)
    }
    return (
        <div className="filecard">
            <div>
                <p>{title}</p>
                {/* <p>options</p> */}
            </div>
            <div>
                <i>
                    <a href={fileName} download>
                        <Tooltip title="download">
                            <IconButton>
                                <IoMdCloudDownload size="1.5rem"  color="var(--theme-blue)"/>
                            </IconButton>
                        </Tooltip>
                    </a>
                </i>
                <button onClick={openContent}>Open</button>
            </div>
            <ViewModal open={open} setOpen={setOpen} file={content} />
        </div>
    )
}

export function ViewModal({open, setOpen, file, creator, type}){
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
        p: 6,
        padding: "4rem 2rem",
      };
    
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
            <p>{file}</p>
            {
                type === "video/mp4" ? 
                <video src={`${process.env.REACT_APP_IMAGEURL}${file}`} controls autoPlay style={{width: "100%", height:"100%", border:"1px solid #eee", borderRadius:"8px"}}></video>            
                :
                <img src={creator ? `${process.env.REACT_APP_IMAGEURL}${file}` : file} alt="" className="w-100 h-100" style={{objectFit:"contain"}} />
            }
          </Box>
          </Modal>
    )
}