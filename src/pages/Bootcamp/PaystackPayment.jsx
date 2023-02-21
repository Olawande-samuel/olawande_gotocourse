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
import { toast, ToastContainer } from "react-toastify";
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
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "../../classes/ErrorBoundary";

import { PaystackButton , usePaystackPayment} from "react-paystack"
import { setRef } from "@mui/material";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const BootcampPaystackPayment = () => {
  const { generalState: { isMobile }, setGeneralState, generalState, otherFunctions: { fetchBootcamps }, studentFunctions: { payCarts, addBootcamp } } = useAuth();

  const { getItem } = useLocalStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();
  const [amount, setTotalAmount] = useState();
  const details = localStorage.getItem("gotocourse-paymentDetails");
  const [bootcamp, setBootcamp] = useState({})
  const [stripeId, setStripeId] = useState(null);
  const [showPaypalButton, setShowPaypalButton] = useState(false);
  const [resp, setResp] = useState({})
  const [paymentData, setPaymentData] = useState({
    fullPayment: true,
    initialPayment: "",
  });
  const { id } = useParams()

  const userData = getItem(KEY);

  const params = useParams();
  console.log({ params })

  const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps(), {
    onSuccess: res => {
      console.log({ res })
      console.log(res.data.find(item => item.bootcampId === params.id))
      if (res.data.length > 0) {
        let info = res.data.find(item => item.bootcampId === params.id)
        setBootcamp(info)
        let infoPrice = info.packages.length > 0 ? info.packages[0].price : info.price
        console.log({ infoPrice })
        setPrice(infoPrice)

        return
      }
      setBootcamp({})

    },
    onError: err => console.error(err)

  });


  function handleChange(e, type) {
    type === "select"
      ? (

        setPaymentData({
          ...paymentData,
          fullPayment: e.target.value === "1" ? true : false,
        })
      )
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
    if (userData?.token) {
      const bootcampPaymentInfo = {
        bootcampId: bootcamp.bootcampId,
        amountPaid: price,
        fullPayment: paymentData.fullPayment,
        installments: paymentData.fullPayment ? "" : paymentData.installments,
        initialPayment: paymentData.fullPayment ? "" : paymentData.initialPayment
      }

      if (!bootcamp.isPublic || bootcamp.price !== 0) {
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
          setShowPaypalButton(true);
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
        try {
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
          toast.success("You have successfully enrolled for this course.")
          navigate("/student")

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
      }
    } else {
      localStorage.clear()
      navigate("/redirect");
    }
  }

  // const config = {
  //   reference: resp?.paystackInfo?.data?.reference,
  //   email: userData?.email,
  //   amount: resp?.price, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  //   publicKey: process.env.REACT_APP_PAYSTACK_KEY,
  // };

  // const initializePayment = usePaystackPayment(config);

  // const componentProps = {
  //   email: userData?.email,
  //   amount: price + (price * (5 / 100)),
  //   metadata: {
  //     name: `${userData.firstName} ${userData.lastName}`,
  //     phone: userData.phoneNumber,
  //   },
  //   publicKey: process.env.REACT_APP_PAYSTACK_KEY,
  //   text: "Pay Now",
  //   onSuccess: async(e) => {
  //     console.log({ e })
  //     alert("Thanks for doing business with us! Come back soon!!")

  //   },
  //   onClose: () => alert("Wait! Don't leave :("),
  // }


  console.log({resp});


  const handlePayment = async () => {
    try {
      setGeneralState({ ...generalState, loading: true })
      const res = await payCarts(userData?.token, [bootcamp.bootcampId]);
      const { message, success, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else if (statusCode === 1) {
        const { data } = res;
        console.log({ data });
        if(data){
          window.open(data?.paystackInfo?.data?.authorization_url)
        }
        // setResp(data)

        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        throw new AdvancedError(message, statusCode);
      }

    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } finally {
      setGeneralState({ ...generalState, loading: false });
    }
  }

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  return (

    <div className={`pay_background `}>
      <ToastContainer
        position="top-right"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={`d-flex w-100 justify-content-center align-items-center`} style={{ minHeight: "100vh" }}>
        <section
          className={`row w-100 justify-content-center align-items-center`}
        >
          <div >
            <div className={`${style.payment_details_card} `}>

              <div className={style.cardbodyleft}>

              </div>

              <div className="card">
                <div className="card-body pay_card">
                  <div>
                    <div className="d-flex align-items-center justify-content-center w-100 py-1">
                      <h3 className={clsx.check}>
                        <span>Begin Your Exciting Journey To</span>
                        <span className="d-block">Learning A New Skill</span>

                      </h3>
                    </div>
                  </div>


                  <div className={style.payment_card_mid}>
                    <div className="d-flex flex-column">
                      <span className={clsx.pay__tit}>Course</span>
                      <p
                        className={`text-capitalize fw-normal px-3 ${clsx.pay__inform} `}
                      >
                        {bootcamp?.title}
                      </p>
                      {/* <p>${bootcamp?.price && bootcamp?.price}</p> */}
                    </div>
                  </div>


                  <div className="d-flex flex-column">
                    <span className={`fw-normal ${clsx.pay__tit}`} >Service Fee</span>
                    <p className={`text-capitalize fw-normal px-3 ${clsx.pay__inform} `}>5%</p>
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
                      {/* <option value="0">Installment</option> */}
                    </select>
                  </div>
                  <br />
                  {/* {paymentData.fullPayment === false ? (
                      <>
                        <div className="">
                          <small
                            className="text-info"
                            style={{ fontSize: "12px" }}
                          >
                            *Fees must be paid in not more than two Installments.
                            Each installment carries a $100 extra charge
                          </small>
                          <div className="form-group">
                            <input
                              type="radio"
                              name="initialPayment"
                              id="2"
                              onChange={handleInstallmentChoice}
                              value={(price + (price * (5 / 100))) / 2 + 100}
                            />
                            <label
                              htmlFor="2"
                              className="form-label generic_label ms-2 "
                            >
                              Pay in two installments of{" "}
                              {(price + (price * (5 / 100))) / 2 + 100} each
                            </label>
                          </div>
                        </div>
                        <hr />
                      </>
                    ) : (
                      ""
                    )} */}
                  <div className="d-flex flex-column">
                    <span className={clsx.pay__tit}>Total</span>
                    <p className={`${clsx.pay__total}`}>
                      ${price && +price + (price * (5 / 100))}
                    </p>
                  </div>

                  <button className="button w-100 button-md" onClick={handlePayment}>PayNow</button>

                  {/* <button onClick={() => {
                    initializePayment(onSuccess, onClose)
                  }} className="button w-100 button-md">Paystack Hooks Implementation</button> */}

                  {/* <PaystackButton className="button w-100 button-md" {...componentProps} /> */}



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
                        navigate(-1);
                      }}
                    >
                      Go back
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};



export function PaymentModal({ token, setShowPaypalButton }) {
  const options = {
    clientSecret: token,
  };

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm token={token} setShowStripeModal={setShowPaypalButton} />
      </Elements>
    </div>
  );

}

export const CheckoutForm = ({ token, setShowStripeModal, cart }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [loadingComponent, setLoadingComponent] = useState(true);



  async function handlesubmit(e) {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        return;
      }
      setLoading(true);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: !cart ? `https://gotocourse.com/payment/success/` : `https://gotocourse.com/payment/success?cart=${cart}`,
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
        navigate("/payment/error");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handlesubmit} className="pay_card rounded" style={{ background: "#ffffff" }}>
      <PaymentElement
        onReady={() => {
          setLoadingComponent(false);
        }}
        onError={(err) => {
          console.error(err);
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
        <>
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
        </>
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
            setShowStripeModal(false)
            // navigate("/payment/error");
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
  const { id, cart } = useParams();
  const [loading, setLoading] = useState(false)
  const { generalState: { isMobile }, setGeneralState, generalState, studentFunctions: { clearCarts } } = useAuth();


  const [status, setStatus] = useState({
    image: success ? Success : Failure,
    title: success ? "Payment Successful" : "Payment Denied",
    subtitle: success
      ? "You can start learning now"
      : "Unable to process payment",
    action: success ? "Go to Dashboard" : "Try Again",
  });



  console.log(id)
  const userdata = getItem(KEY);



  async function clearCart() {
    try {
      setGeneralState({ ...generalState, loading: true })
      const res = await clearCarts(userdata?.token);
      const { message, success, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else if (statusCode === 1) {
        const { data } = res;
        if (data) {
          toast.success("wishlist is empty", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          // toast.error("wishlist is empty", {
          //     position: "top-right",
          //     autoClose: 4000,
          //     hideProgressBar: true,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          // });
        }

      } else {
        throw new AdvancedError(message, statusCode);
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setGeneralState({ ...generalState, loading: false });
    }
  }



  useEffect(() => {
    if (cart) {
      clearCart()

    }
  }, [cart])


  // useEffect(() => {
  //   // enroll student to course
  //   if (success) {
  //     (async () => {
  //       try {
  //         if (generalState.pledre) {
  //           const pledRes = await generalState.pledre.getStudentDetails(userdata.email);
  //           if (pledRes._id) {
  //             const res = await generalState.pledre.addCourseToStudent({
  //               course_id: id,
  //               student_id: pledRes._id,
  //             })
  //           }
  //         }
  //       } catch (err) {
  //         console.error(err)
  //       } finally {
  //         setLoading(false)
  //       }
  //     })()
  //   }
  // }, [success, id, generalState.pledre])

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
