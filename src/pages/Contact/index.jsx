import React, {useState, useEffect, useRef} from "react";
import {ToastContainer, toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query"





import clsx from "./styles.module.css";
import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/Auth";
import Input from "../../components/Input";




const Contact = () => {
   
    const [height, setHeight] = useState("");

    const infoData = [
        "Your interests, career goals",
        "Our programs, payment options",
        "Transitioning into Tech"
    ]


    return(
        <Layout>
            <ToastContainer />
            <div className={clsx.contact}>
                <div className={clsx.contact_container}>
                    <div className={clsx.contact_left}>
                        <div className={clsx.contact_left__absolute}>
                            <div>
                            <h2>Reach out to us today to discuss.</h2>
                            <ul>
                                {
                                    infoData.map((d, i) => (
                                        <li key={i}>{d}</li>
                                    ))
                                }
                            </ul>
                            </div>

                            <div style={{width: '100%', marginTop: 50}}>
                                <div style={{marginBottom: 30}}>
                                    <h3>Call us today</h3>
                                    <p> +1 (832) 841-7659</p>
                                </div>
                                <div className="my-3">
                                    <h3>Training Center</h3>
                                    <p>If you would love to visit us, you can reach us here </p>
                                        
                                    <p>12808 West Airport Blvd, #375 Sugarland TX, 77478</p>
                                </div>
                            </div>
        
                        </div>
                    </div>

                    <div className={clsx.contact_right}>
                        <ContactForm  setFormHeight={setHeight} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}





function ContactForm({setFormHeight}){

    const {otherFunctions: {contactUs}} = useAuth()
    const ref = useRef()

    const submitForm = useMutation((data)=>contactUs(data), {
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

    const [formstate, setFormstate] = useState({
        email: "",
        fullName: "",
        message: ""
    })

    const changeHandler = (e)=>{
        const {name, value} = e.target;
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function sendMessage(e){
        e.preventDefault()
        submitForm.mutate(formstate)
    }

    const inputData = [
        {
            type: "email",
            name: "email",
            label: "Email",
            value: formstate.email
        },
        {
            type: "text",
            name: "fullName",
            label: "Full Name",
            value: formstate.fullName
        }
    ]

    return (
        <form className={clsx.form} ref={ref} onSubmit={sendMessage}>
            {
                inputData.map(({type, name, value, label}, i) => (
                    <div className={clsx.form_group} key={i}>
                        <Input
                        name={name}
                        label={label}
                        type={type} value={value} handleChange={changeHandler}
                        />
                    </div>
                ))
            }
            <div className={clsx.form_group}>
                <label htmlFor="name" className="form-label generic_label">Message</label>
                <textarea name="body" id="name" cols="20" rows="5" className="form-control" onChange={changeHandler} value={formstate.body}></textarea>
            </div>

            <button type="submit">Send Message</button>
        </form>
    )
}




export default Contact;
