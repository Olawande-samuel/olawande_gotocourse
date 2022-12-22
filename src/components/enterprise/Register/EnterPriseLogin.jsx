import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Input";
import Password from "../../Password";
import SignInWrapper from "./Wrapper";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import goo from "../../../images/goo.png";
import face from "../../../images/face.png";
import {
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";
import {
	authentication,
	provider,
	facebookProvider,
} from "../../../firebase-config.js";
import { useLocalStorage } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import { KEY, VERIFICATION_KEY } from "../../../constants";
import { AdvancedError } from "../../../classes";

const EnterPriseLogin = () => {
	const navigate = useNavigate();
	const {
		authFunctions: { login, googleSignIn, facebookSignIn },
		generalState: { pledre },
		setGeneralState,
	} = useAuth();
	const { getItem, removeItem, updateItem } = useLocalStorage();

	const [data, setData] = useState({
		email: "",
		password: "",
		userType: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((old) => {
			return {
				...old,
				[name]: value,
			};
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (data.email.trim() === "" || data.password.trim() === "") return;

		setLoading(true);

		try {
			const response = await login(data, "user");
			console.log(response);
			const { success, statusCode, message } = response;

			if (success) {
				const { data: d } = response;
				console.log({ response });
				removeItem(KEY);
				setGeneralState((old) => {
					return {
						...old,
						notification: response.message,
					};
				});
				if (d.userType === "student") {
					if (d.isVerified) {
						updateItem(KEY, d);
						navigate("/student");

						// navigate("/coming-soon")
					} else {
						updateItem(VERIFICATION_KEY, d);
						navigate("/user-authentication");
					}
				} else if (d.userType === "teacher") {
					if (d.isVerified) {
						if (d.canTeach) {
							updateItem(KEY, d);
							navigate("/teacher");
						} else {
							throw new AdvancedError(
								"Your application is under review. Kindly check back later",
								0
							);
						}
					} else {
						updateItem(VERIFICATION_KEY, d);
						navigate("/user-authentication");
					}
				} else if (d.userType === "mentor") {
					if (d.isVerified) {
						updateItem(KEY, d);
						navigate("/mentor");
					} else {
						updateItem(VERIFICATION_KEY, d);
						navigate("/user-authentication");
					}
				}
			} else throw new AdvancedError(message, statusCode);
		} catch (err) {
			console.error(err.message);
			if (err.statusCode === 0 || err.statusCode === undefined) {
				toast.error(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	function gotoPledre(e) {
		console.log({ pledre });
		e.preventDefault();
		let Data = {
			email: data.email,
			user_type: "teacher",
		};

		pledre.loginUser(Data);
	}

	// SOCIAL LOGIN
	async function socialSignIn(token, type) {
		try {
			const res =
				type === "google"
					? await googleSignIn(token)
					: await facebookSignIn(token);
			if (res.data?.statusCode !== 1)
				throw new AdvancedError(res.data.message, res.data.statusCode);
			if (res.data.data.userType === "student") {
				localStorage.setItem(KEY, JSON.stringify(res.data?.data));
				getItem(KEY, res.data);
				navigate("/student");
			} else if (
				res.data.data.userType === "teacher" ||
				res.data.data.userType === "mentor"
			) {
				// check to see if they've been approved
				if (res.data.data.canTeach) {
					localStorage.setItem(KEY, JSON.stringify(res.data?.data));
					navigate("/teacher");
				} else {
					throw new AdvancedError(
						"Your application is under review. Kindly check back later",
						0
					);
				}
			}
		} catch (err) {
			toast.error(err.message);
		}
	}

	function signInWithGoogle(e) {
		e.preventDefault();
		signInWithPopup(authentication, provider)
			.then((res) => {
				console.log(res);
				if (res.user?.accessToken) {
					let token = {
						accessToken: res.user.accessToken,
					};
					socialSignIn(token, "google");
				}
			})
			.catch((err) => {
				toast.error(err.message);
				if (err.code === "auth/account-exists-with-different-credential") {
					allowOnAccountExistError(err, "facebook");
				}
			});
	}
	function signInWithFacebook(e) {
		e.preventDefault();
		signInWithPopup(authentication, facebookProvider)
			.then((res) => {
				console.log(res);
				if (res.user?.accessToken) {
					if (res.user?.accessToken) {
						let token = {
							accessToken: res.user.accessToken,
						};
						socialSignIn(token, "facebook");
					}
				}
			})
			.catch((err) => {
				console.error(err);
				toast.error(err.message);
				if (err.code === "auth/account-exists-with-different-credential") {
					allowOnAccountExistError(err, "facebook");
				}
			});
	}

	function allowOnAccountExistError(error, type) {
		setLoading(true);
		if (type === "google") {
			const credential = FacebookAuthProvider.credentialFromError(error);
			const token = credential.accessToken;
			socialSignIn(token, "facebook");
		} else {
			const gcredential = GoogleAuthProvider.credentialFromError(error);
			const token = gcredential.accessToken;
			socialSignIn(token, "facebook");
		}
	}
	return (
		<SignInWrapper>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="form-wrapper w-100">
				<header>
					<h3 className="title" style={{ fontWeight: "700" }}>
						Login In
					</h3>
				</header>
				{/* <div className="social_signIn_wrapper">
          <motion.button className="facebook d-block mb-3"
            whileHover={{ 
              boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
              textShadow:"0px 0px 8px rgb(255, 255, 255)",
              backgroundColor: "#eee"
            }}
            onClick={signInWithGoogle}
          >
              <i className="me-4">
                  <img src={goo} alt="" width={25} height={25} />
              </i>
              Continue with Google
          </motion.button>
          
            <motion.button className="google d-block mb-3"
              whileHover={{ 
                boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                textShadow:"0px 0px 8px rgb(255, 255, 255)",
                backgroundColor: "#eee"
              }}
              onClick={signInWithFacebook}
            >
            <i className="me-2">
                    <img src={face} alt="" width={25} height={25} />
                </i>
                Continue with Facebook
            </motion.button>
          <small className="or d-block"><span>or</span></small>
        </div> */}
				<form className="form" onSubmit={onSubmit}>
					<Input
						label="Email or Usercode"
						name="email"
						type="email"
						handleChange={handleChange}
						value={data.email}
						placeholder="Email"
					/>
					<Password
						label="Password"
						name="password"
						password="password"
						handleChange={handleChange}
						value={data.password}
						placeholder="Password"
					/>
					<p className="mt-3">
						<span>Forgot password? </span>
						<Link to="/enterprise-forgot">Click here to reset</Link>
					</p>
					{loading ? (
						<button
							className="button button-md log_btn w-100"
							disabled={loading}
						>
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</button>
					) : (
						<button
							className="button button-md log_btn w-100"
							disabled={loading}
							type="submit"
						>
							Sign In
						</button>
					)}
					{/* <button onClick={gotoPledre}>Click me</button> */}
				</form>
				<p className="mt-5">
					<span>Do not have an account? </span>
					<Link to="/school/signup"> Register</Link>
				</p>
			</div>
		</SignInWrapper>
		// <div>Login</div>
	);
};

export default EnterPriseLogin;
