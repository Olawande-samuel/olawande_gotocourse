import React from "react";
import { Accordion } from "react-bootstrap";

const Faq = ({ other = [] }) => {

  return (
    <section className="faq" style={{
      // background: "#EFF2FF" 
      background: "linear-gradient(90deg, #FFFFFF 2.32%, rgba(239, 242, 255, 0) 94.98%)"

    }}>
      <div className="container h-100">
        <header className="text-center mb-4">
          <h2 className="title" style={{ color: "var(--theme-blue)" }}>Frequently Asked Questions</h2>
        </header> 
        <div className="faq-wrapper">
          {/* <Accordion  flush> */}
          <div className="row">
            <div className="col-md-6">
              {
                other.length > 0 ? other.slice(0, 3).map((item, i) => (
                  <FaqComponent {...item} key={i} index={i}/>
                ))
                  :
                  FaqItems.slice(0, 3).map((item, i) => (
                    <FaqComponent {...item} key={i} index={i}/>
                  ))
              }
            </div>
            <div className="col-md-6">
              {
                other.length > 0 ? other.slice(3, 6).map((item, i) => (
                  <FaqComponent {...item} key={i} index={i}/>
                ))
                  :
                  FaqItems.slice(3, 6).map((item, i) => (
                    <FaqComponent {...item} key={i} index={i}/>
                  ))
              }
            </div>
          </div>
          {/* </Accordion> */}
        </div>
      </div>
    </section>
  );
};



export function FaqComponent({ title, answer, show, styles, index }) {
  return (
    <div className="trainnee">
    <div className={`faq-comp px-2 px-lg-4 ${show}`}>
      {/* <h6 className="fw-bolder" style={{ color: "var(--theme-blue)", fontWeight: "900" }}>{title}</h6>
      <p style={{ color: "var(--theme-blue)", fontSize: "14px", fontWeight: "400" }}>{answer}</p> */}

      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey={index}>
          <Accordion.Header className="fw-bolder" style={{ color: "var(--theme-blue)", fontWeight: "900" }}>{title}</Accordion.Header>
          <Accordion.Body style={{ color: "var(--theme-blue)", fontSize: "14px", fontWeight: "400" }}>
            {answer}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>

    </div>
  )
}

const FaqItems = [
  {
    id: 1,
    title: "What will it cost you?",
    answer: `It will first cost you your readiness and commitment. Your commitment will be in terms of resources, time, and hard work. \n 
    What you need to get started \n 
    Fill out the form and make sure you complete the registration \n 
    Get ready with a good laptop to learn and access to internet \n 
    Pay your commitment fee \n 
    Get enrolled in class
    `,
    show: ""
  },
  {
    id: 2,
    title: "What you need to get started",
    answer: `
    . Fill out the form and make sure you complete the registration
    . Get ready with a good laptop to learn and access to internet
    . Pay your commitment fee
    . Get enrolled in class`,
    show: ""
  },
  {
    id: 3,
    title: "What is the admission process like?",
    answer: "All students must sign up to create an account on Gotocourse before enrolling in any of the programs.",
    show: "skip"
  },
  {
    id: 5,
    title: "Do I need to make full payment before I can take the course?",
    answer: `
    No. You just need to pay a $500 training commitment fee and a $300 job placement fee to get started. But you’ll have to balance up within the first 3 months after you’re hired. Please read our terms and conditions for more details. (Terms and Conditions apply)

    `,
    show: ""
  },
  {
    id: 6,
    title: "Do I need previous IT knowledge to get started?",
    answer: "You do not require any prior knowledge or skill to sign up for the program",
    show: ""
  },
  {
    id: 7,
    title: "Do I get a certificate after the program?",
    answer: "Yes. We give a certificate of completion at the end of your learning",
    show: "skip"
  },
  {
    id: 8,
    title: "What will it cost you?",
    answer: `It will first cost you your readiness and commitment. Your commitment will be in terms of resources, time, and hard work. 
    What you need to get started
    Fill out the form and make sure you complete the registration
    Get ready with a good laptop to learn and access to internet
    Pay your commitment fee
    Get enrolled in class`,
    show: "skip"
  },



]
export default Faq;
