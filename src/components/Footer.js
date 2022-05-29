import React from "react";
import { Link } from "react-router-dom";

import {motion} from "framer-motion"
import {Logo, Logosm} from "../images/components/svgs"

const hover = {
  hover: {
    scale:1.2,
    originX: 0
  },
  transition:{
    stiffness: 300
  }
}

const leftLink = [
 
  {
    id:1,
    title:"End-user Policy",
    path:"/"
  },
  {
    id:3,
    title:"Privacy Policy",
    path:"/"
  },
  {
    id:4,
    title:"Teaching Policy",
    path:"/"
  },
  {
    id:5,
    title:"Terms of Use",
    path:"/"
  },
  {
    id:6,
    title:"Cookies",
    path:"/"
  },
]

const rightLink = [
  {
    id:1,
    title:"About us",
    path:"/"
  },
  {
    id:2,
    title:"Security",
    path:"/"
  },
 
  {
    id:4,
    title:"Coverage",
    path:"/"
  },
  {
    id:5,
    title:"Careers",
    path:"/"
  },
  {
    id:6,
    title:"Contact us",
    path:"/"
  },
]
const Footer = () => {
  return (
    <footer className="footer wrapper">
      <div className="container ">
      <div className="box mb-5">
            <p className="text-center mb-5">
              Join Gotocourse to unleash untapped opportunities in borderless
              knowledge sharing across the world! We are ready to serve you
              anywhere you are
            </p>
          <div className="join_button_wrapper justify-content-center align-items-center d-flex mb-3">
            <Link to="/signup">
              <button type="button" className="btn btn-light px-lg-4 py-lg-3">
                Join as a student
              </button>
            </Link>
            <small>OR</small>
            <Link to="/admin/login">
              <button type="button" className="btn btn-outline-light px-lg-4 py-lg-3">
                Apply to teach
              </button>
            </Link>
          </div>
        </div>
        <div className="footer_container d-flex justify-content-between">

        <div className="footer_left">
            <div className="footer_top pt-2">
            <i className="d-none d-lg-block">
              <Logo />
            </i>
            <i className="d-lg-none">
              <Logosm />
            </i>
            </div>
        </div>
        <div className="footer_right">
        <div className=" d-flex flex-wrap justify-content-around">
          <div className="first">
            <ul>
            
                <li>Legal</li>
             
              {leftLink.map(link=>(
              <Link to={link.path}>
                <motion.li
                
                whileHover={{
                  scale:1.2,
                  originX: 0,
                  color: "#F75C4E"

                }}
                transition={{
                  stiffness:300
                }}
                >
                    {link.title}
                </motion.li>
              </Link>
              ))}
            </ul>
          </div>
          <div className="second">
            <ul>
            <li>Company</li>

            {rightLink.map(link=>(
              <Link to={link.path}>
                <motion.li
                whileHover={{
                  scale:1.2,
                  originX: 0,
                  color: "#F75C4E"
                }}
                transition={{
                  stiffness:300
                }}
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
