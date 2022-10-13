import '../classConsole/Content.css'
import style from "./style.module.css"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from "react-router-dom";

import { useState } from 'react'

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

export default function Note() {
    const [value, setValue] = useState(0);

    const { pathname } = useLocation();
    const bread = pathname?.split("/");


    const studentpath = pathname.split("/")[1] === "console";
    const suite = pathname.split("/")[2] === "suite";
    const classroom = pathname.split("/")[2] === "classroom";

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
    return (
        <div className=''>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ marginBottom: "2rem"}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Note" {...a11yProps(0)} />
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
                    <small className='smallnote'>Make sure you constantly save your note as you type.</small>
                    <main className='note'>
                        <div className="texteditor">
                            {/* <CKEditorContext context={Context}>
                                    <h2>Using the CKeditor 5 context feature in React</h2>
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

                            <CKEditor
                                editor={ClassicEditor}
                                data="<p>Hello from CKEditor 5!</p>"
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />

                            <div className="notebtn">
                                <button>Save note</button>
                            </div>

                        </div>






                    </main>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Integration
                </TabPanel>

            </Box>











        </div>


    )
}