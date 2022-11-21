import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { BiCloudDownload } from "react-icons/bi"
import styled from "styled-components"
import { AdvancedError } from "../../../../classes"
import { KEY } from "../../../../constants"
import { useAuth } from "../../../../contexts/Auth"
import { useLocalStorage } from "../../../../hooks"
import { Admin } from "../../Admin"
import { Header } from "../webinar"

const Container = styled.div`
overflow-y: scroll;

`

const CardContainer = styled.div`
display: flex;
gap: 2rem;
overflow-y: scroll;

`

const Card = styled.div`
flex-shrink: 0;
width: 15rem;
height: 20rem;
border: 1px solid black;
display: flex;
flex-direction: column;
cursor: pointer;

.top{
    flex: .4;
    border: 2px solid red;
    height: 100%;

    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.bottom{
    flex: .6;
    border: 2px solid green;
    height: 100%;
    padding: .5rem;

    .blogbutton{
        display: flex;
        align-items: center;
        gap: 1rem;


        button{
            border: 1px solid black;
            outline: none;
            padding: .5rem 1rem;
        }

        button:nth-of-type(1){
        background: #0C2191;
        color: white;

        }

        button:nth-of-type(2){
            background: red;
            color: white;
        }

    }

}

`

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
    return (
        <Admin>
        <Container>
            <h4>Title</h4>
            <p>
            Description

            </p>



        </Container>

        </Admin>
    )
}
export const BlogDashboard = () => {
    const { getItem } = useLocalStorage();
    const [blogs, setBlogs] = useState([])
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { getBlog } } = useAuth();

    // const blog = useQuery(["fetch classes"], () => getBlog(), {
    //     onSuccess: (res) => {
    //         if (res.data.length > 0) {
    //             console.log("data", res.data);

    //         }
    //     }
    // })

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
                <Link to={`id`}>
              
                <Card>
                    <div className="top">
                        <img src="" alt="" />

                    </div>
                    <div className="bottom">
                        <h4>Title</h4>
                        <p className="restricted_line">description</p>

                        <div className="blogbutton">
                            <button>Update</button>
                            <button>delete</button>
                        </div>

                    </div>


                </Card>
                </Link>
            </CardContainer>

        </Admin>
    )
}


export const Blog = () => {

    const [formState, setFormState] = useState({
        title: "",
        content: "",

    })

    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { addBlog } } = useAuth();

    const Submit = async (e) => {
        e.preventDefault();

        setGeneralState({ ...generalState, loading: true })
        try {
            const response = await addBlog(userdata?.token, formState)
            const { success, message, statusCode } = response
            if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
            const { data } = response
            console.log({ data });
        } catch (error) {
            console.error(error)
        } finally {
            setGeneralState({ ...generalState, loading: false })

        }

    }



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
                        <textarea name="content"
                            value={formState.content}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}></textarea>
                    </label>

                    <label htmlFor="upload">Upload</label>
                    <Button variant="contained" component="label" style={{ width: "50%", color: "#FFFFFF", background: "#0C2191" }}>
                        <BiCloudDownload style={{ fontSize: "2rem", color: "#FFFFFF" }} /> Upload
                        <input hidden accept="image/*" multiple type="file"
                        />
                    </Button>


                    <Button variant="contained" component="label" style={{ color: "#FFFFFF", background: "#0C2191" }} onClick={(e) => Submit(e)}>
                        Publish
                    </Button>



                </form>
            </Form>
        </Admin>
    )
}