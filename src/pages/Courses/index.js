import React, {useEffect, useRef, useState} from "react";
import { Link, NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsStarFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import StarRatings from "react-star-ratings"
import {categories as allCategories} from "../../data"
import {
  Cyber,
  Data,
  IT,
  Audit,
  Product,
  Project,
  Risk,
} from "../../images/components/svgs.js";
import {useAuth} from "../../contexts/Auth"
import {useLocalStorage} from "../../hooks"
import { AdvancedError } from "../../classes";
import Power from "../../images/powerbi.png";
import Algo from "../../images/algo.png";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { careers } from "../../components/Career";
import style from "./courses.module.css";
import banner from "../../images/header.png";
import details from "../../images/course_details.png";
import { Rating } from "react-simple-star-rating";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const KEY = "gotocourse-userdata";
export const courseList = [
  {
    id: 1,
    title: "Cybersecurity",
    name: "Cybersecurity",
    subtitle: "Data Science",
    category: "Data Science",
    author: "George Brown",
    details: "This is the practice ofprotecting critical systems and sensitive information from digital attacks.",
    description: "This is the practice ofprotecting critical systems and sensitive information from digital attacks.",
    img: Power,
    courseImg: Power,
  },
  {
    id: 2,
    title: "Algorithims",
    name: "Algorithims",
    subtitle: "Data Science",
    category: "Data Science",
    author: "Mary Brown",
    details: "Risk management is the process of assessing and controlling threats to an organization's capital and earnings.",
    description: "Risk management is the process of assessing and controlling threats to an organization's capital and earnings.",
    img: Algo,
    courseImg: Algo,
  },
  {
    id: 3,
    title: "Machine Learning",
    name: "Machine Learning",
    subtitle: "Data Science",
    category: "Data Science",
    author: "George Brown",
    details: "Data science refers to the process of extracting clean information to formulate actionable insights",
    description: "Data science refers to the process of extracting clean information to formulate actionable insights",
    img: Power,
    courseImg: Power,
  },
  {
    id: 4,
    title: "Project Management",
    name: "Project Management",
    subtitle: "Data Science",
    category: "Data Science",
    author: "Mary Brown",
    details: "the process of leading the work of a team to achieve all project goals within the given constraints.",
    description: "the process of leading the work of a team to achieve all project goals within the given constraints.",
    img: Algo,
    courseImg: Algo,
  },
  {
    id: 5,
    title: "Introduction to SQL",
    name: "Introduction to SQL",
    subtitle: "Data Science",
    category: "Data Science",
    author: "George Brown",
    details: "IT compliance refers to businesses meeting all legal requirements,  and regulations for the software of company.",
    description: "IT compliance refers to businesses meeting all legal requirements,  and regulations for the software of company.",
    img: Power,
    courseImg: Power,
  },
  {
    id: 6,
    title: "Regression",
    name: "Regression",
    subtitle: "Data Science",
    category: "Data Science",
    author: "Mary Brown",
    details: "It is the process of evaluating evidence to determine whether a computer system safeguards assets",
    description: "It is the process of evaluating evidence to determine whether a computer system safeguards assets",
    img: Algo,
    courseImg: Algo,
  },
  {
    id: 7,
    title: "Linear Programming",
    name: "Linear Programming",
    subtitle: "Data Science",
    category: "Data Science",
    author: "George Brown",
    details: "Business analysis is a strategy for initiating and managing change in organisations.",
    description: "Business analysis is a strategy for initiating and managing change in organisations.",
    img: Power,
    courseImg: Power,
  },
  {
    id: 8,
    title: "Advance Algorithims",
    name: "Advance Algorithims",
    subtitle: "Data Science",
    category: "Data Science",
    author: "Mary Brown",
    details: "the process of identifying a market opportunity, clearly defining the problem, developing a proper solution for that",
    description: "the process of identifying a market opportunity, clearly defining the problem, developing a proper solution for that",
    img: Algo,
    courseImg: Algo,
  },
  {
    id: 9,
    title: "Advance Power BI",
    name: "Advance Power BI",
    subtitle: "Data Science",
    category: "Data Science",
    author: "George Brown",
    details: "Web design encompasses many different skills and disciplines in the production and maintenance of websites.",
    description: "Web design encompasses many different skills and disciplines in the production and maintenance of websites.",
    img: Power,
    courseImg: Power,
  },
];

const courseDetails = [
  {
    id: 1,
    title: "Genetic algorithms",
    details:
      "A technique used for optimization that is inspired by the process of natural evolution or “survival of the fittest.”Often described as a type of “evolutionary algorithm,” these algorithms are well-suited for solving nonlinear problems.",
  },
  {
    id: 2,
    title: "Machine learning",
    details:
      "A subspecialty of computer science (within a field historically called “artificial intelligence”) concerned with the design and development of algorithms that allow computers to evolve behaviors based on empirical data.",
  },
  {
    id: 3,
    title: "Pattern recognition",

    details:
      "It is a set of machine learning techniques that assign some sort of output value (or label) to a given input value (or instance) according to a specific algorithm.",
  },
  {
    id: 4,
    title: "Regression",
    details:
      "A set of statistical techniques to determine how the value of the dependent variable changes when one or more independent variables is modified. Often used for forecasting or prediction.",
    img: Algo,
  },
  {
    id: 5,
    title: "Time series analysis",
    details:
      "Set of techniques from both statistics and signal processing for analyzing sequences of data points, representing values at successive times, to extract meaningful characteristics from the data.",
  },
];
const Courses = ({ children }) => {
  const location = useLocation();
  const { generalState:{loading} } = useAuth()
  const bread = location.pathname?.split("/");
  return (
    <Layout>
      <ScrollToTop />
      <div className={style.block}>
        <ToastContainer />  
        <div className={`container`}>
          <div className={style.breadcrumbs_wrapper}>
            <nav arial-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Homepage</Link>
                  </li>
                {bread.filter(item=> item !== "").map((item, idx)=>(
                    <li className="breadcrumb-item active text-capitalize">
                      <NavLink  to={`${bread.slice(0, idx + 2).join("/")}`}>{item.split("-").join(" " )}</NavLink>
                    </li>
                  ))}
              </ol>
            </nav>
          </div>
        </div>
        {children}
      </div>
      {loading && 
            <Loader />
        }
    </Layout>
  );
};

export default Courses;

const Card = ({ logo, name, description, iconImg }) => {
  return (
    <div className={`card h-100 ${style.card}`}>
      <div className={`card-body ${style.cate_card_body}`}>
        <i className={style.icon}>
          {logo}
        </i>
        <h4 className={style.cate_card_title}>{name}</h4>
        <p className={style.text}>{description}</p>
        <hr />
        <div className="d-flex">
          <button className={`btn-plain ms-auto ${style.button}`}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export const  CourseCard = ({ courseImg, name, description, category, instructorName, color, background, show ,  course, courseId}) => {
  const navigate = useNavigate()
  return (
    <div className={`card ${style.course_card}`} style={{background:background, color:color, cursor: "pointer"}} onClick={()=>{
      localStorage.setItem("gotocourse-courseInfo", JSON.stringify(course ))
      navigate(show === true ?  `courses/${name?.replace(/\s+/g, '-').toLowerCase()}`:`${name?.replace(/\s+/g, '-').toLowerCase()} `)
      }}>
      <img src={courseImg} alt="" className="card-img-top mentor_image" />
      <div className={`card-body ${style.course_Card_body}`}>
        <Link to={show === true ?  `courses/${name?.replace(/\s+/g, '-').toLowerCase()}`:`${name?.replace(/\s+/g, '-').toLowerCase()} `}>
          <h5 className={`card-title ${style.course_title}`} style={{ color:color}}>{name}</h5>
        </Link> 
        <h6 className={`card-subtitle ${style.course_subtitle}`}>{category}</h6>
        {/* add line-clamp to this v */}
        <p className={`card-text clamp_text ${style.course_text}`}>{description}</p>
        <p className={`text-end ${style.course_author}`} style={{ color:color}}>{instructorName}</p>
      </div>
    </div>
  );
};

export const Categories = () => {
  const navigate = useNavigate()
  const logos = [
    {
      logo: <Cyber />,
    },
    {
      logo: <Risk />,
    },
    {
      logo: <Data />,
    },
    {
      logo: <Project />,
    },
    {
      logo: <IT />,
    },
    {
      logo: <Audit />,
    },
    {
      logo: <Cyber />,
    },
    {
      logo: <Product />,
    },
    {
      logo: <Project />,
    },
    {
      logo: <Risk />,
    },
    {
      logo: <IT />,
    },
  ];
  const {generalState, setGeneralState, otherFunctions: {fetchCategories, searchCategories}} = useAuth();
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const ref = useRef(false);
  // useEffect(()=>{
  //   const arr = []
  //   allCategories.forEach((item, index)=>{
  //     let merged = Object.assign(item, logos[getRandomArbitrary(1, 10)])
  //     arr.push(merged)
  //   })
  //   setCategories(arr)
  // },[])

  useEffect(()=>{
    if(ref.current) return
    (async()=>{
      try{
        setGeneralState({...generalState, loading: true})
        const res = await fetchCategories();
        const {success, message, statusCode, data} = res;
        setGeneralState({...generalState, loading: false})

          if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
          const arr = []
          data.forEach((item, index)=>{
            let merged = Object.assign(item, logos[getRandomArbitrary(1, 10)])

            arr.push(merged)
          })
          setCategories(arr)
          toast.success(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      
    }catch(err){
        setGeneralState({...generalState, loading: false})
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
    ref.current = true
  },[])


  function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min)
  }

 async function search(e){
    e.preventDefault();
    try{
      setGeneralState({...generalState, loading: true})
        const res = await searchCategories(searchTerm);
        const {success, message, statusCode, data} = res;

        
        if(!success || statusCode !== 1) {
          throw new AdvancedError(message, statusCode);
        }
        else if(data.length <= 0) {
          throw new AdvancedError("Category not found", statusCode)
        } 
        else {

          const arr = []
          data.forEach((item, index)=>{
            let merged = Object.assign(item, logos[getRandomArbitrary(1, 10)])
            arr.push(merged)
          })
            setCategories(arr)
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
      })
    }finally {
      setGeneralState({...generalState, loading: false})

    }

  }

  return (
    <Courses>
      <div className="container">
        <div
          className={`d-flex justify-content-between align-items-center ${style.top}`}
        >
          <h3 className={style.section_title}>Categories</h3>
          <div className={`${style.input_wrapper} d-flex`}>
            <input
              type="search"
              name="search"
              id="search"
              className="form-control"
              placeholder="Search category"
              onChange={(e)=>setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button className="button" onClick={search}>Search</button>
          </div>
        </div>

        <main className={style.new_main}>
          {/* NB: CHANGE DIV TO LINK AFTER UPDATE */}
          {categories.length > 0 && categories.map((career) => (
            <div
            //  to={career.name?.split(" ").join("-").toLowerCase()} 
             onClick={()=>{
               console.log(career.logo) 
               delete career.logo
                localStorage.setItem("gotocourse-category", JSON.stringify(career))
              navigate(`${career.name?.split(" ").join("-").toLowerCase()}`)
            }}> 
              <Card {...career} />
            </div>
          ))}
        </main>
      </div>
    </Courses>
  );
};

export const CourseList = () => {

  const [courses, setCourses] =useState([
    {
      id: 1,
      title: "Cybersecurity",
      subtitle: "Data Science",
      author: "George Brown",
      details:
        "This is the practice ofprotecting critical systems and sensitive information from digital attacks.",
      img: Power,
    },
    {
      id: 2,
      title: "Algorithims",
      subtitle: "Data Science",
      author: "Mary Brown",
      details:
        "Risk management is the process of assessing and controlling threats to an organization's capital and earnings.",
      img: Algo,
    },
    {
      id: 3,
      title: "Machine Learning",
      subtitle: "Data Science",
      author: "George Brown",
      details:
        "Data science refers to the process of extracting clean information to formulate actionable insights",
      img: Power,
    },
    {
      id: 4,
      title: "Project Management",
      subtitle: "Data Science",
      author: "Mary Brown",
      details:
        "the process of leading the work of a team to achieve all project goals within the given constraints.",
      img: Algo,
    },
    {
      id: 5,
      title: "Introduction to SQL",
      subtitle: "Data Science",
      author: "George Brown",
      details:
        "IT compliance refers to businesses meeting all legal requirements,  and regulations for the software of company.",
      img: Power,
    },
    {
      id: 6,
      title: "Regression",
      subtitle: "Data Science",
      author: "Mary Brown",
      details:
        "It is the process of evaluating evidence to determine whether a computer system safeguards assets",
      img: Algo,
    },
    {
      id: 7,
      title: "Linear Programming",
      subtitle: "Data Science",
      author: "George Brown",
      details:
        "Business analysis is a strategy for initiating and managing change in organisations.",
      img: Power,
    },
    {
      id: 8,
      title: "Advance Algorithims",
      subtitle: "Data Science",
      author: "Mary Brown",
      details:
        "the process of identifying a market opportunity, clearly defining the problem, developing a proper solution for that",
      img: Algo,
    },
    {
      id: 9,
      title: "Advance Power BI",
      subtitle: "Data Science",
      author: "George Brown",
      details:
        "Web design encompasses many different skills and disciplines in the production and maintenance of websites.",
      img: Power,
    },
  ])
  const {generalState, setGeneralState, otherFunctions: {searchCategories}} = useAuth();

  const {id} = useParams()
  const ref = useRef(false);
  const name = localStorage.getItem("gotocourse-category")

  useEffect(()=>{
    let categoryId = id.charAt(0).toUpperCase() + id.slice(1)
    
    if(ref.current) return
    (async()=>{
      if(name){
        let info = JSON.parse(name)
      try{
        const res = await searchCategories(info.name);
        const {success, message, statusCode} = res;
        setGeneralState({...generalState, loading: false})
          if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
          const {data} = res
          if(data.length > 0 ){
            setCourses(data)
            toast.success(message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("course list is empty", {
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
        setGeneralState({...generalState, loading: false})
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
  }

    })()
  ref.current = true
  },[name])

  return (
    <Courses>
      <div className="container">
        <div
          className={`d-flex justify-content-between align-items-center ${style.top}`}
        >
          <h3 className={style.section_title}>Courses</h3>
          <div className={`${style.input_wrapper} d-flex`}>
            <input
              type="search"
              name="search"
              id="search"
              className="form-control"
              placeholder="Search category"
            />
            <button className="button">Search</button>
          </div>
        </div>
        <main className={style.new_main}>
          {courses.map((course) => (
            <CourseCard key={course.name} {...course} course={course} />
          ))}
        </main>
      </div>
    </Courses>
  );
};
export const CourseDetail = ({preview}) => {
  const {generalState, setGeneralState, otherFunctions: {searchCategories}} = useAuth();
  const [categoryCourses, setCategoryCourses]= useState([])
  const {id} = useParams()
  const ref = useRef(false);

  // const [categoryDetails, setCategoryDetails]= useState({})

  let categoryDetails = {}
  if(!preview?.name){
    const data = localStorage.getItem("gotocourse-category")
    if (data){
      categoryDetails = JSON.parse(data)          
    }
  } else {
    categoryDetails = preview          

  }

  console.log("cate", categoryDetails)
  // fetch courses under each category
  useEffect(()=>{
    if(!preview?.name){

    if(ref.current) return
      (async()=>{
        try{
          setGeneralState({...generalState, loading: true})
          const res = await searchCategories(categoryDetails?.name);
          const {success, message, statusCode} = res;
            if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
            if(res.data.length > 0){
              setCategoryCourses(res.data) 
              console.log("category-courses", res.data);
              toast.success(message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {

            toast.error("No course found", {
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
      }finally{
        setGeneralState({...generalState, loading: false})
      }
      })()
      ref.current = true
    } 
    
  },[categoryDetails?.name])

  //NB: use dummy is no data exist
  useEffect(()=>{
    if(preview?.name) {
      categoryDetails = preview;
    } else {
      
  //   let categoryId = id.charAt(0).toUpperCase() + id.slice(1)
  //   let one = categoryId.split("-").join(" ")
    
  //   if(ref.current) return
  //   (async()=>{
  //     try{
  //       setGeneralState({...generalState, loading: true})
        
  //       const res = await fetchCategory(one);
  //       const {success, message, statusCode, data} = res;
  //       setGeneralState({...generalState, loading: false})
  //         if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
  //         setCategoryDetails(data)
  //         toast.success(message, {
  //           position: "top-right",
  //           autoClose: 4000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
      
  //   }catch(err){
  //       setGeneralState({...generalState, loading: false})
  //       toast.error(err.message, {
  //           position: "top-right",
  //           autoClose: 4000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //       });
  //   }
  //   })()
  }
  // ref.current = true
  },[id, preview])

  return (
    <Courses>
      <main className={style.details_main}>
        <div className={style.banner}>
          {/* <img src={categoryDetails?.bannerImg ? categoryDetails?.bannerImg : banner } alt="" style={{ background:"linear-gradient(90deg, rgba(247,92,78,1) 12%, rgba(12,33,145,1) 72%)"}} /> */}
          <img src={banner } alt="" style={{ background:"linear-gradient(90deg, rgba(247,92,78,1) 12%, rgba(12,33,145,1) 72%)"}} />
          <div className="container py-5 position-relative">
            <div className={style.box}>
              {categoryDetails?.iconImg && <img src={categoryDetails?.iconImg} alt="" /> }
            </div>
          </div>
        </div>
        <div className={`container ${style.details_main} `}>
          <div className={`row ${style.top} justify-content-between`}>
            <section className="col-md-7">
              <article>
                <header>
                  <h2>{categoryDetails?.name}</h2>
                </header>
                <p>
                  {categoryDetails?.description}
                </p>
                <p>{categoryDetails?.importance}</p>
              </article>
              <article>
                <h3 className="text-uppercase">{`${categoryDetails?.name} Niche`}</h3>
                <p>
                  {categoryDetails?.nicheDescription}
                </p>
                <ul>
                  {categoryDetails?.nicheItems.length > 0 && categoryDetails?.nicheItems.map((item) => (
                    <li>
                      <p className={style.niche}>{item.name}</p>
                      <p className={style.niche}>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
            <div className="col-md-4 ">
              <aside className="border rounded p-3">
                <header>
                  <h3>Career Prospect</h3>
                </header>
                <p>
                  {categoryDetails?.career}
                </p>
                <ul>
                  {categoryDetails?.careerList?.length > 0 && categoryDetails.careerList.map(({name})=>(
                  <li>{name}</li>
                  ))
                  }
                </ul>
              </aside>
            </div>
          </div>
          <section>
            <header className={`text-center ${style.details_title}`}>
              <h2 className={`text-uppercase ${style.details_head}`}>{categoryDetails?.name} Courses</h2>
              <p className="subtitle">
                
              </p>
            </header>
            {categoryCourses.length > 0 ? (
              <>
            <div className={style.new_main}>
              { categoryCourses.slice(0, 6).map(course => (
                  <CourseCard {...course} show={true} course={course} />
                ))
              }
            </div>
            <div className={`text-end ${style.more}`}>
              <Link to="courses" className={style.link}>
                View More{" "}
                <i className="ms-4">
                  <AiOutlineArrowRight />
                </i>{" "}
              </Link>
            </div>
              
              </>
            ):(
              <p className="lead text-center mx-auto">Course list is currently empty </p>
            )}
          </section>
        </div>
      </main>
    </Courses>
  );
};

export const CourseProfile = ({preview}) => {
  const {generalState, setGeneralState, otherFunctions: {fetchCourse}, studentFunctions:{wishlistCourse}} = useAuth();
  const {getItem} = useLocalStorage()

  const {id} = useParams()
  const ref = useRef(false);
  const navigate = useNavigate()
  const [loading, setLoading]= useState(false)
  console.log("id", id)
  const [courseProfile, setCourseProfile]= useState(
    {
    courseId: "629931276651235bbb08dc97",
    name:"Linear Programming",
    category:"Software Development",
    rating:4,
    students: 120,
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo pariatur est exercitationem distinctio alias ducimus impedit? Aut asperiores pariatur porro quibusdam voluptate consequuntur, voluptas culpa ullam numquam fugiat officia autem.",
    courseImg:"",
    faqs: [],
    packages:[
      {
        title: "Lorem ipsum dolor sit amet.",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, illum aut! Illo expedita saepe veritatis?",
        price: 400
      },
      {
        title: "Lorem ipsum dolor sit amet.",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, illum aut! Illo expedita saepe veritatis?",
        price: 800
      },
      {
        title: "Lorem ipsum dolor sit amet.",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, illum aut! Illo expedita saepe veritatis?",
        price: 1200
      }
    ],
    price:5000,
    instructorId: "629747d8611a99e372b13230",
    instructorName: "John Doe",
    instructorProfileImg: "",
    instructorRating: 4.5,
    instructorLocation: "united states",
    instructorCategory: "Data Science",
    instructorJoinDate: "2022-06-01T11:04:56.016Z"
    }
  )
console.log("pre",preview)
  useEffect(()=>{

    if(preview?.name) {
      setCourseProfile(preview)
    } else {
    const data = localStorage.getItem("gotocourse-courseInfo");
    if(data){
      setCourseProfile(JSON.parse(data))
    }
  }
    ref.current = true
  },[id, preview])

  function getDate(date){
      return new Date(date).toDateString()
  }

 async function addToWishList(){
    const data = getItem("gotocourse-courseInfo");

    const  userData = getItem(KEY)
    console.log(userData)
    if(userData !== null){
      try {
        setLoading(true)
        const response =  await wishlistCourse(data.courseId, userData?.token)
        const {success, message, statusCode} = response
        if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }catch(error){
        console.error(error)
        toast.error(error.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }finally{
        setLoading(false)
      }
      
      
    } else {
      navigate("/login")
    }
  }
  return (
    <Courses>
      <div className="container">
        <section className={`d-flex ${style.navigation}`}>
          <a href="#about">About Course</a>
          <a href="#instructor">Instructor</a>
          <a href="#syllabus">Syllabus</a>
          <a href="#review">Review</a>
          <a href="#faqs">Faqs</a>
        </section>
        <section id="about" className={style.profile_section}>
          <div className={`row mb-3 ${style.intro}`} >
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <h2 className={style.topic}>{courseProfile?.name}</h2>
                <p className={style.subject}>{courseProfile?.category}</p>
                  <p className={style.rating}> 
                <BsStarFill style={{ color: "#FFCB14", fontSize: "20px" }} />
                <BsStarFill style={{ color: "#FFCB14", fontSize: "20px" }} />
                <BsStarFill style={{ color: "#FFCB14", fontSize: "20px" }} />
                <BsStarFill style={{ color: "#FFCB14", fontSize: "20px" }} />
                <BsStarFill style={{ color: "#FFCB14", fontSize: "20px" }} />
                <span className="ms-2">
                ( 5 )
                </span>
                </p>
                <div className="d-flex" style={{gap:"1rem"}}>
                  <a href="#packages">
                    <button className={`button ${style.btn}`}>Enroll</button>
                  </a>
                    {loading ? 
                  <div className="spinner-border text-primary" role="status" >
                    <span className="visually-hidden">Loading...</span>
                  </div>  
                  :
                  <button 
                    type="button"
                    className={` ${style.btn} btn-plain`} 
                    style={{border:"1px solid var(--theme-blue)", color:"var(--theme-blue)"}}
                    onClick={addToWishList}
                  >
                      <span>
                        Add to Wishlist
                      </span>
                  </button>
                    }
                </div>
                <p className={style.total_student}>120 enrolled students</p>
              </div>
            </div>
            <div className="col-md-6">
              <img src={courseProfile?.courseImg ? courseProfile?.courseImg : details } alt="laptop" style={{maxWidth:"100%"}} />
            </div>
          </div>
          <header>
              <h5 className={style.title}>Information</h5>
          </header>
          <div className="row justify-content-between">
            <div className="col-md-7">
              <p className={style.paragraph}>
                {courseProfile?.description}
              </p>
              {/* <ul>
                <li className={style.paragraph}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  pariatur est exercitationem distinctio alias ducimus impedit?
                  Aut asperiores pariatur porro quibusdam voluptate
                  consequuntur, voluptas culpa ullam numquam fugiat officia
                  autem.
                </li>
                <li className={style.paragraph}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  pariatur est exercitationem distinctio alias ducimus impedit?
                  Aut asperiores pariatur porro quibusdam voluptate
                  consequuntur, voluptas culpa ullam.
                </li>
                <li className={style.paragraph}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  pariatur est exercitationem distinctio alias ducimus impedit?
                  Aut asperiores pariatur porro quibusdam voluptate
                  consequuntur, voluptas.
                </li>
                <li className={style.paragraph}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  pariatur est exercitationem distinctio alias ducimus impedit?
                  Aut asperiores pariatur porro quibusdam.
                </li>
              </ul> */}
            </div>
            <div className="col-md-5 col-lg-4">
              <ul>
                <li>
                  <div className="fw-bold">Lorem, ipsum dolor.</div>
                  <p className={style.paragraph}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsam, itaque dolor.
                  </p>
                </li>
                <li>
                  <div className="fw-bold">Lorem, ipsum dolor.</div>
                  <p className={style.paragraph}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsam, itaque dolor.
                  </p>
                </li>
                <li>
                  <div className="fw-bold">Lorem, ipsum dolor.</div>
                  <div className={style.paragraph}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsam, itaque dolor.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="instructor" className={style.profile_section}>
          <h5 className={style.title}>Instructor</h5>
          <div className="row">
            <div className="col-lg-4">
              <div className={`card ${style.profile_card}`}>
                <div className="d-flex g-3">
                  <div className={style.card_left}>
                    <div className={style.profile_img_wrapper}>
                      <img src={courseProfile?.instructorProfileImg ?courseProfile?.instructorProfileImg : Algo} alt="" className={style.image} />
                    </div>
                  </div>

                  <div className={style.card_right}>
                    <p className={style.name}>{courseProfile?.instructorName}</p>
                    <p className={style.occupation}>
                      Power BI instructor (Data science)
                    </p>
                    <div className={style.rating_wrapper}>
                      <p className={style.rating}>Rating</p>
                      <span className={style.rating_stars}> 
                       <StarRatings
                        rating={4}
                        starRatedColor="yellow"
                        starDimension={18} 
                        starSpacing="2px"
                        numberOfStars={5}
                        name='rating'
                        fillColor="red" 
                        transition />
</span>
                      <span className={style.rating_total}></span>
                    </div>
                    <div className={style.profile_footer}>
                      <div className={style.location}>
                        <p className={style.occupation}>Location</p>
                        <p className="fw-bold">{courseProfile?.instructorLocation}</p>
                      </div>
                      <div className="style time">
                        <p className={style.occupation}>Time Active</p>
                        <p className="fw-bold"> {courseProfile?.instructorJoinDate && getDate(courseProfile.instructorJoinDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="syllabus" className={style.syllabus}>
          <h4 className={style.title}>Syllabus</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus
            ridiculus nunc adipiscing justo.
          </p>
          <ul>
            {courseProfile?.syllabus?.length > 0 && courseProfile.syllabus.slice(0, 3).map((item) => (
              <li>
                <p>{item.title}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
        <section id="packages" className={style.packages}>
          <h3 className={`text-center ${style.header}`}>Packages</h3>
          <p className={`subtitle ${style.subtitle}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus
            ridiculus nunc adipiscing justo.
          </p>
          <div id="packages" className={` row ${style.package_card_wrapper}`}>
            {courseProfile?.packages?.length > 0 && courseProfile.packages.map(item=>(
            <div className="col-md-4" key={item.name}>
              <PackageCard key={item.name} item={item} courseId={courseProfile.courseId} />
            </div>
            ))}
          </div>
        </section>
        <ReviewSection />
        <section id="others" className={style.other_courses}>
          <h3 className={style.header}>Other Courses By Teachers</h3>
          <div className={style.other_main}>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => {}}
              onSlideChange={() => {}}
              breakpoints={{
                // when window width is >= 320px
                320: {
                  slidesPerView: 1,
                  spaceBetween: 3,
                },
                // when window width is >= 640px
                575: {
                  slidesPerView: 2,
                  spaceBetween: 3,
                },
                700: {
                  slidesPerView: 2,
                  spaceBetween: 3,
                },
                1024: {
                  slidesPerView: 3.5,
                  spaceBetween: 5,
                },
              }}
            >
                <SwiperSlide>
                    <OtherCard />
                </SwiperSlide>
                <SwiperSlide>
                    <OtherCard />
                </SwiperSlide>
                <SwiperSlide>
                    <OtherCard />
                </SwiperSlide>
                <SwiperSlide>
                    <OtherCard />
                </SwiperSlide>
                <SwiperSlide>
                    <OtherCard />
                </SwiperSlide>
              </Swiper>
              </div>
        </section>
      </div>
    </Courses>
  );
};

export const PackageCard = ({item, courseId}) => {
  const {studentFunctions:{addCourse}} = useAuth();
  const {getItem}= useLocalStorage()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

   async function enrollToCourse(){
    const  userData = getItem(KEY)
    if(userData !== null){
      localStorage.setItem("gotocourse-paymentDetails", JSON.stringify({...item, courseId:courseId}))
     navigate("payment")
    } else {
      navigate("/login")
    }
   }
  return (
    <div className={`card ${style.package_card}`} style={{height:"100%"}}>
      <div className="card-body d-flex flex-column justify-content-around" style={{}}>
        <p className={style.package_price}>$ {item.price}</p>
          <p className={style.package_title}>{item.title}</p>
          <p className={style.package_text}>
            {item.description}
          </p>
        
        <div className="text-center">
          <button
            className={`button button-md mx-auto ${style.package_button}`}
            onClick={enrollToCourse}
          >
            {loading ? 
              <div className="spinner-border text-light" role="status" >
                <span className="visually-hidden">Loading...</span>
              </div>  
              :
              <span>
                Proceed to payment
              </span>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export const ReviewCard = () => {
  return (
    <div className={`card ${style.review_card} w-100`}>
      <div className="card-body">
        <p className={style.review_text}>
          “I had a wonderful experience and can confidently say that GotoCourse
          is the place to be to get all your I.T. certifications.”
        </p>
        <div
          className={`d-flex flex-wrap justify-content-between align-items-center ${style.review_card_footer}`}
        >
          <div className={`d-flex align-items-center ${style.review_left}`}>
            <div className={style.profile_img_wrapper}>
              <img src={Power} alt="" className={style.image} />
            </div>
            <div className={style.profile_info}>
              <p className={style.profile_name}>Bola</p>
              <small>Lagos, Nigeria</small>
            </div>
          </div>
          <div className={style.review_right}>
            <span className={style.review_stars}>
              <BsStarFill style={{ color: "#FFCB14", fontSize: "24px" }} />
              <BsStarFill style={{ color: "#FFCB14", fontSize: "24px" }} />
              <BsStarFill style={{ color: "#FFCB14", fontSize: "24px" }} />
              <BsStarFill style={{ color: "#FFCB14", fontSize: "24px" }} />
              <BsStarFill style={{ color: "#FFCB14", fontSize: "24px" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OtherCard = () => {
  return (
    <div className={`card ${style.package_card, style.othercard} p-2`}>
      <div className="card-body">
        <p className={style.package_price}>Introduction to SQL</p>
        <p className={style.subtext}>Data Science</p>
        <p className={style.package_text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus
          ridiculus nunc adipiscing justo. Proin fermentum ipsum a non t
          laoreet.
        </p>
        <div className="d-flex align-items-center" >
            <div className={style.profile_img_wrapper}>
              <img src={Power} alt="" className={style.image} />
            </div>
            <p className={style.course_card_author}>Niyi Adegoke</p>
        </div>
      </div>
    </div>
  );
};

export const ReviewSection = ()=> {
  return (
    <section id="review" className={style.review}>
    <h3 className={style.header}>Reviews</h3>
    <p className={`subtitle ${style.subtitle}`}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus
      ridiculus nunc adipiscing justo.
    </p>
    <div className={style.review_main}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 3,
          },
          // when window width is >= 640px
          575: {
            slidesPerView: 2,
            spaceBetween: 3,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 3,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <ReviewCard />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewCard />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
  )
}