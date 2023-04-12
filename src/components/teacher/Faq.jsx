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
                  <FaqComponent {...item} key={i} index={i} />
                ))
                  :
                  FaqItems.slice(0, 3).map((item, i) => (
                    <FaqComponent {...item} key={i} index={i} />
                  ))
              }
            </div>
            <div className="col-md-6">
              {
                other.length > 0 ? other.slice(3, 6).map((item, i) => (
                  <FaqComponent {...item} key={i} index={i} />
                ))
                  :
                  FaqItems.slice(3, 6).map((item, i) => (
                    <FaqComponent {...item} key={i} index={i} />
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
  console.log({index});
  return (
    <div className="trainnee">
      <div className={`faq-comp px-2 px-lg-4 ${show}`}>
        {/* <h6 className="fw-bolder" style={{ color: "var(--theme-blue)", fontWeight: "900" }}>{title}</h6>
      <p style={{ color: "var(--theme-blue)", fontSize: "14px", fontWeight: "400" }}>{answer}</p> */}

        <Accordion defaultActiveKey={index === 0 && index} >
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
    title: "Do I require any form of certification to teach on Gotocourse?",
    answer: `Yes! Teachers will only teach in their respective areas \n
    of expertise in which they are certified after they have \n
    been screened and vetted by Gotocourse.
    `,
    show: ""
  },
  {
    id: 2,
    title: "Can I receive payments directly from my students?",
    answer: `
    No. Students can only pay via the Gotocourse payment
system while Gotocourse pays you afterward.`,
    show: ""
  },
  {
    id: 3,
    title: "How do I conduct my training on Gotocourse?",
    answer: "Teachers have access to training suite/tools on Gotocourse which they can use to create and conduct all their trainings.",
    show: "skip"
  },
  {
    id: 5,
    title: "How often do I get paid on Gotocourse?",
    answer: `
    Payment starts from when the class is 25% done 
till when class is completed. Teachers can choose to 
be paid when the class is 100% done.

    `,
    show: ""
  },
  {
    id: 6,
    title: "How do I receive my payment?",
    answer: "You receive your payments via your bank info as specified by you.",
    show: "skip"
  },
  // {
  //   id: 7,
  //   title: "Do I get a certificate after the program?",
  //   answer: "Yes. We give a certificate of completion at the end of your learning",
  //   show: "skip"
  // },
  // {
  //   id: 8,
  //   title: "What will it cost you?",
  //   answer: `It will first cost you your readiness and commitment. Your commitment will be in terms of resources, time, and hard work. 
  //   What you need to get started
  //   Fill out the form and make sure you complete the registration
  //   Get ready with a good laptop to learn and access to internet
  //   Pay your commitment fee
  //   Get enrolled in class`,
  //   show: "skip"
  // },



]
export default Faq;
