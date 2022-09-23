import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion"
import { Logo, Logosm } from "../images/components/svgs"
import { HashLink } from "react-router-hash-link"

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
    path: "/about-us"
  },
  // {
  //   id:2,
  //   title:"Security",
  //   path:"/"
  // },

  // {
  //   id:4,
  //   title:"Coverage",
  //   path:"/"
  // },
  {
    id: 5,
    title: "Careers",
    path: "/career"
  },
  // {
  //   id:9,
  //   title:"How It Works",
  //   path:"/career"
  // },
  {
    id: 6,
    title: "Contact us",
    path: "/contact-us"
  },
  {
    id: 7,
    title: "Admin",
    path: "/admin/login"
  },
  {
    id: 7,
    title: "Teachers",
    path: "/become-a-teacher"
  },
  {
    id: 7,
    title: "Affiliates",
    path: "/affiliates"
  },
  {
    id: 8,
    title: "Mentors Lounge",
    path: "/lounge"
  },
]
const Footer = () => {
  const location = useLocation();
  const celebRoute = location.pathname.split("/")[1] === "lounge"
  const landing = location.pathname.split("/")[1] === "" || location.pathname.split("/")[1] === "become-a-teacher" || location.pathname.split("/")[1] === "classes";

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
      background: celebRoute ? "#000F62" : "var(--blue-ish)", color: celebRoute ? "#fffff" : "var(--theme-blue)"
      
    }}>
      <div className="container ">
        {
          celebRoute ?
            <div className="box mb-5">
              <p className="text-center mb-5">Ready to become a mentor on Gotocourse?</p>
              <div className="join_button_wrapper justify-content-center align-items-center d-flex mb-3">
                <Link to="/teacher/signup" onClick={() => window.scrollTo(0, 0)}>
                  <button type="button" className="btn btn-outline-light px-lg-4 py-lg-3">
                    Enroll as a mentor
                  </button>
                </Link>
              </div>

            </div>

            :
            <div className="box mb-5">
              <p className="text-center mb-5">
                Join Gotocourse to unleash untapped opportunities in borderless
                knowledge sharing across the world! We are ready to serve you
                anywhere you are
              </p>
              <div className="join_button_wrapper justify-content-center align-items-center d-flex mb-3">
                <Link to="/students" onClick={() => window.scrollTo(0, 0)}>
                  <motion.button type="button"
                    className="btn btn-light px-lg-4 py-lg-3"
                    style={{ color: celebRoute ? "#fff" : "var(--theme-blue)", background: "#fff", borderColor: celebRoute ? "#fff" : "var(--theme-blue)" }}
                    whileHover={{
                      boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                      textShadow: "0px 0px 8px rgb(255,255,255)",
                    }}
                    transition={{ duration: 0.1 }}

                  >
                    Join as a student
                  </motion.button>
                </Link>
                <small>OR</small>
                <Link to="/become-a-teacher">
                  <motion.button type="button"
                    className="btn btn-light px-lg-4 py-lg-3"
                    style={{ color: celebRoute ? "#fff" : "var(--theme-blue)", background: "#fff", borderColor: celebRoute ? "#fff" : "var(--theme-blue)" }}
                    whileHover={{
                      boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                      textShadow: "0px 0px 8px rgb(255,255,255)",
                    }}
                    transition={{ duration: 0.1 }}

                  >
                    Apply to teach
                  </motion.button>
                </Link>
              </div>
            </div>
        }
        <div className="footer_container d-flex justify-content-between">

          {/* <div className="footer_left">
            <div className="footer_top pt-2">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <i className="d-none d-lg-block">
                  <Logo color={!celebRoute ? "var(--theme-blue)" : "#fff"} />
                </i>

                <i className="d-lg-none">
                  <Logosm color={!celebRoute ? "var(--theme-blue)" : "#fff"} />
                </i>
                <small className="text-end d-block" style={{ fontSize: '16px', color: !celebRoute ? "var(--theme-blue" : "#fff" }}>Learn without limits.</small>
              </Link>
            </div>
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
                        style={{ color: !celebRoute ? "var(--theme-blue" : "#FFF" }}
                      >
                        {link.title}
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
                    <Link key={index} to={link.path}>
                      <motion.li
                        whileHover={{
                          scale: 1.2,
                          originX: 0,
                          color: "#F75C4E"
                        }}
                        transition={{
                          stiffness: 300
                        }}
                        style={{ color: !celebRoute ? "var(--theme-blue" : "#FFF" }}
                      >
                        {link.title}
                      </motion.li>
                    </Link>
                  ))}

                </ul>
              </div>

            </div>
          </div> */}

          <div className="footer_left">
            <div className="footer_top pt-2">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <i className="d-none d-lg-block">
                  <Logo color={!celebRoute ? "var(--theme-blue)" : "#fff"} />
                </i>

                <i className="d-lg-none">
                  <Logosm color={!celebRoute ? "var(--theme-blue)" : "#fff"} />
                </i>
                <small className="text-center d-block" style={{ fontSize: '16px', color: !celebRoute ? "var(--theme-blue" : "#fff" }}>Learn without limits.</small>
              </Link>
            </div>

            <div className="second">
                <ul>
                  <li>Categories</li>
                  {categories.data?.data?.map((link, index) => (
                    <Link key={index} to={`/categories/${link.name.split(" ").join("-").toLowerCase()}`}>
                      <motion.li
                        style={{ 
                          color: !celebRoute ? "var(--theme-blue)" : "#FFF",
                          lineHeight: "26px"
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
                        {link.name.toLowerCase()}
                      </motion.li>
                    </Link>
                  ))}

                </ul>
              </div>
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
                        style={{ color: !celebRoute ? "var(--theme-blue" : "#FFF" }}
                      >
                        {link.title}
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
                    <Link key={index} to={link.path}>
                      <motion.li
                        whileHover={{
                          scale: 1.2,
                          originX: 0,
                          color: "#F75C4E"
                        }}
                        transition={{
                          stiffness: 300
                        }}
                        style={{ color: !celebRoute ? "var(--theme-blue" : "#FFF" }}
                      >
                        {link.title}
                      </motion.li>
                    </Link>
                  ))}

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
