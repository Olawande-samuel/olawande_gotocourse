import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";



import clsx from "./styles.module.css";
import Input from "../../../components/Input";
import success from "../../../images/boarding_success.png";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../contexts/Auth";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";




const KEY = 'gotocourse-userdata';
const OnBoarding = () => {
    const [page, setPage] = useState(0);
    const {kycFunctions: {addMentorKYC}} = useAuth();
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY)
    const [loading, setLoading] = useState(false);
    const [formstate, setFormstate] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
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
    let component;
    useEffect(() => {
        console.log("OnBoarding page is mounted");
        return () => console.log("Removing OnBoarding page");
    }, [])
    function pageHandler(_){ setPage(old => old += 1);}

    async function submitHandler(e){
        e.preventDefault();
        try{
            setLoading(_ => true);
            let data = createBoarding(formstate, userdata?.token);
            const res = await addMentorKYC(data);
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
        console.log({name, value, formstate})
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    if(page === 0)component = <WelcomeSection pageHandler={pageHandler} />;
    else if(page === 1)component = <SectionOne formstate={formstate} changeHandler={changeHandler} pageHandler={pageHandler} />;
    else if(page === 2)component = <SectionTwo formstate={formstate} changeHandler={changeHandler} pageHandler={pageHandler} />;
    else if(page === 3)component = <SectionThree formstate={formstate} setFormstate={setFormstate} changeHandler={changeHandler} pageHandler={pageHandler} />;
    else if(page === 4)component = <SectionFour formstate={formstate} setFormstate={setFormstate} changeHandler={changeHandler} pageHandler={pageHandler} />;
    else if(page === 5)component = <SectionFive formstate={formstate} setFormstate={setFormstate} pageHandler={pageHandler} />;
    else if(page === 6)component = <SectionSix formstate={formstate} setFormstate={setFormstate} submit={submitHandler} />;
    else component = <Success />;


    return (
        <div className={clsx.onboarding}>
            <ToastContainer />
            {loading && <Loader />}
            {component}
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



function SectionOne({pageHandler, formstate, changeHandler}){
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
    ]
    return (
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <h2>Please provide us with your information below by completing this form, you will be able to take classes on Gotocourse upon review and approval by our standardization team.</h2>
                <form>
                    {
                        inputData.map(({name, label, type, value}, i) => (
                            <div className={clsx.form_group} key={i}>
                                <Input autoComplete="off" value={value} handleChange={changeHandler} name={name} label={label} type={type} />
                            </div>
                        ))
                    }
                    <div className={clsx.form_group__button}>
                        <button onClick={pageHandler}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



function SectionTwo({pageHandler, formstate, changeHandler}){
    const inputData = [
        {
            name: "country",
            label: "Country",
            type: "text",
            value: formstate.country
        },
        {
            name: "region",
            label: "Region",
            type: "text",
            value: formstate.region
        }
    ]
    return (
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <h2>Where are you from?</h2>

                <form>
                    {
                        inputData.map(({name, label, type, value}, i) => (
                            <div className={clsx.form_group} key={i}>
                                <Input value={value} handleChange={changeHandler} autoComplete="off" name={name} label={label} type={type} />
                            </div>
                        ))
                    }
                    <div className={clsx.form_group__button}>
                        <button onClick={pageHandler}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



function SectionThree({pageHandler, formstate, setFormstate, changeHandler}){
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
    return(
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <form>
                    <QuestionBox name="hearAboutUs" choice={formstate.hearAboutUs} chooseHandler={chooseHandler} question="How did you hear about us?" options={["facebook ads", "facebook group", "slack group", "telegram group", "word of mouth", "referral", "newsletter", "others"]} />
                    <div className={clsx.form_group}>
                        <h2>What is your area of expertise?</h2>
                        <Input type="text" name="expertise" handleChange={changeHandler} value={formstate.expertise} />
                    </div>
                    <div className={clsx.form_group__button}>
                        <button onClick={pageHandler}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


function SectionFour({pageHandler, formstate, setFormstate, changeHandler}){
    function chooseHandler(e, el){
        const name = e.currentTarget.getAttribute("name");
        console.log(name);
        setFormstate(old => {
            return {
                ...old,
                [name]: el
            }
        })
        console.log({formstate, e, el});
    }
    return(
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <form>
                    <QuestionBox name="technicalExpert" choice={formstate.technicalExpert} chooseHandler={chooseHandler} question="Are you a certified technical expert?" options={["yes", "no"]} />
                    <div className={clsx.form_group}>
                        <h2>What is your area of speciality?</h2>
                        <Input type="text" name="speciality" handleChange={changeHandler} value={formstate.speciality} />
                    </div>
                    <div className={clsx.form_group}>
                        <h2>What is your course preference?</h2>
                        <Input type="text" name="preference" handleChange={changeHandler} value={formstate.preference} />
                    </div>
                    <div className={clsx.form_group__button}>
                        <button onClick={pageHandler}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function SectionFive({pageHandler, formstate, setFormstate}){
    function chooseHandler(e, el){
        const name = e.currentTarget.getAttribute("name");
        console.log(name);
        setFormstate(old => {
            return {
                ...old,
                [name]: el
            }
        })
        console.log({formstate, e, el});
    }
    return(
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <form>
                    <QuestionBox name="willingToBeDedicated" choice={formstate.willingToBeDedicated} chooseHandler={chooseHandler} question="Are you willing to be dedicated and commit to following through training, conducting quizzes, and coordinating/supervising students capstone projects?" options={["yes", "no"]} />
                    <QuestionBox name="qualification" choice={formstate.qualification} chooseHandler={chooseHandler} question="What is your highest qualifications or are you currently completing a degree?" options={["no degree", "bachelor degree", "masters degree", "doctoral degree", "other"]} />
                    <div className={clsx.form_group__button}>
                        <button onClick={pageHandler}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


function SectionSix({submit, formstate, setFormstate}){
    function chooseHandler(e, el){
        const name = e.currentTarget.getAttribute("name");
        console.log(name);
        setFormstate(old => {
            return {
                ...old,
                [name]: el
            }
        })
        console.log({formstate, e, el});
    }
    return(
        <div className={clsx.question}>
            <div className={clsx.question_container}>
                <form onSubmit={submit}>
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
                        <Link to="/teacher">
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