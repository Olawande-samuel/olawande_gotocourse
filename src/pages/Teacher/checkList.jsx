import {useState} from 'react'
import style from "./styles.module.css"
import Layout from "../../components/Layout"
import { Logosm } from '../../images/components/svgs'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AdvancedError } from '../../classes'
import CheckHero from "../../images/qualification_hero.png"
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
        inspiring:"",
        learning_experience:""
    })

    const navigate = useNavigate()

    const questions = [
        //WARNING: do not change the ids without doing the same in gotoGo function below
        {
            id:1,
            title: "Are you Proficient in English Language?",
            name:"proficiency",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:2,
            title: "Do you have a college degree?",
            name:"degree",
            yes: true,
            no: false,
            status: "optional"
        },
    	{
            id:3,
            title: "Do you have any background in teaching or mentoring?",
            name:"teaching_background",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:4,
            title: "Do you have any background and Certification in Subject matter/expertise?",
            name:"certification",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:5,
            title: "Are you proficient and comfortable with computers and online technology?",
            name:"tech_savvy",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:6,
            title: "Do you have any experience or training with online course management platforms?",
            name:"cms_experience",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:7,
            title: "Do you have a fast and reliable computer?",
            name:"fast_computer",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:8,
            title: "Do you have access to Broadband/high-speed internet?",
            name:"fast_internet",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:9,
            title: "Do you have a Growth mindset?",
            name:"growth_mindset",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:10,
            title: "Are you able to adapt fast to emerging technologies and teaching strategies?",
            name:"adaptable",
            yes: true,
            no: false,
            status: "optional"
        },
    	{
            id:11,
            title: "Are you able to mentor and guide students?",
            name:"canMentor",
            yes: true,
            no: false,
            both: true,
            neither: false,
            status: "compulsory"
        },
    	
    	{
            id:13,
            title: "Are you a coach who inspires students to reach their full potential?",
            name:"inspiring",
            yes: true,
            no: false,
            status: "compulsory"
        },
    	{
            id:14,
            title: "Are you able to design and implement deeply engaging learning experiences?",
            name:"learning_experience",
            yes: true,
            no: false,
            status: "compulsory"
        },
    ]

    function isValid(items){
        for(let d in items){
            if(items[d].trim() === "") return false;
            else continue;
        }
        return true;
    }

    function goodToGo(){
        let compulsory = questions.filter(data => data.id !== 2 && data.id !== 10);

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
        let all = data
        delete all.degree;
        delete all.adaptable
        let valid = isValid(all);
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
    <Layout>
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
            <div className={style.checklist_hero}>
                <img src={CheckHero} alt="" />
            </div>
            <form  className={`form ${style.check_form}`} onSubmit={handleSubmit}>                
            {
                questions.map((item, i)=>(
                    <div className={`form-group my-3 ${style.question_card}`} key={i}>
                        <label htmlFor={item.name} className="mb-2">{item.title} {item.status === "compulsory" && <span className={style.tag}>*</span>}</label>
                        <div className="d-flex" style={{gap:"1rem"}}>
                            <div>
                                <label className={`formcheck-label ${style.check_label} `} htmlFor={item.name + "yes"}>
                                    <input type="radio" className="form-check-input me-3" name={item.name} id={item.name + "yes"} onChange={handleChange} value={item.yes} />
                                    <span>Yes</span>
                                </label>
                            </div>
                            <div>
                                <label className= {`form-check-label ${style.check_label} `} htmlFor={item.name + "no"}>
                                    <input type="radio" className="form-check-input me-3" name={item.name} id={item.name + "no"} onChange={handleChange} value={item.no} />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                    </div>
                ))
            }
                <div className='d-flex justify-content-between align-items-center'>
                    <button className="button button-md log_btn mt-4" style={{background:"var(--theme-orange"}} type="button" onClick={()=>navigate("/")}>Back</button>
                    <button className="button button-md log_btn mt-4" type="submit">Submit</button>
                </div> 
            </form>
        </div>
     </Layout>

  )
}

export default CheckList