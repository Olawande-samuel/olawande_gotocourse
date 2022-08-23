import React from "react";
import { Accordion } from "react-bootstrap";

const Faq = () => {
  
  return (
    <section className="faq">
      <div className="container ">
        <header className="text-center mb-4">
          <h2 className="title">Frequently Asked Questions</h2>
        </header>
        <div className="faq-wrapper"> 
          {/* <Accordion  flush> */}
          <div className="row">

            {FaqItems.map((item, i)=>(
              // <Accordion.Item eventKey={i} className="my-4">
              //   <Accordion.Header className="faq_acc">
              //     {item.title}
              //   </Accordion.Header>
              //   <Accordion.Body className="faq_acc_text">
              //     {item.answer}
              //   </Accordion.Body>
              // </Accordion.Item>
              <FaqComponent {...item} />
              ))}
              </div>
          {/* </Accordion> */}
        </div>
      </div>
    </section>
  );
};


function FaqComponent({title,answer}){
  return(
    <div className="faq-comp col-md-6 my-2 px-2 px-lg-4">
      <h6 className="fw-bolder">{title}</h6>
      <p>{answer}</p>
    </div>
  )
}

const FaqItems = [
  {
    id:1,
    title:"How relevant is each course on Gotocourse?",
    answer:"Each course is relevant to skillls highly needed at the work place."
  },
  {
    id:2,
    title:"How do I manage my classes on Gotocourse?",
    answer:"After you are approved to class, instructional videos are available on your customised class console."
  },
  {
    id:3,
    title:"Are there any prerequisites for courses on Gotocourse?",
    answer:"There are no prerequisites needed for most courses on gotocourse but some recommended skills may be required. Ask your course advisor for more information." 
  },
  {
    id:4,
    title:"What is Gotocourse admission process like?",
    answer:"All students have to sign-up to create an account on Gotocourse before proceeding to enroll in any of the programmes." 
  },
  {
    id:5,
    title:"How can I combine learning on Gotocourse with work and other engagements?",
    answer:"With your learning needs in mind, we have curated different learning models for flexibility." 
  },



]
export default Faq;
