import React, { useState, useRef, useEffect } from "react";
import Logo from "../images/Logo.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import {motion} from 'framer-motion'
import {Link, useNavigate, useLocation} from "react-router-dom"


import {categories as navList} from "../data"
import { useAuth } from "../contexts/Auth";
import { useLocalStorage } from "../hooks";
import {ScrollToTop} from "../pages/Courses"

const KEY = "gotocourse-userdata"
// const navList = [
//   {
//     id: 1,
//     title: "Cybersecurity",
//     link: "/categories/cybersecurity"
//   },
//   {
//     id: 2,
//     title: "Risk Management",
//     link: "/categories/risk-management"
//   },
//   {
//     id: 3,
//     title: "Data Science",
//     link: "/categories/data-science"
//   },
//   {
//     id: 4,
//     title: "Project Management",
//     link: "/categories/project-management"
//   },
//   {
//     id: 5,
//     title: "IT compliance",
//     link: "/categories/it-compliance"
//   },
//   {
//     id: 6,
//     title: "IT Audit",
//     link: "/categories/it-audit"
//   },
//   {
//     id: 7,
//     title: "Business Analysis",
//     link: "/categories/business-analysis"
//   },
//   {
//     id: 8,
//     title: "Product Design",
//     link: "/categories/product-design"
//   },
//   {
//     id: 9,
//     title: "Web Design",
//     link: "/categories/web-design"
//   },
//   {
//     id: 10,
//     title: "Software Development",
//     link: "/categories/software-development"
//   },
//   {
//     id: 11,
//     title: "IT Service Management",
//     link: "/categories/it-service-management"
//   },
// ];
const Navbar = () => {
  const { setGeneralState } = useAuth();
  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(false);
  const {getItem} = useLocalStorage();

  const value = getItem(KEY)
  const location = useLocation();

  console.log(location.pathname.split("/"))
  console.log(location.pathname.split("/").length)

  const toggleNav = () => {
    setShow(!show);
  };

  const toggleDrop = () => {
    setDrop(!drop);
  };

  const dropRef = useRef(null);
  const heightRef = useRef(null);
  
  const status = OutsideClick(dropRef);



  useEffect(() => {
    localStorage.setItem("g2cNavHeight", heightRef.current.clientHeight )
      setGeneralState((old) => {
      return {
        ...old,
        navHeight: heightRef.current.clientHeight
      };
    });  
  }, []);

  return (
    <nav ref={heightRef} section="top" className="nav navbar navbar-expand-lg navbar-light" style={{borderBottom: "1px solid rgba(159, 159, 159, .3)"}}>
<ScrollToTop />
      <div className="container navbar-container align-items-center">
        <Link to="/" onClick={()=> window.scrollTo(0, 0)} className="logo navbar-brand ">
          <img src={Logo} alt="Brand Name" />
        </Link>
        <button type="button" className="navbar-toggler " onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse  justify-content-end  align-items-center mt-3 mt-lg-0 ${
            show ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-5">
            {location.pathname.split("/")[1] === "" &&
            <li className="nav-item holder">
              <Link
                type="button"
                className="link nav-link courses me-4"
                to="/categories"
                // onClick={toggleDrop}

              >
                Categories
                {/* <span>
                  <i>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: "20px" }}
                      className={`drop_caret ${drop ? "rotate" : ""}`}
                    />
                  </i>
                </span> */}
              </Link>
              {drop ? <NavList dropRef={dropRef} /> : null}
            </li>
            }
            { value?.token ? (
                <li className="nav-item d-flex align-items-center nav_link me-2"><a href="https://goto-course.com/dashboard" className="link">Go to Dashboard</a></li> 
            ):(
              <>
                <li className="nav-item d-flex align-items-center nav_link"><Link to="/become-a-teacher" className="link">Become a Teacher</Link></li>
                <li className="nav-item d-flex align-items-center nav_link d-lg-none"><Link to="/login" className="link">Sign In</Link></li>
                <li className="nav-item d-flex align-items-center nav_link d-lg-none"><Link to="/signup" className="link">Register</Link></li>
              </>
            )}
          </ul>
          {value?.token ? (
            <Link to={`${value.userType === "student" ? "/students" : "/teacher"}`}>
              <div className="d-flex align-items-center" style={{color:"var(--theme-blue", fontSize:"20px"}}>
                <i className="d-flex align-items-center justify-content-center me-2" style={{color:"var(--theme-blue"}}><FaRegUser /></i>
                <span>{value.firstName}</span>
              </div>
            </Link>
          ) : (
            <>
          <Link to="/login">
          <motion.button type="button" className="button button-md d-none d-lg-block signup"
          whileHover={{
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            boxShadow: "0px 0px 8px rgb(0, 0, 0)",
          }}
          transition={{duration: 0.1}}
          
          >
            <span>Sign in</span>
          </motion.button>
          </Link>

          <Link to="/signup">
          <motion.button type="button" className=" btn-plain d-none d-lg-block"
          whileHover={{
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            boxShadow: "0px 0px 8px rgb(0, 0, 0)",
          }}
          transition={{duration: 0.1}}
          
          >
            <span>Register</span>
          </motion.button>
          </Link>
          </>

          )}

        </div>
      </div>
    </nav>
  );
};
const NavList = ({ dropRef }) => {
  const navigate = useNavigate()

  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity: 1}}
    transition={{duration: 0.3}}
    className="drop" ref={dropRef}
    
    >
      <ul>
        {navList.map((list) => (
          <li key={list.name}>

          <div
            className="text-capitalize"
            style={{cursor:"pointer", fontSize:"14px"}}
            onClick={()=>{
              console.log(list.logo) 
              delete list.logo
              localStorage.setItem("gotocourse-category", JSON.stringify(list))
              navigate(`/categories/${list.name.split(" ").join("-").toLowerCase()}`)
            }}
          > 
            {list.name}
           </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

function OutsideClick(ref) {
  const [isClicked, setIsClicked] = useState();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return isClicked;
}

export default Navbar;
