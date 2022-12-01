import { Button } from "@mui/material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { BiCloudDownload } from "react-icons/bi"
import styled from "styled-components"
import { AdvancedError } from "../../../../classes"
import { KEY } from "../../../../constants"
import { useAuth } from "../../../../contexts/Auth"
import { useLocalStorage } from "../../../../hooks"
import { Admin } from "../../Admin"
import { Header } from "../webinar"
import UploadForm from "../../../../components/UploadForm"
import { useEffect } from "react"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify"


const Container = styled.div`
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 1rem;

.imgcontainer{
    width: 100%;
    height: 300px;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position:top;

    }
}



`

const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 2rem;
overflow-y: scroll;
padding-bottom: 5rem;

@media (max-width: 768px){
    justify-content: center;
}

`

const Card = styled.div`
flex-shrink: 0;
width: 15rem;
height: 25rem;
box-shadow: 4px 1px 17px 0px rgba(0,0,0,0.3);
-webkit-box-shadow: 4px 1px 17px 0px rgba(0,0,0,0.3);
-moz-box-shadow: 4px 1px 17px 0px rgba(0,0,0,0.3);
border-radius:8px;
overflow: hidden;


a{
    width: 100%;
    height: 100%;
}

.top{
    // border: 2px solid red;
    width: 100%;
    height: 50%;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
    }
}

.bottom{
    padding: 0.5rem;
    height: 50%;

    position: relative;

    h4{
        font-size: clamp(1rem, 0.9821rem + 0.0893vw, 1.125rem);
    }

    p{
        font-size: clamp(0.75rem, 0.7321rem + 0.0893vw, 0.875rem);
    }

    .blogbutton{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        bottom: 5px;
        left: 0;
        right: 0;


        button{
            border: none;
            outline: none;
            border-radius:8px;
            padding: .5rem 1rem;
            font-size: 12px;

        }

        button:nth-of-type(1){
        background: #0C2191;
        color: white;

        }

        button:nth-of-type(2){
            background: var(--theme-orange);
            color: white;
        }

    }

}

`

const Form = styled.section`
padding: 1rem;
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
    
    
    input{
        width: 100%;
        padding: .5rem ;
        background: #FAFAFA;
        border: 1px solid rgba(188, 183, 183, 0.5);
        border-radius: 10px;
        outline: none;
    }
    
    textarea{
        width: 100%;
        height: 300px;
        background: #FAFAFA;
        border: 1px solid rgba(188, 183, 183, 0.5);
        border-radius: 10px;
        outline: none;
        padding: .5rem ;
    
    }
}




`

export const MyBlog = () => {
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { getBlog, deleteBlog, updateBlog } } = useAuth();
    const [blog, setBlog] = useState({})
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);


    let flag = useRef(false)
    const { id } = useParams()

    useEffect(() => {
        if (flag.current) return;
        if (id) {
            (async () => {
                try {
                    const res = await getBlog(userdata?.token);
                    const { message, success, statusCode } = res;
                    if (!success) throw new AdvancedError(message, statusCode);
                    else if (statusCode === 1) {
                        const { data } = res;
                        let found = data.find((d) => d._id === id);
                        setBlog(found)
                    } else {
                        throw new AdvancedError(message, statusCode);
                    }
                } catch (err) {
                    console.log(err);
                } finally {

                }
            })();

        }
        flag.current = true;
        return () => console.log("Removing");
    }, [id])
    return (
        <Admin>
            <Container>
                <div className="imgcontainer">
                    <img src={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} alt="" />
                </div>
                <h4>{blog.title}</h4>
                <p dangerouslySetInnerHTML={{__html: blog.content}}></p>

            </Container>

        </Admin>
    )
}
export const BlogDashboard = () => {
    const { getItem } = useLocalStorage();
    const queryClient = useQueryClient()
    const [blogs, setBlogs] = useState([])
    let navigate = useNavigate()
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { getBlog, deleteBlog, updateBlog } } = useAuth();

    const blogData = useQuery(["fetch classes"], () => getBlog(userdata?.token), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                // console.log("data", res.data);
                setBlogs(res.data)

            }
        }
    })


    const updateBlogFunc = async (id) => {
        navigate(`create?id=${id}`, {
            state: {
                id
            }
        })

    }

    const deleteBlogFunc = async (id) => {
        setGeneralState({ ...generalState, loading: true })
        try {
            const response = await deleteBlog(userdata?.token, id)
            const { success, message, statusCode } = response
            if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
            const { data } = response
            queryClient.invalidateQueries(["fetch classes"])

            // console.log({ data });
        } catch (error) {
            console.error(error)
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
            setGeneralState({ ...generalState, loading: false })

        }
    }

    return (
        <Admin>
            <Header>
                <div>
                    <label htmlFor="filter">Filter By:
                        <input type="search" placeholder="search" />
                    </label>
                </div>

                <button>
                    <Link to={`create`}>
                        Create Blog
                    </Link>
                </button>
            </Header>
            <CardContainer>
                { blogs.length > 0 &&  blogs.map(blog => (

                    <Card key={blog._id}>
                        <Link to={`${blog._id}`}>
                            <div className="top">
                                <img src={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} alt="" />

                            </div>
                        </Link>
                        <div className="bottom">
                            <h4>{blog.title}</h4>
                            <p className="restricted_line" dangerouslySetInnerHTML={{__html: blog.content}}></p>

                            <div className="blogbutton">
                                <button onClick={() => updateBlogFunc(blog._id)}>Edit</button>
                                <button onClick={() => deleteBlogFunc(blog._id)}>Delete</button>
                            </div>

                        </div>


                    </Card>
                ))}
            </CardContainer>

        </Admin>
    )
}


export const Blog = () => {
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [edit, setEdit] = useState(false)

    let flag = useRef(false)
    const [formState, setFormState] = useState({
        title: "",
        content: "",
        blogImg: ""
    })


    let navigate = useNavigate()
    const location = useLocation()
    const id = location.state && location.state.id

    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { addBlog, getBlog, updateBlog } } = useAuth();

    const Submit = async (e) => {
        e.preventDefault();

        if (edit) {
            setGeneralState({ ...generalState, loading: true })
            try {
                const response = await updateBlog(userdata?.token, id, formState)
                const { success, message, statusCode } = response
                if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
                const { data } = response
                setEdit(false)
                navigate('/admin/blog')
                // console.log({ data });
            } catch (error) {
                console.error(error)
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
                setGeneralState({ ...generalState, loading: false })

            }
        } else {
            setGeneralState({ ...generalState, loading: true })
            try {
                const response = await addBlog(userdata?.token, formState)
                const { success, message, statusCode } = response
                if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
                const { data } = response
                // console.log({ data });
                navigate('/admin/blog')

            } catch (error) {
                console.error(error)
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
                setGeneralState({ ...generalState, loading: false })

            }

        }


    }

    function showUploadFormHandler() {
        setOpen((_) => true);
    }

    // console.log({ id });
    // console.log({ edit });

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const res = await getBlog(userdata?.token);
                    const { message, success, statusCode } = res;
                    if (!success) throw new AdvancedError(message, statusCode);
                    else if (statusCode === 1) {
                        const { data } = res;
                        // console.log({data});
                        let found = data.find((d) => d._id === id);
                        if (found) {
                            setEdit(true)
                            // console.log({found});
                            setFormState(found)
                            // setFormState({ ...formState, ...found });
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

//    console.log({formState});

    return (
        <Admin>
            <Form >

                <form>

                    <label htmlFor="title">Blog Title
                        <input type="text"
                            name="title"
                            value={formState.title}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </label>
                    
                    <label htmlFor="content">Content

                    <CKEditor
                        editor={ClassicEditor}
                        data={formState.content}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);

                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log({ event, editor, data });

                            setFormState({ ...formState, ["content"]: data })
                            // setFormstate({...formstate, mentorBio: data})
                        }}
                    />
</label> 
                    <label htmlFor="upload">Upload</label>
                    <Button variant="contained" component="label" style={{ width: "50%", color: "#FFFFFF", background: "#0C2191" }} onClick={showUploadFormHandler}>
                        <BiCloudDownload style={{ fontSize: "2rem", color: "#FFFFFF" }} /> Upload
                        {/* <input hidden accept="image/*" multiple type="file"/> */}
                    </Button>

                    <UploadForm
                        isOpen={open}
                        setIsOpen={setOpen}
                        setPreviewImage={setPreviewImage}
                    />
                    <label htmlFor="title">Upload Link
                        <input type="text"
                            name="blogImg"
                            value={formState.blogImg}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </label>

                    <Button variant="contained" component="label" style={{ color: "#FFFFFF", background: "#0C2191" }} onClick={(e) => Submit(e)}>
                        Publish
                    </Button>



                </form>
            </Form>
        </Admin>
    )
}