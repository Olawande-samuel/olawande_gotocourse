import React, { useState } from "react";
import user from "../images/user.png";
import lere from "../images/lere.png";
import ola from "../images/ola.png";
import mentor from "../images/mentor1.png";
import mentor2 from "../images/mentor3.png";
import mentor3 from "../images/mentor2.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 604 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 603, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const witnesses = [
  {
    id: 1,
    content:
      "I will teach you PowerBi in 8 weeks",
    profile: mentor,
    location: "Peter Southampton . London",
    
  },
  {
    id: 2,
    content:
      "I will teach you UIUX in 4 weeks",
    profile: mentor2,
    location: "Cassandra Geoffrey . Atlanta",
  },
  {
    id: 3,
    content:
      "I had a wonderful experience",
    profile: mentor3,
    location: "Niyi Adegoke . Lagos ",
  },
  {
    id: 4,
    content:
      "I will teach you PowerBi in 8 weeks",
    profile: mentor,
    location: "Peter Southampton . London",
  },
  {
    id: 5,
    content:
      "I will teach you UIUX in 2 weeks",
    profile: mentor2,
    location: "Cassandra Geoffrey . Atlanta",
  },
  {
    id: 6,
    content:
      "I will teach you web development in 4 weeks",
    profile: mentor3,
    location: "Niyi Adegoke . Lagos",
  },
];
const Mentors = () => {
  return (
    <section className="mentors">
      <div className=" mentors_content">
        <header className="text-center">
          <h3 className="title">Choose a mentor</h3>
          <p className="sub_title">One of the best ways to break into I.T or learn more about becoming a top tech professional is to find someone that has gone before you and gained success at the same goal. This persn has the ability to provide valuable advice, coaching and encouragement as a mentor. Choose from our A-list and screened mentors to learn and grow your capabilities </p>
        </header>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          // infinite={true}
          // autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >

          {witnesses.map(item =>(
           <Card item={item} />
          ))}
          
        </Carousel>
        
      </div>
    </section>
  );
};

const Card = ({item}) => {
  return (
    <div className="px-1">

    <div className="card">
      <img src={item.profile} alt="" className="card-img-top mentor_image" />
      <div className="card-body">
        <h5 className="card-title">{item.content}</h5>
        <p className="card-text">{item.location}</p>
      </div>
    </div>
    </div>
  );
};
export default Mentors;
