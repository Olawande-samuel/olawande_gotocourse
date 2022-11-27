import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';
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

    const {pathname} = useLocation()

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
            // console.log("categories", res.data)
        },
        onError: err => console.error(err)

    });
    const courses = useQuery(["courses"], () => fetchCourses(), {
        onSuccess: res => {
            // console.log("courses", res.data)
        },
        onError: err => console.error(err)

    });

    const { id } = useParams()


    const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps(), {
        onSuccess: res => {
            // console.log({res})
            // console.log(res.data.filter(item => item.subCategory === id && item.isActive))
            if (res.data) {
                setBootcampTrainingInfo(res.data.filter(item => item.subCategory === id && item.isActive))
                return
            }
            setBootcampTrainingInfo({})

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

    return (
        <Layout>
            <Header>
                <h3 style={{textTransform:"uppercase"}}>{`${pathname.split('/')[2]} Courses`}</h3>
            </Header>
            <div className="container">
                <div>
                    {
                        bootcamps.data?.data?.filter(d => d.isActive).map(item => (
                            <Upcome {...item} all={item} />))
                    }

                </div>

            </div>
        </Layout>
    )
}


export default UpComingComponent









