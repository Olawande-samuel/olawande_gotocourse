import React, {useState} from "react";
import styled from "styled-components";
import {MdNavigateNext} from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Breadcrumbs } from "@mui/material";




import Layout from "../../../components/Layout";
import { useEffectOnMount } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import Loader from "../../../components/Loader";
import { AdvancedError } from "../../../classes";



const CategoryContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    jusitfy-content: center;
    padding: 20px 40px;
`;

const CategoryTop = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;
`;

const BreadcrumbLink = styled(Link)`
    color: ${props => props.$isCurrentPage ? '#0C2191' : '#666363'};
    font-weight: 700;
    font-size: 1rem;
    cursor: ${(props) => props.$isCurrentPage ? 'not-allowed': 'pointer'};

    &:hover {
        color:#0C2191
    }
`


const Search = styled.section`
    display: flex;
    align-items: center;
`


const SearchInput = styled.input`
    border: none;
    background-color: rgba(217, 217, 217, 0.4);
    border-radius: 10px;
    padding: 8px;
    line-height: 2;
    outline: none;
    min-width: 300px;
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
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
`

const Card = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 20px;
    min-height: calc(319px + 40px);
`

const CardImageContainer = styled.div`
    width: 399px;
    height: 100%;

    & img {
        width: 100%;
        height: 100%;
    }
`

const CardBody = styled.div`
    flex: 1;
    margin-left: 30px;
    max-width: 900px;
    height: 100%;
    display: flex;
    flex-direction: column;

    & h2 {
        font-size: 30px;
        color: #0C2191;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 20px;
    }

    & p {
        color: #070F18;
        font-size: 14px;
        line-height:32px;
        margin-bottom: 50px;
        font-style: normal;
    }

    & button {
        float: right;
        background-color: #0C2191;
        color: white;
        border-radius: 10px;
        border: none;
        padding: 15px 30px;
        font-size: 0.85rem;
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
    const [loading, setLoading] = useState(true);
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
                    toast.success(message, {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
            }finally{setLoading(_ => false)}
        })()
        return () => console.log("Category page is unmounted");
    }, [])


    return (
        <Layout background="category">
            {loading && <Loader />}
            <ToastContainer />
            <CategoryContainer>
                <CategoryTop>
                    <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                        <BreadcrumbLink to="/">
                            Home
                        </BreadcrumbLink>
                        <BreadcrumbLink to="!" $isCurrentPage={true}>
                            Category
                        </BreadcrumbLink>
                    </Breadcrumbs>
                    <Search>
                        <SearchInput type="text" name="search" placeholder="Search Category" />
                        <SearchButton>Search</SearchButton>
                    </Search>
                </CategoryTop>

                <CategoryBody>
                    {
                        categories.map(({bannerImg, description, name}, i) => (
                            <CategoryCard key={i} image={bannerImg} description={description} 
                            title={name} separator={(categories.length - 1) === i ? false : true} />
                        ))
                    }
                </CategoryBody>
            </CategoryContainer>
        </Layout>
    )
}


function CategoryCard({image, title, description, separator}){
    return (
        <>
            <Card>
                <CardImageContainer>
                    <img src={image} alt="Card Image" />
                </CardImageContainer>
                <CardBody>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <Link to={`/category?name=${title}`}>
                        <button>Learn more</button>
                    </Link>
                </CardBody>
            </Card>
            {separator && <Separator />}
        </>
    )
}


export default Category;