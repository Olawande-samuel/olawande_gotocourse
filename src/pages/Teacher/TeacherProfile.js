import React, {useState, useEffect, useRef} from "react";
import {NavHashLink } from "react-router-hash-link"
import {BsStarFill} from "react-icons/bs"
import Algo from "../../images/mentor2.png";
import Courses, { OtherCard, ReviewSection } from "../Courses";
import style from "../Courses/courses.module.css";
import { useLocation } from "react-router-dom";
import {useAuth} from "../../contexts/Auth";
import {useLocalStorage} from "../../hooks"
import { AdvancedError } from "../../classes";
import { toast } from "react-toastify";
// USING STYLES FROM COURSES.MODULE.CSS



const TeacherProfile = ({type}) => {
  const {getItem} = useLocalStorage();

  const {generalState} = useAuth();

  const {pathname} = useLocation()

  // if(teacherProfile){
  //   let meta = teacherProfile.location.split(" ");
  //   name = meta[0] + " " + meta[1]; 
  // }else {
  //   let meta = pathname.split("/").reverse()[0];
  //   name = `${meta.split("-")[0]} ${meta.split("-")[1]}`
  // }
  let mentor, teacher;
  if(type === "mentor"){
    mentor = getItem("gotocourse-viewMentor")

  } else {
    teacher = getItem("gotocourse-teacherInfo")
  }
  const [teacherProfile, setTeacherProfile]= useState({})
  
  useEffect(()=>{
    if(mentor && type === "mentor"){
      setTeacherProfile(mentor)
    } else {
      setTeacherProfile(teacher)

    }

  },[])
  return (
    <Courses>
        <div className="container">
        {/* {type !== "mentors" && 
      <section className={`d-flex ${style.navigation}`}>
          <NavHashLink
          smooth
          to={`${pathname}#about`}
          activeStyle={{borderBottom:"1px solid rgb(12, 33, 145)"}}
          >
            About Course
          </NavHashLink>
          <NavHashLink
          smooth
          to={`${pathname}#instructor`}
          activeStyle={{borderBottom:"1px solid rgb(12, 33, 145)"}}
          >
            Instructor
          </NavHashLink>
          <NavHashLink
          smooth
          to={`${pathname}#syllabus`}
          activeStyle={{borderBottom:"1px solid rgb(12, 33, 145)"}}
          >
            Syllabus
          </NavHashLink>
          <NavHashLink
          smooth
          to={`${pathname}#review`}
          activeStyle={{borderBottom:"1px solid rgb(12, 33, 145)"}}
          >
            Review
          </NavHashLink>
          <NavHashLink
          smooth
          to={`${pathname}#faq`}
          activeStyle={{borderBottom:"1px solid rgb(12, 33, 145)"}}
          >
            Faq
          </NavHashLink>
      </section>
        } */}
      <section id="about" className={style.teacher_profile_wrapper}>
        <div className={`row justify-content-between $${style.teacher_profile_row}`}>
          <div className="col-md-5">
            <div className={`${style.profile_card}`}>
              <div className="g-3">
                <div className={style.teacher_image}>
                  <div className={style.teacher_img_wrapper}>
                    <img src={teacherProfile?.mentorImg ?`https://loftywebtech.com/gotocourse/api/uploads/${teacherProfile.mentorImg} ` : teacherProfile.profileImg} alt="" className={style.teacher_image} />
                  </div>
                </div>

                <div className={` mt-lg-3 ${style.teacher_card_right}`}>
                  <p className={style.teacher_name}>{`${teacherProfile?.mentorFirstName ? teacherProfile.mentorFirstName : teacherProfile.firstName} ${teacherProfile?.mentorLastName ? teacherProfile.mentorLastName: teacherProfile.lastName}`}</p>
                  <span className={style.teacher_occupation}>
                    { teacherProfile?.expertise ? teacherProfile.expertise : teacherProfile.category}
                  </span>
                  <div className={ `d-flex  justify-content-between ${style.rating_wrapper}`}>
                    {type === "mentors" && (
                      <div>
                      <p className={style.headers}>Work Experience</p>
                      <p className={style.occupation}>{teacherProfile?.experience}</p>
                    </div>
                    )}
                    {/* <div>
                    <p className={style.headers}>Rating </p>
                    <div className={style.rating_stars}>
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                      <span className={style.occupation}>(5)</span>
                    </div>
                    </div> */}
                  </div>
                  <div className={style.profile_footer}>
                  <div className="">
                    <p className={style.headers}>Rating </p>
                    <div className={style.rating_stars}>
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                      <span className={style.occupation}>(5)</span>
                    </div>
                    </div>
                    <div className="style time">
                      <p className={style.headers}>Time Active</p>
                      <p className="fw-bold"> January, 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <article className={style.teacher_article}>
                <header>
                    <h5>Information</h5>
                </header>
                <p className={style.teacher_paragraph}  dangerouslySetInnerHTML={{__html:teacherProfile?.mentorBio ? teacherProfile.mentorBio: teacherProfile.bio}} />
            </article>
          </div>
          <div className="col-md-5">
              <div className={`card ${style.button_card}`}>
                {type === "mentors" ? (
                  <>
                  <div className={`btn-group w-100 text-center ${style.button_group}`}>
                      <p>One-One Mentorship</p>
                  </div>
                  <div className="card-body p-2">
                    <h5 className={`my-4 ${style.title}`}>Fees per session</h5>
                    <p className={style.teacher_paragraph}>$ {teacherProfile?.fee && teacherProfile.fee} per hour</p>
                    <ul>
                        <li>A session - 2.5 hours $ {teacherProfile?.fee && teacherProfile.fee * 2.5} </li>
                        <li>A session - 6 hours $ {teacherProfile?.fee && teacherProfile.fee * 5}</li>
                    </ul>

                    <div>
                        <button className="button button-md w-100">Contact Us</button>
                    </div>
                  </div>
                  </>
                ):(
                    <>
                    {/* <div className={`btn-group w-100 ${style.button_group}`}>
                        <input type="radio" className={`btn-check ${style.btn_check}`} name="btnradio" id="btnradio1" autocomplete="off" checked />
                        <label style={{borderTopLeftRadius:"10px"}}  className={`btn btn-outline-primary generic_label ${style.teacher_profile_options}`} for="btnradio1">Cohort</label>

                        <input type="radio" className={`btn-check ${style.btn_check}`} name="btnradio" id="btnradio2" autocomplete="off" />
                        <label className={`btn btn-outline-primary generic_label ${style.teacher_profile_options}`} for="btnradio2">Self-paced</label>

                        <input type="radio" className={`btn-check ${style.btn_check}`} name="btnradio" id="btnradio3" autocomplete="off" />
                        <label className={`btn btn-outline-primary generic_label ${style.teacher_profile_options}`} for="btnradio3">One-on-One</label>
                    </div> */}
                  <div className="card-body p-2">
                    {/* <h5 className={`my-4 ${style.title}`}>Cohort Course</h5>
                    <p className={style.teacher_paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo. Proin fermentum ipsum a non tellus tincidunt feugiat laoreet laoreet. </p>
                    <ul>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul> */}

                    <div>
                        <button className="button button-md w-100">Contact Teacher</button>
                    </div>
                  </div>
                    </>
                )}
              </div>
          </div>
            </div>
         </section>
         <div id="syllabus" className={style.block}>
          {teacherProfile?.mentorId ? null :
            <AllCourses pathname={pathname} id={teacherProfile.teacherId} />
          }
         </div>
         <div className={style.block}>
            <ReviewSection />
         </div>
        </div>
    </Courses>
  );
};

export default TeacherProfile;

const AllCourses = ({teacher, pathname, id})=> {
  
  const {generalState, setGeneralState, otherFunctions:{fetchCourses}} = useAuth()
  const [courses, setCourses]= useState([])
  const name = pathname.split("/").reverse()[0];
  const ref = useRef()

  async function fetchCourse(){
    try{
    setGeneralState({...generalState, loading: true});
  
    const res =  await fetchCourses()
    const {success, message, statusCode} = res;
    if(!success) throw new AdvancedError(message, statusCode);
    else {
      const {data} = res;
      console.log(data)
      data.length > 0 ? setCourses(data.filter((course) => course.instructorId === id )) : setCourses([])
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
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
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }finally {
      setGeneralState({...generalState, loading: false});
  }
}
  useEffect(()=>{
    if(ref.current) return
    if(id){
      fetchCourse()

      ref.current = true
    }
  },[id])
    return (
        <section>
            <h3 className={`text-center ${style.header}`}>Courses By {`${name.split("-")[0]} ${name.split("-")[1]}`}</h3>
            <p className={`subtitle ${style.subtitle}`}>
                Here are some of the courses offered by the tutor
            </p>
            <div className={style.main}>
              {courses?.map(course =>(
                <OtherCard {...course} course={course} />
            ))}
            </div>
            {courses.length <=0 &&  <p>Courses are unavailable</p>}
        </section>
    )
}