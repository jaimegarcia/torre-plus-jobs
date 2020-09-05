import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import OpportunityDetailPage from "./pages/opportunitydetail/OpportunityDetailPage";
import PaymentPage from "./pages/payment/PaymentPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/opportunity/:id" component={OpportunityDetailPage} />
      </Switch>
    </Router>
  );
}
