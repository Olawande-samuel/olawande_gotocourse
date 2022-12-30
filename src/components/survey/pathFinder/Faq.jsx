import React from "react";
import { Accordion } from "react-bootstrap";

const Faq = ({other=[]}) => {
  
  return (
    <section className="faq">
      <div className="container h-100">
        <header className="text-center mb-4">
          <h2 className="title" style={{color: "var(--theme-blue)"}}>Frequently Asked Questions</h2>
        </header>
        <div className="faq-wrapper"> 
          {/* <Accordion  flush> */}
          <div className="row">
              <div className="col-md-6">
                {
                  other.length > 0 ? other.slice(0, 2).map((item, i)=>(
                    <FaqComponent {...item} />
                    ))
                    :
                    FaqItems.slice(0, 2).map((item, i)=>(
                      <FaqComponent {...item} />
                      ))
                }
                </div>
                <div className="col-md-6">
                {
                  other.length > 0 ? other.slice(2, 6).map((item, i)=>(
                    <FaqComponent {...item} />
                    ))
                    :
                    FaqItems.slice(2, 6).map((item, i)=>(
                      <FaqComponent {...item} />
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



export function FaqComponent({title, answer, show,styles}){
  return(
    <div className={`faq-comp px-2 px-lg-4 ${show}`}>
      <h6 className="fw-bolder" style={styles?.title}>{title}</h6>
      <p style={styles?.answer}>{answer}</p>

    </div>
  )
}

const FaqItems = [
  {
    id:1,
    title:"Do I need a previous IT knowledge to get started",
    answer:"You do not require any prior knowledge or skill to sign up for the program",
    show: ""
  },
  {
    id:2,
    title:"Are the fees affordable?",
    answer:"Yes, the fees are affordable and pocket friendly so you can start as soon as possible. ",
    show: "skip"
  },
  // {
  //   id:3,
  //   title:"Are there any prerequisites for courses on Gotocourse?",
  //   answer:"There are no prerequisites needed for most courses on gotocourse but some recommended skills may be required. Ask your course advisor for more information." ,
  //   show: "skip"
  // },
  {
    id:3,
    title:"What is admission process like?",
    answer:"All students have to sign-up to create an account on Gotocourse before proceeding to enroll in any of the programmes." ,
    show: ""
  },
  {
    id:4,
    title:"Do I get a certificate after the program?",
    answer:"Yes. We give a certificate of completion at the end of your learning program." ,
    show: "skip"
  },



]
export default Faq;
