import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import vector from "../../../../images/vector.png";
import {Admin} from "../index"
import clsx from "../styles.module.css";

import {UploadImageIcon} from "../../Teachers/CreateCourse"
import { useLocalStorage } from '../../../../hooks';
import { useAuth } from '../../../../contexts/Auth';
import { AdvancedError } from '../../../../classes';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export default function AdLeads() {
  const [value, setValue] = React.useState(0);

  const title= [
    {
      title:"Indemand",
      name:"Indemand",
    },
    {
      title:"Pathfinder",
      name:"Pathfinder",
    }, 
    {
      title:"Headstart",
      name:"Headstart",
    },
    {
      title:"Audit and Compliance",
      name:"Audit",
    }
  ]
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const {adminFunctions: {fetchLeads, exportLeads}} = useAuth()
  const {getItem} = useLocalStorage()
  const [loading, setLoading]= useState(false)
  const userdata = getItem("gotocourse-userdata")
  

  const fetchAdLeads = useQuery(["fetchAdLeads", userdata?.token], () =>fetchLeads(userdata.token),
    {
        enabled:userdata.token !== null,
        onSuccess: res=> {
          console.log(res)
        },
        onError: err=>{
          console.error(err)
        }
  })


  const exportToCsv = useMutation(exportLeads, {
    onSuccess: (res) => {
      console.log("csv", res)
    },
    onError: err=>{
      console.log(err)
    }
  })

  function exportCsv(e){
    e.preventDefault()

    exportToCsv.mutate(userdata.token)
  }



  console.log(fetchAdLeads?.data?.data)
  return (
    <Admin header="AdLeads">
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          {/* <h3>AdLeads</h3> */}
          <div className="row w-100 mt-4">      

              <Box sx={{ width: '100%' }}>

            {/* <div className="d-flex justify-content-end">
              {
                fetchAdLeads?.data?.data?.length > 0 &&
                <button className="btn-plain" onClick={exportCsv} disabled={exportToCsv?.isLoading}>
                  {

                    exportToCsv.isLoading ?

                    <div className="spinner-border text-primary">
                      <div className="visually-hidden">Loading...</div>
                    </div>
                    :
                    <span>Export to CSV</span>
                  
                  }
                </button>
              }
              
            </div> */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable">
                      {title.map((item, index)=> (
                        <Tab label={item.title} {...a11yProps(index)} />
                        ))}
                  </Tabs>
                </Box>
                {title.map((item, index)=>(
                  <TabPanel value={value} index={index}>
                    <HomepageHero name={item.name} />
                </TabPanel>
                ))}
              </Box>
            </div>
        </div>
      </div>
    </Admin>
  );
}


function HomepageHero({ name}){
  const {adminFunctions: {fetchLeads, exportLeads}} = useAuth()
  const {getItem} = useLocalStorage()
  const [loading, setLoading]= useState(false)
  const userdata = getItem("gotocourse-userdata")

  const [data, setData]= useState([]);
  
  const fetchAdLeads = useQuery(["fetchAdLeads", userdata?.token, name], ()=>fetchLeads(userdata.token),
    {
        enabled:userdata.token !== null,
        onSuccess: res=> {
            console.log(res)
            setData(res.data)

        },
        onError: err=>{
            console.error(err)
        }
  })


  const exportToCsv = useMutation(exportLeads, {
    onSuccess: (res) => {
      console.log("csv", res)
    },
    onError: err=>{
      console.log(err)
    }
  })

  function exportCsv(e){
    e.preventDefault()

    exportToCsv.mutate(userdata.token)
  }
  
  return(
    <div className="row">
      <div className="col-12">

       
        <div className="table-responsive">
            {
                fetchAdLeads?.isLoading ? 

                <div className="spinner-border text-primary">
                    <div className="visually-hidden">Loading...</div>
                </div>
                :
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Program</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data?.filter(item => item?.category === name).map((item, index) => (
                                <TableRow  index={index} item={item}  key={index} />
                            ))
                        }

                    </tbody>
                </table>
            }
        </div>
      </div>
    </div>
  )
}


function TableRow({item, index}){

  const queryClient = useQueryClient()
  const {adminFunctions: {deleteLead}} = useAuth()
  const {getItem} = useLocalStorage()
  const [loading, setLoading]= useState(false)
  const userdata = getItem("gotocourse-userdata")


  const deleteLeads = useMutation(([token, id])=>deleteLead(token, id),
    {
        onSuccess: res=> {
            console.log(res)
            queryClient.invalidateQueries(["fetchAdLeads"])
            toast.success(res.message)

        },
        onError: err=>{
            console.error(err)
        }
    })

  function handleDelete(){
    if(window.confirm("Are you sure you want to delete ?")){
      deleteLeads.mutate([userdata.token, item._id])
    }
  }

  return (
    <tr >
      <td>{index + 1}</td>
      <td>{new Intl.DateTimeFormat('en-US').format(new Date(item?.createdAt))}</td>
      <td>{item.fullName}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.program}</td>
      <td><button className="btn btn-outline-danger" onClick={()=>handleDelete()}>Delete</button></td>
  </tr>
  )
}