import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";


import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Country, State, City }  from 'country-state-city';
import clsx from "./styles.module.css";
import Input from "../../../components/Input";
import success from "../../../images/boarding_success.png";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../contexts/Auth";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";
import { KEY, VERIFICATION_KEY } from "../../../constants";



function createBoarding(data){
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        country: data.country,
        region: data.region,
        hearAboutUse: data.hearAboutUs,
        expertise: data.expertise,
        willingNess: data.willingToBeDedicated.trim() === "yes" ? true : false,
        speciality: data.speciality,
        certified: data.technicalExpert,
        degree: data.qualification,
        employment: data.employmentStatus,
        preferredCourse: data.preference
    }
}
function isValid(data){
    for(let d in data){
        if(data[d].trim() === "") return false;
        else continue;
    }
    return true;
}


const OnBoarding = () => {
    const [page, setPage] = useState(0);
    const {kycFunctions: {addMentorKYC}} = useAuth();
    const {getItem} = useLocalStorage();
    window.onbeforeunload = function() { alert("Your work will be lost."); };
    let userdata = getItem(VERIFICATION_KEY)
    const [loading, setLoading] = useState(false);
    const [formstate, setFormstate] = useState({
        firstName: userdata?.firstName ?? "",
        lastName: userdata?.lastName ?? "",
        phoneNumber: "",
        email: userdata?.email ?? "",
        country: "",
        region: "",
        hearAboutUs: "",
        expertise: "",
        technicalExpert: "",
        speciality: "",
        preference: "",
        willingToBeDedicated: "",
        qualification: "",
        employmentStatus: ""
    })

    function pageHandler(_){ setPage(old => old += 1);}
    function backpageHandler(_){ setPage(old => old -= 1);}

    async function submitHandler(e){
        e.preventDefault();
        try{
            setLoading(_ => true);
            let valid = isValid(formstate);
            if(!valid) throw new AdvancedError("All fields are required for us to get to know you more", 1);
            let data = createBoarding(formstate);
            const res = await addMentorKYC(data, userdata?.token);
            const {success, statusCode, message} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            else {
                //successful
                setPage(_ => 10);
                toast.success(message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
        }finally{setLoading(_ => false)}
    }

    function changeHandler(e){
        const {name, value} = e.target;
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }


    return (
        <div className={clsx.onboarding}>
            <ToastContainer />
            {loading && <Loader />}
            {
                page === 0 ? (<WelcomeSection pageHandler={pageHandler} />) : page === 1 ? (
                    <Questions setFormstate={setFormstate} submitHandler={submitHandler} formstate={formstate} changeHandler={changeHandler} backpageHandler={backpageHandler} />
                ) : <Success />
            }
        </div>
    )
}

function WelcomeSection({pageHandler}){
    return(
        <div className={clsx.onboarding_container}>
            <div className={clsx.onboarding_absolute}>
                <h2>TEACHERS ONBOARDING FORM</h2>
                <h5>Welcome to Gotocourse</h5>
                <p>Before you begin your journey, we would like to ask some questions</p>
                <button onClick={pageHandler}>Get started</button>
            </div>
        </div>
    )
}



function Questions({submitHandler, formstate, changeHandler, setFormstate, backpageHandler}){
    const inputData = [
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            value: formstate.firstName
        },
        {
            name: "lastName",
            label: "Last Name",
            type: "text",
            value: formstate.lastName
        },
        {
            name: "phoneNumber",
            label: "Phone Number",
            type: "text",
            value: formstate.phoneNumber
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            value: formstate.email,
            disabled: true
        },
        {
            name: "country",
            label: "Country",
            type: "text",
            value: formstate.country
        },
        {
            name: "region",
            label: "State",
            type: "text",
            value: formstate.region
        }
    ]
    function chooseHandler(e, el){
        const name = e.currentTarget.getAttribute("name");
        setFormstate(old => {
            return {
                ...old,
                [name]: el
            }
        })
    }
    const [value, setValue] = useState()
    const [phoneError, setPhoneError] = useState(false)
    const countries = Country.getAllCountries()
    const [countryCode, setCountryCode]= useState()
    const [states, setStates]= useState([])


    
    function handleCountryChange(e){
        const value = e.target.value
        let country = value.split("/")[0]
        setFormstate({...formstate, country:country})
        setCountryCode(e.target.value.split("/")[1])
    }
    function handleStateChange(e){
        setFormstate({...formstate, region:e.target.value})
    }

    useEffect(()=>{
        if(countryCode){
          let states = State.getStatesOfCountry(countryCode)
          setStates(states)
        }
    },[formstate.country, countryCode])

    useEffect(()=>{
        if(value){
            if(isValidPhoneNumber(value) === true){
                setFormstate({...formstate, phoneNumber: value})
                setPhoneError(false)
            } else {
                setPhoneError(true)
            }
        }
    },[value])

    return (
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <h2>Please provide us with your information below by completing this form, you will be able to take classes on Gotocourse upon review and approval by our standardization team.</h2>
                <form onSubmit={submitHandler}>
                    {
                        inputData.slice(0, 2).map(({name, label, type, value, disabled}, i) => (
                            <div className={clsx.form_group} key={i}>
                                <Input autoComplete="off" value={value} handleChange={changeHandler} name={name} label={label} type={type} readOnly={disabled} />
                            </div>
                        ))
                    }
                     <div className={`${clsx.form_group} phone_number`}>
                        <label htmlFor="Phone" className="form-label generic_label">Phone Number</label>
                        <PhoneInput
                         placeholder="Enter phone number" 
                         value={value}
                         onChange={setValue}
                        />
                        {
                            phoneError && <small className="text-danger" style={{fontSize: '12px'}}>Invalid phone number</small>
                        }
                    </div>
                    {
                        inputData.slice(3, 4).map(({name, label, type, value, disabled}, i) => (
                            <div className={clsx.form_group} key={i}>
                                <Input autoComplete="off" value={value} handleChange={changeHandler} name={name} label={label} type={type} readOnly={disabled} />
                            </div>
                        ))
                    }
                    <div className={clsx.form_group}>
                        <label htmlFor="country" className="form-label generic_label">Country</label>    
                        <select name="country" id="country" className="form-select" onChange={handleCountryChange}>
                            <option value="">Select Country</option>
                            {
                                countries?.map(country=>(
                                    <option value={country.name + "/" + country.isoCode}>{country.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={clsx.form_group}>
                        <label htmlFor="country" className="form-label generic_label">State</label>    
                        <select name="country" id="country" className="form-select" onChange={handleStateChange}>
                            <option value="">Select State</option>
                            {
                                states?.map(state=>(
                                    <option value={state.name}>{state.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <QuestionBox name="hearAboutUs" choice={formstate.hearAboutUs} chooseHandler={chooseHandler} question="How did you hear about us?" options={["facebook ads", "facebook group", "slack group", "telegram group", "word of mouth", "referral", "newsletter", "others"]} />
                    <div className={clsx.form_group}>
                        <h2>What is your area of expertise?</h2>
                        <Input type="text" name="expertise" handleChange={changeHandler} value={formstate.expertise} />
                    </div>
                    <QuestionBox name="technicalExpert" choice={formstate.technicalExpert} chooseHandler={chooseHandler} question="Are you a certified technical expert?" options={["yes", "no"]} />
                    <div className={clsx.form_group}>
                        <h2>What is your area of speciality?</h2>
                        <Input type="text" name="speciality" handleChange={changeHandler} value={formstate.speciality} />
                    </div>
                    <div className={clsx.form_group}>
                        <h2>What is your course preference?</h2>
                        <Input type="text" name="preference" handleChange={changeHandler} value={formstate.preference} />
                    </div>
                    <QuestionBox name="willingToBeDedicated" choice={formstate.willingToBeDedicated} chooseHandler={chooseHandler} question="Are you willing to be dedicated and commit to following through training, conducting quizzes, and coordinating/supervising students capstone projects?" options={["yes", "no"]} />
                    <QuestionBox name="qualification" choice={formstate.qualification} chooseHandler={chooseHandler} question="What is your highest qualifications or are you currently completing a degree?" options={["no degree", "bachelor degree", "masters degree", "doctoral degree", "other"]} />
                    <QuestionBox name="employmentStatus" choice={formstate.employmentStatus} chooseHandler={chooseHandler} question="What is your current employment status?" options={["unemployed", "full-time", "part-time", "casual", "self employed"]} />
                    <div className={clsx.form_group__button}>
                        <button className="btn-danger me-2" onClick={backpageHandler} style={{background: "var(--theme-orange"}}>Back</button>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


function Success({}){
    useEffect(()=>{
        localStorage.clear();
    },[])

    return (
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <form>
                    <h2>Registration Successful</h2>
                    <img src={success} alt="Registration Success" />
                    <div className={clsx.form_group__button}>
                        <p>You will receive a response from us within 48-72 hours</p>
                    </div>
                    <div className={clsx.form_group__button}>
                        <Link to="/"><button>Go Home</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


function QuestionBox({question, options, choice, chooseHandler, name}){
    return (
        <div className={clsx.question_box}>
            <h2>{question}</h2>
            <div className={clsx.question_options}>
                {
                    options.map((el, i) => (
                        <div name={name} onClick={e => chooseHandler(e, el)} className={choice === el ? clsx.chosen : clsx.options_box} key={i}>
                            {el}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}



export default OnBoarding;