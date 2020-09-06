import React from "react";
import { connect } from "react-redux";
import {Typography,Step,StepLabel,Stepper} from '@material-ui/core';

import Opportunities from "../../components/opportunities/Opportunities";

import Search from "../../components/search/Search";
import AppLayout from "../../layouts/AppLayout";


const steps=['Search for your dream job', "Choose one of Torre's Associated Mentors to help you", 'Pay the rate and we will organize the meeting'];

function HomePage({ hasErrors,dispatch }) {
  console.log("hasErrors",hasErrors)
  return (
    <AppLayout>
      <Typography variant="h2">Ready for getting your dream Job</Typography>
      <br/>
      <Typography variant="h6">3 Simple Steps</Typography>
      <br/>
      <Stepper>
        {steps.map((label, index) => {
      
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <br/>
      <Search/>
      
      {hasErrors ? <Typography variant="h2" >NO RESULTS</Typography> : <Opportunities />}

    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
  hasErrors: state.opportunities.hasErrors,

});

export default connect(mapStateToProps)(HomePage);
