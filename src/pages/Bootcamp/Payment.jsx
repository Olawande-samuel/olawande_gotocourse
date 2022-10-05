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
import { KEY } from "../../constants";

import style from "../Teacher/teacher.module.css";
import { useLocalStorage } from "../../hooks";
import { AdvancedError } from "../../classes";
import Success from "../../images/paymentSuccess.png";
import Failure from "../../images/Bad Gateway.png";
import { changeConstants } from "../Dashboard/Teachers/CreateCourse";
import Loader from "../../components/Loader"
import Courses from "../Courses";
import { GuardedRoute } from "../../hoc";
import clsx from '../Bootcamp/Pay.module.css'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const BootcampPayment = () => {
  const {
    studentFunctions: { addBootcamp },
  } = useAuth();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const details = localStorage.getItem("gotocourse-paymentDetails");
  const bootcamp = getItem("gotocourse-bootcampdata");

  const [stripeId, setStripeId] = useState(null);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    fullPayment: true,
    initialPayment: "",
  });

  useEffect(() => {
    if (details) {
      setPaymentDetails(JSON.parse(details));
    }
  }, []);

  function handleChange(e, type) {
    type === "select"
      ? setPaymentData({
        ...paymentData,
        fullPayment: e.target.value === "1" ? true : false,
      })
      : setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  }

  function handleInstallmentChoice(e) {
    e.target.id === "2"
      ? setPaymentData({
        ...paymentData,
        installments: 2,
        [e.target.name]: e.target.value,
      })
      : setPaymentData({
        ...paymentData,
        installments: 4,
        [e.target.name]: e.target.value,
      });
  }

  async function enrollToCourse(e) {
    e.preventDefault();
    const userData = getItem(KEY);
    if (userData !== null) {
      const bootcampPaymentInfo = {
        bootcampId: bootcamp.bootcampId,
        amountPaid: bootcamp.price,
        fullPayment: paymentData.fullPayment,
        installments: paymentData.fullPayment ? "" : paymentData.installments,
        initialPayment: paymentData.fullPayment
          ? ""
          : paymentData.initialPayment,
      };
      try {
        if (
          !bootcampPaymentInfo.fullPayment &&
          !bootcampPaymentInfo.installments
        )
          throw new AdvancedError("Choose your preferred payment plan");
        setLoading(true);
        const response = await await addBootcamp(
          bootcampPaymentInfo,
          userData.token
        );
        const { success, message, statusCode } = response;
        if (!success || statusCode !== 1)
          throw new AdvancedError(message, statusCode);
        const { data } = response;

        console.log({ data });

        setStripeId(data.clientSecret);
        setShowStripeModal(true);
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
      localStorage.clear()
      navigate("/login");
    }
  }
  return (
    // <Courses>
    // {/* <GuardedRoute> */ }
    <div className={`pay_background `}>
    <div className={`container row justify-content-center align-items-center`}>
      <section
        className={`row justify-content-center align-items-center`}
      >
        <div className="col-md-7 col-lg-5 ">
          {showStripeModal ? (
            <PaymentModal token={stripeId} />
          ) : (
            <div className={` card ${style.payment_details_card} `}>
              {/* <div> */}

              <div className="card-body">

                {/* <div> */}


                <div>
                  <div className="d-flex align-items-center justify-content-center w-100 py-1">
                    <h3 className={clsx.check}>Checkout Page</h3>
                  </div>
                </div>


                <div className={style.payment_card_mid}>
                  <div className="d-flex flex-column">
                    <span className={clsx.pay__tit}>Course</span>
                    <p
                      className={`text-capitalize fw-normal ${clsx.pay__inform} `}
                    >
                      {bootcamp.title}
                    </p>
                    {/* <p>${bootcamp?.price && bootcamp?.price}</p> */}
                  </div>
                </div>


                <div className="d-flex flex-column">
                  <span className={`fw-normal ${clsx.pay__tit}`} >Service Fee</span>
                  <p className={`text-capitalize fw-normal ${clsx.pay__inform} `}>$5</p>
                </div>

                <div className="d-flex flex-column justify-content-between">
                  <label
                    htmlFor="paymentType"
                    className="form-label generic_label"
                  >
                    Choose a payment structure
                  </label>
                  <select
                    name="fullPayment"
                    onChange={(e) => handleChange(e, "select")}
                    id="paymentType"
                    className="form-select"
                  >
                    <option value="1">Full Payment</option>
                    <option value="0">Installment</option>
                  </select>
                </div>
                <hr />
                {paymentData.fullPayment === false ? (
                  <>
                    <div className="">
                      <small
                        className="text-info"
                        style={{ fontSize: "12px" }}
                      >
                        *Fees must be paid in not more than four Installments.
                        Each instalment carries a $100 extra charge
                      </small>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="initialPayment"
                          id="2"
                          onChange={handleInstallmentChoice}
                          value={bootcamp?.price / 2 + 100}
                        />
                        <label
                          htmlFor="2"
                          className="form-label generic_label ms-2 "
                        >
                          Pay in two installments of{" "}
                          {bootcamp?.price / 2 + 100} each
                        </label>
                      </div>
                      <div className="text-center">
                        <small className="text-center text-dark">or</small>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="initialPayment"
                          id="4"
                          onChange={handleInstallmentChoice}
                          value={bootcamp?.price / 4 + 100}
                        />
                        <label
                          htmlFor="4"
                          className="form-label generic_label ms-2 "
                        >
                          Pay in four installments of{" "}
                          {bootcamp?.price / 4 + 100} each
                        </label>
                      </div>
                    </div>
                    <hr />
                  </>
                ) : (
                  ""
                )}
                <div className="d-flex flex-column">
                  <span className={clsx.pay__tit}>Total</span>
                  <p className={clsx.pay__inform}>
                    ${bootcamp?.price && +bootcamp?.price + 5}
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
                    Go back
                  </button>
                </div>
              </div>
            </div>



            // </div>

          )}
        </div>
      </section>
    </div>
      {/* </GuardedRoute> */ }
  {/* </Courses> */}
    </div>
  );
};



export function PaymentModal({ token }) {
  const options = {
    clientSecret: token,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );

}

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [loadingComponent, setLoadingComponent] = useState(true);
  const { getItem } = useLocalStorage();

  const classData = getItem("gotocourse-bootcampdata")
  async function handlesubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(classData)
    try {
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://gotocourse.us/payment/success/${classData.pledreCourseId}`,
        },
      });

      console.log({ result })
      result && setLoading(false);

      console.log({ result })

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
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handlesubmit}>
      <PaymentElement
        onReady={() => {
          setLoadingComponent(false);
        }}
      />

      {loadingComponent ? (
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
            navigate("/payment/error");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export const PaymentStatus = ({ success }) => {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const { generalState, setGeneralState } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({
    image: success ? Success : Failure,
    title: success ? "Payment Successful" : "Payment Denied",
    subtitle: success
      ? "You can start learning now"
      : "Unable to process payment",
    action: success ? "Go to Dashboard" : "Try Again",
  });

  console.log(id)
  const userdata = getItem("gotocourse-userdata");

  useEffect(() => {
    // enroll student to course
    if (success) {
      (async () => {
        try {
          if (generalState.pledre) {
            const pledRes = await generalState.pledre.getStudentDetails(userdata.email);
            if (pledRes._id) {
              const res = await generalState.pledre.addCourseToStudent({
                course_id: id,
                student_id: pledRes._id,
              })
            }
          }
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [success, id, generalState.pledre])
  return (
    <div className={style.paymentScreen}>
      {loading && <Loader />}
      <div className={style.paymentScreenBox}>
        <div>
          <img src={status.image} alt="" className="img-fluid" />
        </div>
        <h4
          className="text-center"
          style={{
            color: success ? "var(--theme-blue)" : "var(--theme-orange",
          }}
        >
          {status.title}
        </h4>
        <small className="my-1">{status.subtitle}</small>
        <button
          className="button button-md"
          type="button"
          onClick={() =>
            success
              ? navigate(
                userdata.userType === "student"
                  ? "/student"
                  : userdata.userType === "admin"
                    ? "/admin"
                    : "/teacher"
              )
              : navigate(-1)
          }
        >
          {status.action}
        </button>
      </div>
    </div>
  );
};
