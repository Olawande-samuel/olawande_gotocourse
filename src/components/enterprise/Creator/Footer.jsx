import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"
import { Logo, Logosm } from "../../../images/components/svgs"
import { HashLink } from "react-router-hash-link"
import { useAuth } from "../../../contexts/Auth";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { height, padding } from "@mui/system";

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
const Footer = () => {
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
      background: "var(--theme-blue)", color: "fff",
      minHeight: "70vh", display: "flex", alignItems: "center"
    }}>
      <div className="container " style={{ display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center" }}>
        
        <h6 style={{color: "fff", fontSize: "24px", textAlign:"center"}}>No 12, Arola, United Arab Emirates, Ibadan, Oyo state</h6>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", padding: "2rem 0" }}>
          <li><BsFacebook style={{ fontSize: "1.5rem" }} /></li>
          <li><BsInstagram style={{ fontSize: "1.5rem" }} /></li>
          <li><BsTwitter style={{ fontSize: "1.5rem" }} /></li>
          <li><AiOutlineMail style={{ fontSize: "1.5rem" }} /></li>

        </div>


      </div>


    </footer>
  );
};

export default Footer;
