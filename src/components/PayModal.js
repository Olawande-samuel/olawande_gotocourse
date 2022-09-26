import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CheckoutForm } from '../pages/Bootcamp/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function PayModal({ token , openPaymentModal, handleClose}) {

  const options = {
    clientSecret: token,
  };


  return (
    <Modal show={openPaymentModal} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
  );
}

export default PayModal;