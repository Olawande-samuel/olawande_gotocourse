import React from "react";
import user from "../images/user.png"
const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h3 className="testimonials_title">Testimonials</h3>
        <div className="slide_container">
            
          <div className="card slides">
            <div className="card-body">
              <div className="avatar d-flex justify-content-center">
                  <img src={user} alt="" />
              </div>
              <p>
                &ldquo; Realztech Institute did not only help me level up my
                tech skills but they also helped me get my dream job &rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
