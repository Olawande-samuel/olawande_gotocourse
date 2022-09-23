import {useState} from 'react'
import style from "./styles.module.css"
import Layout from "../../components/Layout"
import { Logosm } from '../../images/components/svgs'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AdvancedError } from '../../classes'
const CheckList = () => {
    const [data, setData] = useState({
        
        proficiency:"",
        degree:"",
        teaching_background: "",
        certification:"",
        tech_savvy:"",
        cms_experience:"",
        fast_computer:"",
        fast_internet:"",
        growth_mindset:"",
        adaptable:"",
        canMentor:"",
        student_focused:"",
        inspiring:"",
        learning_experience:""
    })

    const navigate = useNavigate()

    const questions = [
        {
            id:1,
            title: "Are you Proficient in English Language?",
            name:"proficiency",
            yes: true,
            no: false
        },
    	{
            id:2,
            title: "Do you have a college degree?",
            name:"degree",
            yes: true,
            no: false
        },
    	{
            id:3,
            title: "Do you have any background in teaching or mentoring?",
            name:"teaching_background",
            yes: true,
            no: false
        },
    	{
            id:4,
            title: "Do you have any background and Certification in Subject matter/expertise?",
            name:"certification",
            yes: true,
            no: false
        },
    	{
            id:5,
            title: "Are you proficient and comfortable with computers and online technology?",
            name:"tech_savvy",
            yes: true,
            no: false
        },
    	{
            id:6,
            title: "Do you have any experience or training with online course management platforms?",
            name:"cms_experience",
            yes: true,
            no: false
        },
    	{
            id:7,
            title: "Do you have a fast and reliable computer?",
            name:"fast_computer",
            yes: true,
            no: false
        },
    	{
            id:8,
            title: "Do you have access to Broadband/high-speed internet?",
            name:"fast_internet",
            yes: true,
            no: false
        },
    	{
            id:9,
            title: "Do you have a Growth mindset?",
            name:"growth_mindset",
            yes: true,
            no: false
        },
    	{
            id:10,
            title: "Are you able to adapt fast to emerging technologies and teaching strategies?",
            name:"adaptable",
            yes: true,
            no: false
        },
    	{
            id:11,
            title: "Are you able to mentor and guide students through tech skills?",
            name:"canMentor",
            yes: true,
            no: false
        },
    	{
            id:12,
            title: "Are you student-centric?",
            name:"student_focused",
            yes: true,
            no: false
        },
    	{
            id:13,
            title: "Are you a coach who inspires students to reach their full potential?",
            name:"inspiring",
            yes: true,
            no: false
        },
    	{
            id:14,
            title: "Are you able to design and implement deeply engaging learning experiences?",
            name:"learning_experience",
            yes: true,
            no: false
        },
    ]

    function isValid(items){
        for(let d in data){
            if(data[d].trim() === "") return false;
            else continue;
        }
        return true;
    }

    function goodToGo(){
        let compulsory = questions.filter(data => data.id !== 7 && data.id !== 8 && data.id !== 12 && data.id !== 13);
        for(let ques in compulsory){
            let option = compulsory[ques].name
            if(data[option] === "false" || data[option] === false) return false
            else continue
        }
        return true
    }

    function handleChange(e){
        setData({...data, [e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault()
        let valid = isValid(data);
        console.log(valid)
        console.log(data)
        if(!valid){ 
            toast.error("All fields are required for us to get to know you more")
            throw new AdvancedError("All fields are required for us to get to know you more", 1);
        }
        else {
            let checked =  goodToGo()
            if(checked){
                navigate("/teacher/signup");
            } else {
                toast.error("Sorry, You aren't qualified to be a teacher on Gotocourse")
            }
        }
    }
  return (
    // <Layout>
        <div className={style.checklist}>
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
            <form  className={`form ${style.check_form}`} onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center mb-2">
                    <Logosm color="var(--theme-blue)" />
                </div>
                <h4 className="fw-bold text-center">Become a teacher</h4>
            {
                    questions.map((item, i)=>(
                        <div className="form-group my-3" key={i}>
                            <label htmlFor={item.name} className="mb-2">{item.title}</label>
                            <div>
                                <input type="radio" className="form-check-input me-3" name={item.name} id={item.name + "yes"} onChange={handleChange} value={item.yes} />
                                <label className= "form-check-label" htmlFor={item.name + "yes"}>Yes</label>
                            </div>
                            <div>
                                <input type="radio" className="form-check-input me-3" name={item.name} id={item.name + "no"} onChange={handleChange} value={item.no} />
                                <label className= "form-check-label" htmlFor={item.name + "no"}>No</label>
                            </div>
                        </div>
                    ))
                }
                <div>
                <button className="button button-md log_btn w-100 mt-4" type="submit">Submit</button>
                <button className="button button-md log_btn w-100 mt-4" style={{background:"var(--theme-orange"}} type="button" onClick={()=>navigate("/")}>Back</button>
                </div>
            </form>
        </div>

    // </Layout>
  )
}

export default CheckList