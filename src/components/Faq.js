import React from "react";
import { Accordion } from "react-bootstrap";

const Faq = () => {
  return (
    <section className="faq">
      <div className="container ">
        <div className="faq-wrapper">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0" className="my-4">
              <Accordion.Header className="faq_acc">
              How relevant is each course on Gotocourse?
              </Accordion.Header>
              <Accordion.Body className="faq_acc_text">
              Each course is relevant to skillls highly needed at the work place.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="my-4">
              <Accordion.Header className="faq_acc">
                How do I manage my classes on Gotocourse?
              </Accordion.Header>
              <Accordion.Body className="faq_acc_text">
                After you are approved to class, instructional videos on are
                available on your customised class console.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="my-4">
              <Accordion.Header className="faq_acc">
                Are there any prerequisites for courses on Gotocourse?
              </Accordion.Header>
              <Accordion.Body className="faq_acc_text">
                There are no prerequisites needed for most courses on gotocourse
                but some recommended skills may be required. Ask your course
                advisor for more information.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
