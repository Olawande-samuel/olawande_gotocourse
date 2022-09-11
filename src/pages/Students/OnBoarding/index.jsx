import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";



import clsx from "./styles.module.css";
import Input from "../../../components/Input";
import success from "../../../images/boarding_success.png";
import Loader from "../../../components/Loader";
import { useLocalStorage } from "../../../hooks";
import { AdvancedError } from "../../../classes";
import { useAuth } from "../../../contexts/Auth";
import { KEY, VERIFICATION_KEY } from "../../../constants";



const OnBoarding = () => {
    const [page, setPage] = useState(0);
    const {getItem,removeItem, updateItem} = useLocalStorage();

    
    let userdata = getItem(VERIFICATION_KEY)

    const navigate = useNavigate()
    const {kycFunctions: {addStudentKYC}} = useAuth();
    const [loading, setLoading] = useState(false);
    const [formstate, setFormstate] = useState({
        firstName: userdata?.firstName ?? "",
        lastName: userdata?.lastName ?? "",
        phoneNumber: "",
        email: userdata?.email ?? "",
        country: "",
        region: "",
        hearAboutUs: "",
        itExperience: "",
        learningModel: "",
        willingToBeDedicated: "",
        qualification: "",
        employmentStatus: "",
        status: "CONFIRMED"
    })
    useEffect(() => {
        console.log("OnBoarding page is mounted");
        return () => console.log("Removing OnBoarding page");
    }, [])
    function pageHandler(_){ setPage(old => old += 1);}
    function isValid(data){
        for(let d in data){
            console.log(d);
            if(data[d].trim() === "") return false;
            else continue;
        }
        return true;
    }
    function createBoarding(data){
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            country: data.country,
            region: data.region,
            hearAboutUse: data.hearAboutUs,
            experience: data.itExperience,
            willingNess: data.willingToBeDedicated.trim() === "yes" ? true : false,
            learningStyle: data.learningModel,
            degree: data.qualification,
            employment: data.employmentStatus,
        }
    }

    async function submitHandler(e){
        e.preventDefault();
        setLoading(_ => true);
        try{
            let valid = isValid(formstate);
            if(!valid) throw new AdvancedError("All fields are required for us to get to know you more", 1);
            const data = createBoarding(formstate);
            const res = await addStudentKYC(data, userdata?.token);
            console.log(res);
            const {success, message, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode)
            else {
               console.log({res})
                // SET USERDATA HERE
                removeItem(VERIFICATION_KEY)
                updateItem(KEY, userdata)
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
        }finally{
            setLoading(_ => false);
        }
    }

    function changeHandler(e){
        const {name, value} = e.target;
        console.log({name, value, formstate})
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
                    <Questions setFormstate={setFormstate} submitHandler={submitHandler} formstate={formstate} changeHandler={changeHandler} />
                ) : <Success />
            }
        </div>
    )
}




function WelcomeSection({pageHandler}){
    return(
        <div className={clsx.onboarding_container}>
            <div className={clsx.onboarding_absolute}>
                <h2>STUDENTS ONBOARDING FORM</h2>
                <h5>Welcome to Gotocourse</h5>
                <p>Before you begin your journey, we would like to ask some questions</p>
                <button onClick={pageHandler}>Get started</button>
            </div>
        </div>
    )
}



function Questions({submitHandler, formstate, changeHandler, setFormstate}){
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
            value: formstate.email
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
        console.log({formstate, e, el});
    }
    return (
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <h2>Please provide us with your information below by completing this form, you will be able to enroll in upcoming courses, bootcamps, and events.</h2>

                <form onSubmit={submitHandler}>
                    {
                        inputData.map(({name, label, type, value}, i) => (
                            <div className={clsx.form_group} key={i}>
                                <Input autoComplete="off" value={value} handleChange={changeHandler} name={name} label={label} type={type} />
                            </div>
                        ))
                    }
                    <QuestionBox name="hearAboutUs" choice={formstate.hearAboutUs} chooseHandler={chooseHandler} question="How did you hear about us?" options={["facebook ads", "facebook group", "slack group", "telegram group", "word of mouth", "referral", "newsletter", "others"]} />
                    <QuestionBox name="itExperience" choice={formstate.itExperience} chooseHandler={chooseHandler}  question="What is your IT Experience?" options={["none", "intermediate", "advanced"]} />
                    <QuestionBox name="learningModel" choice={formstate.learningModel} chooseHandler={chooseHandler} question="What is your preferred learning model?" options={["cohort", "self-paced", "1:1 mentorship", "in-person"]} />
                    <QuestionBox name="willingToBeDedicated" choice={formstate.willingToBeDedicated} chooseHandler={chooseHandler} question="Are you willing to be dedicated and follow through with the training, quizzes, and capstone projects?" options={["yes", "no"]} />
                    <QuestionBox name="qualification" choice={formstate.qualification} chooseHandler={chooseHandler} question="What is your highest qualifications or are you currently completing a degree?" options={["no degree", "bachelor degree", "masters degree", "doctoral degree", "other"]} />
                    <QuestionBox name="employmentStatus" choice={formstate.employmentStatus} chooseHandler={chooseHandler} question="What is your current employment status?" options={["unemployed", "full-time", "part-time", "casual", "self employed"]} />
                    <div className={clsx.form_group__button}>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}





function Success({}){
    return (
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <form>
                    <h2>Application Successful</h2>
                    <img src={success} alt="Application Success" />
                    <div className={clsx.form_group__button}>
                        <Link to="/student">
                            <button>Go to Dashboard</button>
                        </Link>
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