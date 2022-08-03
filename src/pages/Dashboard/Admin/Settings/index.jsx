import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import vector from "../../../../images/vector.png";
import {Admin} from "../index"
import clsx from "../styles.module.css";
import adminClsx from "../../Teachers/styles.module.css"
import UploadForm from "../../../../components/UploadForm";
import Input from "../../../../components/Input";

import {UploadImageIcon} from "../../Teachers/CreateCourse"
import { useLocalStorage } from '../../../../hooks';
import { useAuth } from '../../../../contexts/Auth';
import { AdvancedError } from '../../../../classes';
import { toast } from 'react-toastify';

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
         {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = React.useState(0);
  const title= [
    {
      title:"Homepage Hero",
      hero: true,
      category:"LpHero"
    },
    {
      title:"Homepage Cohort",
      hero: false,
      category:"Cohort"
    }, 
    {
      title:"Homepage Self Paced" ,
      hero: false,  
      category:"selfPaced"
    },
    {
      title:"Teachers Hero",
      hero: true,
      category:"TpHero"
    }
  ]
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Admin header="Settings">
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          {/* <h3>Settings</h3> */}
          <div className="row w-100 mt-4">      
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable">
                      {title.map((item, index)=> (
                        <Tab label={item.title} {...a11yProps(index)} />
                        ))}
                  </Tabs>
                </Box>
                {title.map((item, index)=>(
                  <TabPanel value={value} index={index}>
                    <HomepageHero showButtons={item.hero} category={item.category} />
                </TabPanel>
                ))}
              </Box>
            </div>
        </div>
      </div>
    </Admin>
  );
}


function HomepageHero({showButtons, category}){
  const[formstate, setFormstate] = React.useState({})
  const [openImage, setOpenImage] = useState(false);
  const {adminFunctions: {AddLPHero, AddTPHero, AddCohortSection, AddSelfpacedSection}} = useAuth()
  const {getItem} = useLocalStorage()
  const [loading, setLoading]= useState(false)
  const userdata = getItem("gotocourse-userdata")
  function changeHandler(e){
    setFormstate({...formstate, [e.target.name]: e.target.value})
  }
  function showUploadFormHandler() {
    setOpenImage((_) => true);
  }

  
  async function onSubmit(e){
    e.preventDefault()
      try {
        setLoading(true)
        const response = category === "LpHero" ? await AddLPHero(formstate, userdata?.token): category === "TpHero" ? await AddTPHero(formstate, userdata?.token): category === "Cohort" ? await AddCohortSection (formstate, userdata?.token): await AddSelfpacedSection(formstate, userdata?.token)
        const { success, message, statusCode } = response;
        if (!success || statusCode !== 1)
          throw new AdvancedError(message, statusCode);
        const { data } = response;
        console.log(data)
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true, 
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false)
      }
    // } else if (category === "TpHero"){
  }
  return(
    <div className="row">
      <div className="col-lg-8">
        <form  className="form" onSubmit={onSubmit}>
        <UploadForm isOpen={openImage} setIsOpen={setOpenImage} />
        <div
          className={adminClsx.upload__file_box}
          onClick={showUploadFormHandler}
        >
          <img src={vector} alt={"Placeholder"} />
          <p>Upload Image</p>
        </div>
        <Input label="Image file name" name="image" type="text" value={formstate.image} handleChange={changeHandler} />
        <Input label="Heading" name="heading" type="text" value={formstate.heading} handleChange={changeHandler} />
        <div className="form-group my-2">
          <label htmlFor="description" className="form-label generic_label">Description</label>
          <textarea name="description" id="description" cols="10" rows="5" className="form-control"></textarea>
        </div>
        {showButtons &&
        <div className="form-group my-2">
          <label htmlFor="description" className="form-label generic_label d-block">Button Color</label>
          <div className="d-flex flex-wrap">
            <div>
              <input type="radio" name="buttonColor" id="orange" value={"#F75C4E"} handleChange={changeHandler} className="editsectionsradio" style={{color:"red"}} />
              <label htmlFor="orange" className="form-label generic_label ms-1" style={{color:"var(--theme-orange)"}}>Gotocourse Orange</label>
            </div>

            <div>
              <input type="radio" name="buttonColor" id="blue"  value={"#0C2191"} handleChange={changeHandler} className="ms-md-5" />
              <label htmlFor="blue" className="form-label generic_label ms-1" style={{color:"var(--theme-blue)"}}>Gotocourse Blue</label>
            </div>
          </div>
        </div>
        }
        <button
            className="btn btn-primary my-3"
            style={{ backgroundColor: "var(--theme-blue)" }}
            type="submit"
          >
            {loading ? 
            <div className="spinner-border text-light">
               <span className="visually-hidden">Loading...</span>
            </div>
           :
           "Save"
          }
          </button>
        </form>
      </div>
    </div>
  )
}