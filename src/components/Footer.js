import React from "react";
import { Link } from "react-router-dom";

import {motion} from "framer-motion"
import {Logo} from "../images/components/svgs"

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
      <div className="container footer_container d-flex  justify-content-between">
        <div className="footer_left">
            <div className="footer_top pt-2">
            <i>
              <Logo />
            </i>
            </div>
        </div>
        <div className="footer_right d-flex flex-wrap justify-content-around">
          <div className="first">
            <ul>
            
                <li>Legal</li>
             
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
            <li>Company</li>

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
