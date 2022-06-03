import React from "react";
import {NavHashLink } from "react-router-hash-link"
import {BsStarFill} from "react-icons/bs"
import Algo from "../../images/mentor2.png";
import Courses, { OtherCard, ReviewSection } from "../Courses";
import style from "../Courses/courses.module.css";
import { useLocation } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
// USING STYLES FROM COURSES.MODULE.CSS



const TeacherProfile = ({}) => {

  const {pathname} = useLocation()
  const {generalState: {teacherProfile}} = useAuth();
  let name;
  if(teacherProfile){
    let meta = teacherProfile.location.split(" ");
    name = meta[0] + " " + meta[1]; 
  }else {
    let meta = pathname.split("/").reverse()[0];
    name = `${meta.split("-")[0]} ${meta.split("-")[1]}`
  }

  console.log(teacherProfile)
  return (
    <Courses>
        <div className="container">
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
      <section id="about" className={style.teacher_profile_wrapper}>
        <div className={`row justify-content-between $${style.teacher_profile_row}`}>
          <div className="col-md-5">
            <div className={`${style.profile_card}`}>
              <div className="g-3">
                <div className={style.teacher_image}>
                  <div className={style.teacher_img_wrapper}>
                    <img src={teacherProfile ? teacherProfile.profile : Algo} alt="" className={style.teacher_image} />
                  </div>
                </div>

                <div className={` mt-lg-3 ${style.teacher_card_right}`}>
                  <p className={style.teacher_name}>{name}</p>
                  <span className={style.teacher_occupation}>
                    Data science
                  </span>
                  <div className={ `d-flex align-items-center${style.rating_wrapper}`}>
                    <span className={style.teacher_rating}>Rating:  </span>
                    <span className={style.rating_stars}>
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                        <BsStarFill style={{ color: "#FFCB14", fontSize: "18px" }} />
                    </span>
                        <span className={style.rating_total}>( 5 )</span>
                  </div>
                  <div className={style.profile_footer}>
                    <div className={style.location}>
                      <p className={style.occupation}>Location</p>
                      <p className="fw-bold">Lagos, Nigeria</p>
                    </div>
                    <div className="style time">
                      <p className={style.occupation}>Time Active</p>
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
                <p className={style.teacher_paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo. Proin fermentum ipsum a non tellus tincidunt feugiat laoreet laoreet. Quis sit pulnar massa amet. Nibh commodo laoreet scelerisque dis aliqm velit sit. Eu non ultricies tristique sit proin ut. Prin fermentum ipsum a non tellus tincidunt feugiat laeet laoreet. Quis sit pulvinar massa amet. Nibh commodo laoreet scelerisque dis aliquam velit sit. Eu non ultricies tristique sit proin ut.</p>
            </article>
          </div>
          <div className="col-md-5">
              <div className={`card ${style.button_card}`}>
                    <div className={`btn-group w-100 ${style.button_group}`}>
                        <input type="radio" className={`btn-check ${style.btn_check}`} name="btnradio" id="btnradio1" autocomplete="off" checked />
                        <label style={{borderTopLeftRadius:"10px"}}  className={`btn btn-outline-primary ${style.teacher_profile_options}`} for="btnradio1">Radio 1</label>

                        <input type="radio" className={`btn-check ${style.btn_check}`} name="btnradio" id="btnradio2" autocomplete="off" />
                        <label className={`btn btn-outline-primary ${style.teacher_profile_options}`} for="btnradio2">Radio 2</label>

                        <input type="radio" className={`btn-check ${style.btn_check}`} name="btnradio" id="btnradio3" autocomplete="off" />
                        <label className={`btn btn-outline-primary ${style.teacher_profile_options}`} for="btnradio3">Radio 3</label>
                    </div>
                  <div className="card-body">
                  <h5 className={`my-4 ${style.title}`}>Cohort Course</h5>
                  <p className={style.teacher_paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo. Proin fermentum ipsum a non tellus tincidunt feugiat laoreet laoreet. </p>
                  <ul>
                      <li>Lorem ipsum dolor sit.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                  </ul>

                  <div>
                      <button className="button button-md w-100">Contact Teacher</button>
                  </div>
                  </div>
              </div>
          </div>
            </div>
         </section>
         <div id="syllabus" className={style.block}>
            <AllCourses pathname={pathname} />
         </div>
         <div className={style.block}>
            <ReviewSection />
         </div>
        </div>
    </Courses>
  );
};

export default TeacherProfile;

const AllCourses = ({teacher, pathname})=> {
  const name = pathname.split("/").reverse()[0];

    return (
        <section>
            <h3 className={`text-center ${style.header}`}>Courses By {`${name.split("-")[0]} ${name.split("-")[1]}`}</h3>
            <p className={`subtitle ${style.subtitle}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus
                ridiculus nunc adipiscing justo.
            </p>
            <div className={style.main}>
                {[1,2, 3, 4, 5, 6].map(list=>(
                    <OtherCard />
                ))}
            </div>
        </section>
    )
}