import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';


import { Admin } from "../../index"
import clsx from "../../styles.module.css";
import { useLocalStorage } from '../../../../../hooks';
import { useAuth } from '../../../../../contexts/Auth';
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

export default function Market() {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const { adminFunctions: { fetchLeads, exportLeads, fetchMarketingLeads } } = useAuth()
  const { getItem } = useLocalStorage()
  const [loading, setLoading] = useState(false)
  const userdata = getItem("gotocourse-userdata")
  const [data, setData] = useState([])


  const fetchAdLeads = useQuery(["fetchAdLeads", userdata?.token], () => fetchLeads(userdata.token),
    {
      enabled: userdata.token !== null,
      onSuccess: res => {
      },
      onError: err => {
        console.error(err)
      }
    }
  )
  const fetchMrktLeads = useQuery(["fetchAdLeads", userdata?.token], () => fetchMarketingLeads(userdata.token),
    {
      enabled: userdata.token !== null,
      onSuccess: res => {

        if (res?.success) {
          setData(res.data)
        }
      },
      onError: err => {
        console.error(err)
      }
    }
  )

  const exportToCsv = useMutation(exportLeads, {
    onSuccess: (res) => {
    },
    onError: err => {
      console.log(err)
    }
  })

  // function exportCsv(e){
  //   e.preventDefault()

  //   exportToCsv.mutate(userdata.token)
  // }

  function downloadCsv(data) {
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



  function exportCsv(e) {
    e.preventDefault()

    let headers = ['Date, Name, Email, Phone, Program']

    let usersCsv = fetchAdLeads?.data?.data?.reduce((acc, item) => {
      const { createdAt, fullName, email, phone, program } = item
      acc.push([createdAt, fullName, email, phone, program].join(','))
      return acc
    }, [])

    let csvData = [...headers, ...usersCsv].join('\n')

    downloadCsv(csvData)

  }




  return (
    <Admin header="Marketing Leads">
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          {/* <h3>AdLeads</h3> */}
          <div className="row w-100 mt-4">
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <MarketingLeads />
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </Admin>
  );
}

function MarketingLeads() {
  const { adminFunctions: { fetchMarketingLeads } } = useAuth()
  const { getItem } = useLocalStorage()

  const userdata = getItem("gotocourse-userdata")

  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const dateFilter = useMemo(() => {
    if (value?.$d) {
      return new Intl.DateTimeFormat('en-US').format(new Date(value?.$d))
    } return ""
  }, [value?.$d])


  const fetchMrktLeads = useQuery(["fetchAdLeads", userdata?.token], () => fetchMarketingLeads(userdata.token),
    {
      enabled: userdata.token !== null,
      onSuccess: res => {

        if (res?.success) {
          setData(res.data)
        }
      },
      onError: err => {
        console.error(err)
      }
    }
  )




  const exportCsv = e => {
    e.preventDefault()

    // Headers for each column
    let headers = ['Date, First name, Last name, Email, Phone, ']

    // Convert users data to a csv
    let usersCsv = data.reduce((acc, item) => {
      const { createdAt, firstName, lastName, email, phone } = item
      acc.push([createdAt, firstName, lastName, email, phone].join(','))
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


  }



  return (
    <div className="row">
      <div className="col-12">
        <button className="btn-plain mb-3" onClick={exportCsv}>Download Leads</button>
        <div className="mb-4 d-flex">
          <div className="">
            <input type="search" name="search" id="search" onChange={(e) => setSearch(e.target.value)} value={search} className="p-2 rounded form-control " placeholder='search...' />

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
            fetchMrktLeads?.isLoading ?

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
                    {/* <th>Program</th> */}
                  </tr>
                </thead>

                <tbody>
                  {
                    data?.filter(item => (new Intl.DateTimeFormat('en-US').format(new Date(item?.createdAt)).includes(dateFilter))).map((item, index) => (
                      <TableRow index={index} item={item} key={index} />
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


function TableRow({ item, index }) {

  const queryClient = useQueryClient()
  const { adminFunctions: { deleteLead, deleteMarket } } = useAuth()
  const { getItem } = useLocalStorage()
  const [loading, setLoading] = useState(false)
  const userdata = getItem("gotocourse-userdata")



  const deleteLeads = useMutation(([token, id]) => deleteLead(token, id),
    {
      onSuccess: res => {
        queryClient.invalidateQueries(["fetchAdLeads"])
        toast.success(res.message)

      },
      onError: err => {
        console.error(err)
      }
    })

  const deleteLandingPageLeads = useMutation(([token, id]) => deleteMarket(token, id),
    {
      onSuccess: res => {
        queryClient.invalidateQueries(["fetchAdLeads"])
        toast.success(res.message)

      },
      onError: err => {
        console.error(err)
      }
    })

  function handleDelete(value) {
    value ?
      deleteLandingPageLeads.mutate([userdata.token, item._id])
      :
      // if (window.confirm("Are you sure you want to delete ?")) {
      deleteLeads.mutate([userdata.token, item._id])


  }


  return (
    <tr >
      <td>{index + 1}</td>
      <td>{new Intl.DateTimeFormat('en-US').format(new Date(item?.createdAt))}</td>
      <td>{item?.fullName ? item.fullName : `${item.firstName} ${item.lastName}`}</td>
      <td>{item?.email}</td>
      <td>{item?.phone ? item.phone : item?.kyc ? item?.kyc[0]?.phone : ""}</td>
      <td>{item?.program}</td>
      <td><button className="btn btn-outline-danger" onClick={() => handleDelete(item.type === "campaign" ? true : false)}>Delete</button></td>
    </tr>
  )
}