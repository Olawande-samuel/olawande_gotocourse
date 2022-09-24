import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AdvancedError } from '../classes';
import Input from '../components/Input';
import Password from '../components/Password';
import { KEY } from '../constants';
import { useAuth } from '../contexts/Auth';
import GuardedRoute from '../hoc/GuardedRoute';
import { useLocalStorage } from '../hooks';
import clsx from "../pages/Affiliate/Login/styles.module.css";
import AuthLayout from "../pages/Affiliate/common/Layout";

const ResetPassword = () => {
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
  const navigate = useNavigate()
  const { authFunctions: { changePassword }, setGeneralState } = useAuth();
  const { getItem, removeItem } = useLocalStorage();

  const [data, setData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(old => {
      return {
        ...old,
        [name]: value
      }
    })
  };
  const userdata = getItem(KEY);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (data.password.trim() === "") return;
      if (data.newPassword.trim() !== data.confirmPassword.trim()) throw new AdvancedError("Passwords don't match")
      if (!passReg.test(data.newPassword)) throw new AdvancedError("Invalid Password", 0);
      const pass = {
        password: data.password,
        newPassword: data.newPassword
      }
      const response = await changePassword(pass, userdata.token);
      console.log({ response })

      const { success, statusCode, message } = response.data;
      console.log({ message })
      console.log({ statusCode })

      if (statusCode !== 1) throw new AdvancedError(message, statusCode);
      const { data: d } = response;
      toast.success(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //before navigating
      //save some thing to localStorage and state
      navigate(-1)

    } catch (err) {
      console.error(err);
      if (err.statusCode === 0 || err.statusCode === undefined) {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>

      <GuardedRoute>
        <AuthLayout>
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


          <form onSubmit={onSubmit} className={clsx.form}>
            <header>
              <h3 className="title">
                Change Password
              </h3>
            </header>

            <Password
              label="Current Password"
              name="password"
              password="password"
              value={data.password}
              handleChange={handleChange}
              placeholder="Password"
            />
            <Password
              label="New Password"
              name="newPassword"
              password="password"
              value={data.newPassword}
              handleChange={handleChange}
              placeholder="Password"
              focus={() => setFocus(true)}
              blur={() => setFocus(false)}
            />
            {focus && !passReg.test(data.newPassword) &&
              <small style={{ fontSize: "11px" }}>
                <p className="text-danger">Password must satisfy the following conditions</p>
                <p className="text-danger"> - At least one upper case English letter</p>
                <p className="text-danger"> - At least one lower case English letter</p>
                <p className="text-danger"> - At least one digit</p>
                <p className="text-danger"> - At least one special character</p>
                <p className="text-danger"> - Minimum eight in length</p>
              </small>
            }
            <Password
              label="Confirm New Password"
              name="confirmPassword"
              password="password"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              handleChange={handleChange}
            />
            {loading ? (
              <button className="button button-md log_btn w-100">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button
                className="button button-md log_btn w-100"
                type="submit"
              >
                Change Password
              </button>
            )}
          </form>
        </AuthLayout>
      </GuardedRoute>
    </>
  );


}

export default ResetPassword