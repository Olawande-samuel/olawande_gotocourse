import React, {useState} from "react";
import styled from "styled-components";
import {MdNavigateNext} from "react-icons/md";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Breadcrumbs, Skeleton } from "@mui/material";




import Layout from "../../../components/Layout";
import { useEffectOnMount, useLocalStorage } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import { AdvancedError } from "../../../classes";
import { capitalize, getDate, COURSE_CATEGORY_KEY } from "../../../constants";



const CategoryContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    jusitfy-content: center;
    padding: 20px 40px;

    @media screen and (max-width: 466px){
        padding: 20px;
    }
`;

const CategoryTop = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;

    @media screen and (max-width: 812px){
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0;
    }
`;

const BreadcrumbLink = styled(Link)`
    color: ${props => props.$isCurrentPage ? '#0C2191' : '#666363'};
    font-weight: 400;
    font-size: 1rem;
    cursor: ${(props) => props.$isCurrentPage ? 'not-allowed': 'pointer'};

    &:hover {
        color:#0C2191
    }
`


const Search = styled.section`
    display: flex;
    align-items: center;
    min-width: 280px;

    @media screen and (max-width: 466px){
        flex-direction: column;
        align-items: flex-start;
        gap:10px;
        margin-bottom: 20px;

        & button {
            margin: 0;
        }
    }
`


const SearchInput = styled.input`
    border: none;
    background-color: rgba(217, 217, 217, 0.4);
    border-radius: 10px;
    padding: 8px;
    line-height: 2;
    outline: none;
    min-width: 250px;
    color: #9F9F9F;
    font-weight: 700;
    font-size: 0.9rem;
`


const SearchButton = styled.button`
    border: none;
    outline: none;
    background-color: #0C2191;
    color: white;
    border-radius: 10px;
    padding: 10px 30px;
    font-size: 0.9rem;
    margin-left: 20px;
`

const CategoryBody = styled.div`
    width: 100%;
    padding: 0px;
    display: grid;
    grid-template-columns: 1fr;
`

const Card = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 10px;
    // height: calc(260px + 40px);

    @media screen and (max-width: 590px){
        flex-direction: column;
        gap: 20px;
    }
`

const CardImageContainer = styled.div`
    max-width: 400px;
    height: 100%;
    flex-basis: 40%;

    & img {
        width: 100%;
        min-height: 240px;
        object-fit: cover;
    }
`

const CardBody = styled.div`
    flex: 1;
    max-width: 900px;
    height: 100%;
    display: flex;
    flex-direction: column;

    & h2 {
        font-size: 24px;
        color: #0C2191;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 20px;
    }

    & p {
        color: #070F18;
        font-size: 13px;
        line-height:26px;
        margin-bottom: 30px;
        font-style: normal;

        @media screen and (max-width: 977px){
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    & button {
        float: right;
        background-color: #0C2191;
        color: white;
        border-radius: 10px;
        border: none;
        padding: 10px 20px;
        font-size: 0.75rem;
    }
`

const Separator = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background-color: #000;
`



const Category = () => {
    const {otherFunctions: {fetchCategories}} = useAuth();
    const [categories, setCategories] = useState([]);
    const {updateItem} = useLocalStorage();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    useEffectOnMount(() => {
        console.log("Category is mounted");
        (async () => {
            try{
                const res = await fetchCategories();
                console.log(res);
                const {success, message, statusCode} = res;
                if(!success) throw new AdvancedError(message, statusCode);
                else {
                    const {data} = res;
                    setCategories(_ =>  [...data]);
                   
                }
            }catch(err){
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })()
        return () => console.log("Category page is unmounted");
    }, [])

    const gotoCategoryHandler = (e, title) => {
        updateItem(COURSE_CATEGORY_KEY, title);
        navigate(`/category/${title}`);
    }


    return (
        <Layout background="category">
            <ToastContainer />
            <div className="container-xxxl mx-auto">
                <CategoryContainer>
                    <CategoryTop>
                        <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                            <BreadcrumbLink to="/">
                                Home
                            </BreadcrumbLink>
                            <BreadcrumbLink to="#" $isCurrentPage={true}>
                                Category
                            </BreadcrumbLink>
                        </Breadcrumbs>
                        <Search>
                            <SearchInput type="text" value={search} onChange={e => setSearch(e.target.value) && console.log(search)} placeholder="Search Category" />
                            <SearchButton>Search</SearchButton>
                        </Search>
                    </CategoryTop>

                    <CategoryBody>
                        {

                            categories.length !== 0 ? categories.map((category, i) => (
                                <CategoryCard key={i} {...category} all={category} separator={(categories.length - 1) === i ? false : true} />
                            )) : Array(4).fill(undefined).map((_, i) => (
                                <Skeleton sx={{marginBottom: 10}} animation="wave" key={i} variant="rectangular" width={"100%"} height={350} />
                            ))
                        }
                    </CategoryBody>
                </CategoryContainer>
            </div>
        </Layout>
    )
}



function CategoryCard({bannerImg, name, description, all, separator}){
        const navigate = useNavigate()
    return (
        <>
            <Card>
                <CardImageContainer>
                    <img src={bannerImg} alt="Card Image" />
                </CardImageContainer>
                <CardBody>
                    <h2>{name}</h2>
                    <p>{description}</p>

                    <Link
                     to={`/categories/${name?.split(" ").join("-").toLowerCase()}`}
                     onClick={()=>{
                        localStorage.setItem("gotocourse-category", JSON.stringify(all))
                        navigate(`${name?.split(" ").join("-").toLowerCase()}`)
                     }}
                     >
                        <button>Learn more</button>
                    </Link>
                </CardBody>
            </Card>
            {separator && <Separator />}
        </>
    )
}


export default Category;