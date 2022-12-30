import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo, Logosm } from "../svg/svgs"
import './Footer.css'

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
  {
    id: 8,
    title: "Enterprise",
    path: "/enterprise"
  },
]
const Footer = () => {


  const scrollWithOffset = (el) => {
    const yCoord = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoord + yOffset, behaviour: "smooth" })
  }



  return (
    <footer className="footer wrapper" style={{
      // background: celebRoute ? "#000F62" : "var(--blue-ish)", color: celebRoute ? "#fffff" : "var(--theme-blue)"
      background: "#FAEEFF", color: "var(--theme-blue)",
      display: "flex", alignItems: "center"
    }}>
      <div className="container">

        <div className="footer_container d-flex justify-content-between">
          <div className="footer_left">
            <div className="footer_top pt-2">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <i className="d-none d-lg-block">
                  {/* <Logo color={!celebRoute ? "var(--theme-blue)" : "#fff"} /> */}
                  <Logo color={"var(--theme-blue)"} />
                </i>

                <i className="d-lg-none">
                  {/* <Logosm color={!celebRoute ? "var(--theme-blue)" : "#fff"} /> */}
                  <Logosm color={"var(--theme-blue)"} />
                </i>
                {/* <small className="text-center d-block" style={{ fontSize: '16px', color: !celebRoute ? "var(--theme-blue)" : "#fff" }}>Learn without limits.</small> */}
                <small className="text-center d-block" style={{ fontSize: '16px', color: "var(--theme-blue)", padding: "1rem 0" }}>All right reserved | c 2022 Gotocourse Inc </small>
              </Link>

            </div>



          </div>

          <div className="footer_right">
            <p>For inquiries:</p>
           <p style={{fontSize: "2rem", fontWeight: "900"}}>+1(346) 744 6793</p>
           <a href="mailto:hello@gotocourse.us">hello@gotocourse.us</a>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
