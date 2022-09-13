import React from "react";
import { Accordion } from "react-bootstrap";

const Faq = ({other=[]}) => {
  
  return (
    <section className="faq">
      <div className="container h-100">
        <header className="text-center mb-4">
          <h2 className="title" style={{color: "var(--theme-blue"}}>Frequently Asked Questions</h2>
        </header>
        <div className="faq-wrapper"> 
          {/* <Accordion  flush> */}
          <div className="row">
              <div className="col-md-6">
                {
                  other.length > 0 ? other.slice(0, 3).map((item, i)=>(
                    <FaqComponent {...item} />
                    ))
                    :
                    FaqItems.slice(0, 3).map((item, i)=>(
                      <FaqComponent {...item} />
                      ))
                }
                </div>
                <div className="col-md-6">
                {
                  other.length > 0 ? other.slice(3, 6).map((item, i)=>(
                    <FaqComponent {...item} />
                    ))
                    :
                    FaqItems.slice(3, 6).map((item, i)=>(
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
    title:"How relevant is each course on Gotocourse?",
    answer:"Each course is relevant to skillls highly needed at the work place.",
    show: ""
  },
  {
    id:2,
    title:"How do I manage my classes on Gotocourse?",
    answer:"After you are approved to class, instructional videos are available on your customised class console.",
    show: ""
  },
  {
    id:3,
    title:"Are there any prerequisites for courses on Gotocourse?",
    answer:"There are no prerequisites needed for most courses on gotocourse but some recommended skills may be required. Ask your course advisor for more information." ,
    show: "skip"
  },
  {
    id:4,
    title:"What is Gotocourse admission process like?",
    answer:"All students have to sign-up to create an account on Gotocourse before proceeding to enroll in any of the programmes." ,
    show: ""
  },
  {
    id:5,
    title:"How can I combine learning on Gotocourse with work and other engagements?",
    answer:"With your learning needs in mind, we have curated different learning models for flexibility." ,
    show: "skip"
  },



]
export default Faq;
