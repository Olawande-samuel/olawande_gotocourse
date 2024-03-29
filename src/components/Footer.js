import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"
import { Logo, Logosm } from "../images/components/svgs"
import { HashLink } from "react-router-hash-link"
import logo from '../images/landing/logo.svg'

const hover = {
  hover: {
    scale: 1.2,
    originX: 0
  },
  transition: {
    stiffness: 300
  }
}

const leftLink = [

  {
    id: 1,
    title: "End-user Policy",
    path: "/end-user-policy"
  },
  {
    id: 3,
    title: "Privacy Policy",
    path: "/privacy-policy"
  },
  {
    id: 4,
    title: "Teaching Policy",
    path: "/teaching-policy"
  },
  {
    id: 5,
    title: "Terms of Use",
    path: "/terms-of-use"
  },
  {
    id: 6,
    title: "Cookies",
    path: "/cookies"
  },
 
]

const rightLink = [
  {
    id: 1,
    title: "About us",
    path: "/about"
  },
  // {
  //   id: 7,
  //   title: "Apply to teach",
  //   path: "/become-a-teacher"
  // },
  {
    id: 5,
    title: "Careers",
    path: "/company/career"
  },
  // {
  //   id:9,
  //   title:"How It Works",
  //   path:"/career"
  // },

  {
    id: 10,
    title: "Blog",
    path: "/blog"
  },

  {
    id: 7,
    title: "Events",
    path: "/events"
  },
  {
    id: 6,
    title: "Contact us",
    path: "/company/contact"
  },
  // {
  //   id: 7,
  //   title: "Admin",
  //   path: "/admin/login"
  // },
  // {
  //   id: 7,
  //   title: "Teachers",
  //   path: "/become-a-teacher"
  // },
  //   {
  //     id: 8,
  //     title: "Teachers",
  //     path: "/qualifications"
  // },
  // {
  //   id: 9,
  //   title: "Affiliates",
  //   path: "/affiliates"
  // },
  
  // {
  //   id: 11,
  //   title: "Enterprise",
  //   path: "/enterprise"
  // },
]
const Footer = () => {
  const location = useLocation();
  const celebRoute = location.pathname.split("/")[1] === "lounge"
  // const landing = location.pathname.split("/")[1] === "" || location.pathname.split("/")[1] === "become-a-teacher" || location.pathname.split("/")[1] === "classes";
  const landing = location.pathname.split("/")[1] === ""
  const students = location.pathname.split("/")[1] === "" || location.pathname.split("/")[1] === "students";
  const teacher = location.pathname.split("/")[1] === "" || location.pathname.split("/")[1] === "become-a-teacher" || location.pathname.split("/")[1] === "qualifications" || location.pathname.split("/")[1] === "gotocourse-teacher"

  const scrollWithOffset = (el) => {
    const yCoord = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoord + yOffset, behaviour: "smooth" })
  }

  const {
    otherFunctions: { fetchCategories },
  } = useAuth();

  const categories = useQuery(["categories"], () => fetchCategories());
  return (
    <footer className="footer wrapper" style={{
      // background: celebRoute ? "#000F62" : "var(--blue-ish)", color: celebRoute ? "#fffff" : "var(--theme-blue)"
      background: "var(--blue-ish)", color: "var(--theme-blue)"

    }}>
      <div className="container ">
        {
          celebRoute ?
            <div className="box mb-5">
              <p className="text-center mb-5">Ready to become a mentor on Gotocourse?</p>
              <div className="join_button_wrapper justify-content-center align-items-center d-flex mb-3">
                <Link to="/teacher/signup" onClick={() => window.scrollTo(0, 0)}>
                  <button type="button" className="btn btn-outline-primary px-lg-4 py-lg-3" style={{ borderColor: "#0C2191", color: "#0C2191" }}>
                    Enroll as a mentor
                  </button>
                </Link>
              </div>

            </div>

            :
            <div className="box mb-5">
              {/* <p className="text-center mb-5">
                Join Gotocourse to unleash untapped opportunities in borderless
                knowledge sharing across the world! We are ready to serve you
                anywhere you are
              </p> */}

              <div className="join_button_wrapper justify-content-center align-items-center d-flex mb-3">
                {/* {students && <Link to="/students" onClick={() => window.scrollTo(0, 0)}>
                  <motion.button type="button"
                    className="btn btn-light px-lg-4 py-lg-3"
                    // style={{ color: celebRoute ? "#fff" : "var(--theme-blue)", background: "#fff", borderColor: celebRoute ? "#fff" : "var(--theme-blue)" }}
                    style={{ color: "var(--theme-blue)", background: "#fff", borderColor: "var(--theme-blue)" }}
                    whileHover={{
                      boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                      textShadow: "0px 0px 8px rgb(255,255,255)",
                    }}
                    transition={{ duration: 0.1 }}

                  >
                    Join as a student
                  </motion.button>
                </Link>
                } */}
                {/* {landing && <small>OR</small>} */}

                {/* { <a href="https://gotocourse.com" >
                  <motion.button type="button"
                    className="btn btn-light px-lg-4 py-lg-3"
                    // style={{ color: celebRoute ? "#fff" : "var(--theme-blue)", background: "#fff", borderColor: celebRoute ? "#fff" : "var(--theme-blue)" }}
                    style={{ color: "var(--theme-blue)", background: "#fff", borderColor: "var(--theme-blue)" }}
                    whileHover={{
                      boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                      textShadow: "0px 0px 8px rgb(255,255,255)",
                    }}
                    transition={{ duration: 0.1 }}

                  >
                    Chat us on WhatsApp
                  </motion.button>
                </a>
                } */}

                {/* {
                  teacher && <p style={{fontWeight: "700", fontSize:"20px"}}>
                    Gotocourse is selected by leading organizations to develop in-demand career skills.
                  </p>
                } */}
                {/* {  !teacher && <a href="https://gotocourse.com" >
                  <motion.button type="button"
                    className="btn btn-light px-lg-4 py-lg-3"
                    // style={{ color: celebRoute ? "#fff" : "var(--theme-blue)", background: "#fff", borderColor: celebRoute ? "#fff" : "var(--theme-blue)" }}
                    style={{ color: "var(--theme-blue)", background: "#fff", borderColor: "var(--theme-blue)" }}
                    whileHover={{
                      boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                      textShadow: "0px 0px 8px rgb(255,255,255)",
                    }}
                    transition={{ duration: 0.1 }}

                  >
                    Chat us on WhatsApp
                  </motion.button>
                </a>
                } */}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {/* {  teacher && <a href="https://gotocourse.com" >
                    <motion.button type="button"
                      className="btn btn-light px-lg-4 py-lg-3"
                      // style={{ color: celebRoute ? "#fff" : "var(--theme-blue)", background: "#fff", borderColor: celebRoute ? "#fff" : "var(--theme-blue)" }}
                      style={{ color: "var(--theme-blue)", background: "#fff", borderColor: "var(--theme-blue)" }}
                      whileHover={{
                        boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                        textShadow: "0px 0px 8px rgb(255,255,255)",
                      }}
                      transition={{ duration: 0.1 }}

                    >
                      Chat us on WhatsApp
                    </motion.button>
                  </a>
                  } */}
              </div>
            </div>
        }
        <div className="footer_container d-flex justify-content-between">
          <div className="footer_left">
            <div className="footer_top pt-2">
              <a href="https://gotocourse.com" target="_blank" rel="noreferrer" onClick={() => window.scrollTo(0, 0)}>
                <i className="d-none d-lg-block">
                  {/* <Logo color={!celebRoute ? "var(--theme-blue)" : "#fff"} /> */}
                  {/* <Logo color={"var(--theme-blue)" } /> */}


                  <img src={logo} alt="" width={250} />


                </i>

                <i className="d-lg-none">
                  {/* <Logosm color={!celebRoute ? "var(--theme-blue)" : "#fff"} /> */}
                  {/* <Logosm color={"var(--theme-blue)"} /> */}


                  <img src={logo} alt="" width={250} />

                </i>
                {/* <small className="text-center d-block" style={{ fontSize: '16px', color: !celebRoute ? "var(--theme-blue)" : "#fff" }}>Learn without limits.</small> */}
                {/* <small className="text-center d-block" style={{ fontSize: '16px', color: "var(--theme-blue)" }}>Learn without limits.</small> */}
              </a>
            </div>

            {/* <div className="second">
              <ul>
                <li>Categories</li>
                {categories.data?.data?.map((link, index) => (
                  <Link key={index} to={`/categories/${link.name.split(" ").join("-").toLowerCase()}`} onClick={() => {
                    localStorage.setItem('gotocourse-category', JSON.stringify(link))
                  }}>
                    <motion.li
                      style={{
                        // color: !celebRoute ? "var(--theme-blue)" : "#FFF",
                        color: "var(--theme-blue)",
                        lineHeight: "26px",
                        fontSize: "10px",
                      }}
                      whileHover={{
                        scale: 1.1,
                        originX: 0,
                        color: "#F75C4E"
                      }}
                      transition={{
                        stiffness: 300
                      }}

                    >
                      {link.name}
                    </motion.li>
                  </Link>
                ))}

              </ul>
            </div> */}
          </div>

          <div className="footer_right">
            <div className=" d-flex flex-wrap justify-content-around">
              <div className="first">
                <ul>

                  <li>Legal</li>

                  {leftLink.map((link, index) => (
                    // <Link to={link.path}>
                    <HashLink key={index} to={link.path} scroll={el => scrollWithOffset(el)}
                    >

                      <motion.li

                        whileHover={{
                          scale: 1.2,
                          originX: 0,
                          color: "#F75C4E"

                        }}
                        transition={{
                          stiffness: 300
                        }}
                        // style={{ color: !celebRoute ? "var(--theme-blue)" : "#FFF", fontSize:"10px", lineHeight:"26px" }}
                        style={{ color: "var(--theme-blue)", fontSize: "10px", lineHeight: "26px" }}
                      >
                        {link.title.toUpperCase()}
                      </motion.li>
                    </HashLink>

                    // </Link>
                  ))}
                </ul>
              </div>
              <div className="second">
                <ul>
                  <li>Company</li>
                  {rightLink.map((link, index) => (
                    <a key={index} href={`https://www.gotocourse.com/${link.path}`}>
                      <motion.li
                        whileHover={{
                          scale: 1.2,
                          originX: 0,
                          color: "#F75C4E"
                        }}
                        transition={{
                          stiffness: 300
                        }}
                        style={{ color: "var(--theme-blue)", fontSize: "10px", lineHeight: "26px" }}
                      >
                        {link.title.toUpperCase()}
                      </motion.li>
                    </a>
                  ))}

                </ul>
              </div>
              <div className="second">
                <ul>
                  <li>Get In Touch</li>
                  <a href={`https://gotocourse.com`}>
                    <motion.li
                      whileHover={{
                        scale: 1.2,
                        originX: 0,
                        color: "#F75C4E"
                      }}
                      transition={{
                        stiffness: 300
                      }}
                      style={{ color: "var(--theme-blue)", fontSize: "10px", lineHeight: "26px" }}
                    >
                      Create with Gotocourse

                    </motion.li>
                  </a>
                  <Link  to={`/`}>
                    <motion.li
                      whileHover={{
                        scale: 1.2,
                        originX: 0,
                        color: "#F75C4E"
                      }}
                      transition={{
                        stiffness: 300
                      }}
                      style={{ color: "var(--theme-blue)", fontSize: "10px", lineHeight: "26px" }}
                    >
                      Creator's Acacdemy

                    </motion.li>
                  </Link>

                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
