
import '../classConsole/Content.css'
import { IoMdCloudDownload } from 'react-icons/io';
import { PopModalContent } from '.';
import { useState } from 'react';
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

export default function File() {
    const [open, setOpen] = useState(false);
    const OpenToggle = () => setOpen(!open)
    const closeSmall = () => setOpen(false);

    const [value, setValue] = useState(0);

    const { pathname } = useLocation();
    const bread = pathname?.split("/");


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


                        </main>

                        <div className="contentbutton">
                            <button className=''>Open</button>
                            <div>
                                <IoMdCloudDownload />
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        Integration
                    </TabPanel>

                </Box>




            </div>
            <PopModalContent open={open} closeSmall={closeSmall} />

        </>

    )
}