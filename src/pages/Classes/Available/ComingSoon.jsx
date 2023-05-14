import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../../components/Layout";
import { KEY } from "../../../constants";
import { useAuth } from "../../../contexts/Auth";
import { useLocalStorage } from "../../../hooks";
import coming from "../../../images/coming_soon.png"



const Coming = styled.section`
    footer, .end {
        display: none;
    }

`
const Section = styled.section`
    height: 100vh;
    padding-block: 3rem;
    background:url(${coming});
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    place-items: center;


`

const Content = styled.div`
    width: min(100% - .3rem, 700px);
    margin-inline:auto;
    display: grid;
    place-items:center;
    color: #fff;
    text-align:center;

    h1{
        font-size: clamp(2.075rem, 1.5536rem + 1.6071vw, 4rem);
        text-align:center;
        margin-bottom: 2rem;
    }

    > div {
        
        p{
            font-weight: 300;
            font-size: clamp(1.075rem, 1.5536rem + 1.6071vw, 1.3rem);
            margin-bottom: 0;
        }

        h3 {
            color: #F75C4E;
            font-size: clamp(1.875rem, 1.5536rem + 1.6071vw, 2.8rem);
            font-weight: 700;
        }

        margin-bottom: 2rem;
    }
    > div:last-child {
        
        p{
            font-weight: 300;
            font-size: clamp(1.075rem, 1.5536rem + 1.6071vw, 1.3em);
            margin-bottom: 1rem;
        }

        button {
            background: #F75C4E;
            color: #fff;
            padding: 10px 24px;
            border: none;
            outline: none;
            border-radius: 8px;
        }

        a button {
            background: #fff;
            color: #F75C4E;
        }

        margin-bottom: 2rem;
    }

`

const ComingSoon = ({student}) =>{
    const {getItem} = useLocalStorage()
    const {otherFunctions:{},studentFunctions:{addwishlistCourse, deleteFromWishlist, fetchWishlist}} = useAuth()
    const [userList, setUserList] = useState({})
    const [listed, setListed] = useState(false)

    const userdata = getItem(KEY)
    const {id} = useParams()
    
    const wishlist = useQuery(["fetch user bootcamp", userdata.token], ()=>fetchWishlist(userdata.token),{
        onSuccess: (res)=>{
            if(res.data?.length > 0){
                setUserList(res.data?.find(item=>item.courseId === id))
            }
        }
    })



    
    const mutation = useMutation(([id, token])=>addwishlistCourse(id, token), {
        onSuccess: (res)=> {
            if(res.data.success){
                setListed(true)
            }
            
        },
        onError: (err)=> console.log(err)
    })
    const deleteMutation = useMutation(([token, id])=>deleteFromWishlist(token, id), {
        onSuccess: (res)=> {
            if(res.data.success){
                setListed(true)
            }
            
        },
        onError: (err)=> console.log(err)
    })


    function addToWishList(e){
        e.preventDefault();
        mutation.mutate([id, userdata.token])
    }
    function deleteWishList(e){
        e.preventDefault();
        deleteMutation.mutate([userdata.token, id])
    }
    
    return (
        <Coming>
            <Layout>
                <Section>
                    <Content>
                        <h1>Thank you for choosing to learn with Gotocourse.</h1>
                        <div>
                            {
                                student ? <p>Enrollment starts</p>:<p>Enrollment for this course starts</p>
                            }
                            <h3>January 5, 2023</h3>
                        </div>
                        <div>
                            {
                                !student &&

                                <p>You can add this course to your wishlist</p>
                            }

                            <div className="d-flex" style={{gap:"1.5rem"}}>
                                {
                                    !student &&

                                    <>

                                        {   
                                            userList?.courseId  ? 

                                            <button onClick={deleteWishList} disabled={ deleteMutation.isLoading }> 
                                                {
                                                    deleteMutation.isLoading ? <div className=" mb-0 spinner-border text-white">
                                                        <div className="visually-hidden">Loading...</div>
                                                    </div>
                                                    :
                                                    <span>Remove from Wishlist</span>
                                                }
                                            </button>
                                            :
                                            <button onClick={addToWishList} disabled={ mutation.isLoading }> 
                                                {
                                                    mutation.isLoading ? <div className=" mb-0 spinner-border text-white">
                                                        <div className="visually-hidden">Loading...</div>
                                                    </div>
                                                    :
                                                    <span>Add to wishlist</span>
                                                }
                                            </button>


                                        }
                                    </>
                                }


                                <Link to="/">
                                    <button>Home</button>
                                </Link>
                            </div>
                        </div>

                    </Content>
                </Section>
            </Layout>
        </Coming>
    )
}

export default ComingSoon;