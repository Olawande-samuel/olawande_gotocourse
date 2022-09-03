import {useState, useEffect, useRef} from "react"
import Layout from "../components/Layout"
import Input from "../components/Input"
import {Jumbotron} from "./About"
import {toast, ToastContainer} from "react-toastify"
import {useMutation} from "@tanstack/react-query"
import { useAuth } from "../contexts/Auth";


const Contact = () => {
const [formHeight, setFormHeight]= useState("")


    return (
        <Layout>
            <div className="about_wrapper">
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
                        <p> +1 (832) 841-7659</p>
                    </div>
                    <div className="my-4">
                        <h3>Training Center</h3>
                        <p>If you would love to visit us, you can reach us here </p>
                            
                        <p>12808 West Airport Blvd, #375 Sugarland TX, 77478</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Contact
function ContactForm({heightRef, setFormHeight}){

    const {otherFunctions: {contactUs}} = useAuth()
    const ref = useRef()

    const submitForm = useMutation((data)=>contactUs(data ), {
        onSuccess: (res)=>{
          if(res.success){
            toast.success(res.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(res.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        },
        onError: (err)=>{
          toast.error(err.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      })

    useEffect(()=>{
        const height = ref.current.clientHeight
        setFormHeight(height)
    },[])

    const [formstate, setFormstate] = useState({})

    const changeHandler = (e)=>{
        setFormstate({...formstate, [e.target.name]: e.target.value})
    }

    function sendMessage(e){
        e.preventDefault()
        submitForm.mutate(formstate)
    }
    console.log(formstate)

    return (
        <form className="contact_form" ref={ref} onSubmit={sendMessage}>
             
            <div className="input-group">
                <Input
                name="email"
                label="Email"
                type="email" value={formstate.email} placeholder="Email" handleChange={changeHandler}
                
                />
            </div>
            <div className="input-group">
                <Input
                name="name"
                label="Full Name"
                type="text" value={formstate.name} placeholder="Full Name" handleChange={changeHandler}
                />
            </div>
            <div className="input-group d-flex flex-column">
                <label htmlFor="name" className="form-label generic_label">Message</label>
                <textarea name="body" id="name" cols="20" rows="5" className="form-control" onChange={changeHandler} value={formstate.body}></textarea>
            </div>

            <button type="submit">Send Message</button>
        </form>
    )
}