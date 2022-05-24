import React, { useState, useRef, useEffect } from "react";
import Logo from "../images/Logo.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {motion} from 'framer-motion'
const navList = [
  {
    id: 1,
    title: "Cybersecurity",
  },
  {
    id: 2,
    title: "Risk Management",
  },
  {
    id: 3,
    title: "Data Science",
  },
  {
    id: 4,
    title: "Project Management",
  },
  {
    id: 5,
    title: "IT compliance",
  },
  {
    id: 6,
    title: "IT Audit",
  },
  {
    id: 7,
    title: "Business Analysis",
  },
  {
    id: 8,
    title: "Product Design",
  },
  {
    id: 9,
    title: "Web Design",
  },
  {
    id: 10,
    title: "Software Development",
  },
  {
    id: 11,
    title: "IT Service Management",
  },
];
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(false);
  const toggleNav = () => {
    setShow(!show);
  };

  const toggleDrop = () => {
    setDrop(!drop);
  };

  const dropRef = useRef(null);
  
  const status = OutsideClick(dropRef);
  useEffect(() => {
    if (status === true) {
      setDrop(false);
    }
  }, [drop,status]);
  
  return (
    <nav className="nav navbar navbar-expand-lg navbar-light">
      {/* <div className="holder"> */}

      <div className="container navbar-container align-items-center">
        <a href="/" className="logo navbar-brand">
          <img src={Logo} alt="Brand Name" />
        </a>
        <button type="button" className="navbar-toggler " onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse  justify-content-end  align-items-center ${
            show ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-5">
            <li className="nav-item holder">
              <button
                type="button"
                className="link nav-link"
                onClick={toggleDrop}
              >
                Courses
                <span>
                  <i>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: "20px" }}
                      className={`drop_caret ${drop ? "rotate" : ""}`}
                    />
                  </i>
                </span>
              </button>
              {drop ? <NavList dropRef={dropRef} /> : null}
            </li>
            <li><a href="/" className="link d-md-none">Go to Dashboard</a></li>
          </ul>
          <motion.button type="button" className="btn-plain d-none d-md-block"
          whileHover={{
            // scale:1.1,
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            boxShadow: "0px 0px 8px rgb(0, 0, 0)",
          }}
          transition={{duration: 0.1}}
          
          >
            <span>Go to Dashboard</span>
          </motion.button>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};
const NavList = ({ dropRef }) => {
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity: 1}}
    transition={{duration: 0.3}}
    className="drop" ref={dropRef}
    
    >
      <ul>
        {navList.map((list) => (
          <li>
            <a href="/">{list.title}</a>
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
