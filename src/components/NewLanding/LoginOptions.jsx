import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  authentication,
  provider,
  facebookProvider,
} from "../../firebase-config.js";
import { useAuth } from "../../contexts/Auth";
import AdvancedError from "../../classes/AdvancedError.js";
import { KEY, VERIFICATION_KEY } from "../../constants/index.js";
import useLocalStorage from "../../hooks/useLocalStorage.jsx";

const LoginOptions = ({ closeOverlay, type }) => {
  const { generalState: { navHeight }, authFunctions: { googleSignUp, facebookSignUp }, } = useAuth();
  const { getItem, updateItem } = useLocalStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  
  async function handleSignUp(e, usertype) {
    if (type === "google") {
      signInWithPopup(authentication, provider)
        .then((res) => {
          if (res.user?.accessToken) {
            console.log({ res });
            setLoading(true);
            googleSignUp({
              accessToken: res.user.accessToken,
              userType: usertype,
            })
              .then((res) => {
                setLoading(false);
                if (res.statusCode !== 1)
                  throw new AdvancedError(res.message, res.status);
                localStorage.setItem(
                  "gotocourse-userdata",
                  JSON.stringify(res.data)
                );
                updateItem(VERIFICATION_KEY, res.data);

                navigate(
                  `${
                    usertype === "student"
                      ? "/user-onboarding"
                      : "/teacher/on-boarding"
                  }`
                );
              })
              .catch((err) => {
                setLoading(false);
                console.error(err);
                toast.error(err.message);
              });
          }
        })
        .catch((error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            allowOnAccountExistError(error, "google", usertype);
          }
        });

    } else {

      signInWithPopup(authentication, facebookProvider)
        .then((res) => {
          console.log("facebook", res);
          if (res.user?.accessToken) {
            setLoading(true);
            facebookSignUp({
              accessToken: res.user.accessToken,
              userType: usertype,
            })
              .then((res) => {
                setLoading(false);
                if (res.statusCode !== 1)
                  throw new AdvancedError(res.message, res.status);
                localStorage.setItem(
                  "gotocourse-userdata",
                  JSON.stringify(res.data)
                );
                navigate(
                  `${
                    usertype === "student"
                      ? "/user-onboarding"
                      : "/teacher/on-boarding"
                  }`
                );
              })
              .catch((err) => {
                setLoading(false);
                console.error(err);
                toast.error(err.message);
              });
          }
        })
        .catch((error) => {
          console.error(error);
          console.log(error.code);
          // / Handle Errors here.
          if (error.code === "auth/account-exists-with-different-credential") {
            allowOnAccountExistError(error, "facebook", usertype);
          }
        });
    }
  }

  function allowOnAccountExistError(error, type, usertype) {
    const email = error.customData.email;
    console.log("customdata", error.customData);
    console.log("customdata mail", error.customData.email);
    console.log(FacebookAuthProvider.credentialFromError(error))
    console.log(GoogleAuthProvider.credentialFromError(error))
    
    setLoading(true)
    if (type === "google") {
      const credential = FacebookAuthProvider.credentialFromError(error);
      googleSignUp({
        accessToken: credential.accessToken,
        userType: usertype,
      })
        .then((res) => {
          setLoading(false);
          if (res.statusCode !== 1)
            throw new AdvancedError(res.message, res.status);
          localStorage.setItem("gotocourse-userdata", JSON.stringify(res.data));
          navigate(
            `${
              usertype === "student"
                ? "/user-onboarding"
                : "/teacher/on-boarding"
            }`
          );
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          toast.error(err.message);
        });
    } else {
      const gcredential = GoogleAuthProvider.credentialFromError(error);
      facebookSignUp({
        accessToken: gcredential.accessToken,
        userType: usertype,
      })
        .then((res) => {
          setLoading(false);
          if (res.statusCode !== 1)
            throw new AdvancedError(res.message, res.status);
          localStorage.setItem("gotocourse-userdata", JSON.stringify(res.data));
          navigate(
            `${
              usertype === "student"
                ? "/user-onboarding"
                : "/teacher/on-boarding"
            }`
          );
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          toast.error(err.message);
        });
    }
  }
  return (
    <div className="signUpOptions_overlay">
      <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      
      />
      <div className="signUpOptions_overlay_container">
        {loading ? (
          <div className="spinner-border text-primary text-center d-flex mx-auto">
            <div className="visually-hidden">Loading...</div>
          </div>
        ) : (
          <div className="suOptions_cards">
            <header>
              <h3>SELECT USER TYPE</h3>
            </header>
            <div className="row justify-content-center">
              <div className="col-6 col-md-4">
                <button
                  className="suOptions_card"
                  onClick={(e) => handleSignUp(e, "teacher")}
                >
                  <i>
                    <GiTeacher size="2.5rem" />
                  </i>
                  <p>Teacher</p>
                </button>
              </div>
              <div className="col-6 col-md-4">
                <button
                  className="suOptions_card"
                  onClick={(e) => handleSignUp(e, "student")}
                >
                  <i>
                    <FaBookReader size="2.5rem" />
                  </i>
                  <p>Student</p>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="close" onClick={() => closeOverlay(false)}>
          <AiOutlineClose size="1.2rem" color="#000" />
        </div>
      </div>
    </div>
  ); 
};

export default LoginOptions;
// user.accesstoken for google
