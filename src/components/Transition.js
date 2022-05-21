import React from "react";
import Tech from "../images/transition.png";
const Transition = () => {
  return (
    <section className="wrapper transition">
      <div className="container content-wrapper justify-content-end">
        <div className="d-flex content justify-content-start">
          <div className="card border-none">
            <div className="card-body">
              <header>
                <h2 className="title">Want to transition to tech?</h2>
              </header>
              <p className="card-text">
                We are here for you! To help you grow your tech skills so that
                you can have a tech career you are most proud of.
              </p>
              <button className="btn button-lg" type="button">
              START NOW
              </button>
            </div>
          </div>
          <img
            src={Tech}
            alt="man pointing at screen containing code"
            className="background "
          />
        </div>
      </div>
    </section>
  );
};

export default Transition;
