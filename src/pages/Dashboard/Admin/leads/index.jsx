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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { useMemo } from 'react';

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
    }
  )

  const exportToCsv = useMutation(exportLeads, {
    onSuccess: (res) => {
      console.log("csv", res)
    },
    onError: err=>{
      console.log(err)
    }
  })

  // function exportCsv(e){
  //   e.preventDefault()

  //   exportToCsv.mutate(userdata.token)
  // }

  function downloadCsv(data){
    const blob = new Blob([data], { type: "text/csv" })
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);       
  } 



  function exportCsv (e){
    e.preventDefault()
  
    let headers = ['Date, Name, Email, Phone, Program']

    let usersCsv = fetchAdLeads?.data?.data?.reduce((acc, item) => {
      const {createdAt, fullName, email, phone, program } = item
      acc.push([createdAt,fullName, email, phone, program].join(','))
      return acc
    }, [])
  
    let csvData = [...headers, ...usersCsv].join('\n')

    downloadCsv(csvData)
    
  }


  

  return (
    <Admin header="AdLeads">
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          {/* <h3>AdLeads</h3> */}
          <div className="row w-100 mt-4">      

              <Box sx={{ width: '100%' }}>

            <div className="d-flex justify-content-end">
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
              
            </div>
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
  const [value, setValue] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const dateFilter = useMemo(() => {
    if(value?.$d){
      return  new Intl.DateTimeFormat('en-US').format(new Date(value?.$d))
    } return ""
  } , [value?.$d])



  const fetchAdLeads = useQuery(["fetchAdLeads", userdata?.token, name], ()=>fetchLeads(userdata.token),
    {
        enabled:userdata.token !== null,
        onSuccess: res=> {
            setData(res.data)

        },
        onError: err=>{
            console.error(err)
        }
  })


  // const exportToCsv = useMutation(exportLeads, {
  //   onSuccess: (res) => {
  //     console.log("csv", res)
  //   },
  //   onError: err=>{
  //     console.log(err)
  //   }
  // })

  // function exportCsv(e){
  //   e.preventDefault()

  //   exportToCsv.mutate(userdata.token)
  // }
  
  
  const exportCsv = e => {
    e.preventDefault()
  
    // Headers for each column
    let headers = ['Date, Name, Email, Phone, Program']
  
    // Convert users data to a csv
    let usersCsv = data.reduce((acc, item) => {
      const {createdAt, fullName, email, phone, program } = item
      acc.push([createdAt,fullName, email, phone, program].join(','))
      return acc

    }, [])
  
    let csvData = [...headers, ...usersCsv].join('\n')


    const blob = new Blob([csvData], { type: "text/csv" })
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);         

    // downloadFile({
    //   data: [...headers, ...usersCsv].join('\n'),
    //   fileName: 'users.csv',
    //   fileType: 'text/csv',
    // })
  }


  return(
    <div className="row">
      <div className="col-12">

      <div className="mb-4 d-flex">
          <div className="">
              <input type="search" name="search" id="search" onChange={(e)=>setSearch(e.target.value)} value={search} className="p-2 rounded form-control " placeholder='search...'/>

          </div>
          <div className="ms-auto">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                      label="Filter by date"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider>

          </div>
      </div>
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
                            data?.filter(item => item?.category === name).filter(item => (new Intl.DateTimeFormat('en-US').format(new Date(item?.updatedAt)).includes(dateFilter)) && item.fullName.includes(search) ).map((item, index) => (
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