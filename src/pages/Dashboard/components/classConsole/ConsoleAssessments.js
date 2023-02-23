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

  const { data, isLoading, isError, } = useQuery(["fetch my classes"], () => fetchBootcamps(userdata?.token))
  // console.log({ data });


  return (
    <div className="">
      {isLoading && !isError && <Loader />}
      {
        data?.data?.filter(item => item.status === "paid")?.length > 0 ?

          <main className="assess">
            <div className="assesstop">
              <p className="assessinfo">Available Quiz</p>

              {
                data?.data?.filter(item => item.status === "paid").map((x, id) => (
                  <AssessmentItem key={x.bootcampId} x={x} />
                ))}
            </div>

            <div className="assessbottom">
              <p className="assessinfo">Submitted assessments</p>
              {data?.data?.filter(item => item.status === "paid").map((x, id) => (
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
  // const [show, setShow] = useState(false)

  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  const { generalState: { isMobile }, consoleFunctions: { fetchStudentDomains }, studentFunctions: { fetchAssessments } } = useAuth();



  const { isLoading } = useQuery(["fetch domains", x?.bootcampId], () => fetchStudentDomains(userdata.token, x?.bootcampId), {
    onSuccess: (res) => {
      setModules(res.data)
    }
  })


  const reduceModules = useMemo(() => {
    return modules?.reduce((total, current) => [
      ...total, ...current.contents
    ], []);

  }, [modules])


  const reduceContent = useMemo(() => {
    return reduceModules?.filter((item => item.type === "QUIZ"))

  }, [modules])

  const reduceItem = useMemo(() => {
    return reduceModules?.filter((item => item.type === "QUIZ")).reduce((total, current) => [
      ...total, ...current.items
    ], []);

  }, [modules])

  // console.log({ reduceModules });
  // console.log({ reduceContent });

  return (
    <>


      <div className="quizaccordion">
        {reduceContent?.length > 0 && <Accord reduceContent={reduceContent} reduceItem={reduceItem} />}

      </div>


    </>
  )
}




const Accord = ({ reduceContent, reduceItem }) => {

  return (
    reduceContent?.length > 0 && reduceContent?.map((item, i) => {
      let contentId = item?.contentId;

      // let quizDetail = reduceContent?.find(item => item?.contentId === contentId);
      let contentDetail = reduceItem?.find(item => item?.contentId === contentId);
      // console.log({ contentDetail })
      return (
        <>
          <div className="assessbox">
            <div className="assessleft">
              <p className="assesstitle">{item.type}</p>
              <p className="assessbold">{item.title}</p>
              <div className="d-flex align-center gap-2">
                {contentDetail &&
                  <>
                    <p className="assesstitle">{getDate(contentDetail?.endDate)}</p>
                    <p className="assesstitle">{new Date(contentDetail?.endDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    </p>
                  </>
                }
              </div>
            </div>

            <div className="assessright">
              <p className="assesstitle">See Details</p>
              <Link to={`/student/class-console/class/${item.classId}?contentId=${item.contentId}`}>
                <button className="assessbold" >Open Class Quiz</button>
              </Link>
            </div>
          </div>

          <br />
          <br />
        </>
      )
    }))
}






const AnswerAssessmentItem = ({ x }) => {
  const [modules, setModules] = useState([])
  const [assessment, setAssessment] = useState([])
  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  const { generalState: { isMobile }, consoleFunctions: { fetchStudentDomains, fetchAssessments } } = useAuth();


  useQuery(["fetch my assessments"], () => fetchAssessments(userdata?.token), {
    onSuccess: ({ data }) => {
      setAssessment(data)

    }
  })

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


  return (
    <div className="quizaccordion">
      {reduceContent?.length > 0 && <AnswerAccord
        assessment={assessment}
        reduceContent={reduceContent}
        reduceModules={reduceModules}
      // modules={modules}
      />}

    </div>

  )
}



const AnswerAccord = ({ assessment, reduceContent, reduceModules }) => {

  return (
    assessment.length > 0 && assessment?.map((x, i) => {
      let contentId = x?.contentId;
      let quizId = x?.quizId;

      let contentDetail = reduceModules?.find(item => item?.contentId === contentId);
      let quizDetail = reduceContent?.find(item => item?.contentId === contentId);
      // let DomainDetail = modules?.find(item => item?.contentId === contentDetail?.domain);

      return (quizDetail &&
        <div key={i} className="assessmentaccord">
          <div className="assessbox">
            <div className="assessleft">
              <p className="assessbold" >{quizDetail?.title}</p>
              <p className="assesstitle" data-id={contentDetail?.domian}>{contentDetail?.title}</p>
              <div className="d-flex align-center gap-2">
                <p className="assesstitle">{quizDetail?.startDate && getDate(quizDetail?.startDate)}</p>
                <p className="assesstitle">{quizDetail && new Date(quizDetail?.endDate).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                </p>
              </div>
            </div>

            <div className="assessright">
              <div>
              <p className="assesstitle">Total score: {x?.totalScore}</p>
              <p className="assesstitle">Attempts: {quizDetail?.attempts}</p>

              </div>
              <button className="assessbold" data-id={quizId} disabled
              // onClick={() => setShow(!show)}
              >Graded: {x?.graded ? "true" : "false"}</button>
            </div>
          </div>

        </div>

      )


    })
  )
}

