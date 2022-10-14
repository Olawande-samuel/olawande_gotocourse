import '../classConsole/Content.css'
import { NavLink, Outlet } from 'react-router-dom';
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


export function Processed() {
    return (
        <div className="suite__boxcontainer">
            {
                [...Array(4)].map((x, id) => (
                    <div className="suite__box">
                        <div className="suite__dots">
                        <i><BsThreeDotsVertical /></i>

                        </div>
                        <div className="suite__img">
                            <img src={processed} alt="" />
                        </div>
                        <p className='suite__title'>EXCEL CLASS. webm</p>
                        <span>Video/mp4</span>
                        <span>8/23/2022, 5:12:49 PM</span>
                        <p className='suite__title'>created in: IT AUDIT</p>
                        <div className="suite__btn">
                            <button>Add to classroom </button>
                            <button>Preview </button>

                        </div>

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

                    <button>Create new +</button>

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