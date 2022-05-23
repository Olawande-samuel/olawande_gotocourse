import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import {motion} from "framer-motion"
const Footer = () => {
  return (
    <footer className="footer wrapper">
      <div className="container footer_container d-flex flex-wrap justify-content-between">
        <div className="footer_left">
          <header>
            <h3 className="footer_title">Reach out today</h3>
          </header>
          <form>
            <div className="form-group">
              <label htmlFor="name" className="footer_label">
                Full name
              </label>
              <input type="text" className="form-control footer_input" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="footer_label">
                Email address
              </label>
              <input type="email" className="form-control footer_input" />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="footer_label">
                Phone Number
              </label>
              <input type="text" className="form-control footer_input" />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="footer_label">
                Message
              </label>
              <textarea
                name="message"
                id=""
                cols="30"
                rows="4"
                className="form-control footer_input"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="footer_right d-flex flex-wrap justify-content-between">
          <div className="first">
            <header>
              <h3 className="footer_title">Company</h3>
            </header>
            <ul>
              <li>
                <Link to="/">Realztech</Link>
              </li>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/">Login/Sign up</Link>
              </li>
              <li>
                <Link to="/">About us</Link>
              </li>
              <li>
                <Link to="/">Help and support</Link>
              </li>
            </ul>
          </div>
          <div className="second">
            <header>
              <h3 className="footer_title">Contact Us</h3>
            </header>
            <ul>
              <motion.li
              whileHover={{
                scale:1.2,
                originX: 0
              }}
              transition={{
                stiffness:300
              }}
              >
                <Link to="/">
                  <span>
                    <i>
                      <FaFacebookF />
                    </i>
                  </span>
                  Join us on facebook
                </Link>
              </motion.li>
              <motion.li
              whileHover={{
                scale:1.2,
                originX: 0
              }}
              transition={{
                stiffness:300
              }}
              >
                <Link to="/">
                  <span>
                    <i>
                        <FaInstagram />
                    </i>
                  </span>
                  Follow us on Instagram
                </Link>
              </motion.li>
              <motion.li
              whileHover={{
                scale:1.2,
                originX: 0
              }}
              transition={{
                stiffness:300
              }}
              >
                <Link to="/">
                  <span>
                    <i>
                        <BsEnvelope />
                    </i>
                  </span>
                  GotoCourse@gmail.com
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
