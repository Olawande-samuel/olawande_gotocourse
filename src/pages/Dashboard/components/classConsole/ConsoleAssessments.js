import "../classConsole/Content.css";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../../hooks";
import { getDate, KEY, tConvert } from "../../../../constants";
import { useAuth } from "../../../../contexts/Auth";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useMemo, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Answer, QuesHeader, QuestionOptions, QuizAction, QuizButton } from "../../Students/Classroom";
import Loader from "../../../../components/Loader";
import ReactQuill from "react-quill";


export default function ConsoleAssessments() {

  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  const { generalState: { isMobile }, studentFunctions: { fetchBootcamps } } = useAuth();

  const { data, isLoading , isError, } = useQuery(["fetch my classes"], () => fetchBootcamps(userdata?.token))
  // console.log({ data });


  return (
    <div className="">
      {isLoading  && !isError && <Loader />}
      {
        data?.data?.filter(item => item.status === "paid")?.length > 0 ?
          <main className="assess">

            <div className="assesstop">
              {data?.data?.filter(item => item.status === "paid")?.length > 0 &&
                data?.data?.filter(item => item.status === "paid").map((x, id) => (
                  <AssessmentItem key={x.bootcampId} x={x} />
                ))}
            </div>



            <div className="assessbottom">
              <p className="assessinfo">Submitted assessments</p>

              {data?.data?.filter(item => item.status === "paid")?.length > 0 &&
                data?.data?.filter(item => item.status === "paid").map((x, id) => (
                  <AnswerAssessmentItem key={x.bootcampId} x={x} answer={true} />
                ))}
            </div>


          </main>
          :
          <div className="dashboard_empty">
            <p>No Class Assessment</p>
          </div>
      }
    </div>
  );
}


const AssessmentItem = ({ x }) => {
  const [modules, setModules] = useState([])
  const [show, setShow] = useState(false)

  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  const { generalState: { isMobile }, consoleFunctions: { fetchStudentDomains }, studentFunctions: { fetchAssessments } } = useAuth();



  const { isLoading } = useQuery(["fetch domains", x?.bootcampId], () => fetchStudentDomains(userdata.token, x?.bootcampId), {
    onSuccess: (res) => {
      // console.log(res.data)
      setModules(res.data)
    }
  })

  // const { data:assessData, } = useQuery(["fetch my assessments"], () => fetchAssessments(userdata?.token))
  // console.log({ assessData });

  const reduceModules = useMemo(() => {
    return modules?.reduce((total, current) => [
      ...total, ...current.contents
    ], []);

  }, [modules])

  const reduceContent = useMemo(() => {
    return reduceModules?.filter((item => item.type === "QUIZ"))?.reduce((total, current) => [
      ...total, ...current.items
    ], []);

  }, [modules])

  // console.log({ reduceModules });
  // console.log({ reduceContent });

  return (
    <>
      <div className="assessbox">
        <div className="assessleft">
          <p className="assesstitle">{x.tutorName}</p>
          <p className="assessbold">{x.bootcampName}</p>
          <div className="d-flex align-center gap-2">
            <p className="assesstitle">{getDate(x.startDate)}</p>
            <p className="assesstitle">{tConvert(x.startTime)}</p>
          </div>
        </div>

        <div className="assessright">
          <p className="assesstitle">See Details</p>
          <button className="assessbold" data-id={x.bootcampId} onClick={() => setShow(!show)}>Open Class Quiz</button>
        </div>
      </div>


      <div className="quizaccordion">
        {reduceContent?.length > 0 && show && <Accord reduceContent={reduceContent} />}

      </div>


    </>
  )
}

const Accord = ({ reduceContent }) => {

  const [note, setNotes] = useState([])
  const [myAnswers, setMyAnswers] = useState([])
  const { consoleFunctions: { attemptQuiz } } = useAuth();
  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  function setNote(text, quizId, questionId, questionIndex, quizIndex) {
    // for editor content
    let allNotes = note
    allNotes[quizIndex] = text
    setNotes(allNotes)

    // For Answers
    let allAnswers = myAnswers
    let questionForThis = allAnswers.findIndex(item => item.questionId === questionId)
    if (questionForThis === -1) {
      let thisAnswer = {
        questionId: questionId,
        answers: [text]
      }
      setMyAnswers([...myAnswers, thisAnswer])
    } else {
      let thisAnswer = {
        questionId: questionId,
        answers: [text]
      }
      allAnswers.splice(questionForThis, 1, thisAnswer)
      setMyAnswers(allAnswers)

    }
  }


  const handleInputChange = (e, questionId, index) => {
    const { value } = e.target;
    let list = [...myAnswers]
    console.log({ questionId })
    let thisOption = list.findIndex(item => item.questionId === questionId)

    console.log("questionId2Option: " + thisOption)
    if (thisOption === -1) {
      list.push({ questionId: questionId, answers: [value] })
    } else {
      list.splice(thisOption, 1, { questionId: questionId, answers: [value] })
    }
    setMyAnswers(list)
  }


  const AnswerQuiz = async (type) => {
    // const { data } = await attemptQuiz(userdata?.token, contentItem?._id, myAnswers)
    // console.log({ data });
  }
  return (
    <>
      {
        reduceContent?.length > 0 && reduceContent?.map((item, i) => (
          <div className="assessmentaccord">
            <h4>{item.title}</h4>
            {


              item?.questions?.length > 0 && item?.questions?.map((ques, index) => (
                < Accordion key={index}>
                  <Accordion.Item eventKey={index} className="accord__body">
                    <Accordion.Header className="accord__header"> Question {index + 1}</Accordion.Header>
                    <Accordion.Body>
                      <QuesHeader className="queshead">
                        {/* <p>Type: <span>{ques.Title}</span></p>
                      <p>Grade: <span>{ques.grade}</span></p> */}
                      </QuesHeader>

                      <QuestionOptions>
                        <h4 dangerouslySetInnerHTML={{ __html: `${ques.title}` }}></h4>

                        {
                          ques?.type === "THEORY" && ques?.options && ques?.options.length > 0 && ques?.options.map((opt, i) => (
                            <Fragment key={i}>
                              {opt.title}
                              <Answer>
                                <ReactQuill theme="snow" value={note[index]} onChange={(e) => setNote(e, ques?._id, opt?._id, i, index)} />
                              </Answer>

                              <QuizAction>

                                <QuizButton onClick={() => AnswerQuiz("theory")}>
                                  Submit
                                </QuizButton>
                              </QuizAction>

                            </Fragment>
                          ))


                        }

                        {ques?.type === "MULTIPLE_CHOICE" && ques?.options && ques?.options.length > 0 &&
                          <>

                            {ques?.options.map((opt, i) => (
                              <Answer key={i}>
                                <label for="vehicle1">
                                  <input
                                    type="radio"
                                    value={opt._id}
                                    name="answers"
                                    onChange={e => handleInputChange(e, ques?._id, index)}
                                  />
                                  {opt.title}
                                </label>

                              </Answer>

                            ))}


                            < QuizAction >
                              <QuizButton onClick={() => AnswerQuiz("mutiple")}>
                                Submit
                              </QuizButton>
                            </QuizAction>

                          </>
                        }


                      </QuestionOptions>




                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              )

              )
            }

          </div>






        ))}
    </>
  )
}


const AnswerAssessmentItem = ({ x }) => {
  const [modules, setModules] = useState([])
  const [show, setShow] = useState(false)

  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  const { generalState: { isMobile }, consoleFunctions: { fetchStudentDomains , fetchAssessments } } = useAuth();


  const { data, } = useQuery(["fetch my assessments"], () => fetchAssessments(userdata?.token))
  console.log({ data });

  const { isLoading } = useQuery(["fetch domains", x?.bootcampId], () => fetchStudentDomains(userdata.token, x?.bootcampId), {
    onSuccess: (res) => {
      // console.log(res.data)
      setModules(res.data)
    }
  })



  const reduceModules = useMemo(() => {
    return modules?.reduce((total, current) => [
      ...total, ...current.contents
    ], []);

  }, [modules])

  const reduceContent = useMemo(() => {
    return reduceModules?.filter((item => item.type === "QUIZ"))?.reduce((total, current) => [
      ...total, ...current.items
    ], []);

  }, [modules])

  // console.log({ reduceModules });
  // console.log({ reduceContent });

  return (
    <>
      <div className="assessbox">
        <div className="assessleft">
          <p className="assesstitle">{x.tutorName}</p>
          <p className="assessbold">{x.bootcampName}</p>
          <div className="d-flex align-center gap-2">
            <p className="assesstitle">{getDate(x.startDate)}</p>
            <p className="assesstitle">{tConvert(x.startTime)}</p>
          </div>
        </div>

        <div className="assessright">
          <p className="assesstitle">See Details</p>
          <button className="assessbold" data-id={x.bootcampId} onClick={() => setShow(!show)}>Open Answer</button>
        </div>
      </div>


      <div className="quizaccordion">
        {reduceContent?.length > 0 && show && <AnswerAccord reduceContent={reduceContent} />}

      </div>


    </>
  )
}



const AnswerAccord = ({ reduceContent }) => {

  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  

  return (
    <>
      {
        reduceContent?.length > 0 && reduceContent?.map((item, i) => (
          <div className="assessmentaccord">
            <h4 style={{ fontSize: "18px", color:"#000" }}>{item.title}</h4>
            {

              item?.questions?.length > 0 && item?.questions?.map((ques, index) => (
                < Accordion key={index}>
                  <Accordion.Item eventKey={index} className="accord__body">
                    <Accordion.Header className="accord__header"> Question {index + 1}</Accordion.Header>
                    <Accordion.Body>
                      <QuesHeader className="queshead">
                        {/* <p>Type: <span>{ques.Title}</span></p>
                      <p>Grade: <span>{ques.grade}</span></p> */}
                      </QuesHeader>

                      <QuestionOptions>
                        <h4 dangerouslySetInnerHTML={{ __html: `${ques.title}` }}></h4>

                        {
                          ques?.type === "THEORY" && ques?.options && ques?.options.length > 0 && ques?.options.map((opt, i) => (
                            <>
                              {opt.title}
                              {/* <Answer>
                                <ReactQuill theme="snow" value={note[index]} onChange={(e) => setNote(e, ques?._id, opt?._id, i, index)} />
                              </Answer> */}

                              {/* <QuizAction>
        
                                                            <QuizButton onClick={() => AnswerQuiz("theory")}>
                                                                Submit
                                                            </QuizButton>
                                                        </QuizAction> */}

                            </>
                          ))


                        }

                        {ques?.type === "MULTIPLE_CHOICE" && ques?.options && ques?.options.length > 0 &&
                          <>

                            {ques?.options.map((opt, i) => (
                              <Answer key={i}>
                                <label for="vehicle1">
                                  <input
                                    type="radio"
                                    value={opt._id}
                                    name="answers"
                                  // onChange={e => handleInputChange(e, ques?._id, index)} 
                                  />
                                  {opt.title}
                                </label>

                              </Answer>

                            ))}


                            {/* < QuizAction >
                                                        <QuizButton onClick={() => AnswerQuiz("mutiple")}>
                                                            Submit
                                                        </QuizButton>
                                                    </QuizAction> */}

                          </>
                        }


                      </QuestionOptions>




                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              )

              )
            }

          </div>






        ))}
    </>
  )
}

