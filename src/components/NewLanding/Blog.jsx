import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { useAuth } from "../../contexts/Auth";
import { ShareModal } from "../../pages/Events/articles";
import { ClassTypeComponent } from "./landingComponents";


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
  grid-auto-rows: 380px;
  overflow: hidden;
  gap: 2.5rem;
  row-gap: 3rem;
  justify-content: space-around;
  padding: .7rem .5rem;


  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
    justify-content: space-evenly;
    gap: 1rem;
  }
  @media screen and (max-width:500px){
        grid-template-columns: min(100%, 280px);
        justify-content:center;
    } 
`;






const Card = styled.div`
display: flex;
flex-direction:column;
flex-shrink:0;



a{
    height: 35%;
    // border: 2px solid red;

    img{
        width: 100%;
        max-height: 100%;
        // object-fit:cover;
        // object-position: top;
    }
}



.bottom{
    // padding: 0.5rem 0;
    height: 60%;
    display: flex;
    flex-direction:column;
    // border: 2px solid green;
    overflow: hidden;
    margin-top: unset;

    h5 {
        font-weight: 800;
        // text-transform: capitalize;
        font-size: 16px;
        margin-block: .7rem;
        cursor: pointer;

    }

    p{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        // line-height: 25px;
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
    // margin-inline: auto;
    // margin-top: 1.5rem;
    // padding-inline: 1rem;
    // border: 2px solid yellow;

    
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
    const [open, setOpen] = useState(false)
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
        <ClassTypeComponent {...data}>
            <Grid>
                {blogs.length > 0 && blogs.map(blog => (

                    <Card key={blog._id}>
                        <Link to={`/events&articles/articles/${blog?.title?.split(" ").join("-").replace('?', '')}/${blog?._id}`}>
                            <img src={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} alt="" />
                        </Link>
                        <div className="bottom">
                            <DateAndAction>
                                <span>
                                    <span style={{ color: "#4100FA" }}>{new Date(blog.createdAt).toLocaleDateString().split("/").join('.')}</span>
                                </span>
                                <span>
                                    <i><FaShareSquare style={{ color: "#0C2191", fontSize: "1rem", cursor: "pointer" }} onClick={() => setOpen(true)} /></i>
                                </span>
                            </DateAndAction>
                            <div >
                                <Link to={`/events&articles/articles/${blog?.title?.split(" ").join("-").replace('?', '')}/${blog?._id}`}>
                                    <h5>{blog.title}</h5>
                                </Link>
                                <p className="restricted_line" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                            </div>

                        </div>
                        <ShareModal x={blog} open={open} setOpen={setOpen} />
                    </Card>
                ))}
            </Grid>

        </ClassTypeComponent>

    )

}


const data = {
    header: "Gotocourse Events, News And Insights",
    content: [],

}