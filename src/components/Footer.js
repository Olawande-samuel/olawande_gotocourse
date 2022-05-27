import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import {motion} from "framer-motion"

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
    title:"Legal",
    path:"/"
  },
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
    title:"Developer Policy",
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
    title:"Security",
    path:"/"
  },
  {
    id:1,
    title:"Company",
    path:"/"
  },
  {
    id:3,
    title:"About us",
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
    title:"Contact",
    path:"/"
  },
]
const Footer = () => {
  return (
    <footer className="footer wrapper">
      <div className="container footer_container d-flex  justify-content-between">
        <div className="footer_left">
            <div className="footer_top">
              <p className="footer_title">VISIT US</p>
              <p className="footer_text" >VISIT US 9898 Bissonnet Street, Suite 270 , Houston, TX 77036, USA. </p>
            </div>
            <div className="footer_bottom">
            <p className="footer_title">REACH OUT</p>
              <a  className="footer_text" href="tel: +17136363221"> +1 713 636 3221</a>
              <a  className="footer_text" href="mailto:Gotocourse@gmail.com">Gotocourse@gmail.com </a>
            </div>
          
        </div>
        <div className="footer_right d-flex flex-wrap justify-content-around">
          <div className="first">
            <ul>

              {leftLink.map(link=>(
              <Link to={link.path}>
                <motion.li
                whileHover={{
                  scale:1.2,
                  originX: 0
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

            {rightLink.map(link=>(
              <Link to={link.path}>
                <motion.li
                whileHover={{
                  scale:1.2,
                  originX: 0
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
    </footer>
  );
};

export default Footer;
