import React from "react";
import { connect } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AppLayout from "../../layouts/AppLayout";

import CardForm from "../../components/card/CardForm";

import "./PaymentPage.css";

const stripePromise = loadStripe("pk_test_51HNHGPEnkm8R0LuQq6ElEuxVbDmcuFHIEQlMsWolC1NdEbxEoaH91oWtFd8T31Wine6rtIwAZJ4lgylshF2bcD7D00ZmAFUhPS");



function PaymentPage({ hasErrors }) {
  return (
    <AppLayout>
      <Elements stripe={stripePromise}>
        <CardForm />
      </Elements>
    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(PaymentPage);


