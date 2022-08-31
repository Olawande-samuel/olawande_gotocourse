import {useState, useEffect, useRef} from "react"
import Layout from "../components/Layout"
import Input from "../components/Input"
import {Jumbotron} from "./About"

const Contact = () => {
const [formHeight, setFormHeight]= useState("")


    return (
        <Layout>
            <div className="about_wrapper">
                <Jumbotron 
                    title="Reach out to us today to discuss."
                    contact={true}
                />
                <div className="contact_form_wrapper position-relative" style={{height:`${formHeight + 5}px`}}>
                    <ContactForm heightRef={formHeight} setFormHeight={setFormHeight} /> 
                </div>
                <div className="my-5 container">
                    <div className="my-4">
                        <h3>Call us today</h3>
                        <p> +134 857 8949 844</p>
                    </div>
                    <div className="my-4">
                        <h3>Training Center</h3>
                        <p>If you would love to visit us, you can reach us here </p>
                            
                        <p>9898 Bissonet street suite 270, Houston Texas 77036</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Contact
function ContactForm({heightRef, setFormHeight}){

    const ref = useRef()

    useEffect(()=>{
        const height = ref.current.clientHeight
        setFormHeight(height)
    },[])

    const [formstate, setFormstate] = useState({})

    const changeHandler = (e)=>{
        setFormstate({...formstate, [e.target.name]: e.target.value})
    }

    return (
        <form className="contact_form" ref={ref}>
            <div className="input-group">
                <Input
                name="email"
                label="Email"
                type="email" value={formstate.email} placeholder="Email" handleChange={changeHandler}
                
                />
            </div>
            <div className="input-group">
                <Input
                name="fullname"
                label="Full Name"
                type="text" value={formstate.fullname} placeholder="Full Name" handleChange={changeHandler}
                />
            </div>
            <div className="input-group d-flex flex-column">
                <label htmlFor="message" className="form-label generic_label">Message</label>
                <textarea name="message" id="message" cols="20" rows="5" className="form-control" handleChange={changeHandler} value={formstate.message}></textarea>
            </div>

            <button type="submit">Send Message</button>
        </form>
    )
}