import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/Auth";


import Courses, { TeachersCard } from "../Courses";
import { courseList } from "../Courses";
import style from "./teacher.module.css";
import lere from "../../images/lere.png";
import { useLocalStorage } from "../../hooks";
import { AdvancedError } from "../../classes";
import { witnesses, Card as MentorsCard } from "../../components/Mentors";
import Input from "../../components/Input";
import Success from "../../images/paymentSuccess.png"
import Failure from "../../images/Bad Gateway.png"
import { changeConstants } from "../Dashboard/Teachers/CreateCourse";
import { KEY } from "../../constants";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const nav = [
  { name: "All Courses", value: "" },
  { name: "Business Analysis", value: "Business Analysis" },
  { name: "Cybersecurity", value: "Cybersecurity" },
  { name: "Data Science", value: "Data Science" },
  { name: "IT Compliance", value: "IT Compliance" },
  { name: "IT Audit", value: "IT Audit" },
  { name: "Product Design", value: "Product Design" },
  { name: "Risk Management", value: "Risk Management" },
  { name: "Project Management", value: "Project Management" },
  { name: "Software Development", value: "Software Development" },
  { name: "IT Service Management", value: "IT Service Management" },
];
const All = ({ type }) => {
  const [search, setSearch] = React.useState("");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  const navigate = useNavigate();
  const {
    generalState,
    setGeneralState,
    otherFunctions: { fetchMentors, fetchTeachers },
  } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const ref = useRef(false);

  // fetch teachers/mentors

  useEffect(() => {
    if (ref.current) return;
    (async () => {
      try {
        setGeneralState({ ...generalState, loading: true });
        const res = type === "mentors" ? await fetchMentors() : await fetchTeachers();
        const { success, message, statusCode, data } = res;
        setGeneralState({ ...generalState, loading: false });
        if (!success || statusCode !== 1)
          throw new AdvancedError(message, statusCode);
        if (data.length > 0) {
          type === "mentors" ?
          setMentors(data) : setTeachers(data)
        }
      } catch (err) {
        setGeneralState({ ...generalState, loading: false });
      }
    })();
    ref.current = true;
  }, []);
  return (
    <Courses>
      <div className="container">
        <section className={` ${style.navigation}`}>
          {/* {nav.map((item, i) => (
            <NavItems
              key={item.name}
              item={item}
              handleChange={handleChange}
              search={search}
            />
          ))} */}
           <div className={`d-flex justify-content-between align-items-center ${style.top}`}>
              <h3 className={style.section_title}>{type === "mentors"? "Mentors":"Teachers"}</h3>
           <div className={`${style.input_wrapper} d-flex`}>
            <input
              type="search"
              name="search"
              id="search"
              className="form-control"
              placeholder={type === "mentors"? "Search mentor":"Search Teacher"} 
              onChange={(e)=> setSearch(e.target.value)}
              value={search}
            />
            <button className="button ms-3">Search</button>
          </div>
          </div>
        </section>
        <main className={`mentors_list_main ${style.main}`}>
          {type === "mentors" 
            ? mentors
                .filter(item=> item.expertise.includes(search) || item.mentorFirstName.includes(search.toUpperCase())|| item.mentorLastName.includes(search.toUpperCase())||item.mentorBio.includes(search)||item.mentorEmail.includes(search))
                .map((item) => (
                  <div className="mentors_list_card">
                    <MentorsCard item={item} />
                  </div>
                ))
            : teachers.map((item) => (
                
                  <TeachersCard
                    courseImg={item.profileImg}
                    name={`${item.firstName} ${item.lastName}`}
                    category={item.category}
                    instructorName={item.location}
                    description={item.bio}
                    backgroundColor="backgroundColor"
                    teacher={item}
                    teacherId={item.teacherId}
                  />
              ))}
        </main>
      </div>
    </Courses>
  );
};

export default All;

const NavItems = ({ item, handleChange, search }) => {
  
  return (
    <div className="d-flex">
      {/* <input type="radio" name="course" id={item} onChange={handleChange} />
        <label htmlFor={item} className={check ? "text-underline" : "text-danger"}>
            {item}
        </label> */}
      <button
        type="button"
        className={`${search === item.value ? style.selected : ""}  ${
          style.filter_btn
        }`}
        onClick={handleChange}
        value={item.value}
      >
        {item.name}
      </button>
    </div>
  );
};

export const Payment = () => {
  const {
    studentFunctions: { addCourse },
  } = useAuth();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [courseInfo, setCourseInfo] = useState({});

  const details = localStorage.getItem("gotocourse-paymentDetails");
  const info = localStorage.getItem("gotocourse-courseInfo");
  const bootcamp = getItem("gotocourse-bootcampdata");

  const [stripeId, setStripeId] = useState(null);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [paymentData, setPaymentData]= useState({
    fullPayment: true,
    initialPayment: ""
  })

  useEffect(() => {
    if (details) {
      setPaymentDetails(JSON.parse(details));
      setCourseInfo(JSON.parse(info));
    }
  }, []);

  function handleChange(e, type){
    type === "select" ? 
    setPaymentData({...paymentData, fullPayment: e.target.value === "1" ? true : false}) :
    setPaymentData({...paymentData, [e.target.name]: e.target.value}) 
  }

  function handleInstallmentChoice(e) {
    e.target.id === "2" ? setPaymentData({...paymentData, installments: 2, [e.target.name]: e.target.value}) :
    setPaymentData({...paymentData, installments: 4, [e.target.name]: e.target.value}) 
  }

  async function enrollToCourse(e) {
    e.preventDefault();

    const userData = getItem(KEY);
    // e.preventDefault();
    // if (userdata?.token) {
    //   try {
    //     setLoading(true);
    //     const response = await addBootcamp(
    //       { bootcampId: bootcampInfo.bootcampId },
    //       userdata.token
    //     );
    //     const { success, message, statusCode } = response;
    //     if (!success || statusCode !== 1)
    //       throw new AdvancedError(message, statusCode);
    //     const { data } = response;
    //     console.log(data);
    //     navigate("payment")
    //     toast.success(message, {
    //       position: "top-right",
    //       autoClose: 4000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     toast.error(error.message, {
    //       position: "top-right",
    //       autoClose: 4000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // } else {
    //   toast.error("User must be logged in to register", {
    //     position: "top-right",
    //     autoClose: 4000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    if (userData !== null) {
      const courseData = {
        courseId: paymentDetails.courseId,
        selectedPackage: paymentDetails.title,
        amountPaid: paymentDetails.price,
        fullPayment: paymentData.fullPayment,
        installments: paymentData.fullPayment ? "" : paymentData.installments,
        initialPayment: paymentData.fullPayment ? "" : paymentData.initialPayment
      };
      try {
        if(!courseData.fullPayment && !courseData.installments) throw new AdvancedError("All fields required")
        setLoading(true);
        const response = await addCourse(courseData, userData.token);
        const { success, message, statusCode } = response;
        if (!success || statusCode !== 1)
          throw new AdvancedError(message, statusCode);
        const { data } = response;
        setStripeId(data.clientSecret);
        setShowStripeModal(true);
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  }
  return (
    <Courses>
      <div className="container">
        <section
          className={`row justify-content-center align-items-center ${style.paymeny_main}`}
        >
          <div className="col-md-7 col-lg-5">
            {showStripeModal ? (
              <PaymentModal token={stripeId} />
            ) : (
              <div className={` card ${style.payment_details_card}`}>
                <div className="card-body">
                  <div className={style.payment_card_top}>
                    <div className="d-flex align-items-center">
                      <div className={style.payment_profile}>
                        <img
                          src={
                            courseInfo?.instructorProfileImg
                              ? courseInfo.instructorProfileImg
                              : (bootcamp.bootcampImg ? bootcamp.bootcampImg : lere)
                          }
                          alt=""
                          className={style.payment_image} 
                        />
                      </div>
                      <div className={style.payment_profile_info}>
                        {courseInfo?.category && (
                          <>
                            <p className={style.payment_name}>
                              {courseInfo?.instructorName}
                            </p>
                            <small className="text-capitalize">
                              {courseInfo?.category?.toLowerCase()} Instructor
                            </small>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className={style.payment_card_mid}>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className={`text-capitalize fw-normal ${style.payment_course}`}>
                        {paymentDetails?.title
                          ? `${changeConstants(paymentDetails?.title)} Course`
                          : bootcamp.title}
                      </p>
                      <p>
                        ${paymentDetails?.price ? paymentDetails?.price : "500"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fw-normal">Service Fee</p>
                    <p>$5</p>
                  </div>
                  <hr />
                  <div className="d-flex flex-column justify-content-between">
                    <label htmlFor="paymentType" className="form-label generic_label">Choose a payment structure</label>
                    <select name="fullPayment" onChange={(e)=>handleChange(e, "select")} id="paymentType" className="form-select">
                      <option value="1" >Full Payment</option>
                      <option value="0" >Installment</option>
                    </select>
                  </div>
                  <hr />
                  {paymentData.fullPayment === false ? 
                  <>
                    <div className=""> 
                    <small className="text-info" style={{fontSize:"12px"}}>*Fees must be paid in not more than four Installments. Each instalment carries a $100 extra charge</small>
                    <div className="form-group">
                      <input type="radio" name="initialPayment" id="2"  onChange={handleInstallmentChoice} value={ (paymentDetails?.price / 2) + 100} />
                      <label htmlFor="2" className="form-label generic_label ms-2 ">Pay in two installments of { (paymentDetails?.price / 2) + 100} each</label>
                    </div>
                    <div className="text-center">
                      <small className="text-center text-dark">or</small>
                    </div>
                    <div className="form-group">
                      <input type="radio" name="initialPayment" id="4" onChange={handleInstallmentChoice}  value={ (paymentDetails?.price / 4) + 100} />
                      <label htmlFor="4" className="form-label generic_label ms-2 ">Pay in four installments of { (paymentDetails?.price / 4) + 100} each</label>
                    </div>
                    </div>
                    <hr /> 
                  </>
                  : ""
                }
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Total</p>
                    <p className={style.payment_total}>
                      $
                      {paymentDetails?.price ? +paymentDetails?.price + 5 : 505}
                    </p>
                  </div>
                  <button
                    onClick={enrollToCourse}
                    className="button w-100 button-md"
                  >
                    {loading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                        style={{ width: "2rem", height: "2rem" }}
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <span>Checkout</span>
                    )}
                  </button>
                  <div className="cancel w-100 text-center my-3">
                    <button
                      className=""
                      style={{
                        color: "var(--theme-blue)",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                      }}
                      onClick={() => {
                        navigate(-2);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </Courses>
  );
};

function PaymentModal({ token }) {

  const options = {
    clientSecret: token,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

const CheckoutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [loadingComponent, setLoadingComponent] = useState(true);
  
  
  async function handlesubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://gotocourse.com/payment/success",
      },
    });

    result && setLoading(false);
    if (result.error) {
      toast.error(result.error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <form onSubmit={handlesubmit}>
      
      <PaymentElement
       onReady={() => {
        setLoadingComponent(false)
        }}
      />

      { loadingComponent ? (
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
            >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
          <button className="btn-plain w-100 mt-3" disabled={!stripe}>
            {loading ? (
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "2rem", height: "2rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </button>
      )}

    </form>
  );
};


export const PaymentStatus = ({success}) => {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const [loading, setLoading] = useState(true)
  const {id} = useParams()
  const {generalState, setGeneralState} = useAuth()

  const [status, setStatus]= useState({
    image: success ? Success : Failure,
    title:success ? "Payment Successful" : "Payment Denied",
    subtitle:success ? "You can start learning now": "Unable to process payment",
    action: success ? "Go to Dashboard" : "Try Again",
  })
  
  // useEffect(() => {
  //   // enroll student to course
  //   if(success){
  //     setGeneralState({...generalState, loading: true})
  //     (async()=>{
  //       try {
  //         if(generalState.pledre){
  //           const res = await generalState.pledre.addCourseToStudent({
  //             courseId:"",
  //             studentId: "",
  //           })
  //           console.log(res)
  //         }
  //       } catch (err) {
  //         console.err(err)
  //       }
  //     })()
  //   }
  // }, [success, id])
  
  const userdata = getItem("gotocourse-userdata")
  return (
    <div className={style.paymentScreen}>
      <div className={style.paymentScreenBox}>
        <div>
          <img src={status.image} alt="" className="img-fluid" />
        </div>
        <h4 className="text-center" style={{color:success ? "var(--theme-blue)" : "var(--theme-orange" }}>
          {status.title}
        </h4>
        <small className="my-1">{status.subtitle}</small>
        <button
          className="button button-md"
          type="button"
          onClick={() => success ? navigate(userdata.userType === "student" ? "/student" : userdata.userType === "admin" ? "/admin" :"/teacher") : navigate(-1)}
        >
          {status.action}
        </button>
        <div className="cancel w-100 text-center my-3">
          <button className="" style={{ color: "var(--theme-blue)", border: "none", outline: "none", fontSize: "14px", }}
            onClick={() => {
              localStorage.removeItem("gotocourse-courseInfo")
              localStorage.removeItem("gotocourse-bootcampdata")
              navigate("/");
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};