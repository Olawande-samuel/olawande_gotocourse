import '../classConsole/Content.css'
import { NavLink, Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react'
import processed from '../../../../images/processed.png'
import {
    BsThreeDotsVertical,
  } from "react-icons/bs";
  import { AiOutlineSearch } from 'react-icons/ai';
  import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuItem } from '@mui/material';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { BiVideoRecording } from 'react-icons/bi';
import { MdPresentToAll } from 'react-icons/md';
import { UploadFormContent } from './components/upload';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdvancedError } from '../../../../classes';
import { useLocalStorage } from '../../../../hooks';
import { getDate, getTime, KEY } from '../../../../constants';
import { useAuth } from '../../../../contexts/Auth';
import { ViewModal } from './File';


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


    function openPreview(e){
        e.preventDefault()
        setOpen(true)
    }

    return (
        <div className="suite__boxcontainer">
            {
                data?.map((x, id) => (
                    <div className="suite__box">
                        <div className="suite__dots">
                        <i><BsThreeDotsVertical /></i>

                        </div>
                        <div className="suite__img">
                            <img src={processed} alt="" />
                        </div>
                        <p className='suite__title'>{x.originalName}</p>
                        <span>{x.type}</span>
                        <span>{x.updatedAt ? getDate(x.updatedAt) : ""}</span>
                        {/* <p className='suite__title'>created in: IT AUDIT</p> */}
                        <div className="suite__btn">
                            <button>Add to classroom </button>
                            <button onClick={openPreview}>Preview </button>

                        </div>
                        <ViewModal open={open} setOpen={setOpen} file={x.name} creator={true} />

                    </div>

                ))
            }
        </div>
    )
}

export function Pending() {
    return (
        <div className="suite__boxcontainer">
            {
                [...Array(4)].map((x, id) => (
                    <div className="suite__box">
                        <p className='suite__title'>recording-1661271168971</p>
                        <p className='suite__p'>8/23/2022, 5:12:49 PM</p>
                        <button className='blue__button'>Process recording</button>

                    </div>

                ))
            }
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
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setIsOpen(true)
      setAnchorEl(null);
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
                content.map(({title, id, icon:Icon}) =>(
                    <MenuItem onClick={handleClose} key={id}>
                        <i><Icon /></i>
                        <span className="ms-3">{title}</span>
                    </MenuItem>
                ))
            }
        </Menu>
        <UploadForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
    const contentId = searchParams.get("content")

    const {classId} = useParams()

    async function uploadFileHandler(e){
        try{
            setLoading(true)
            const formdata = new FormData();
            formdata.append('file', file, file.name);
            const res = await uploadFile(formdata, value?.token);
            setLoading(false)

            const {success, message, statusCode} = res;
            if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
            else {

                const {data} = res;
                createFileContent(data.fileId)
                setIsOpen(false)
                setData(_ => data.name);
                toast.success(message)
            }
        }catch(err){
            console.error(err.statusCode)
            setLoading(false)
            toast.error(err.message)
            if(err.statusCode === 2){
                localStorage.clear()
                // navigate("/")
            }
        }

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
            />
        )
    )
}