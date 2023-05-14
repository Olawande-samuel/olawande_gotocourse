import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import styled from 'styled-components'
import { Upcome } from '.';
import { AdvancedError } from '../../classes';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/Auth';
import { useLocalStorage } from '../../hooks';

const Header = styled.header`
width: 100%;
text-align: center;
padding: 1rem;
background: #0C2191;
color: #fff;

`

const UpComingComponent = () => {
    const [loading, setLoading] = useState(false)
    const [bootcampTrainingInfo, setBootcampTrainingInfo] = useState([]);
    let itemsPerPage = 12;

    const Location= useLocation()

    const { getItem } = useLocalStorage();

    const bootcampTraining = getItem("gotocourse-bootcampdata");
    const userdata = getItem("gotocourse-userdata");

    const {
        generalState: { navHeight },
        studentFunctions: { wishlistCourse },
        otherFunctions: { fetchCategories, fetchCourses, fetchBootcamps },
    } = useAuth();

    const categories = useQuery(["categories"], () => fetchCategories(), {
        onSuccess: res => {
        },
        onError: err => console.error(err)

    });
    const courses = useQuery(["courses"], () => fetchCourses(), {
        onSuccess: res => {
        },
        onError: err => console.error(err)

    });


    const id = Location.search && Location.search.split("=")[1]


    const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps(), {
        onSuccess: res => {

            if (res.data) {
            const first  = res.data.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive);
            const second =  res.data.filter(item =>  item.startDate !== "2023-01-05T00:00:00.000Z" && item.isActive); 
            const all  = [...first, ...second]
            // setShorts(exe)
            setBootcampTrainingInfo(all)
            // setBootcampTrainingInfo(res.data.filter(item => item.subCategory === id && item.isActive))
                return
            }
            setBootcampTrainingInfo([])

        },
        onError: err => console.error(err)

    });

    const navigate = useNavigate();




    async function handleBootstrapEnrollment(e) {
        e.preventDefault();
        if (userdata?.token) {
            navigate("payment")
        } else {
            navigate("/login")
        }
    }
    async function addToWishList() {

        if (userdata !== null) {
            try {
                setLoading(true)
                const response = await wishlistCourse(bootcampTraining.bootcampId, userdata?.token)
                const { success, message, statusCode } = response
                if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
                toast.success(message)
            } catch (error) {
                console.error(error)
                toast.error(error.message);
            } finally {
                setLoading(false)
            }


        } else {
            navigate("/login")
        }
    }

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
        setItemOffset(newOffset);
    };

    return (
        <Layout>
            <Header>
                <h3 style={{ textTransform: "uppercase" }}>{`${Location.pathname.split('/')[2]} Courses`}</h3>
            </Header>
            <div className="container">
                <div>
                    {
                       currentItems?.map(item => (
                            // bootcamps.data?.data?.filter(d => d.isActive).map(item => (
                            <Upcome {...item} all={item} />))
                    }

                </div>
                <ReactPaginate
                    className="pagination"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    // previousLabel="< previous"
                    previousLabel="<"
                    // previousLabel="&#8592;"
                    renderOnZeroPageCount={null}
                />

            </div>
        </Layout>
    )
}


export default UpComingComponent









