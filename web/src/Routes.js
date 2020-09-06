import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import OpportunityDetailPage from "./pages/opportunitydetail/OpportunityDetailPage";

export default function Routes() {
  return (
    <HashRouter basename='/'>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/opportunity/:id" component={OpportunityDetailPage} />
      </Switch>
    </HashRouter>
  );
}
