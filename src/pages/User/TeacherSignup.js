import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'


import { AdvancedError } from '../../classes'
import Input from '../../components/Input'
import Password from '../../components/Password'
import SignInWrapper from '../../components/SignInWrapper';
import {useAuth} from "../../contexts/Auth";
import { useLocalStorage } from "../../hooks";


const KEY = 'gotocourse-userdata';
const TeacherSignup = () => {
  const emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
  const {authFunctions: {register}, generalState:{pledre}, setGeneralState } = useAuth();
  const [loading, setLoading] = useState(false)
  const [formstate, setFormstate] = useState({
    fullname: "",
    email: "",
    password: "",
    retype_password: "",
    userType: "",
  })
  const [focus, setFocus] =useState(false)

  const navigate = useNavigate();

  function changeHandler(e){
    const {name, value} = e.target;
    setFormstate(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  const { getItem, removeItem } = useLocalStorage();

  React.useEffect(() => {
    if (formstate.fullname !== "") {
      const name = formstate.fullname.split(" ");
      setFormstate((old) => {
        return { ...old, firstName: name[0], lastName: name.slice(-1)[0] };
      });
    }
  }, [formstate.fullname]);

  async function submitHandler(e){
    e.preventDefault();
    setLoading(_ => true);
    try{
      let { retype_password, ...others } = formstate;
      if(!emailReg.test(others.email) || !passReg.test(others.password)) 
        throw new AdvancedError("Invalid email or password", 0)
      if (others.email.trim() === "" || others.password.trim() === "") throw new AdvancedError("Fields cannot be empty", 0);
      if (retype_password !== others.password)
        throw new AdvancedError("Passwords don't match", 0);

        const response = await register(others, "user");

        const res = await pledre.addTeacherToSchool({
          name:`${formstate.firstName} ${formstate.lastName}`,
          email: formstate.email,
          password:`${formstate.password}`
        })

      
      let { success, message, statusCode } = response;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const { data } = response;
        removeItem(KEY);
        localStorage.setItem("gotocourse-pledre-user", JSON.stringify(res))
        getItem(KEY, data);
        setGeneralState((old) => {
          return {
            ...old,
            notification: message,
          };
        });
        navigate("/user-authentication");
      }
    }catch(err){
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }finally{
      setLoading(_ => false);
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
      <div className="form-wrapper">
      <header>
          <h2 className="register_title">Become a GO<span>2</span>COURSE teacher</h2>
          <small className="register_subtitle">Become a part of a supportive community, creative course and earn while at it. To join our growing trainers community, turn your passion to courses and we'll make earning easier</small>
          <h3 className="title">
          Register
          </h3>
        </header>
        <form action="" className="form" onSubmit={submitHandler}>
          <Input label="Fullname" handleChange={changeHandler} value={formstate.fullname} name="fullname" placeholder="Fullname" />
          <Input label="Email" handleChange={changeHandler} value={formstate.email} name="email" type="email" placeholder="Email" />
          <Password label="Password"
           handleChange={changeHandler}
            value={formstate.password} 
            name="password" 
            placeholder="Password"  
            password="password"
            focus ={()=>setFocus(true)}
            blur={()=>setFocus(false)}
          />
          {focus && !passReg.test(formstate.password) &&
            <small style={{fontSize:"11px"}}>
              <p className="text-danger">Password must satisfy the following conditions</p>
              <p className="text-danger"> - At least one upper case English letter</p>
              <p className="text-danger"> - At least one lower case English letter</p>
              <p className="text-danger"> - At least one digit</p>
              <p className="text-danger"> - At least one special character</p>
              <p className="text-danger"> - Minimum eight in length</p>
            </small>
          }
          <Password
            label="Confirm Password" 
            handleChange={changeHandler} 
            value={formstate.retype_password}
            name="retype_password"
            placeholder="Confirm Password"
            password="password"
          />
            
            <div className="form-group d-flex ">
              <input type="radio" name="userType" id="teacher" onChange={changeHandler} value="teacher" />
              <label htmlFor="teacher" className=" generic_label ms-3">Teacher</label>
            </div>
            <div className="form-group d-flex ">
              <input type="radio" name="userType" id="mentor" onChange={changeHandler} value="mentor" />
              <label htmlFor="mentor" className=" generic_label ms-3">Mentor</label>
            </div>
          {loading ? (
            <button className="button button-lg log_btn w-100 mt-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
          <div>
            <button className="button button-md log_btn w-100 mt-4" type="submit">Register</button>
          </div>
          )}
        </form>
        <p className="mt-4">
          <span>Already have an account? </span>
        <Link to="/login"> Sign in</Link></p>
      </div>
    </SignInWrapper>
  )
}

export default TeacherSignup