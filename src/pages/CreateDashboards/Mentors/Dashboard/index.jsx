import { MdEdit } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import {useQuery} from "@tanstack/react-query";




import {Stu1,Stu2, Stu3} from "../../../../images/components/svgs"
import Layout from "../Layout";
import clsx from "../styles.module.css";
import { useAuth } from "../../../../contexts/CreateAuth";
import { AdvancedError } from "../../../../classes";
import { useEffectOnMount, useLocalStorage } from "../../../../hooks";
import {KEY} from "../../../../constants";
import { DashboardTop, Community } from "../../Students";




const Dashboard = () =>{

    const navigate = useNavigate();
    const { generalState: { isMobile }, teacherFunctions: { fetchApplications, fetchCourses, earnings }, } = useAuth();
  
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
  
    // const {isLoading, isError, isSuccess, data, error} = useQuery(["teacher courses"], () => fetchCourses(userdata.token))
  
    // if(data?.statusCode === 0){
    //     // console.log(data, 'line 33');
    //   toast.error(data?.message, {
    //     position: "top-right",
    //     autoClose: 2500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: true,
    //   });
    // }
  
    console.log({userdata})
  
      const topContent =[
        {
            id:1,
            title:"Students",
            logo: <Stu1 />,
            value: 0
        },
        {
            id:2,
            title:"Courses created",
            logo: <Stu2 />,
            value:  0
        },
        {
            id:3,
            title:"Earnings",
            logo: <Stu3 />,
            value: "$0"
        }
    ]
  
    // if(data?.data){
    //   topContent[1].value = data.data.length
    // }
    return (
      <Layout isMobile={isMobile} userdata={userdata} header="Dashboard">
      <div className={clsx.teachers_profile}>
      <DashboardTop content={topContent} />
        <div className={clsx.teachers_profile_dashboard}>
          <div className={`d-flex justify-content-between ${clsx.dashboard_courses}`}>
            {/* <div className={clsx["dashboard_courses--left"]}>
                <h6>My Classes</h6>
                <ul>
                    {
                        // data?.data?.length === 0 ?  
                        //   <li>
                        //     <p className="text-muted">You haven't registered for a course</p>
                        //   </li> 
                        //   :
                        [1, 2, 3, 4].map((item, i)=>(
                            <li key={i} className={` ${clsx["dashboard_class--wrapper"]}`}>
                                <div className={clsx["dashboard_class--details"]}>
                                  <p>Basics of Mobile UX</p>
                                  <p>01:00pm</p>
                                </div>
                                <div className={`d-flex justify-content-between ${clsx["dashboard_class--action"]}`}>
                                  <button className={`btn-plain ${clsx.completed}`}>Completed</button>
                                  <button className={`button button-md ${clsx.live}`}>Live</button>
                                </div>
                            </li>
                        ))
                      
                    }
                </ul>
            </div>
            <div className={clsx["dashboard_courses--right"]}>
                <h6>My Courses</h6>
                {/* <ul>
                    {
                        data?.data?.length === 0 || !data?.data ?  
                        <p className="text-muted">You haven't created a course</p>
                        :
                        data?.data?.map((item, i)=>(
                            <li key={i}>{item.name}</li>
                        ))
                    }
                </ul> */}
          </div>
        <Community />
        </div>
      </div>
    </Layout>
    )
}




export default Dashboard;