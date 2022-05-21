import React, { useState } from "react";
import { Search } from "../images/components/svgs";
import Logo from "../images/Logo.png"
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
        <div className={`collapse navbar-collapse justify-content-end ${show ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className=" link nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="/" className=" link nav-link">Work</a>
            </li>
            <li className="nav-item">
              <a href="/" className=" link nav-link">Service</a>
            </li>
            <li className="nav-item">
              <a href="/" className=" link nav-link">Our Customer</a>
            </li>
            <li className="nav-item">
              <a href="/" className=" link nav-link">Team</a>
            </li>
            <li className="nav-item">
              <a href="/" className=" link nav-link">Career</a>
            </li>
            <li className="nav-item">
              <a href="/" className=" link nav-link">Contact</a>
            </li>
          </ul>
          <button type="button" className="btn">
              <span>
                  <i>
                    <Search />
                  </i>
              </span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
