import { useEffect, useState } from "react"
import styled from "styled-components"
import { Admin } from "../../Admin"
import { Button } from "@mui/material"
import { BiCloudDownload, BiTrash } from "react-icons/bi"
import { useLocalStorage } from "../../../../hooks"
import { KEY } from "../../../../constants"
import { useAuth } from "../../../../contexts/Auth"
import { AdvancedError } from "../../../../classes"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { RiDeleteBinFill } from "react-icons/ri"
import UploadForm from "../../../../components/UploadForm"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const Form = styled.section`
padding: 1rem;  
// border: 2px solid red;
overflow-y: scroll;

form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    label{
        color: #000F62;
        font-size: 14px;
        line-height: 27px;
    }
    
    
   select, input{
        width: 100%;
        padding: .5rem ;
        background: #FAFAFA;
        border: 1px solid rgba(188, 183, 183, 0.5);
        border-radius: 10px;
        outline: none;
    }
    
    textarea{
        width: 100%;
        height: 150px;
        background: #FAFAFA;
        border: 1px solid rgba(188, 183, 183, 0.5);
        border-radius: 10px;
        outline: none;
        padding: .5rem ;
    
    }

    .presenters{
        display: flex;
    flex-direction: column;
    gap: 2rem;
    }
}




`

const DateTime = styled.div`
width: 100%;
display: flex;
align-items: center;
gap: 2rem;
// justify-content: space-between;
// border: 2px solid red;


label, input{
    width: 40%;
}

select{
    width: 40%;
}


`

const Container = styled.section`
overflow-y: scroll;
padding-top:.6rem;
`

export const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border: 2px solid red;

    label{
        color: #595959;
        font-size: 14px;
    line-height: 19px;
    }

    input{
        width: 300px;
        padding: .5rem;
        border: .2px solid ;
        margin-left: 1rem;
    }

    button{
        border: none;
        outline: none;
        border-radius: 5px;
        a{
            color: #fff;
            background: #0C2191;
            padding:.8rem 1rem;
            border-radius: 5px;
        }
    }

    @media (max-width: 768px){
        flex-direction: column;
        gap: 2rem;

        input{
            width: unset;
            margin-left: 1rem;
        }
}
`

const WebinarContent = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 1rem;


.webinartop{
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    div:nth-of-type(1){
        flex: .3;
    };

    div:nth-of-type(2){
        flex: .15;
    };
    div:nth-of-type(3){
        flex: .2;
    };
    div:nth-of-type(4){
        flex: .3;
    };
    div:nth-of-type(5){
        flex: .1;
    };

    div:nth-of-type(6){
        flex: .1;
    };


    @media (max-width: 768px){
        flex-direction: column;
    }
}

.webinarcontent{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;

    .webinaritem{
        display: flex;
        align-items: center; 
        
        div:nth-of-type(1){
            flex: .3;
        };
    
        div:nth-of-type(2){
            flex: .15;
        };
        div:nth-of-type(3){
            flex: .2;    
        };
        div:nth-of-type(4){
            flex: .3;
    
        };
        div:nth-of-type(5){
            flex: .1;
            color: #087118;
            cursor: pointer;
          
        };
        div:nth-of-type(6){
            flex: .1;
            color: #C41000; 
            cursor: pointer;
   
        };
    }


    @media (max-width: 768px){
        .webinaritem{
            flex-direction: column;

        }
    }
    
}




`

const Tags = styled.div`


`

const initialState = {
    title: "",
    description: "",
    status: "",
    price: "",
    tags: [],
    date: "",
    time: "",
    webinarImg: "",
    presenters: [
        {
            presenterName: "",
            presenterDesc: "",
            presenterImg: ""
        }
    ]

}
export const AdminWebinar = () => {
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [edit, setEdit] = useState(false)
    const [tag, setTag] = useState("")


    let navigate = useNavigate()


    const [formState, setFormState] = useState(initialState)
    const location = useLocation()
    const id = location.state && location.state.id
    // console.log({id});

    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { getWebinar, addWebinar, updateWebinar } } = useAuth();

    const Submit = async (e) => {
        e.preventDefault();
        if (edit) {
            setGeneralState({ ...generalState, loading: true })
            try {
                const response = await updateWebinar(userdata?.token, id, formState)
                const { success, message, statusCode } = response
                if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
                const { data } = response
                setEdit(false)
                setFormState(initialState)
                navigate('/admin/webinar')
                // console.log({ data });
            } catch (error) {
                console.error(error)
            } finally {
                setGeneralState({ ...generalState, loading: false })

            }
        } else {

            setGeneralState({ ...generalState, loading: true })
            try {
                const response = await addWebinar(userdata?.token, formState)
                const { success, message, statusCode } = response
                if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
                const { data } = response
                // console.log({ data });
                setFormState(initialState)
                navigate('/admin/webinar')
            } catch (error) {
                console.error(error)
            } finally {
                setGeneralState({ ...generalState, loading: false })

            }
        }

    }





   

    const handleRemoveTagClick = (id) => {
        const list = { ...formState }
        list.tags.splice(id, 1)
        setFormState(list)
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = { ...formState }
        list.presenters[index][name] = value;
        // console.log(list);
        setFormState(list)
    }

    const handleAddClick = (e) => {
        e.preventDefault()
        setFormState(
            {
                ...formState,
                presenters: [
                    ...formState.presenters,
                    {
                        presenterName: "",
                        presenterDesc: "",
                        presenterImg: ""
                    }

                ]
            }
        )

    }

    const handleRemoveClick = (id) => {
        const list = { ...formState }
        list.presenters.splice(id, 1)
        setFormState(list)
    }

    function showUploadFormHandler() {
        setOpen((_) => true);
    }


    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const res = await getWebinar(userdata?.token);
                    const { message, success, statusCode } = res;
                    if (!success) throw new AdvancedError(message, statusCode);
                    else if (statusCode === 1) {
                        const { data } = res;
                        // console.log({data});
                        let found = data.find((d) => d._id === id);
                        if (found) {
                            setEdit(true)
                            // console.log({found});
                            // setFormState(found)
                            setFormState({ ...formState, ...found });
                        }
                    } else {
                        throw new AdvancedError(message, statusCode);
                    }
                } catch (err) {
                    console.log(err);
                } finally {

                }
            })();

        }
        return () => console.log("Removing");
    }, [id])

    // console.log({ formState });
    return (
        <Admin>
            <Form >

                <form>

                    <label htmlFor="title">Webinar title
                        <input type="text"
                            name="title"
                            value={formState.title}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </label>

                    <label htmlFor="description">Description:
                        <textarea
                            name="description"
                            value={formState.description}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}></textarea>
                    </label>

                    <Button variant="contained" component="label" style={{ width: "50%", color: "#FFFFFF", background: "#0C2191" }} onClick={showUploadFormHandler}>
                        <BiCloudDownload style={{ fontSize: "2rem", color: "#FFFFFF" }} /> Upload
                        {/* <input hidden accept="image/*" multiple type="file"/> */}
                    </Button>

                    <UploadForm
                        isOpen={open}
                        setIsOpen={setOpen}
                        setPreviewImage={setPreviewImage}
                    />
                    <label htmlFor="title">Webinar Image Url
                        <input type="text"
                            name="webinarImg"
                            value={formState.webinarImg}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </label>



                    <DateTime>
                        <label htmlFor="title">Date
                            <input type="date"
                                name="date"
                                value={formState.date}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                            />
                        </label>
                        <label htmlFor="time">Time
                            <input
                                type="time"
                                name="time"
                                value={formState.time}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                            />
                        </label>

                    </DateTime>

                    <DateTime>
                        <label htmlFor="status">Status:
                            <select
                                name="status"
                                value={formState.status}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                            >
                                <option value="">Pick a Type</option>
                                <option value="Online">Online</option>
                                <option value="Physical">Physical</option>
                            </select>

                        </label>

                        <label htmlFor="price">Price:
                            <input
                                name="price"
                                value={formState.price}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })} />
                        </label>



                    </DateTime>

                    <label htmlFor="tags">Tags:
                        <input
                            name="tags"
                            value={tag}
                            onChange={e => setTag(e.target.value)}
                        />
                    </label>

                    <Button variant="contained" component="label" style={{ width: "200px", background: "#FFFFFF", color: "#0C2191", border: "1px solid #0C2191" }}
                        onClick={(e) => {
                            e.preventDefault();
                            setFormState({
                                ...formState,
                                tags: [...formState.tags, tag]
                            })
                            setTag("")
                        }}>
                        Add Tags
                    </Button>
                    <Tags>

                    {
                        formState.tags.length > 0 && formState.tags.map((x, i) => (
                            <p>#{x}  <RiDeleteBinFill style={{cursor: "pointer", color:"red", marginLeft: "2rem"}} onClick={() => handleRemoveTagClick(i)} /></p>
                        ))

                    }

                    </Tags>





                    <h3>Presenters</h3>

                    {formState.presenters?.map((x, id) => (
                        <div key={id} className="presenters">
                            <label htmlFor="presenterName">Name of presenter
                                <input
                                    type="text"
                                    name="presenterName"
                                    value={x.presenterName}
                                    onChange={e => handleInputChange(e, id)}
                                />
                            </label>

                            <label htmlFor="presenterDesc">Description of presenter
                                <input
                                    type="text"
                                    name="presenterDesc"
                                    value={x.presenterDesc}
                                    onChange={e => handleInputChange(e, id)}
                                />
                            </label>

                            <Button variant="contained" component="label" style={{ width: "50%", color: "#FFFFFF", background: "#0C2191" }} onClick={showUploadFormHandler}>
                                <BiCloudDownload style={{ fontSize: "2rem", color: "#FFFFFF" }} /> Upload
                                {/* <input hidden accept="image/*" multiple type="file"/> */}
                            </Button>

                            <label htmlFor="presenterImg">presenter Image
                                <input
                                    type="url"
                                    name="presenterImg"
                                    value={x.presenterImg}
                                    onChange={e => handleInputChange(e, id)}
                                />
                            </label>


                            {
                                formState.presenters.length !== 1 && <RiDeleteBinFill onClick={() => handleRemoveClick(id)} />

                            }

                            {
                                formState.presenters.length - 1 === id && <Button variant="contained" component="label" style={{ width: "200px", background: "#FFFFFF", color: "#0C2191", border: "1px solid #0C2191" }}
                                    onClick={(e) => handleAddClick(e)}>
                                    Add Presenter
                                </Button>

                            }
                        </div>

                    ))}





                    <Button variant="contained" component="label" style={{ color: "#FFFFFF", background: "#0C2191" }} onClick={(e) => Submit(e)}>
                        Save
                    </Button>



                </form>
            </Form>
        </Admin >
    )
}

export const MyWebinar = () => {
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { getWebinar, deleteBlog, updateBlog } } = useAuth();
    const [webinar, setWebinar] = useState({})
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);


    // let flag = useRef(false)
    const { id } = useParams()

    useEffect(() => {
        // if (flag.current) return;
        if (id) {
            (async () => {
                try {
                    const res = await getWebinar(userdata?.token);
                    const { message, success, statusCode } = res;
                    if (!success) throw new AdvancedError(message, statusCode);
                    else if (statusCode === 1) {
                        const { data } = res;
                        let found = data.find((d) => d._id === id);
                        setWebinar(found)
                    } else {
                        throw new AdvancedError(message, statusCode);
                    }
                } catch (err) {
                    console.log(err);
                } finally {

                }
            })();

        }
        // flag.current = true;
        return () => console.log("Removing");
    }, [id])
    return (
        <Admin>
            <Container>
                <div className="imgcontainer">
                    <img src={`${process.env.REACT_APP_IMAGEURL}${webinar.webinarImg}`} alt="" />
                </div>
                <h4>{webinar.title}</h4>
                <p>{webinar.description}</p>

            </Container>

        </Admin>
    )
}


export const AdminWebinarDashboard = () => {
    const { getItem } = useLocalStorage();
    const queryClient = useQueryClient()
    const [webinars, setWebinars] = useState([])
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { getWebinar, deleteWebinar } } = useAuth();
    let navigate = useNavigate()

    const webinarData = useQuery(["fetch classes"], () => getWebinar(userdata?.token), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                // console.log("data", res.data);
                setWebinars(res.data)

            }
        }
    })

    const updateWebinarFunc = async (id) => {
        navigate(`create?id=${id}`, {
            state: {
                id
            }
        })

    }



    const deleteWebinarFunc = async (id) => {
        setGeneralState({ ...generalState, loading: true })
        try {
            const response = await deleteWebinar(userdata?.token, id)
            const { success, message, statusCode } = response
            if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
            const { data } = response
            queryClient.invalidateQueries(["fetch classes"])

            // console.log({ data });
        } catch (error) {
            console.error(error)
        } finally {
            setGeneralState({ ...generalState, loading: false })

        }
    }
    return (
        <Admin>
            <Container>
                <Header>
                    <div>
                        <label htmlFor="filter">Filter By:
                            <input type="search" placeholder="search" />
                        </label>
                    </div>

                    <button>
                        <Link to={`create`}>
                            Create Webinar
                        </Link>
                    </button>
                </Header>

                <WebinarContent>

                    <div className="webinartop">
                        <div>Name</div>
                        <div>Date</div>
                        <div>Time</div>
                        <div>Presenter(s)</div>
                        <div />
                        <div />
                    </div>
                    <div className="webinarcontent">

                        {webinars.length > 0 && webinars.map((x, id) => (
                            <div className="webinaritem" key={x._id}>
                                <div>{x.title}</div>
                                <div>{new Date(x.date).toLocaleDateString()}</div>
                                <div>{x.time}</div>
                                {/* <div>{x.presenters[0].presenterName} </div> */}
                                <div>
                                    {x.presenters.length > 0 && x.presenters.map((presenter, id) =>
                                        <span style={{ display: "block", textTransform: "capitalize" }}>{presenter.presenterName}</span>
                                    )}
                                </div>

                                <div onClick={() => updateWebinarFunc(x._id)}>Edit</div>
                                <div onClick={() => deleteWebinarFunc(x._id)}>Delete</div>
                            </div>
                        ))}
                    </div>

                </WebinarContent>

            </Container>
        </Admin>

    )
}