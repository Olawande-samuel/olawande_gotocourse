import React from 'react'
import { ToastContainer } from 'react-toastify'
import SignInWrapper from '../../components/SignInWrapper'
import { Form } from '../Affiliate/Verification'

const Verification = () => {
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
    
    <div className="form-wrapper w-100 user_verifcation">
        <Form />
    </div>
    </SignInWrapper>

  )
}

export default Verification