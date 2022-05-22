import React, { useState } from "react";
import { Search } from "../images/components/svgs";
import Logo from "../images/Logo.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const toggleNav = () => {
    setShow(!show);
  };
  return (
    <nav className="nav navbar navbar-expand-lg navbar-light">
      <div className="container align-items-center">
        <a href="/" className="logo navbar-brand">
          <img src={Logo} alt="Brand Name" />
        </a>
        <button type="button" className="navbar-toggler" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${
            show ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-5">
            <li className="nav-item">
              <button type="button" className="link nav-link">
                Courses{" "}
                <span>
                  <i>
                    <MdOutlineKeyboardArrowDown style={{ fontSize: "20px" }} />
                  </i>
                </span>
              </button>
            </li>
          </ul>
          <button type="button" className="btn-plain button-md">
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
