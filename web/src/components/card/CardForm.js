import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
export default function CheckoutForm(selectedMentor) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [mentorFee, setMentorFee] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    console.log("cardSelectedMentor",selectedMentor)
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/services/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(selectedMentor)
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setMentorFee(`${data.currency} ${data.symbol} ${data.amount}`)
        setClientSecret(data.clientSecret);
      });
  }, []);
  const cardStyle = {
    hidePostalCode: true,
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email,
          name,
        }
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  return succeeded ?(
    <div className={succeeded ? "result-message" : "result-message hidden"}>
      <h3>Payment succeeded. Your mentor will contact you soon.</h3>
   
      <CheckCircleIcon style={{ fontSize: 150,color: "#4caf50" }}/>
      <br/>
      <p>Risk free: In case we failed to arrange the meeting, we will return 100% of your money</p>
    </div>
    
  ):(
    <form id="payment-form" onSubmit={handleSubmit}>
      <h2 style={{textAlign: 'center'}} >Please Provide your Credit Card Info</h2>
      <p style={{textAlign: 'center'}}>For Testing Use 4242 4242 4242 4242 04/24 444</p>
      <input
        id="name"
        required
        placeholder="Name on Card"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        id="email"
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} /><br/>
      {mentorFee && <button
        disabled={processing || disabled || succeeded}
        id="card-submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            `Pay ${mentorFee}`
          )}
        </span>
      </button>}
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      
      )}
    </form>
  )
}