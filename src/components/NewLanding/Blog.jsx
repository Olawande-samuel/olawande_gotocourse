import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { useAuth } from "../../contexts/Auth";

const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;
// justify-content: space-evenly;
gap:1rem 4rem;
padding-bottom: 5rem;
width: 100%;

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
    padding: 0.5rem 0;
    height: 50%;

    h4{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        color: #252525;
        font-size: clamp(1rem, 0.9821rem + 0.0893vw, 1.125rem);
    }

    p{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        line-height: 25px;
        color: #86868B;
        font-size: clamp(0.75rem, 0.7321rem + 0.0893vw, 0.875rem);
    }

   

}

`

export const DateAndAction = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:min(100%, 800px);
    margin-inline: auto;
    margin-top: 1.5rem;
    // padding-inline: 1rem;
    
    > span:first-child {
        font-size: 12px;
        font-weight: 600;
        color: #464646;
        display:flex;
        justify-content: space-between;
        align-items: center;
        gap: .7rem;
    }

    > span:last-child {
        padding: 8px 10px;
        color: #fff;
        border-radius: 8px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.4rem;
    }

`

export const Blog = () => {
    // const [blog, setBlog] = useState({})
    const [blogs, setBlogs] = useState([])
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { getABlog, getBlogs } } = useAuth();

    // const blogData = useQuery(["fetch classes", id], () => getABlog(id), {
    //     onSuccess: (res) => {
    //         if (res.data) {
    //             // console.log("data", res.data);
    //             setBlog(res.data)

    //         }
    //     }
    // })

    const blogsData = useQuery(["fetch list blogs"], () => getBlogs(), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                console.log("data", res.data);
                setBlogs(res.data)

            }
        }
    })

    return (
        <div className="container">
            <CardContainer>
                {blogs.length > 0 && blogs.map(blog => (

                    <Card key={blog._id}>
                        <Link to={`${blog._id}`}>
                            <div className="top">
                                <img src={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} alt="" />

                            </div>
                        </Link>
                        <DateAndAction>
                            <span>

                                <span style={{ color: "#4100FA" }}>{new Date(blog.createdAt).toLocaleDateString().split("/").join('.')}</span>
                            </span>
                            <span>
                                <i><FaShareSquare style={{ color: "#0C2191", fontSize: "2rem" }} /></i>
                            </span>
                        </DateAndAction>
                        <div className="bottom">
                            <h4>{blog.title}</h4>
                            <p className="restricted_line" dangerouslySetInnerHTML={{ __html: blog.content }}></p>


                        </div>


                    </Card>
                ))}
            </CardContainer>

        </div>

    )

}
