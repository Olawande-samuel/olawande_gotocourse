import React from "react";
import Teacher from "../images/teacher.png";
const Becoming = () => {
  return (
    <section className="wrapper becoming">
      <div className="container content-wrapper d-flex justify-content-end">
        <div className="d-flex content justify-content-between">
          <div className="left">
            <img src={Teacher} alt="sideview of hands typing on a Laptop" />
          </div>
          <div className="right">
            <header >
              <h2 className="title">Become a teacher on Gotocourse</h2>
            </header>
            <main className="mt-mid">
              <p className="text paragraph">
                Interested in teaching the next generation of Tech
                professionals? Collaborate with us. We provide you the platform
                and tools to teach what you love
              </p>
              <button type="button" className=" btn button-lg ">
                START TEACHING TODAY
              </button>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Becoming;
