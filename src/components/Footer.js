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
      <div className="container footer_container d-flex flex-wrap justify-content-between">
        {/* <div className="footer_left">
          <header>
            <h3 className="footer_title">Reach out today</h3>
          </header>
          
        </div> */}
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
