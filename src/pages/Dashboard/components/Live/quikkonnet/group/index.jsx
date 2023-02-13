import { Box, Modal } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import { BiArrowBack, BiUserCircle } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { KEY } from '../../../../../../constants';
import { useAuth } from '../../../../../../contexts/Auth';
import { useLocalStorage } from '../../../../../../hooks';



const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(100% - .4rem, 500px)",
    background: "#fff",
    // borderRadius: "10px",
    boxShadow: 24,
    paddingTop: "2rem",
}


const Button = styled.button`
    width: 100%;
    padding-block: 8px;
    background-color: #005A8A;
    color: #fff;
    border: none;
    margin-top:"3rem";
    
`
const Content = styled.section`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 8rem;

    .group_img_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 11px;
        background-color: #E9E9E9;
        height: 6rem;
        width: 6rem;
        border-radius: 50%;
    } 
    
    p {
        color: #888888;
    }

    .input_container {
        width: 100%;
        display: grid;
        place-items: center;
    }
    input {
        border-radius: 20px;
        background: #E9E9E9;
        padding: 0.5rem 1rem;
        color: #888888;
        border: .5px solid #E9E9E9;
        outline-color: transparent;
        width: 70% !important;
        margin-inline:auto;
    }

`
const AddContent = styled.section`
    display: flex;
    flex-direction: column;
    padding-inline: 2rem;
    width: 90%;
    margin-inline: auto;
    margin-bottom: 8rem;

    .top_content {
        color: #000000;
        margin-bottom: 25px; 

        span {
            margin-left: 1.5rem;
            font-size: 21px;
            font-weight: 700;
        }
    }
    
    .input_container {
        margin-bottom: 30px;
        width: 100%;
        input {
            border-radius: 20px;
            background: #E9E9E9;
            padding: 1rem;
            color: #888888;
            border: .5px solid #E9E9E9;
            outline-color: transparent;
            width: 100% !important;
            margin-inline:auto;
        }
    }

`
const NameBox = styled.div`
    display: flex;
    gap: 1rem;
    padding-block: 1rem;
    align-items: center;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    
    p {
        font-size: 18px;
        line-height:25px;
    }

    input {
        margin-left: auto;
    }

`
export const CreateGroup = ({open, setOpen})=> {
    const [groupData, setGroupData] = useState({
        students:[],
        token:"",
    })
    const [page, setPage] = useState(0);
    const list = [GroupDetails , AddStudentToGroup]
    console.log({groupData})
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
                {
                    list?.filter((_, i) => i === page).map(Icon => (
                        <Icon  setPage={setPage} groupToken={groupData.token} groupData={groupData} setGroupData={setGroupData} />
                    ))
                }
            </Box>    
        </Modal>
    )
}




const GroupDetails = ({setPage, setGroupData}) => {
    const cloudinaryRef = useRef(null);
    const widgetRef = useRef(null);
    const {getItem} = useLocalStorage();
    const userdata = getItem(KEY)

    
    const {otherFunctions: {addNewFile}, teacherFunctions:{createNewGroup}} = useAuth()
    
    const [data, setData]= useState({})
    
    console.log({data})

    const createGroup = useMutation(([token, data])=>createNewGroup(token, data), {
        onSuccess: (res)=> {
            console.log(res)
            if(res.statusCode === 1){
                console.log({res})

                setGroupData((prev)=>{
                    return {
                        ...prev, token: res.data._id
                    }
                })
                setPage((prev)=> prev + 1)
            }
        },
        onError: err => console.error(err)
    })

    const addToFile = useMutation(([token, data])=> addNewFile(token, data), {
        onSuccess: (res)=> {
            console.log(res)
            if(res.statusCode === 1){
                console.log({res})
                // setUploadData(res.data)
                setData({...data, groupImage: res.data.fileId})
                console.log("setting done")
            }
        },
        onError: err => console.error(err)
    })

    
    useEffect(() => {
        cloudinaryRef.current = window?.cloudinary;
        console.log(cloudinaryRef?.current);
        widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: "ml_default",
            folder: "files",
            sources: ["local"]
        }, function (error, result) {
            if (result.event === "success") {
                console.log({result});
                console.log(result?.info);
                let ext = result?.info?.secure_url.split("/");
                let extension = ext[ext.length -1]
                console.log({extension});
                // setFileUrl(extension)
                // function onChange(e){
                //     setData((prev) => {
                //         return {
                //             ...prev,
                //             groupImg: extension
                //         }
                //     })
                // }
                addToFile.mutate([userdata.token, {
                    fileName: extension,
                    mimeType: result.info.resource_type +"/"+ result.info.format,
                    fileSize: result.info.bytes,
                    originalName:result.info.public_id.split("/")[1],
                    location:"/files",
                    uploadedBy:userdata.id
                }])
              
                return;
            }
            console.log(error);
        })
    }, [])



    function onChange(e){
        setData((prev) => {
            return {
                ...prev,
                title: e.target.value
            }
        })
    }



    function handleSubmit(){
        createGroup.mutate([userdata.token, data]) 
    }

  return (
    <>
      <Box>
        <Content>
            <div className="group_img_wrapper">
                <BiUserCircle size="5rem" color="#888888" />    
            </div>
            <p style={{color:"#888888"}} onClick={()=> widgetRef?.current.open()}>Upload Group image</p>
            <div className="input_container">
                <input type="text" name="title" id="name" placeholder='Group name' onChange={onChange} value={data.title} />
            </div>
        </Content>
        <Button onClick={handleSubmit}>
            {
                createGroup?.isLoading ?
                <span className="spinner-border text-white"><span className="visually-hidden">Loading...</span></span>
                :
                <span>Next</span>
            }
        </Button>
      </Box>
      </>
  )
}



const AddStudentToGroup = ({setPage, data, groupData, setGroupData}) => {


    const {teacherFunctions:{fetchBootcampApplications, addStudentGroup}} = useAuth()
    const {getItem} = useLocalStorage()
    const userdata = getItem(KEY)
    const {id} = useParams()


    const getStudents = useQuery(["fetch student list"], ()=>fetchBootcampApplications(userdata.token, id), {
        onSuccess: res => {
            console.log({res})
        },
        onError: err => {console.error(err)}

    })


    const addStudents = useMutation(([token, id, data]) => addStudentGroup(token, id, data), {
        onSuccess: res => {
            console.log(res)
        },
        onError: err => {console.error(err)}
    })



    function submit(e){
        e.preventDefault()
        addStudents.mutate([userdata?.token, groupData?.token, groupData?.students])
    }
    return (
        <>
            <Box>
                <AddContent>
                    <div className="top_content">
                        <BiArrowBack size="1.5rem" onClick={()=>setPage((prev)=> prev - 1)} style={{cursor:"pointer"}} />
                        <span>Add group participants</span>
                    </div>
                    <div className="input_container">
                        <input type="search" name="name" id="name" placeholder="Type name" />
                    </div>
                    <div className="student_list_conat">
                        {
                            getStudents?.data?.data?.map(student => (
                                <StudentListBox setData={setGroupData} {...student} />
                            ))
                        }
                    </div>
                </AddContent>
                <Button onClick={submit}>
                {
                addStudents?.isLoading ?
                <span className="spinner-border text-white"><span className="visually-hidden">Loading...</span></span>
                :
                <span>Done</span>
            }
                </Button>
            </Box>
        </>

    )
}

const StudentListBox = ({setData, data, studentName, studentId, studentImg})=>{

    function onChange(e){
        console.log(e)
        setData((prev) => {
            return {
                ...prev,
                students: [...prev.students, e.target.value]
            }
        })
    }
    return (
        <NameBox>
            {
                studentImg ? 
                <img src={studentImg} alt="" />
                :
                <BiUserCircle size="50px" />
            }
            <p>{studentName}</p>
            <input type="checkbox" name="" id="" onClick={onChange} value={studentId} />
        </NameBox>
    )
}
export default GroupDetails