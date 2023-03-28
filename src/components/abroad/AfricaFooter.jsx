import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"
import { Logo, Logosm } from "../../images/components/svgs"
import { HashLink } from "react-router-hash-link"
import { useAuth } from "../../contexts/Auth";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { height, padding } from "@mui/system";
import africalogo from '../../images/abroad/africalogo.png'

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
  {
    id: 7,
    title: "Events",
    path: "/events&articles"
  },
]

const rightLink = [
  {
    id: 1,
    title: "About us",
    path: "/about-us"
  },
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
  // {
  //   id: 7,
  //   title: "Admin",
  //   path: "/admin/login"
  // },
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
  // {
  //   id: 8,
  //   title: "Mentors Lounge",
  //   path: "/lounge"
  // },
  {
    id: 8,
    title: "Enterprise",
    path: "/enterprise"
  },
]
const AfricaFooter = () => {
  const location = useLocation();
  const celebRoute = location.pathname.split("/")[1] === "lounge"
  // const landing = location.pathname.split("/")[1] === "" || location.pathname.split("/")[1] === "become-a-teacher" || location.pathname.split("/")[1] === "classes";
  const landing = location.pathname.split("/")[1] === ""
  const students = location.pathname.split("/")[1] === "" || location.pathname.split("/")[1] === "students";
  const teacher = location.pathname.split("/")[1] === "" || location.pathname.split("/")[1] === "become-a-teacher"

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
      background: "var(--theme-blue)", color: "#fff",display: "flex", alignItems: "center" 
    }}>
      <div className="container ">
        <div className="footer_container d-flex justify-content-between">
          <div className="footer_left">
            <div className="footer_top pt-2">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <i className="d-none d-lg-block">
                  <Logo color={"#fff"} style={{width: "100px"}}/>
                  {/* <img src={africalogo} alt="" style={{width: "150px"}}/> */}
                  {/* <Logo color={"var(--theme-blue)"} /> */}
                  {/* <TrainLogo/> */}
                </i>

                <i className="d-lg-none">
                  <Logosm color={"#fff"} />
                  {/* <Logosm color={"var(--theme-blue)"} /> */}
                  {/* <TrainLogo/> */}

                </i>
                {/* <small className="text-center d-block" style={{ fontSize: '16px', color: !celebRoute ? "var(--theme-blue)" : "#fff" }}>Learn without limits.</small> */}
                <small className="text-center d-block" style={{ fontSize: '16px',  color: "#fff", padding: "1rem 0" }}>All right reserved | c 2022 Gotocourse Inc </small>
              </Link>

              <div style={{ display: "flex", alignItems: "center", justifyContent:"center", gap: "2rem" , padding: "2rem 0"}}>
                  <li><BsFacebook style={{  color: "#fff", fontSize: "1.5rem" }} /></li>
                  <li><BsInstagram style={{  color: "#fff", fontSize: "1.5rem" }} /></li>
                  <li><BsTwitter style={{  color: "#fff", fontSize: "1.5rem" }} /></li>
                  <li><AiOutlineMail style={{  color: "#fff", fontSize: "1.5rem" }} /></li>

                </div>
            </div>

            <div className="second">
              <ul>
               
                {/* {categories.data?.data?.map((link, index) => (
                    <Link key={index} to={`/categories/${link.name.split(" ").join("-").toLowerCase()}`} onClick={()=>{
                      localStorage.setItem('gotocourse-category', JSON.stringify(link))
                    }} style={{ color:"#fff"}}>
                      <motion.li
                        style={{ 
                          // color: !celebRoute ? "var(--theme-blue)" : "#FFF",
                          color:"#fff",
                          lineHeight: "26px",
                          fontSize: "10px",
                        }}
                        whileHover={{
                          scale: 1.1,
                          originX: 0,
                          color:"var(--theme-blue)",
                        }}
                        transition={{
                          stiffness: 300
                        }}
                        
                      >
                        {link.name}
                      </motion.li>
                    </Link>
                  ))} */}

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
                          color: "#fff"

                        }}
                        transition={{
                          stiffness: 300
                        }}
                        // style={{ color: !celebRoute ? "var(--theme-blue)" : "#FFF", fontSize:"10px", lineHeight:"26px" }}
                        style={{  color: "#fff", fontSize: "10px", lineHeight: "26px" }}
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
                  <li>Security</li>
                  {rightLink.map((link, index) => (
                    <Link key={index} to={link.path}>
                      <motion.li
                        whileHover={{
                          scale: 1.2,
                          originX: 0,
                          color: "#fff"
                        }}
                        transition={{
                          stiffness: 300
                        }}
                        style={{  color: "#fff", fontSize: "10px", lineHeight: "26px" }}
                      >
                        {link.title.toUpperCase()}
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

export default AfricaFooter;
