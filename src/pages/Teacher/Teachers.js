import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import mentor from "../../images/productDesigner.png";
import mentor2 from "../../images/mentor3.png";
import mentor3 from "../../images/businessAnalyst.png";

import Courses, { CourseCard } from "../Courses";
import { courseList } from "../Courses";
import { useAuth } from "../../contexts/Auth";
import style from "./teacher.module.css";
import lere from "../../images/lere.png";
import { useLocalStorage } from "../../hooks";
import { AdvancedError } from "../../classes";
import { witnesses, Card as MentorsCard } from "../../components/Mentors";
import Input from "../../components/Input";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const KEY = "gotocourse-userdata";

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
    otherFunctions: { fetchMentors },
  } = useAuth();
  const [mentors, setMentors] = useState([]);
  const ref = useRef(false);

  // fetch teachers/mentors

  useEffect(() => {
    if (ref.current) return;
    (async () => {
      try {
        setGeneralState({ ...generalState, loading: true });
        const res = await fetchMentors();
        const { success, message, statusCode, data } = res;
        setGeneralState({ ...generalState, loading: false });
        if (!success || statusCode !== 1)
          throw new AdvancedError(message, statusCode);
        if (data.length > 0) {
          setMentors(data);
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
          {nav.map((item, i) => (
            <NavItems
              key={item.name}
              item={item}
              handleChange={handleChange}
              search={search}
            />
          ))}
        </section>
        <main className={`mentors_list_main ${style.main}`}>
          {type === "mentors"
            ? mentors
                // .filter(item=> item.subtitle.includes(search))
                .map((item) => (
                  <div className="mentors_list_card">
                    <MentorsCard item={item} />
                  </div>
                ))
            : courseList.map((item) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setGeneralState((old) => {
                      return {
                        ...old,
                        teacherProfile: {
                          profile: item.img,
                          location: `${item.author} `,
                          details: item.details,
                          content: item.title,
                          id: item.id,
                        },
                      };
                    });
                    navigate(item.author.split(" ").join("-"));
                  }}
                >
                  <CourseCard
                    courseImg={item.img}
                    name={item.title}
                    category={item.subtitle}
                    instructorName={item.author}
                    backgroundColor="backgroundColor"
                  />
                </div>
              ))}
        </main>
      </div>
    </Courses>
  );
};

export default All;

const NavItems = ({ item, handleChange, search }) => {
  // function handleChange(e) {
  //     console.log(e)
  //     setCheck(!check)
  // }
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
  async function enrollToCourse(e) {
    e.preventDefault();

    const userData = getItem(KEY);

    if (userData !== null) {
      const courseData = {
        courseId: paymentDetails.courseId,
        selectedPackage: paymentDetails.title,
        amountPaid: paymentDetails.price,
        fullPayment: paymentData.fullPayment,
        installments: paymentData.fullPayment ? "" : 3,
        initialPayment: paymentData.fullPayment ? "" : paymentData.initialPayment
      };
      try {
        setLoading(true);
        const response = await addCourse(courseData, userData.token);
        const { success, message, statusCode } = response;
        if (!success || statusCode !== 1)
          throw new AdvancedError(message, statusCode);
        const { data } = response;
        setStripeId(data.clientSecret);
        setShowStripeModal(true);
        // item.price = data.clientSecret;
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
                              : lere
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
                          ? `${paymentDetails?.title} Course`
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
                  <div className="d-flex justify-content-between align-items-center">
                    <select name="fullPayment" onChange={(e)=>handleChange(e, "select")} id="paymentType" className="form-select">
                      <option defaultValue  >Choose a payment structure</option>
                      <option value="1" >Full Payment</option>
                      <option value="0" >Installment</option>
                    </select>
                  </div>
                  <hr />
                  {paymentData.fullPayment === false ? 
                  <>
                    <div className=""> 
                    <small className="text-info" style={{fontSize:"12px"}}>*Fees must be paid in not more than three Installments</small>
                    <Input
                      label="Initial Payment"
                      name="initialPayment"
                      type="text"
                      handleChange={(e)=>handleChange(e)}
                      value={paymentData.initialPayment}
                    />
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
        return_url: "http://localhost:3000/payment/success",
      },
    });
    console.log(result)

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
  return (
    <div className={style.paymentScreen}>
      <div className={style.paymentScreenBox}>
        <h3 className="text-center">
          {success ? 
            "Course Purchased Successfully"
          :
            "An error occured during payment processing"
          }
        </h3>
        <button
          className="button button-md"
          type="button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};