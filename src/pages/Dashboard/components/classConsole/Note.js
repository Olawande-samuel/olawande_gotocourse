import '../classConsole/Content.css'
import style from "./style.module.css"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";

import { useState } from 'react'
import Editor from '../Editor';
import { useAuth } from '../../../../contexts/Auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { KEY } from '../../../../constants';
import { useLocalStorage } from '../../../../hooks';
import { useEffect } from 'react';


import ReactQuill from 'react-quill';


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
                <Box sx={{ p: 2 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

export default function Note() {
    const [searchParams, setSearchParams] = useSearchParams();

    const {getItem} = useLocalStorage()
    const [value, setValue] = useState(0);
    const[formstate, setFormstate]= useState({
        body:"",
        title:""
    })
    const userdata = getItem(KEY)
    const [ note, setNote] = useState("")
    const { pathname } = useLocation();
    const bread = pathname?.split("/");
    const {consoleFunctions: {addNote, fetchNote}} = useAuth()
    const contentId = searchParams.get("content")

    const {classId} = useParams()


    const mutation = useMutation(([token, data])=> addNote(token, data), {
        onSuccess: (res)=> console.log({res}),
        onError: (err)=> console.error(err)
    })

    const noteQuery = useQuery(["fetch note", fetchNote, contentId, userdata.token],() => fetchNote(userdata.token, contentId), {
        onSuccess: (res)=> {
            console.log(res)
            if(res.data?.length > 0){
                setFormstate({...formstate, body: res.data[0].body})
                setNote(res.data[0].body)
            }else{
                setNote("")
            }
            
        }
    })

    useEffect(() => {
        setFormstate({...formstate, contentId, classId})
    
      return () => {
        
      }
    }, [contentId, classId])
    
    // const studentpath = pathname.split("/")[1] === "console";
    // const suite = pathname.split("/")[2] === "suite";
    // const classroom = pathname.split("/")[2] === "classroom";

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

    function handleSubmit(e){
        e.preventDefault()
        mutation.mutate([userdata.token, {...formstate, body: note}])
    }
    
    console.log({formstate})
    const [content, setContent] = useState("")

    return (
        <div className=''>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ marginBottom: "2rem"}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Note" {...a11yProps(0)} />
                        <Tab label="Integration" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                    {/* <div className="contentbreadcrumb">
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
                    </div> */}
              


                <TabPanel value={value} index={0}>
                    <small className='smallnote'>Make sure you constantly save your note as you type.</small>
                    <main className='note'>
                        
                        {
                            noteQuery.isLoading ? <div className="spinner-border text-primary">
                                <div className="visually-hidden">Loading...</div>
                            </div>
                            
                            :
                            <form  onSubmit={handleSubmit}>
                                <div className="texteditor">
                                    {/* <CKEditorContext context={Context}>
                                            <h2>Using the CKeditor 5 context featzure in React</h2>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                config={{
                                                    plugins: [Paragraph, Bold, Italic, Essentials],
                                                    toolbar: ['bold', 'italic']
                                                }}
                                                data="<p>Hello from the first editor working with the context!</p>"
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor1 is ready to use!', editor);
                                                }}
                                            />

                                        </CKEditorContext> */}
                                        <ReactQuill theme="snow" value={note} onChange={setNote} />
                                    <div className="notebtn">
                                        <button>{
                                                
                                                    mutation.isLoading ? <div className="spinner-border text-white">
                                                        <div className="visually-hidden">Loading</div>
                                                    </div>
                                                :
                                                <span>Save note</span>
                                            }</button>
                                    </div>
                                </div>
                            </form>
                        }








                    </main>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Integration
                </TabPanel>

            </Box>











        </div>


    )
}